"use client";

import { useEffect, useRef } from "react";

import { getDumaGameCompletionKey, isDumaGameCompletionMessage, type DumaGameId } from "./dumaGameCompletion";

type Props = Readonly<{ game: DumaGameId; src: string; title: string }>;

export function DumaGameFrame({ game, src, title }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.source !== frameRef.current?.contentWindow || !isDumaGameCompletionMessage(event.data, game)) return;
      try { window.localStorage.setItem(getDumaGameCompletionKey(game), "true"); } catch { /* Storage is optional. */ }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [game]);

  return <iframe className="h-svh w-full border-0 pt-20" ref={frameRef} sandbox="allow-scripts" src={src} title={title} />;
}
