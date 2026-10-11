/** Dispatch this when an outbound contact link is used. */
export const MASCOT_CELEBRATE_EVENT = "mascot:celebrate";

export function celebrateMascot() {
  window.dispatchEvent(new Event(MASCOT_CELEBRATE_EVENT));
}
