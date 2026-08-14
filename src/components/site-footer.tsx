import { Link } from "@tanstack/react-router";

import { BUSINESS, DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="border-t border-dark/5 py-12 text-center text-sm text-dark/40">
      <p className="font-serif text-lg font-medium text-dark/80">{BUSINESS.name}</p>
      <p className="mt-2">
        © {new Date().getFullYear()} {BUSINESS.name}. Professional Real Estate Services in Rajasthan.
      </p>
      <nav className="mt-4 flex flex-wrap justify-center gap-6">
        <Link to="/" className="transition-colors hover:text-brand">
          Home
        </Link>
        <Link to="/properties" className="transition-colors hover:text-brand">
          Properties
        </Link>
        <Link to="/contact" className="transition-colors hover:text-brand">
          Contact
        </Link>
        <a
          href={BUSINESS.instagram}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-brand"
        >
          Instagram
        </a>
        <a
          href={BUSINESS.facebook}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-brand"
        >
          Facebook
        </a>
        <a
          href={whatsappHref(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-brand"
        >
          WhatsApp
        </a>
      </nav>
    </footer>
  );
}
