/**
 * Portrait on the hero ID card.
 * Asset: public/avatar/talha.webp (1086×1448, 2× the badge and then some).
 */
export function Avatar() {
  return (
    <picture className="absolute inset-0">
      <source srcSet="/avatar/talha.avif" type="image/avif" />
      <img
        src="/avatar/talha.webp"
        alt="Talha Arshad, software engineer"
        width={1086}
        height={1448}
        decoding="sync"
        fetchPriority="high"
        loading="eager"
        draggable={false}
        className="h-full w-full object-cover object-center"
      />
    </picture>
  );
}
