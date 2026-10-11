import { useEffect } from "react";
import { useLocation } from "react-router";
import { canonicalUrl, OG_IMAGE_URL } from "./site.ts";

type Gtag = (...args: unknown[]) => void;

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function usePageMeta(title: string, description: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = canonicalUrl(pathname);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertCanonical(url);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", OG_IMAGE_URL);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE_URL);

    const gtag = (window as Window & { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "page_view", {
        page_path: pathname,
        page_location: url,
        page_title: title,
      });
    }
  }, [title, description, pathname]);
}
