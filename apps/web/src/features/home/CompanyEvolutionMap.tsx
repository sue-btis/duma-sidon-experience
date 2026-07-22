"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";

import styles from "./company-evolution.module.css";

type Location = Readonly<{ coordinates: [number, number]; label?: string }>;

const LOCATIONS: readonly Location[] = [
  { coordinates: [-106.08889, 28.63528], label: "Chihuahua" },
  { coordinates: [-106.46084, 31.72024] },
  { coordinates: [-115.45446, 32.62781] },
  { coordinates: [-110.96677, 29.08874] },
  { coordinates: [-103.41898, 25.54389] },
  { coordinates: [-100.31721, 25.68435] },
  { coordinates: [-99.133209, 19.432608] },
  { coordinates: [-98.20723, 19.04778] },
  { coordinates: [-86.84656, 21.17429] },
  { coordinates: [-87.07987, 20.6274] },
  { coordinates: [-96.91589, 19.53124] },
  { coordinates: [-103.34749, 20.67738] },
  { coordinates: [-112.07404, 33.44838] },
  { coordinates: [-117.16472, 32.71571] },
  { coordinates: [-106.48693, 31.75872] },
] as const;

const CHIHUAHUA_CITY = LOCATIONS[0].coordinates;
const OPENING_END = 2 / 7;
const CLOSING_START = 6 / 7;

type Camera = Readonly<{ center: [number, number]; zoom: number }>;

const continent: Camera = { center: [-95, 25], zoom: 3.7 };
const mexico: Camera = { center: [-102.5, 24], zoom: 3.85 };
const chihuahua: Camera = { center: [-106.15, 28.65], zoom: 5.45 };
const city: Camera = { center: CHIHUAHUA_CITY, zoom: 7.1 };

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function interpolate(from: Camera, to: Camera, progress: number): Camera {
  return {
    center: [
      from.center[0] + (to.center[0] - from.center[0]) * progress,
      from.center[1] + (to.center[1] - from.center[1]) * progress,
    ],
    zoom: from.zoom + (to.zoom - from.zoom) * progress,
  };
}

function cameraFor(progress: number) {
  if (progress >= CLOSING_START) {
    return { camera: interpolate(city, continent, clamp((progress - CLOSING_START) / (1 - CLOSING_START))), stateOpacity: 1 - clamp((progress - CLOSING_START) / (1 - CLOSING_START)) };
  }

  const openingProgress = clamp(progress / OPENING_END);
  if (openingProgress < 0.45) {
    return { camera: interpolate(continent, mexico, openingProgress / 0.45), stateOpacity: 0 };
  }
  if (openingProgress < 0.75) {
    return { camera: interpolate(mexico, chihuahua, (openingProgress - 0.45) / 0.3), stateOpacity: clamp((openingProgress - 0.62) / 0.13) };
  }
  return { camera: interpolate(chihuahua, city, (openingProgress - 0.75) / 0.25), stateOpacity: 1 };
}

export function CompanyEvolutionMap({ progress, showLocations }: Readonly<{ progress: number; showLocations: boolean }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap>(null);
  const markersRef = useRef<Marker[]>([]);
  const showLocationsRef = useRef(showLocations);

  useEffect(() => {
    showLocationsRef.current = showLocations;
  }, [showLocations]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let map: MapLibreMap | undefined;

    void import("maplibre-gl").then(({ default: maplibregl }) => {
      if (disposed) return;

      map = new maplibregl.Map({
        attributionControl: false,
        boxZoom: false,
        container,
        doubleClickZoom: false,
        dragPan: false,
        dragRotate: false,
        keyboard: false,
        pitchWithRotate: false,
        scrollZoom: false,
        style: { version: 8, sources: {}, layers: [{ id: "water", type: "background", paint: { "background-color": "#f5f8f7" } }] },
        touchPitch: false,
        touchZoomRotate: false,
        ...continent,
      });
      mapRef.current = map;

      map.once("load", () => {
        const loadedMap = map;
        if (!loadedMap || disposed) return;
        loadedMap.addSource("countries", { type: "geojson", data: "/home/company-evolution/map-data/americas.geojson" });
        loadedMap.addLayer({ id: "countries-fill", source: "countries", type: "fill", paint: { "fill-color": "#d9e0e5", "fill-opacity": 0.86 } });
        loadedMap.addLayer({ id: "mexico-fill", source: "countries", type: "fill", filter: ["==", ["get", "id"], "MEX"], paint: { "fill-color": "#b9acd0", "fill-opacity": 0 } });
        loadedMap.addLayer({ id: "countries-line", source: "countries", type: "line", paint: { "line-color": "#93a2af", "line-opacity": 0.78, "line-width": 0.8 } });
        loadedMap.addSource("mexico-states", { type: "geojson", data: "/home/company-evolution/map-data/mexico-states.geojson" });
        loadedMap.addLayer({ id: "mexico-states-line", source: "mexico-states", type: "line", paint: { "line-color": "#93a2af", "line-opacity": 0.58, "line-width": 0.65 } });
        loadedMap.addSource("us-states", { type: "geojson", data: "/home/company-evolution/map-data/us-states.geojson" });
        loadedMap.addLayer({ id: "us-states-line", source: "us-states", type: "line", paint: { "line-color": "#93a2af", "line-opacity": 0.58, "line-width": 0.65 } });
        loadedMap.addSource("chihuahua", { type: "geojson", data: "/home/company-evolution/map-data/chihuahua.geojson" });
        loadedMap.addLayer({ id: "chihuahua-fill", source: "chihuahua", type: "fill", paint: { "fill-color": "#765ca4", "fill-opacity": 0 } });
        loadedMap.addLayer({ id: "chihuahua-line", source: "chihuahua", type: "line", paint: { "line-color": "#3b2b50", "line-opacity": 0, "line-width": 2 } });

        markersRef.current = LOCATIONS.map((location) => {
          const marker = document.createElement("div");
          marker.setAttribute("aria-hidden", "true");
          marker.className = `${styles.cityMarker} ${location.label ? "" : styles.coverageMarker}`;
          if (!location.label) marker.dataset.coverage = "true";
          marker.style.opacity = location.label || showLocationsRef.current ? "1" : "0";
          marker.innerHTML = location.label ? `<span></span><b>${location.label}</b>` : "<span></span>";
          return new maplibregl.Marker({ anchor: "bottom", element: marker }).setLngLat(location.coordinates).addTo(loadedMap);
        });
      });
    });

    const observer = new ResizeObserver(() => map?.resize());
    observer.observe(container);
    return () => {
      disposed = true;
      observer.disconnect();
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const { camera, stateOpacity } = cameraFor(progress);
    map.jumpTo(camera);
    map.setPaintProperty("mexico-fill", "fill-opacity", Math.max(0.18, stateOpacity * 0.45));
    map.setPaintProperty("chihuahua-fill", "fill-opacity", stateOpacity * 0.5);
    map.setPaintProperty("chihuahua-line", "line-opacity", stateOpacity);
    markersRef.current.forEach((marker, index) => {
      const shouldShow = Boolean(LOCATIONS[index].label) || showLocations;
      marker.getElement().style.opacity = shouldShow ? String(Math.max(0.75, stateOpacity)) : "0";
    });
  }, [progress, showLocations]);

  return (
    <div aria-hidden="true" className={`${styles.mapCanvas} ${showLocations ? styles.mapLocationsVisible : ""}`} ref={containerRef}>
      <p className={styles.mapCredit}>Datos cartográficos: Natural Earth · INEGI y U.S. Census vía geoBoundaries</p>
    </div>
  );
}
