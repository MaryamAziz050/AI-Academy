import { useState } from "react";
import type { FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Check,
  Clock3,
  GitBranch,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  UsersRound,
  Video,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";

const CONTACT_EMAIL = "hello@mariumai.com";
const CONTACT_WHATSAPP = "+92 323 2273307";
const WHATSAPP_LINK = "https://wa.me/923232273307";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marium AI Academy" },
      {
        name: "description",
        content: "Learn n8n automation in 2 months through live, one-on-one online classes for girls. Beginner-friendly, project-based and certificate included.",
      },
      { property: "og:title", content: "n8n Automation Course for Girls | Marium AI Academy" },
      { property: "og:description", content: "A live, one-on-one n8n course for girls with practical workflows, real integrations and certification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const curriculum = [
  {
    phase: "01",
    label: "Start",
    title: "n8n Foundations",
    icon: GitBranch,
    detail: "Understand the editor, nodes, workflows, credentials, triggers and how data moves between each step.",
  },
  {
    phase: "02",
    label: "Control",
    title: "Data & Logic",
    icon: Workflow,
    detail: "Work with expressions, JSON, IF and Switch nodes, loops, filters, merges and reliable error handling.",
  },
  {
    phase: "03",
    label: "Connect",
    title: "APIs & Webhooks",
    icon: Webhook,
    detail: "Use webhooks and HTTP requests to connect apps, authenticate APIs and send structured data between systems.",
  },
  {
    phase: "04",
    label: "Build",
    title: "AI Workflows",
    icon: Sparkles,
    detail: "Create practical AI automations with prompts, structured outputs, API models and agent-style workflow patterns.",
  },
  {
    phase: "05",
    label: "Launch",
    title: "Real Integrations",
    icon: Zap,
    detail: "Build end-to-end projects with Google Sheets, Gmail, Calendar, WhatsApp APIs, CRMs and external services.",
  },
];

const inputClass =
  "w-full rounded-md border border-footer-border bg-industrial/70 px-4 py-3.5 text-sm text-industrial-foreground outline-none transition-colors placeholder:text-industrial-muted focus:border-primary";

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Marium AI Academy home">
      <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
        <Workflow className="size-4" strokeWidth={2.4} />
      </span>
      <span className="font-heading text-base font-bold text-inherit">
        Marium <span className="text-primary">AI</span> Academy
      </span>
    </a>
  );
}

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("Complete beginner");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const nextErrors: { name?: string; email?: string; phone?: string } = {};
  if (name.trim().length < 2) nextErrors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = "Please enter a valid email address.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(phone.trim())) nextErrors.phone = "Please enter a valid WhatsApp number.";
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length > 0) return;

  const formData = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    level,
    message: message.trim(),
  };

  const text = [
    "Marium AI Academy",
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `WhatsApp: ${formData.phone}`,
    `Experience level: ${formData.level}`,
    formData.message ? `Questions: ${formData.message}` : null,
  ].filter(Boolean).join("\n");

  // Open WhatsApp FIRST — right inside the click event, so popup blocker allows it
  window.open(`https://wa.me/923232273307?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  setSent(true);

  // Send to Google Sheet AFTER — don't block/await, runs in background
  fetch(import.meta.env["VITE_SHEET_WEBHOOK_URL"], {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(formData),
  }).catch((err) => console.error("Sheet submission failed:", err));
}

  return (
    <form onSubmit={handleSubmit} noValidate className="relative z-10" aria-label="n8n course registration form">
      {sent && (
        <p className="mb-5 flex items-start gap-3 rounded-md border border-primary bg-primary/10 px-4 py-3 text-xs leading-5 text-industrial-foreground">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          WhatsApp opened with your details. Press send and we’ll confirm your seat.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-medium text-industrial-muted">
          Full name
          <input className={inputClass} value={name} maxLength={100} placeholder="Your name" onChange={(e) => setName(e.target.value)} />
          {errors["name"] && <span className="text-destructive">{errors["name"]}</span>}
        </label>
        <label className="grid gap-2 text-xs font-medium text-industrial-muted">
          Email
          <input className={inputClass} type="email" value={email} maxLength={255} placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
          {errors["email"] && <span className="text-destructive">{errors["email"]}</span>}
        </label>
        <label className="grid gap-2 text-xs font-medium text-industrial-muted">
          WhatsApp number
          <input className={inputClass} type="tel" value={phone} maxLength={17} placeholder="+92 3XX XXXXXXX" onChange={(e) => setPhone(e.target.value)} />
          {errors["phone"] && <span className="text-destructive">{errors["phone"]}</span>}
        </label>
        <label className="grid gap-2 text-xs font-medium text-industrial-muted">
          Experience level
          <select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)}>
            <option>Complete beginner</option>
            <option>Some computer experience</option>
            <option>Some automation experience</option>
          </select>
        </label>
        <label className="grid gap-2 text-xs font-medium text-industrial-muted sm:col-span-2">
          Questions <span className="font-normal">(optional)</span>
          <textarea className={`${inputClass} min-h-20 resize-none`} value={message} maxLength={500} placeholder="Anything you’d like to ask?" onChange={(e) => setMessage(e.target.value)} />
        </label>
      </div>
      <button type="submit" className="cta-primary mt-5 w-full rounded-md">
        Complete registration <Send className="size-4" />
      </button>
    </form>
  );
}

function WorkflowVisual() {
  return (
    <div className="workflow-canvas" aria-label="A sample n8n automation workflow">
      <svg className="absolute inset-0 size-full" viewBox="0 0 560 420" fill="none" aria-hidden="true">
        <path d="M104 94 C185 94 176 202 256 202" className="flow-path" />
        <path d="M304 202 C385 202 374 104 458 104" className="flow-path" />
        <path d="M304 202 C385 202 374 314 458 314" className="flow-path" />
      </svg>
      <div className="flow-node left-[3%] top-[12%]">
        <Webhook className="size-5 text-primary" /><span><b>Webhook</b><small>New request</small></span>
      </div>
      <div className="flow-node left-[38%] top-[42%] border-primary/60">
        <Sparkles className="size-5 text-primary" /><span><b>AI Agent</b><small>Process data</small></span>
      </div>
      <div className="flow-node right-[0%] top-[14%]">
        <Mail className="size-5 text-primary" /><span><b>Gmail</b><small>Send reply</small></span>
      </div>
      <div className="flow-node bottom-[8%] right-[0%]">
        <Check className="size-5 text-primary" /><span><b>Sheets</b><small>Save result</small></span>
      </div>
      <span className="absolute bottom-3 left-4 font-heading text-[5rem] font-bold leading-none text-primary/10">n8n</span>
    </div>
  );
}

function Index() {
  return (
    <main id="top" className="overflow-hidden bg-background">
      <section className="editorial-hero relative min-h-[94vh] bg-industrial px-5 pb-16 pt-5 text-industrial-foreground sm:px-8 lg:px-12">
        <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between rounded-full border border-footer-border bg-industrial/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Brand />
          <nav className="hidden items-center gap-7 text-xs text-industrial-muted md:flex" aria-label="Main navigation">
            <a className="hover:text-primary" href="#curriculum">Curriculum</a>
            <a className="hover:text-primary" href="#format">Class format</a>
            <a className="hover:text-primary" href="#certificate">Certificate</a>
          </nav>
          <a className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:-translate-y-0.5" href="#reserve">
            Reserve seat
          </a>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(94vh-88px)] max-w-7xl items-center gap-10 py-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-2 text-[0.68rem] font-medium uppercase text-primary">
              <span className="status-dot" /> 2-month live n8n course · girls only
            </p>
            <h1 className="mt-7 max-w-4xl font-heading text-5xl font-bold leading-[0.94] sm:text-7xl lg:text-[5.7rem]">
              Master the logic of <span className="text-primary">n8n automation.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-industrial-muted sm:text-lg">
              Build real workflows, connect everyday apps and create AI-powered systems through live, one-on-one online classes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#reserve" className="cta-primary rounded-md">Reserve your seat <ArrowRight className="size-4" /></a>
              <a href="#curriculum" className="inline-flex items-center gap-2 text-sm text-industrial-muted hover:text-primary">See curriculum <ArrowDown className="size-4" /></a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-industrial-muted">
              {["Beginner-friendly", "Live 1-on-1", "Certificate included"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check className="size-4 text-primary" />{item}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <WorkflowVisual />
          </div>
        </div>
      </section>

      <section id="curriculum" className="bg-cool px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow-dark">The n8n learning path</p>
              <h2 className="section-title mt-5">From your first node to a complete automation.</h2>
            </div>
            <p className="max-w-xl justify-self-end leading-8 text-muted-foreground">
              Each stage builds on the last, so you understand not only how to use n8n, but how to design workflows that solve real problems.
            </p>
          </div>

          <div className="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-5">
            {curriculum.map(({ phase, label, title, icon: Icon, detail }) => (
              <article key={phase} className="group min-h-80 bg-background p-6 transition-colors hover:bg-primary">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-primary group-hover:text-primary-foreground">{phase} / {label}</span>
                  <Icon className="size-5 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="mt-20 font-heading text-2xl font-semibold group-hover:text-primary-foreground">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground group-hover:text-primary-foreground/80">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="format" className="bg-teal px-5 py-20 text-teal-foreground sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
          <div>
            <p className="eyebrow-light">A focused way to learn</p>
            <h2 className="section-title mt-5 text-teal-foreground">Personal teaching. Practical building.</h2>
            <p className="mt-6 max-w-xl leading-8 text-teal-muted">Every session is live and one-on-one. Ask questions as you build, revisit difficult concepts and progress at a pace that works for you.</p>
            <a href="#reserve" className="cta-primary mt-9 rounded-md">Join the course <ArrowRight className="size-4" /></a>
          </div>
          <div className="grid gap-px border border-footer-border bg-footer-border sm:grid-cols-2">
            {[
              { icon: UsersRound, label: "Girls only", sub: "A focused learning space" },
              { icon: Video, label: "Live 1-on-1", sub: "Direct support in every class" },
              { icon: Clock3, label: "2 months", sub: "A clear, structured pathway" },
              { icon: Award, label: "Certified", sub: "Proof of completion" },
            ].map(({ icon: Icon, label, sub }) => (
              <article key={label} className="min-h-44 bg-teal p-6">
                <Icon className="size-6 text-primary" />
                <h3 className="mt-10 font-heading text-xl font-semibold">{label}</h3>
                <p className="mt-2 text-sm text-teal-muted">{sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certificate" className="bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
          <div>
            <p className="eyebrow-dark">Certificate of completion</p>
            <h2 className="section-title mt-5">Finish with proof of what you can build.</h2>
            <p className="mt-6 max-w-2xl leading-8 text-muted-foreground">Complete your n8n learning path and final workflow projects to earn a Marium AI Academy certificate.</p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm">
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" />Practical projects</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-primary" />Portfolio-ready outcomes</span>
            </div>
          </div>
          <div className="certificate-panel">
            <Award className="size-16 text-primary" strokeWidth={1.2} />
            <p className="mt-8 text-xs uppercase text-muted-foreground">Marium AI Academy</p>
            <p className="mt-2 font-heading text-3xl font-bold">n8n Automation</p>
            <p className="mt-2 text-sm text-muted-foreground">Certificate of Completion</p>
          </div>
        </div>
      </section>

      <section id="reserve" className="editorial-hero bg-industrial px-5 py-20 text-industrial-foreground sm:px-8 lg:px-12 lg:py-28">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          <div>
            <p className="eyebrow-light">Enrollment open</p>
            <h2 className="mt-5 font-heading text-4xl font-bold leading-tight sm:text-5xl">Secure your one-on-one n8n seat.</h2>
            <p className="mt-5 leading-8 text-industrial-muted">Complete the form and WhatsApp will open with your details ready to send.</p>
            <div className="mt-9 space-y-4 text-sm">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-industrial-muted hover:text-primary"><MessageCircle className="size-5 text-primary" />{CONTACT_WHATSAPP}</a>
              <a href={`mailto:${CONTACT_EMAIL}?subject=n8n%20Course%20Registration`} className="flex items-center gap-3 text-industrial-muted hover:text-primary"><Mail className="size-5 text-primary" />{CONTACT_EMAIL}</a>
            </div>
          </div>
          <div className="relative rounded-lg border border-footer-border bg-industrial/80 p-6 shadow-editorial backdrop-blur-xl sm:p-9">
            <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-[0.68rem] font-medium uppercase text-primary-foreground">Limited seats</span>
            <h3 className="font-heading text-2xl font-semibold">Register for the n8n course</h3>
            <p className="mb-7 mt-2 text-sm text-industrial-muted">No prior automation experience is required.</p>
            <RegistrationForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-footer-border bg-industrial px-5 py-9 text-industrial-foreground sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <Brand />
          <div className="flex flex-wrap gap-6 text-xs text-industrial-muted">
            <a href="#curriculum" className="hover:text-primary">Curriculum</a>
            <a href="#format" className="hover:text-primary">Class format</a>
            <a href="#reserve" className="hover:text-primary">Register</a>
          </div>
          <p className="text-xs text-industrial-muted">© 2026 Marium AI Academy</p>
        </div>
      </footer>
    </main>
  );
}