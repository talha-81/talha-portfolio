/** Dispatch this when a future contact form is submitted successfully. */
export const ZORU_CELEBRATE_EVENT = "zoru:celebrate";

export function celebrateZoru() {
  window.dispatchEvent(new Event(ZORU_CELEBRATE_EVENT));
}
