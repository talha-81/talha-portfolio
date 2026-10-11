import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function snapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/** True when the device can hover with a fine pointer. Touch keeps tap only. */
export function useFineHover() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
