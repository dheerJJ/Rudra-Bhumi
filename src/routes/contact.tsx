import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";

import { InquiryForm } from "@/components/inquiry-form";
import { MapEmbed } from "@/components/map-embed";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, telHref, whatsappHref } from "@/lib/contact";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rudra Bhumi Realtors | Property Inquiry in Jaipur" },
      {
        name: "description",
        content:
          "Share your property requirement — name, budget, property type and preferred location — and our Jaipur team responds on WhatsApp or call. Office in Jhotwara, open daily 8 am–8 pm.",
      },
      { property: "og:title", content: "Contact Rudra Bhumi Realtors | Property Inquiry in Jaipur" },
      {
        property: "og:description",
        content:
          "Send your property requirement to Jaipur's trusted real estate agency. Call 97720 02008 or message us on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Rudra Bhumi Realtors" },
      {
        name: "twitter:description",
        content: "Property inquiries for villas, plots and rentals across Jaipur.",
      },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-surface font-sans text-dark antialiased">
      <SiteHeader />

      <main>
        <section className="mx-auto max-w-7xl px-6 pt-16 pb-12">
          <div className="animate-fade-in-up max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-brand">
              Get in touch
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Tell us what you are looking for
            </h1>
            <p className="mt-4 text-lg text-dark/60">
              Share your requirement and we will shortlist properties, arrange site visits and
              handle the paperwork. {BUSINESS.tagline}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-brand"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {BUSINESS.phonePrimaryDisplay}
              </a>
              <a
                href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <InquiryForm />
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl bg-brand/5 p-8">
                <h2 className="font-serif text-2xl">Visit our office</h2>
                <div className="mt-6 space-y-6 text-sm">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand">
                      Address
                    </span>
                    <p className="mt-1 text-base leading-snug">
                      {BUSINESS.street},<br />
                      {BUSINESS.locality}, {BUSINESS.region} {BUSINESS.postalCode}
                    </p>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest text-brand">
                      Phone
                    </span>
                    <p className="mt-1 font-serif text-xl">
                      <a href={telHref()} className="hover:text-brand">
                        {BUSINESS.phonePrimaryDisplay}
                      </a>
                    </p>
                    <p className="mt-1 text-dark/60">
                      Also on{" "}
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
                      Opening hours
                    </span>
                    <p className="mt-1 text-base">{BUSINESS.hours}</p>
                  </div>
                </div>

                <div className="mt-8 aspect-[4/3] overflow-hidden rounded-xl">
                  <MapEmbed className="h-full w-full" />
                </div>

                <a
                  href={BUSINESS.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-dark/10 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
                >
                  Get directions
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
