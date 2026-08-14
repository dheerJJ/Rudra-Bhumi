import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

import { BUSINESS, telHref } from "@/lib/contact";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/contact", label: "Contact" },
  { to: "/dashboard", label: "Leads" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark/5 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl font-bold tracking-tight text-brand">RUDRA BHUMI</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Realtors Jaipur</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium uppercase tracking-wider md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-brand" }}
              className="transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={telHref()}
          className="hidden items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-dark md:inline-flex"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {BUSINESS.phonePrimaryDisplay}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-dark/10 text-dark transition-colors hover:border-brand hover:text-brand md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-dark/5 bg-surface transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-brand" }}
              className="rounded-lg px-2 py-3 text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={telHref()}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {BUSINESS.phonePrimaryDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
