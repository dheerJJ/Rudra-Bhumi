import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { properties, type PropertyCategory } from "@/data/properties";

const filters: ("All" | PropertyCategory)[] = [
  "All",
  "Villa",
  "Plot",
  "Rental",
  "New Construction",
];

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Featured Properties in Jaipur | Villas, Plots & Rentals" },
      {
        name: "description",
        content:
          "Browse featured Jaipur properties from Rudra Bhumi Realtors — luxury villas from ₹1.85 Cr, JDA approved plots from ₹30 Lakh, furnished rentals and new construction projects.",
      },
      { property: "og:title", content: "Featured Properties in Jaipur | Rudra Bhumi Realtors" },
      {
        property: "og:description",
        content:
          "Luxury villas, JDA approved plots, furnished rentals and new construction projects across Jaipur.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/properties" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Featured Properties in Jaipur" },
      {
        name: "twitter:description",
        content: "Villas, plots, rentals and new construction curated by Rudra Bhumi Realtors.",
      },
    ],
    links: [{ rel: "canonical", href: "/properties" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured properties in Jaipur",
          itemListElement: properties.map((property, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: `${property.title} — ${property.location}`,
          })),
        }),
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "All" ? properties : properties.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-surface font-sans text-dark antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-10">
          <div className="animate-fade-in-up max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Featured listings
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Properties curated across Jaipur
            </h1>
            <p className="mt-4 text-lg text-dark/60">
              Handpicked villas, plots, furnished rentals and new construction projects — each
              verified by our team before it reaches you.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  active === filter
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-dark/10 bg-white text-dark hover:border-brand hover:text-brand"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-8 md:grid-cols-2">
            {visible.map((property, index) => (
              <Reveal key={property.id} delay={index * 100}>
                <PropertyCard property={property} />
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
