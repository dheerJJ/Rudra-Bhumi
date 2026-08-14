import { useState } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import type { Property } from "@/data/properties";
import { propertyWhatsappMessage, telHref, whatsappHref } from "@/lib/contact";

export function PropertyCard({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);
  const image = property.images[activeImage] ?? property.images[0]!;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-dark/5 bg-white shadow-sm transition-all hover:shadow-lg">
      <div className="relative aspect-[3/2] overflow-hidden bg-stone-200">
        <img
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-dark/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-surface">
          {property.category}
        </span>
      </div>

      {property.images.length > 1 ? (
        <div className="flex gap-2 border-b border-dark/5 p-3">
          {property.images.map((img, index) => (
            <button
              key={img.src + index}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show photo ${index + 1} of ${property.title}`}
              aria-current={index === activeImage}
              className={`h-14 w-20 overflow-hidden rounded-md border-2 transition-all ${
                index === activeImage ? "border-brand" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt=""
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl leading-snug">{property.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-dark/60">
          <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
          {property.location}
        </p>
        <p className="mt-3 font-serif text-2xl text-brand">{property.price}</p>
        <p className="mt-3 text-sm leading-relaxed text-dark/60">{property.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {property.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full bg-brand/5 px-3 py-1 text-xs font-medium text-dark/70"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <a
            href={whatsappHref(
              propertyWhatsappMessage(property.title, property.location, property.price)
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <a
            href={telHref()}
            className="inline-flex items-center gap-2 rounded-full border border-dark/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call now
          </a>
        </div>
      </div>
    </article>
  );
}
