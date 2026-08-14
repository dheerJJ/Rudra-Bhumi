import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, MessageCircle, Phone, RefreshCw, Trash2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";
import { telHref, whatsappHref } from "@/lib/contact";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Lead Dashboard | Rudra Bhumi Realtors" },
      {
        name: "description",
        content:
          "Internal dashboard for the Rudra Bhumi Realtors team to track property inquiries, statuses and follow-up dates.",
      },
      { property: "og:title", content: "Lead Dashboard | Rudra Bhumi Realtors" },
      {
        property: "og:description",
        content: "Track property inquiries, statuses and follow-up dates.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/dashboard" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: DashboardPage,
});

type LeadStatus = "new" | "contacted" | "site_visit" | "closed";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  property_type: string | null;
  budget: string | null;
  preferred_location: string | null;
  message: string | null;
  status: LeadStatus;
  follow_up_date: string | null;
  notes: string | null;
  created_at: string;
};

const STATUSES: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "site_visit", label: "Site visit" },
  { value: "closed", label: "Closed" },
];

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-brand/10 text-brand",
  contacted: "bg-gold/15 text-dark",
  site_visit: "bg-dark text-surface",
  closed: "bg-dark/5 text-dark/50",
};

function DashboardPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | LeadStatus>("all");

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      const userId = data.session.user.id;
      let { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (!roles || roles.length === 0) {
        // First team member to sign in claims owner access (one time only).
        const { data: claimed } = await supabase.rpc("bootstrap_first_admin");
        if (claimed) {
          const res = await supabase.from("user_roles").select("role").eq("user_id", userId);
          roles = res.data ?? [];
        }
      }
      setAllowed(Boolean(roles && roles.length > 0));
      setReady(true);
    })();
  }, [navigate]);

  async function load() {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setError(null);
    setLeads((data ?? []) as Lead[]);
  }

  useEffect(() => {
    if (ready && allowed) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, allowed]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: leads.length };
    STATUSES.forEach((s) => {
      base[s.value] = leads.filter((l) => l.status === s.value).length;
    });
    return base;
  }, [leads]);

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  async function patch(id: string, values: Partial<Lead>) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...values } : l)));
    const { error: updateError } = await supabase.from("leads").update(values).eq("id", id);
    if (updateError) setError(updateError.message);
  }

  async function remove(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    const { error: deleteError } = await supabase.from("leads").delete().eq("id", id);
    if (deleteError) setError(deleteError.message);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Loader2 className="h-6 w-6 animate-spin text-brand" aria-hidden="true" />
      </div>
    );
  }

  if (allowed === false) {
    return (
      <div className="min-h-screen bg-surface font-sans text-dark antialiased">
        <SiteHeader />
        <div className="mx-auto max-w-xl px-6 py-24 text-center">
          <h1 className="font-display text-3xl">Access restricted</h1>
          <p className="mt-4 text-dark/70">
            Your account isn&apos;t part of the Rudra Bhumi Realtors team yet. Ask an owner to grant
            you team access, then reload this page.
          </p>
          <button
            onClick={signOut}
            className="mt-8 rounded-full bg-dark px-6 py-3 text-sm font-medium text-surface"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-surface font-sans text-dark antialiased">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl">Lead dashboard</h1>
            <p className="mt-2 text-sm text-dark/60">
              Every website inquiry, with status and follow-up tracking.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </button>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-dark/10 px-5 py-2.5 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {(["all", ...STATUSES.map((s) => s.value)] as const).map((value) => {
            const label = value === "all" ? "All" : STATUSES.find((s) => s.value === value)!.label;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                  filter === value
                    ? "border-brand bg-brand text-primary-foreground"
                    : "border-dark/10 bg-white hover:border-brand hover:text-brand"
                }`}
              >
                {label} ({counts[value] ?? 0})
              </button>
            );
          })}
        </div>

        {error ? (
          <p className="mt-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {loading ? (
          <div className="mt-16 flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-brand" aria-hidden="true" />
          </div>
        ) : visible.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-dashed border-dark/10 p-12 text-center text-dark/50">
            No inquiries here yet. New form submissions appear automatically.
          </p>
        ) : (
          <div className="mt-8 grid gap-5">
            {visible.map((lead) => (
              <article
                key={lead.id}
                className="rounded-2xl border border-dark/5 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-serif text-xl">{lead.name}</h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[lead.status]}`}
                      >
                        {STATUSES.find((s) => s.value === lead.status)?.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-dark/60">
                      {lead.phone}
                      {lead.email ? ` · ${lead.email}` : ""} ·{" "}
                      {new Date(lead.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={telHref(lead.phone)}
                      className="inline-flex items-center gap-2 rounded-full border border-dark/10 px-4 py-2 text-sm transition-colors hover:border-brand hover:text-brand"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Call
                    </a>
                    <a
                      href={whatsappHref(
                        `Hello ${lead.name}, this is Rudra Bhumi Realtors following up on your property inquiry${
                          lead.preferred_location ? ` in ${lead.preferred_location}` : ""
                        }.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => void remove(lead.id)}
                      aria-label={`Delete inquiry from ${lead.name}`}
                      className="inline-flex items-center rounded-full border border-dark/10 px-3 py-2 text-dark/50 transition-colors hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-dark/40">Property type</dt>
                    <dd className="mt-1">{lead.property_type ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-dark/40">Budget</dt>
                    <dd className="mt-1">{lead.budget ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-dark/40">Location</dt>
                    <dd className="mt-1">{lead.preferred_location ?? "—"}</dd>
                  </div>
                </dl>

                {lead.message ? (
                  <p className="mt-4 rounded-lg bg-brand/5 px-4 py-3 text-sm text-dark/70">
                    {lead.message}
                  </p>
                ) : null}

                <div className="mt-5 grid gap-4 border-t border-dark/5 pt-5 sm:grid-cols-3">
                  <label className="block text-xs font-medium uppercase tracking-widest text-dark/40">
                    Status
                    <select
                      value={lead.status}
                      onChange={(e) => void patch(lead.id, { status: e.target.value as LeadStatus })}
                      className="mt-1.5 w-full rounded-lg border border-dark/10 bg-white px-3 py-2 text-sm normal-case tracking-normal text-dark"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-xs font-medium uppercase tracking-widest text-dark/40">
                    Follow-up date
                    <input
                      type="date"
                      value={lead.follow_up_date ?? ""}
                      onChange={(e) =>
                        void patch(lead.id, { follow_up_date: e.target.value || null })
                      }
                      className="mt-1.5 w-full rounded-lg border border-dark/10 bg-white px-3 py-2 text-sm normal-case tracking-normal text-dark"
                    />
                  </label>

                  <label className="block text-xs font-medium uppercase tracking-widest text-dark/40">
                    Notes
                    <input
                      defaultValue={lead.notes ?? ""}
                      onBlur={(e) => void patch(lead.id, { notes: e.target.value || null })}
                      placeholder="Call summary, next step…"
                      className="mt-1.5 w-full rounded-lg border border-dark/10 bg-white px-3 py-2 text-sm normal-case tracking-normal text-dark"
                    />
                  </label>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
