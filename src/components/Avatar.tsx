/**
 * Portrait on the hero ID card.
 * Asset: public/avatar/talha.webp (1086×1448, 2× the badge and then some).
 */
export function Avatar() {
  return (
    <img
      src="/avatar/talha.webp"
      alt="Talha Arshad"
      width={1086}
      height={1448}
      decoding="async"
      fetchPriority="high"
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}
