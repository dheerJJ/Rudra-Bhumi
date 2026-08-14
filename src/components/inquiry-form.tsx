import { useState } from "react";
import { MessageCircle, Mail, Loader2, CheckCircle2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  inquiryMailtoHref,
  inquiryWhatsappMessage,
  whatsappHref,
  type InquiryDetails,
} from "@/lib/contact";

const PROPERTY_TYPES = [
  "Luxury villa",
  "Apartment / flat",
  "Residential plot",
  "Commercial space",
  "Rental (furnished)",
  "New construction",
];

const BUDGETS = [
  "Under ₹30 Lakh",
  "₹30 – 65 Lakh",
  "₹65 Lakh – 1 Cr",
  "₹1 – 2 Cr",
  "Above ₹2 Cr",
  "Rental budget",
];

const empty = {
  name: "",
  phone: "",
  email: "",
  propertyType: "",
  budget: "",
  preferredLocation: "",
  message: "",
};

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-brand";

export function InquiryForm({ defaultPropertyType = "" }: { defaultPropertyType?: string }) {
  const [form, setForm] = useState({ ...empty, propertyType: defaultPropertyType });
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<InquiryDetails | null>(null);

  const update = (key: keyof typeof empty) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please share your name and phone number.");
      return;
    }

    setStatus("saving");
    const details: InquiryDetails = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      propertyType: form.propertyType || undefined,
      budget: form.budget || undefined,
      preferredLocation: form.preferredLocation.trim() || undefined,
      message: form.message.trim() || undefined,
    };

    const { error: insertError } = await supabase.from("leads").insert({
      name: details.name,
      phone: details.phone,
      email: details.email ?? null,
      property_type: details.propertyType ?? null,
      budget: details.budget ?? null,
      preferred_location: details.preferredLocation ?? null,
      message: details.message ?? null,
    });

    if (insertError) {
      setStatus("idle");
      setError("We could not save your inquiry. Please send it on WhatsApp or call us directly.");
      setSent(details);
      return;
    }

    setSent(details);
    setStatus("done");
    setForm({ ...empty, propertyType: defaultPropertyType });
  }

  if (status === "done" && sent) {
    return (
      <div className="rounded-2xl border border-brand/20 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl">Thank you, {sent.name}!</h3>
        <p className="mt-2 text-sm text-dark/60">
          Your inquiry has been recorded. Send it straight to our WhatsApp for the fastest response.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappHref(inquiryWhatsappMessage(sent))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Send on WhatsApp
          </a>
          <a
            href={inquiryMailtoHref(sent)}
            className="inline-flex items-center gap-2 rounded-full border border-dark/10 px-6 py-3 text-sm font-medium transition-colors hover:border-brand hover:text-brand"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Send by email
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setSent(null);
          }}
          className="mt-6 text-xs uppercase tracking-widest text-dark/50 underline-offset-4 hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-dark/5 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Full name *
          <input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium">
          Phone number *
          <input
            required
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="10-digit mobile number"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium">
          Email (optional)
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium">
          Property type
          <select value={form.propertyType} onChange={update("propertyType")} className={fieldClass}>
            <option value="">Select a property type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Budget
          <select value={form.budget} onChange={update("budget")} className={fieldClass}>
            <option value="">Select a budget range</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Preferred location
          <input
            value={form.preferredLocation}
            onChange={update("preferredLocation")}
            placeholder="e.g. Kardhani, Vaishali Nagar"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-medium">
        Anything else?
        <textarea
          rows={3}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us what you are looking for"
          className={fieldClass}
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>
      ) : null}

      {error && sent ? (
        <a
          href={whatsappHref(inquiryWhatsappMessage(sent))}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Send this inquiry on WhatsApp instead
        </a>
      ) : null}

      <button
        type="submit"
        disabled={status === "saving"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-dark px-8 py-4 font-medium text-surface transition-all hover:bg-brand disabled:opacity-60 md:w-auto"
      >
        {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
        Send my inquiry
      </button>
      <p className="mt-3 text-xs text-dark/50">
        We reply within business hours, daily 8 am – 8 pm.
      </p>
    </form>
  );
}
