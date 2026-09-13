function headerOffset() {
  const header = document.querySelector("header");
  return (header?.getBoundingClientRect().height ?? 64) + 12;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToTarget(id: string) {
  if (!id || id === "main" || id === "plate-opening") {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
    return;
  }

  const node = document.getElementById(id);
  if (!node) return;

  const padTop = parseFloat(getComputedStyle(node).paddingTop) || 0;
  const top =
    window.scrollY + node.getBoundingClientRect().top + padTop - headerOffset();

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}
