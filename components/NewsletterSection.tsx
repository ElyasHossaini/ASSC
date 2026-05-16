"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MailOpen,
  Phone,
  Send,
  User,
  AlertTriangle,
} from "lucide-react";
import { SITE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

// Configure in .env.local — see NEWSLETTER_SETUP.md for instructions.
// Example: NEXT_PUBLIC_NEWSLETTER_ENDPOINT="https://script.google.com/macros/s/AKfy.../exec"
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): string | null {
  if (form.firstName.trim().length < 1) return "Please enter your first name.";
  if (form.lastName.trim().length < 1) return "Please enter your last name.";
  if (!EMAIL_RE.test(form.email.trim()))
    return "Please enter a valid email address.";
  const digits = form.phone.replace(/\D/g, "");
  if (digits.length < 10)
    return "Please enter a valid phone number (at least 10 digits).";
  return null;
}

function buildMailtoFallback(form: FormState): string {
  const subject = encodeURIComponent("New ASSC Newsletter Signup");
  const body = encodeURIComponent(
    [
      "New member signup from the ASSC website:",
      "",
      `First name: ${form.firstName.trim()}`,
      `Last name:  ${form.lastName.trim()}`,
      `Email:      ${form.email.trim()}`,
      `Phone:      ${form.phone.trim()}`,
      "",
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n")
  );
  return `${SITE.emailHref}?subject=${subject}&body=${body}`;
}

export default function NewsletterSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const update = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    if (err) {
      setStatus("error");
      setMessage(err);
      return;
    }

    setStatus("submitting");
    setMessage(null);

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      submittedAt: new Date().toISOString(),
      source: "website",
    };

    // If a Google Apps Script endpoint is configured, POST to it.
    // Otherwise fall back to opening the user's mail client.
    if (ENDPOINT) {
      try {
        const body = new URLSearchParams();
        Object.entries(payload).forEach(([k, v]) => body.append(k, String(v)));

        // `no-cors` ensures the request is delivered to Google Apps Script
        // even when CORS headers are missing on the redirect chain.
        // We can't read the response in this mode; we treat a non-thrown
        // fetch as a successful append.
        await fetch(ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          body,
        });

        setStatus("success");
        setMessage(
          "You're on the list! We'll be in touch with community updates and event invitations."
        );
        setForm(EMPTY);
      } catch {
        setStatus("error");
        setMessage(
          "We couldn't submit your information. Please try again or email us directly."
        );
      }
    } else {
      // Mailto fallback — opens the user's email app pre-filled.
      window.location.href = buildMailtoFallback(form);
      setStatus("success");
      setMessage(
        "Thanks! Your email app should open with a pre-filled message — just hit send to complete your signup."
      );
      setForm(EMPTY);
    }
  };

  const reset = () => {
    setStatus("idle");
    setMessage(null);
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-gradient-to-br from-emeraldDark-900 via-emeraldDark-800 to-emeraldDark-950 py-20 text-white sm:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-islamic-pattern-gold opacity-[0.12]"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emeraldDark-400/10 blur-3xl"
      />

      <div className="container-wide relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300 ring-1 ring-white/20">
            <MailOpen className="h-3.5 w-3.5" aria-hidden />
            Stay Connected
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Join our <span className="text-gold-400">community list</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-emeraldDark-100 sm:text-lg">
            Be the first to hear about upcoming events, prayer times, programs,
            and community announcements from the Afghanistan Shia Society of
            Calgary.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl bg-white p-6 text-emeraldDark-900 shadow-elegant ring-1 ring-white/10 sm:p-10">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emeraldDark-500 to-emeraldDark-700 text-white shadow-glow">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-emeraldDark-900">
                Thank you!
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
                {message}
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-6 text-sm font-semibold text-emeraldDark-800 underline-offset-4 hover:text-gold-600 hover:underline"
              >
                Sign up another person
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="nl-first"
                  label="First Name"
                  icon={<User className="h-4 w-4" />}
                  value={form.firstName}
                  onChange={update("firstName")}
                  autoComplete="given-name"
                  placeholder="Ali"
                  required
                />
                <Field
                  id="nl-last"
                  label="Last Name"
                  icon={<User className="h-4 w-4" />}
                  value={form.lastName}
                  onChange={update("lastName")}
                  autoComplete="family-name"
                  placeholder="Ahmadi"
                  required
                />
              </div>
              <Field
                id="nl-email"
                type="email"
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                value={form.email}
                onChange={update("email")}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
              <Field
                id="nl-phone"
                type="tel"
                label="Phone Number"
                icon={<Phone className="h-4 w-4" />}
                value={form.phone}
                onChange={update("phone")}
                autoComplete="tel"
                placeholder="403-555-0123"
                required
              />

              {status === "error" && message && (
                <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full disabled:cursor-wait disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Subscribe
                  </>
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-gray-500">
                We respect your privacy. Your information is only used to send
                community updates from ASSC and is never shared.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
};

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-emeraldDark-900"
      >
        {label}
        {required && <span className="ml-0.5 text-gold-600">*</span>}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-emeraldDark-900/10 bg-white px-10 py-2.5 text-sm text-emeraldDark-900 placeholder:text-gray-400 transition focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
        />
      </div>
    </div>
  );
}
