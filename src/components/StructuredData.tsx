import { useEffect } from "react";
import { useLocation } from "react-router";
import { structuredData } from "../data/seo.ts";

export function useStructuredData() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = "structured-data";
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement("script");
      element.id = id;
      element.setAttribute("type", "application/ld+json");
      document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(structuredData(pathname)).replace(/</g, "\\u003c");
  }, [pathname]);
}
