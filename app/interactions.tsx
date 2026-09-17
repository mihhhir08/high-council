"use client";

import { useEffect } from "react";

/**
 * Two small bits of behaviour that do not justify state: reveal sections as
 * they scroll into view, and copy a command when its button is pressed.
 */
export default function Interactions() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("[data-copy]");
      if (!button) return;

      const source = document.getElementById(button.dataset.copy ?? "");
      if (!source) return;

      const restore = () => {
        button.textContent = "Copied";
        button.classList.add("done");
        window.setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("done");
        }, 1400);
      };

      navigator.clipboard?.writeText(source.textContent ?? "").then(restore, restore) ?? restore();
    };

    document.addEventListener("click", onClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
