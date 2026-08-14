import { useEffect, useRef, type ReactNode } from "react";

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    element.classList.add("reveal-hidden");
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal-hidden ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function StarRating({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center text-gold ${className}`} aria-label="5 out of 5 stars">
      {"★★★★★".split("").map((star, i) => (
        <span key={i} className="inline-block" aria-hidden="true">
          {star}
        </span>
      ))}
    </span>
  );
}
