"use client";

import { type CSSProperties, useEffect, useRef } from "react";

import styles from "./cloud-previews.module.css";
import {
  createMicroletterLogo,
  type MicroletterLogoOptions,
} from "../../../../../docs/legacy/3d cloud/microletterLogo";
import {
  createMicroletterPlanet,
  type MicroletterPlanetOptions,
} from "../../../../../docs/legacy/3d cloud/microletterPlanet(1)";

type LogoProps = Readonly<MicroletterLogoOptions & { size: string }>;
type PlanetProps = Readonly<MicroletterPlanetOptions & { size: string; tone?: "blue" | "purple" | "green" }>;

type LogoStyle = CSSProperties & { "--microletter-logo-size"?: string };
type PlanetStyle = CSSProperties & { "--microletter-planet-size"?: string; "--microletter-planet-filter"?: string };

export function MicroletterLogoCloud({
  density,
  fillRatio,
  glow,
  glyphs,
  imageSource,
  size,
}: LogoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;

    if (!root || !canvas) return;

    return createMicroletterLogo(root, canvas, {
      density,
      fillRatio,
      glow,
      glyphs,
      imageSource,
    }).destroy;
  }, [density, fillRatio, glow, glyphs, imageSource]);

  const style: LogoStyle = { "--microletter-logo-size": size };

  return (
    <div className={styles.logo} ref={rootRef} style={style}>
      <canvas aria-hidden="true" className={styles.canvas} ref={canvasRef} />
    </div>
  );
}

export function MicroletterPlanetCloud({
  centerClearance,
  glyphSet,
  interactive,
  maxFps,
  rotationSpeed,
  size,
  tone = "blue",
}: PlanetProps) {
  const planetRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const planet = planetRef.current;
    const canvas = canvasRef.current;

    if (!planet || !canvas) return;

    return createMicroletterPlanet(planet, canvas, {
      centerClearance,
      glyphSet,
      interactive,
      maxFps,
      rotationSpeed,
    }).destroy;
  }, [centerClearance, glyphSet, interactive, maxFps, rotationSpeed]);

  const style: PlanetStyle = {
    "--microletter-planet-size": size,
    "--microletter-planet-filter": tone === "purple" ? "hue-rotate(55deg)" : tone === "green" ? "hue-rotate(-55deg)" : "none",
  };

  return (
    <div className={styles.planetRoot} style={style}>
      <div aria-hidden="true" className={styles.ambient} />
      <div aria-hidden="true" className={styles.ring} />
      <div className={styles.planet} ref={planetRef}>
        <canvas aria-hidden="true" className={styles.canvas} ref={canvasRef} />
      </div>
    </div>
  );
}
