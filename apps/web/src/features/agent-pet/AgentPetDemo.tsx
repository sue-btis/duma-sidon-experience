"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AgentPet,
  type AgentPetState,
} from "@/features/agent-pet/pack/dist/AgentPet";
import { AgentPet as HeadAgentPet } from "@/features/head-agent-pet/pack/dist/AgentPet";

const states = ["idle", "working", "success", "error"] as const;

type Labels = Readonly<{
  title: string;
  description: string;
  automatic: string;
  manual: string;
  states: Record<AgentPetState, string>;
}>;

type Props = Readonly<{ labels: Labels }>;

export function AgentPetDemo({ labels }: Props) {
  const [state, setState] = useState<AgentPetState>("idle");
  const [automatic, setAutomatic] = useState(true);
  const [containerSize, setContainerSize] = useState(256);

  useEffect(() => {
    if (!automatic) return;

    const delay = state === "success" || state === "error" ? 3000 : 13000;
    const timeout = window.setTimeout(() => {
      setState((current) => states[(states.indexOf(current) + 1) % states.length]);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [automatic, state]);

  return (
    <section className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">{labels.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{labels.description}</p>
      </div>

      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div className="grid h-80 place-items-center rounded-3xl border bg-card text-[#00ad93] shadow-sm">
          <div style={{ width: containerSize, height: containerSize }}>
            <AgentPet
              label={`${labels.title}: ${labels.states[state]}`}
              state={state}
              variant="auto"
              variantIntervalMs={6000}
            />
          </div>
        </div>

        <div className="grid h-80 place-items-center rounded-3xl border bg-card text-[#00ad93] shadow-sm">
          <div style={{ width: containerSize, height: containerSize }}>
            <HeadAgentPet
              basePath="/head-pet"
              label={`${labels.title}: ${labels.states[state]}`}
              state={state}
              variant="auto"
              variantIntervalMs={6000}
            />
          </div>
        </div>
      </div>

      <p className="text-sm font-medium" aria-live="polite">
        {labels.states[state]}
      </p>

      <label className="flex w-full max-w-xs items-center gap-3 text-sm font-medium">
        <span>{containerSize}px</span>
        <input
          aria-label="Pet container size"
          className="w-full accent-primary"
          max="288"
          min="96"
          onChange={(event) => setContainerSize(Number(event.target.value))}
          step="8"
          type="range"
          value={containerSize}
        />
      </label>

      <div className="flex flex-wrap justify-center gap-2">
        {states.map((candidate) => (
          <Button
            key={candidate}
            aria-pressed={state === candidate}
            onClick={() => {
              setAutomatic(false);
              setState(candidate);
            }}
            variant={state === candidate ? "default" : "outline"}
          >
            {labels.states[candidate]}
          </Button>
        ))}
      </div>

      <Button
        onClick={() => setAutomatic((current) => !current)}
        variant="secondary"
      >
        {automatic ? labels.manual : labels.automatic}
      </Button>
    </section>
  );
}
