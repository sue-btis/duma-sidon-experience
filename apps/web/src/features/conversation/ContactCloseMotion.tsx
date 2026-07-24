"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Props = Readonly<{ children: ReactNode; className: string }>;

export function ContactCloseMotion({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsActive(true);
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div className={className} data-active={isActive} ref={ref}>{children}</div>;
}
