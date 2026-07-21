"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, startTransition } from "react";

type Props = Readonly<{ ariaCurrent?: "page"; children: ReactNode; className?: string; href: string; node?: string }>;

export function OrbitLink({ ariaCurrent, children, className, href, node }: Props) {
  const router = useRouter();

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const documentWithTransition = document as Document & { startViewTransition?: (callback: () => void) => void };
    if (!documentWithTransition.startViewTransition) return;

    event.preventDefault();
    document.documentElement.dataset.integrationTransition = "true";
    documentWithTransition.startViewTransition(() => startTransition(() => router.push(href)));
  }

  return <Link aria-current={ariaCurrent} className={className} data-node={node} href={href} onClick={navigate}>{children}</Link>;
}
