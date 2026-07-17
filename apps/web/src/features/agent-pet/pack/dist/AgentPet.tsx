"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { petManifest } from "./pet-manifest";
import "./agent-pet.css";

export type AgentPetState = keyof typeof petManifest.states;

type Props = {
  state: AgentPetState;
  variant?: "auto" | string;
  size?: number;
  basePath?: string;
  variantIntervalMs?: number;
  className?: string;
  label?: string;
};

function weightedVariant(state: AgentPetState, previous?: string): string {
  const variants = petManifest.states[state].variants as Record<string, { weight: number }>;
  const entries = Object.entries(variants);
  const eligible = entries.length > 1 ? entries.filter(([name]) => name !== previous) : entries;
  const total = eligible.reduce((sum, [, value]) => sum + Math.max(0, value.weight), 0);
  let cursor = Math.random() * (total || eligible.length);
  for (const [name, value] of eligible) {
    cursor -= total ? Math.max(0, value.weight) : 1;
    if (cursor <= 0) return name;
  }
  return eligible[eligible.length - 1][0];
}

export function AgentPet({
  state,
  variant = "auto",
  size = 192,
  basePath = "/pet",
  variantIntervalMs = 6000,
  className = "",
  label,
}: Props) {
  const previousVariant = useRef<string | undefined>(undefined);
  const [selectedVariant, setSelectedVariant] = useState<string>("");

  useEffect(() => {
    const variants = petManifest.states[state].variants;
    const selectVariant = () => {
      const next = variant === "auto" ? weightedVariant(state, previousVariant.current) : variant;
      previousVariant.current = next;
      setSelectedVariant(next);
    };

    selectVariant();

    if (variant !== "auto" || Object.keys(variants).length < 2) return;

    const interval = window.setInterval(selectVariant, variantIntervalMs);
    return () => window.clearInterval(interval);
  }, [state, variant, variantIntervalMs]);

  const config = useMemo(() => {
    const variants = petManifest.states[state].variants as Record<string, { webp: string }>;
    return variants[selectedVariant] ?? Object.values(variants)[0];
  }, [state, selectedVariant]);

  const style = { "--pet-size": `${size}px` } as CSSProperties;
  const orbits = (petManifest.effects?.orbits ?? []) as ReadonlyArray<{
    name?: string;
    radius_px?: number;
    duration_ms?: number;
    size_px?: number;
    delay_ms?: number;
  }>;

  return (
    <div className={`agent-pet agent-pet--${state} ${className}`} style={style} role="img" aria-label={label ?? `${petManifest.pet.name}: ${state}`}>
      <span className="agent-pet__shadow" aria-hidden="true" />
      {/* Animated WebP must remain unoptimized so playback is preserved. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="agent-pet__body" src={`${basePath}/${config.webp}`} alt="" draggable={false} />
      {orbits.map((orbit, index) => (
        <span
          className="agent-pet__orbit"
          key={`${orbit.name ?? "orbit"}-${index}`}
          style={{
            "--orbit-radius": `${orbit.radius_px ?? 48}px`,
            "--orbit-duration": `${orbit.duration_ms ?? 2400}ms`,
            "--orbit-size": `${orbit.size_px ?? 12}px`,
            "--orbit-delay": `${orbit.delay_ms ?? 0}ms`,
          } as CSSProperties}
          aria-hidden="true"
        />
      ))}
      <span className="agent-pet__particles" aria-hidden="true" />
    </div>
  );
}
