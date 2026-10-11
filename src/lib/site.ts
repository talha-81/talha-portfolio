export const SITE_URL = "https://talha-ai.netlify.app";

export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

export function canonicalUrl(pathname: string) {
  if (pathname === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${pathname}`;
}
