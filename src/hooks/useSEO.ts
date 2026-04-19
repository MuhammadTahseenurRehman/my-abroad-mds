import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  path: string;
};

/**
 * Lightweight SEO hook — sets <title>, meta description, and canonical link.
 * Use on every public page.
 */
export const useSEO = ({ title, description, path }: Props) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + path);
  }, [title, description, path]);
};
