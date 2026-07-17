"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AgentPet,
  type AgentPetState,
} from "@/features/agent-pet/pack/dist/AgentPet";

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

      <div className="grid h-80 w-80 place-items-center rounded-3xl border bg-card text-[#00ad93] shadow-sm">
        <AgentPet
          label={`${labels.title}: ${labels.states[state]}`}
          size={256}
          state={state}
          variant="auto"
          variantIntervalMs={6000}
        />
      </div>

      <p className="text-sm font-medium" aria-live="polite">
        {labels.states[state]}
      </p>

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
