import { useState, type FormEvent } from "react";
import { ContactButtons } from "./ContactButtons.tsx";
import { celebrateMascot, showMascotTip } from "../lib/mascot.ts";

const topics = [
  "General inquiry",
  "Web application",
  "Management system",
  "AI chatbot / agent",
  "Automation",
  "Machine learning / computer vision",
  "Other",
] as const;

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  topic: (typeof topics)[number];
  message: string;
  botField: string;
};

const empty: Fields = {
  name: "",
  email: "",
  company: "",
  phone: "",
  topic: "General inquiry",
  message: "",
  botField: "",
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-ink px-4 py-3 text-base text-fg outline-none transition placeholder:text-muted focus:border-accent";

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!fields.email.trim()) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email.";
  if (!fields.message.trim()) errors.message = "Tell me a little about the project.";
  return errors;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "name" || key === "email" || key === "message") {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(first)?.focus();
      return;
    }
    if (fields.botField) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const body = new URLSearchParams({
      "form-name": "contact",
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.company.trim(),
      phone: fields.phone.trim(),
      topic: fields.topic,
      message: fields.message.trim(),
      "bot-field": "",
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("Form post failed");
      setStatus("sent");
      celebrateMascot();
      showMascotTip("Got it, I'll reply soon!");
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "generate_lead", { form: "contact" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[32px] border border-line bg-surface/90 p-8 shadow-[var(--shadow)] sm:p-10" role="status">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">Sent</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg">Thanks! I&apos;ll get back to you soon.</h2>
        <p className="mt-4 max-w-xl text-muted">Your note is on its way. You can also reach me on WhatsApp or Email.</p>
        <ContactButtons className="mt-8" />
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className="rounded-[32px] border border-line bg-surface/90 p-6 shadow-[var(--shadow)] sm:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out
          <input
            name="bot-field"
            value={fields.botField}
            tabIndex={-1}
            autoComplete="off"
            onChange={(event) => update("botField", event.target.value)}
          />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label data-mascot-tip="Your name, so I know who to reply to." className="block">
          <span className="text-sm font-semibold text-fg">
            Name <span className="text-accent">*</span>
          </span>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={fields.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
            className={fieldClass}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-[#e06a62]" role="alert">
              {errors.name}
            </p>
          ) : null}
        </label>

        <label data-mascot-tip="The address I should write back to." className="block">
          <span className="text-sm font-semibold text-fg">
            Email <span className="text-accent">*</span>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={fields.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-[#e06a62]" role="alert">
              {errors.email}
            </p>
          ) : null}
        </label>

        <label data-mascot-tip="Optional. The company this project is for." className="block">
          <span className="text-sm font-semibold text-fg">Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            value={fields.company}
            onChange={(event) => update("company", event.target.value)}
            className={fieldClass}
          />
        </label>

        <label data-mascot-tip="Optional. A number I can call if you want." className="block">
          <span className="text-sm font-semibold text-fg">Phone</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Optional"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>

      <label data-mascot-tip="What kind of work this is." className="mt-5 block">
        <span className="text-sm font-semibold text-fg">Topic</span>
        <select
          name="topic"
          value={fields.topic}
          onChange={(event) => update("topic", event.target.value as Fields["topic"])}
          className={fieldClass}
        >
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </label>

      <label data-mascot-tip="Tell me what you want built." className="mt-5 block">
        <span className="text-sm font-semibold text-fg">
          Message <span className="text-accent">*</span>
        </span>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me about your project and what you want to build…"
          value={fields.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => update("message", event.target.value)}
          className={`${fieldClass} resize-y`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-[#e06a62]" role="alert">
            {errors.message}
          </p>
        ) : null}
      </label>

      {status === "error" ? (
        <p className="mt-5 text-sm text-[#e06a62]" role="alert">
          The message didn&apos;t send. Use WhatsApp or Email instead.
        </p>
      ) : null}

      <button
        type="submit"
        data-mascot-tip="Sends this note to me."
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-base font-semibold text-accent-ink transition hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
