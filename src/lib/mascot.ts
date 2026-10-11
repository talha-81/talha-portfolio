/** Dispatch this when an outbound contact link is used. */
export const ZORU_CELEBRATE_EVENT = "zoru:celebrate";

export function celebrateZoru() {
  window.dispatchEvent(new Event(ZORU_CELEBRATE_EVENT));
}
