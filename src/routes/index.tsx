import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

import heroVilla from "@/assets/hero-villa.jpg";

import { InquiryForm } from "@/components/inquiry-form";
import { MapEmbed } from "@/components/map-embed";
import { PropertyCard } from "@/components/property-card";

import { Reveal, StarRating } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { featuredProperties } from "@/data/properties";
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, telHref, whatsappHref } from "@/lib/contact";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: BUSINESS.name,
  description:
    "Rudra Bhumi Realtors is a real estate agency in Jaipur offering luxury property buying and sales, land leasing and sales, furnished property rentals, new construction sales and leasing, property development, property investing and property management.",
  slogan: BUSINESS.tagline,
  telephone: [BUSINESS.phonePrimary, BUSINESS.phoneSecondary],
  email: BUSINESS.email,
  url: "/",
  image: "/favicon.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    addressLocality: BUSINESS.locality,
    addressRegion: BUSINESS.region,
    postalCode: BUSINESS.postalCode,
    addressCountry: BUSINESS.country,
  },
  areaServed: [
    { "@type": "City", name: "Jaipur" },
    { "@type": "State", name: "Rajasthan" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
  },
  sameAs: [BUSINESS.instagram, BUSINESS.facebook],
  knowsAbout: [
    "Luxury properties Jaipur",
    "Furnished property rentals",
    "Land leasing and sales",
    "Residential plots Jaipur",
    "New construction sales and leasing",
    "Property development",
    "Property investing",
    "Property management",
    "Property buying and sales",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Real estate services in Jaipur",
    itemListElement: [
      "Luxury property buying and sales",
      "Furnished property rentals and sales",
      "Land leasing and sales",
      "New construction sales and leasing",
      "Property development",
      "Property investing",
      "Property management",
    ].map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rudra Bhumi Realtors | Luxury Real Estate in Jaipur" },
      {
        name: "description",
        content:
          "Rudra Bhumi Realtors — Jaipur's trusted real estate agency for luxury property sales, land leasing, new construction, furnished rentals and property management. Call 97720 02008.",
      },
      { property: "og:title", content: "Rudra Bhumi Realtors | Luxury Real Estate in Jaipur" },
      {
        property: "og:description",
        content:
          "Jaipur's trusted real estate agency for luxury properties, land leasing, new construction and rentals. Aapka Sapna, Hamari Zimmedari.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rudra Bhumi Realtors | Luxury Real Estate in Jaipur" },
      {
        name: "twitter:description",
        content:
          "Jaipur's trusted real estate agency for luxury properties, land leasing, new construction and rentals.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-surface font-sans text-dark antialiased">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-12 pb-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
            <div className="animate-fade-in-up">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1.5 text-gold">
                <span className="text-xs font-bold uppercase tracking-widest italic">
                  {BUSINESS.tagline}
                </span>
              </div>
              <h1 className="font-serif text-5xl leading-[1.1] text-dark md:text-6xl lg:text-7xl">
                Curating <span className="text-brand">Luxury</span> in the Pink City.
              </h1>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-dark/60">
                From heritage villas to modern high-rises, Rudra Bhumi Realtors navigates the Jaipur
                real estate landscape with expertise, trust and a 5.0 Google rating.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/properties"
                  className="inline-flex items-center justify-center rounded-lg bg-dark px-8 py-4 font-medium text-surface transition-all hover:bg-brand"
                >
                  View Properties
                </Link>
                <a
                  href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-dark/10 px-8 py-4 font-medium text-dark transition-all hover:bg-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-300">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroVilla}
                  alt="Luxury modern villa in Jaipur at twilight"
                  width={1200}
                  height={1600}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 max-w-[260px] rounded-xl bg-white p-6 shadow-xl md:-bottom-8 md:-left-8 md:p-8">
                <div className="mb-2 flex items-center gap-2">
                  <StarRating />
                  <span className="text-xs font-bold">5.0 Rating</span>
                </div>
                <p className="text-sm italic text-dark/70">
                  "Guided me through every step. Highly recommended for buying, selling, or leasing
                  properties."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="bg-dark py-24 text-surface">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h2 className="font-serif text-4xl md:text-5xl">Our Expertise</h2>
                <p className="mt-4 max-w-xl text-surface/50">
                  Comprehensive property solutions for homebuyers, investors and landowners across
                  Jaipur and Rajasthan.
                </p>
              </div>
              <div className="text-right font-serif text-xl italic text-gold">
                5.0 ★ Google Reviews
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  n: "01",
                  title: "Luxury Sales & Rentals",
                  body:
                    "Premium villas, penthouses and furnished apartments starting from ₹65 Lakh in Jaipur's most coveted locations.",
                },
                {
                  n: "02",
                  title: "Land & Leasing",
                  body:
                    "Strategic land leasing, plot sales and development across Kardhani, Kalwar Road and surrounding growth corridors. Investments from ₹30 Lakh.",
                },
                {
                  n: "03",
                  title: "New Construction & Management",
                  body:
                    "End-to-end new construction sales, site visits and property management for NRI and local investors.",
                },
              ].map((service, index) => (
                <Reveal key={service.n} delay={index * 120}>
                  <div className="group rounded-2xl border border-surface/10 p-8 transition-all hover:border-brand/40">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-brand/20 font-serif text-lg font-bold italic text-brand">
                      {service.n}
                    </div>
                    <h3 className="font-serif text-xl">{service.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-surface/60">{service.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-4 rounded-2xl border border-surface/10 p-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                "Furnished rentals",
                "Land leasing & sales",
                "Luxury properties",
                "Property development",
                "Property investing",
                "Property management",
                "New construction",
                "Property buying & sales",
              ].map((service) => (
                <div key={service} className="flex items-center gap-3 text-sm text-surface/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured properties */}
        <section id="properties" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl">Featured Properties</h2>
                  <p className="mt-4 max-w-xl text-dark/60">
                    A snapshot of the villas, plots and rental projects currently on our books.
                  </p>
                </div>
                <Link
                  to="/properties"
                  className="inline-flex items-center rounded-full border border-dark/10 bg-white px-6 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                >
                  View all listings
                </Link>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property, index) => (
                <Reveal key={property.id} delay={index * 120}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="bg-brand/5 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl">Client Stories</h2>
                  <p className="mt-4 max-w-xl text-dark/60">
                    Real feedback from buyers, sellers and investors who trusted Rudra Bhumi
                    Realtors.
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                  <div className="font-serif text-4xl font-medium text-brand">5.0</div>
                  <div className="h-10 w-px bg-brand/20" />
                  <div>
                    <StarRating className="mb-1 text-sm" />
                    <div className="text-xs font-medium text-dark/60">6 Google Reviews</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-8 md:grid-cols-2">
              {[
                {
                  quote:
                    "… and helped me find the right property without any hassle. They guided me through every step of the process. Highly recommended for buying, selling, or leasing properties.",
                  initial: "R",
                  name: "Rudra Bhumi Client",
                },
                {
                  quote:
                    "… an ideal contract they were always available. Their knowledge and experience made this event a smooth and successful process. I highly recommend Rudra Bhumi Realtors.",
                  initial: "P",
                  name: "Property Investor",
                },
              ].map((review, index) => (
                <Reveal key={review.initial} delay={index * 120}>
                  <div className="rounded-2xl border border-dark/5 bg-white p-8 shadow-sm transition-all hover:shadow-md">
                    <StarRating className="mb-6" />
                    <p className="mb-8 text-lg leading-relaxed text-dark/80">"{review.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 font-serif text-sm font-bold text-brand">
                        {review.initial}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{review.name}</div>
                        <div className="text-xs text-dark/50">Verified Google Review</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry form */}
        <section id="inquiry" className="py-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-12 max-w-2xl">
                <h2 className="font-serif text-4xl md:text-5xl">Send Us Your Requirement</h2>
                <p className="mt-4 text-dark/60">
                  Share your budget, property type and preferred location — we will shortlist
                  options and reach out on WhatsApp or call.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <InquiryForm />
            </Reveal>
          </div>
        </section>

        {/* Contact / Location */}
        <section id="contact" className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="flex flex-col items-center gap-12 rounded-3xl bg-brand/5 p-8 md:flex-row md:p-12">
                <div className="flex-1">
                  <h2 className="font-serif text-4xl md:text-5xl">Visit Our Office</h2>
                  <p className="mt-4 max-w-lg text-dark/60">
                    Drop by for a site visit or a personal consultation. We are open every day from
                    8 am to 8 pm.
                  </p>

                  <div className="mt-10 space-y-6">
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-brand">
                        Address
                      </span>
                      <p className="mt-1 text-lg leading-snug">
                        {BUSINESS.street},
                        <br />
                        {BUSINESS.locality}, {BUSINESS.region} {BUSINESS.postalCode}
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-brand">
                        Phone
                      </span>
                      <p className="mt-1 font-serif text-2xl">
                        <a href={telHref()} className="transition-colors hover:text-brand">
                          {BUSINESS.phonePrimaryDisplay}
                        </a>
                      </p>
                      <p className="mt-1 text-sm text-dark/50">
                        Also available on{" "}
                        <a
                          href={telHref(BUSINESS.phoneSecondary)}
                          className="text-brand hover:underline"
                        >
                          {BUSINESS.phoneSecondaryDisplay}
                        </a>
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-bold uppercase tracking-widest text-brand">
                        Opening Hours
                      </span>
                      <p className="mt-1 text-lg">{BUSINESS.hours}</p>
                    </div>

                    <div className="flex flex-nowrap items-center gap-2 sm:gap-4 pt-2">
                      <a
                        href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        WhatsApp
                      </a>
                      <a
                        href={BUSINESS.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 text-xs font-medium transition-all hover:border-brand hover:text-brand sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        Instagram
                      </a>
                      <a
                        href={BUSINESS.maps}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-dark/10 bg-white px-4 py-2 text-xs font-medium transition-all hover:border-brand hover:text-brand sm:px-5 sm:py-2.5 sm:text-sm"
                      >
                        Get Directions
                      </a>
                    </div>

                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
                    <MapEmbed className="h-full w-full" />
                  </div>
                </div>

              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Floating CTAs */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:bottom-8 md:right-8">
        <a
          href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Rudra Bhumi Realtors on WhatsApp"
          className="flex items-center gap-3 rounded-full bg-dark px-5 py-3 text-sm font-semibold text-surface shadow-2xl transition-transform hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href={telHref()}
          aria-label={`Call Rudra Bhumi Realtors on ${BUSINESS.phonePrimaryDisplay}`}
          className="flex items-center gap-3 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl transition-transform hover:scale-105"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Quick Call
        </a>
      </div>
    </div>
  );
}
