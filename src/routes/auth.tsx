import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team Sign In | Rudra Bhumi Realtors" },
      {
        name: "description",
        content:
          "Private sign in for the Rudra Bhumi Realtors team to manage property inquiries and follow-ups.",
      },
      { property: "og:title", content: "Team Sign In | Rudra Bhumi Realtors" },
      {
        property: "og:description",
        content: "Private sign in for the Rudra Bhumi Realtors lead dashboard.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/auth" },
      { name: "robots", content: "noindex" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (signInError) {
        setError(signInError.message);
        return;
      }
      navigate({ to: "/dashboard" });
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setBusy(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setInfo("Account created. Check your email to confirm, then sign in.");
    setMode("signin");
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-dark/10 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand";

  return (
    <div className="min-h-screen bg-surface font-sans text-dark antialiased">
      <SiteHeader />
      <main className="mx-auto flex max-w-md flex-col justify-center px-6 py-20">
        <h1 className="font-serif text-3xl">Team sign in</h1>
        <p className="mt-2 text-sm text-dark/60">
          Access the inquiry dashboard to track leads, statuses and follow-ups.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-dark/5 bg-white p-6">
          <label className="block text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={field}
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={field}
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="mt-4 rounded-lg bg-brand/10 px-4 py-3 text-sm text-brand">{info}</p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark px-6 py-3 font-medium text-surface transition-colors hover:bg-brand disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-xs uppercase tracking-widest text-dark/50 underline-offset-4 hover:underline"
          >
            {mode === "signin" ? "Create a team account" : "I already have an account"}
          </button>
        </form>
      </main>
    </div>
  );
}
