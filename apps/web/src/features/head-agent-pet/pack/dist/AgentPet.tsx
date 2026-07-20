"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { petManifest } from "./pet-manifest";
import "./agent-pet.css";

export type AgentPetState = keyof typeof petManifest.states;

type Props = {
  state: AgentPetState;
  variant?: "auto" | string;
  basePath?: string;
  variantIntervalMs?: number;
  className?: string;
  label?: string;
};

type Orbit = {
  name?: string;
  radius_x_px?: number;
  radius_y_px?: number;
  tilt_deg?: number;
  duration_ms?: number;
  size_px?: number;
  delay_ms?: number;
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
  basePath = "/head-pet",
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

  const orbits = (petManifest.effects?.orbits ?? []) as ReadonlyArray<Orbit>;
  const path = orbits[0];
  const centerY = 104;
  const orbitPath = (orbit: Orbit) => {
    const radiusX = Math.min(orbit.radius_x_px ?? 72, 96 - (orbit.size_px ?? 12) / 2);
    const radiusY = Math.min(orbit.radius_y_px ?? 30, 88 - (orbit.size_px ?? 12) / 2);
    return `M ${96 + radiusX} ${centerY} A ${radiusX} ${radiusY} ${orbit.tilt_deg ?? -10} 1 1 ${96 - radiusX} ${centerY} A ${radiusX} ${radiusY} ${orbit.tilt_deg ?? -10} 1 1 ${96 + radiusX} ${centerY}`;
  };

  return (
    <div className={`agent-pet agent-pet--${state} ${className}`} role="img" aria-label={label ?? `${petManifest.pet.name}: ${state}`}>
      <span className="agent-pet__shadow" aria-hidden="true" />
      {path && <svg className="agent-pet__orbit-svg agent-pet__orbit-svg--back" viewBox="0 0 192 192" aria-hidden="true"><path d={orbitPath(path)} />{orbits.map((orbit, index) => <circle key={`${orbit.name ?? "orbit"}-${index}`} r={(orbit.size_px ?? 12) / 2}><animateMotion dur={`${orbit.duration_ms ?? 3600}ms`} begin={`${orbit.delay_ms ?? 0}ms`} repeatCount="indefinite" path={orbitPath(orbit)} /></circle>)}</svg>}
      {/* Animated WebP must remain unoptimized so playback is preserved. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="agent-pet__body" src={`${basePath}/${config.webp}`} alt="" draggable={false} />
      {path && <svg className="agent-pet__orbit-svg agent-pet__orbit-svg--front" viewBox="0 0 192 192" aria-hidden="true"><defs><clipPath id="head-pet-orbit-front"><rect y={centerY} width="192" height="88" /></clipPath></defs><path d={orbitPath(path)} clipPath="url(#head-pet-orbit-front)" />{orbits.map((orbit, index) => <g key={`${orbit.name ?? "orbit"}-${index}`} clipPath="url(#head-pet-orbit-front)"><circle r={(orbit.size_px ?? 12) / 2}><animateMotion dur={`${orbit.duration_ms ?? 3600}ms`} begin={`${orbit.delay_ms ?? 0}ms`} repeatCount="indefinite" path={orbitPath(orbit)} /></circle></g>)}</svg>}
      <span className="agent-pet__particles" aria-hidden="true" />
    </div>
  );
}
