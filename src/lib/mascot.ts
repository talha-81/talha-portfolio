/** Dispatch this when an outbound contact link is used. */
export const MASCOT_CELEBRATE_EVENT = "mascot:celebrate";

export const MASCOT_TIP_EVENT = "mascot:tip";

export function celebrateMascot() {
  window.dispatchEvent(new Event(MASCOT_CELEBRATE_EVENT));
}

export function showMascotTip(text: string) {
  window.dispatchEvent(new CustomEvent(MASCOT_TIP_EVENT, { detail: text }));
}
