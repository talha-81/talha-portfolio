function pageTop(element: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function scrollToContactForm(reduceMotion: boolean) {
  const section = document.getElementById("contact-form");
  if (!section) return false;
  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 80) + 16;
  const top = Math.max(0, pageTop(section) - offset);
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  const name = document.getElementById("name");
  if (name instanceof HTMLInputElement) name.focus({ preventScroll: true });
  return true;
}

export function scrollToContactFormWhenReady(reduceMotion: boolean) {
  let frames = 0;
  let frame = 0;
  const tick = () => {
    frames += 1;
    if (scrollToContactForm(reduceMotion) || frames > 45) return;
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
