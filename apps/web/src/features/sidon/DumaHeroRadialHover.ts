type Options = Readonly<{
  cardSelector: string;
  container: HTMLElement;
  radius: (size: Readonly<{ height: number; width: number }>) => number;
  startAngle: number;
}>;

type Item = {
  angle: number;
  card: HTMLElement;
  fold: HTMLDivElement;
  influence: number;
  lift: number;
  liftVelocity: number;
  originalNextSibling: ChildNode | null;
  originalParent: ParentNode;
  slot: HTMLDivElement;
  foldAmount: number;
  foldVelocity: number;
};

export function mountRadialCardHover({ cardSelector, container, radius, startAngle }: Options) {
  const pointer = { angle: 0, inside: false, radial: 0 };
  const items: Item[] = [];
  const cards = Array.from(container.querySelectorAll<HTMLElement>(cardSelector));
  const tau = Math.PI * 2;
  let animationFrame = 0;
  let averageCardSize = 80;
  let destroyed = false;
  let lastTime = performance.now();
  let ringRadius = 0;

  container.classList.add("radial-card-ring");
  cards.forEach((card, index) => {
    const slot = document.createElement("div");
    const fold = document.createElement("div");
    const originalParent = card.parentNode;
    const originalNextSibling = card.nextSibling;
    if (!originalParent) return;

    slot.className = "radial-card-slot";
    fold.className = "radial-card-fold";
    originalParent.insertBefore(slot, card);
    slot.append(fold);
    fold.append(card);
    items.push({ angle: startAngle + index / cards.length * tau, card, fold, foldAmount: 0, foldVelocity: 0, influence: 0, lift: 0, liftVelocity: 0, originalNextSibling, originalParent, slot });
  });

  function measure() {
    const { height, width } = container.getBoundingClientRect();
    const scale = container.clientWidth ? width / container.clientWidth : 1;
    ringRadius = radius({ height, width }) / scale;
    averageCardSize = items.reduce((total, item) => {
      const size = Math.max(item.card.offsetWidth, item.card.offsetHeight);
      item.slot.style.width = `${item.card.offsetWidth}px`;
      item.slot.style.height = `${item.card.offsetHeight}px`;
      return total + size;
    }, 0) / items.length || 80;
  }

  function applyRestingLayout() {
    items.forEach((item) => {
      item.slot.style.transform = `translate3d(${Math.cos(item.angle) * ringRadius}px, ${Math.sin(item.angle) * ringRadius}px, 0) translate(-50%, -50%)`;
    });
  }

  function updatePointer(event: PointerEvent) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    pointer.angle = Math.atan2(y, x);
    pointer.radial = Math.hypot(x, y);
    pointer.inside = true;
  }

  function clearPointer() { pointer.inside = false; }

  function frame(now: number) {
    if (destroyed) return;
    const dt = Math.min(2, (now - lastTime) / 16.6667 || 1);
    lastTime = now;
    const radialFactor = pointer.inside ? Math.max(0, 1 - Math.abs(pointer.radial - ringRadius) / (averageCardSize * 2.3)) : 0;

    items.forEach((item) => {
      const radialX = Math.cos(item.angle);
      const radialY = Math.sin(item.angle);
      const angularDistance = Math.abs(Math.atan2(Math.sin(item.angle - pointer.angle), Math.cos(item.angle - pointer.angle)));
      const targetInfluence = radialFactor * Math.exp(-(angularDistance ** 2) / (2 * .31 ** 2));
      item.influence += (targetInfluence - item.influence) * .2 * dt;
      const targetFold = 88 * item.influence ** .76;
      const targetLift = 18 * Math.sin(Math.min(1, item.influence) * Math.PI);
      item.foldVelocity = (item.foldVelocity + (targetFold - item.foldAmount) * .105 * dt) * .72 ** dt;
      item.foldAmount += item.foldVelocity * dt;
      item.liftVelocity = (item.liftVelocity + (targetLift - item.lift) * .085 * dt) * .74 ** dt;
      item.lift += item.liftVelocity * dt;
      const blur = Math.max(0, (item.foldAmount - 55) / 35) * .32;

      item.slot.style.transform = `translate3d(${radialX * (ringRadius + item.lift)}px, ${radialY * (ringRadius + item.lift)}px, ${item.influence * 24}px) translate(-50%, -50%)`;
      item.fold.style.transform = `rotate3d(${radialX}, ${radialY}, 0, ${item.foldAmount}deg) scale(${1 + item.influence * .045})`;
      item.fold.style.filter = `saturate(${1 + item.influence * .22}) brightness(${1 + item.influence * .035}) blur(${blur}px)`;
      item.slot.style.zIndex = String(10 + Math.round(item.influence * 100));
    });
    animationFrame = requestAnimationFrame(frame);
  }

  const resizeObserver = new ResizeObserver(measure);
  resizeObserver.observe(container);
  items.forEach(({ card }) => resizeObserver.observe(card));
  container.addEventListener("pointermove", updatePointer, { passive: true });
  container.addEventListener("pointerenter", updatePointer, { passive: true });
  container.addEventListener("pointerleave", clearPointer, { passive: true });
  measure();
  applyRestingLayout();
  animationFrame = requestAnimationFrame(frame);

  return { destroy() {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    container.removeEventListener("pointermove", updatePointer);
    container.removeEventListener("pointerenter", updatePointer);
    container.removeEventListener("pointerleave", clearPointer);
    container.classList.remove("radial-card-ring");
    items.forEach(({ card, originalNextSibling, originalParent, slot }) => {
      originalParent.insertBefore(card, originalNextSibling?.parentNode === originalParent ? originalNextSibling : null);
      slot.remove();
    });
  } };
}
