import { useEffect } from "react";
import { useLocation } from "react-router";
import { pageSeo } from "../data/seo.ts";
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

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = pageSeo(pathname);
    const url = canonicalUrl(pathname);
    const image = seo.image ?? OG_IMAGE_URL;
    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertCanonical(url);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:type", seo.type ?? "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);
    if (seo.published) upsertMeta("property", "article:published_time", seo.published);
    else document.head.querySelector('meta[property="article:published_time"]')?.remove();
    if (seo.modified) upsertMeta("property", "article:modified_time", seo.modified);
    else document.head.querySelector('meta[property="article:modified_time"]')?.remove();

    const gtag = (window as Window & { gtag?: Gtag }).gtag;
    if (typeof gtag === "function") {
      gtag("event", "page_view", {
        page_path: pathname,
        page_location: url,
        page_title: seo.title,
      });
    }
  }, [pathname]);
}
