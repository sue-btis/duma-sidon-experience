"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, type MouseEvent, type MouseEventHandler, type ReactNode, startTransition } from "react";

type Props = Readonly<{
  ariaCurrent?: "page";
  children: ReactNode;
  className?: string;
  href: string;
  node?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  tabIndex?: number;
}>;

export const OrbitLink = forwardRef<HTMLAnchorElement, Props>(function OrbitLink(
  { ariaCurrent, children, className, href, node, onClick, tabIndex },
  ref,
) {
  const router = useRouter();

  function navigate(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const documentWithTransition = document as Document & { startViewTransition?: (callback: () => void) => void };
    if (!documentWithTransition.startViewTransition) return;

    event.preventDefault();
    document.documentElement.dataset.integrationTransition = "true";
    documentWithTransition.startViewTransition(() => startTransition(() => router.push(href)));
  }

  return <Link aria-current={ariaCurrent} className={className} data-node={node} href={href} onClick={navigate} ref={ref} tabIndex={tabIndex}>{children}</Link>;
});
