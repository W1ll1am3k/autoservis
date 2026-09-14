import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Wrench,
  Filter,
  Gauge,
  CircleDot,
  Disc3,
  Wind,
  Phone,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Check,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import shopImg from "@/assets/shop.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Autoservis Vesmír Hradec Králové — servis, diagnostika, pneuservis" },
      {
        name: "description",
        content:
          "Špičková péče o vaše vozidlo za skvělou cenu. Rychlý servis, čištění DPF, geometrie kol, pneuservis a klimatizace v Hradci Králové.",
      },
      { property: "og:title", content: "Autoservis Vesmír — Hradec Králové" },
      {
        property: "og:description",
        content: "Moderní autoservis: diagnostika Bosch a Texa, pneuservis, DPF, klimatizace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return ref;
}

const NAV = [
  { href: "#o-nas", label: "O nás" },
  { href: "#sluzby", label: "Služby" },
  { href: "#tym", label: "Náš tým" },
  { href: "#kontakty", label: "Kontakty" },
];

const PHONE = "+420 774 219 169";

/* ---------- sections ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-white/15 bg-black/35 px-5 py-3 backdrop-blur-xl">
        <a href="#" className="text-lg font-extrabold tracking-tight text-white">
          Vesmír
        </a>
        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className="ml-auto hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex lg:ml-0"
        >
          <Phone className="size-4" />
          {PHONE}
        </a>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto mx-auto mt-2 max-w-6xl animate-fade-in rounded-3xl border border-white/15 bg-black/70 p-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <Phone className="size-4" /> {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function ContactForm({ compact = false }: { compact?: boolean }) {
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setError("Zadejte prosím platné telefonní číslo.");
      return;
    }
    setError(null);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl bg-card p-8 text-center shadow-2xl">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Check className="size-7" />
        </div>
        <h3 className="mt-5 text-xl font-extrabold">Děkujeme za žádost!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Ozveme se vám co nejdříve na uvedené telefonní číslo.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setPhone("");
            setNote("");
            setFile(null);
          }}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Odeslat další žádost
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className={`rounded-3xl bg-card p-6 shadow-2xl sm:p-8 ${compact ? "" : "w-full"}`}
    >
      <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
        Od profesionální péče o váš vůz vás dělí jen pár kliknutí!
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Vyplňte údaje níže a my se vám co nejdříve ozveme.
      </p>

      <label className="mt-6 block text-sm font-medium" htmlFor="tel">
        Telefonní číslo
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-full bg-muted px-4 py-3">
        <span className="text-sm font-semibold text-muted-foreground">+420</span>
        <input
          id="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="000-000-000"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <p className="mt-5 text-sm font-medium">Nahrajte technický průkaz</p>
      <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]">
        {file ? "Změnit soubor" : "Přidat soubor"}
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0]?.name ?? null)}
        />
      </label>
      {file && <p className="mt-2 truncate text-xs text-muted-foreground">{file}</p>}

      <label className="mt-5 block text-sm font-medium" htmlFor="note">
        Popište, co potřebujete
      </label>
      <textarea
        id="note"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="mt-2 w-full resize-none rounded-2xl bg-muted px-4 py-3 text-sm outline-none"
      />

      {error && <p className="mt-3 text-sm font-medium text-primary">{error}</p>}

      <button
        type="submit"
        className="group mt-6 flex w-full items-center justify-between gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Odeslání žádosti o konzultaci
        <span className="grid size-10 place-items-center rounded-full bg-primary-foreground/20 transition-transform group-hover:translate-x-1">
          <ArrowRight className="size-4" />
        </span>
      </button>
    </form>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroImg}
        alt="Mechanik pracující pod zvednutým vozem v autoservisu"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/55 to-black/70" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-32 sm:px-6 lg:grid-cols-[1.1fr_minmax(0,420px)] lg:items-end lg:pt-44">
        <div className="animate-fade-in">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Špičková péče o vaše vozidlo za skvělou cenu, rychle a kvalitně.
          </h1>
          <a
            href="#kontakty"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 py-2 pl-6 pr-2 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Konzultace a kalkulace nákladů
            <span className="grid size-10 place-items-center rounded-full bg-primary transition-transform group-hover:translate-x-1">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>
        <div className="animate-scale-in">
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}

const FACTS = [
  "Jako jediní v ČR využíváme vibrační diagnostiku podvozku, která odhalí i skryté závady. Díky Texa a Bosch přístrojům zajišťujeme rychlé a přesné výsledky.",
  "Za naším servisem stojí zkušený tým odborníků, kteří se neustále vzdělávají a sledují nejnovější trendy v automobilovém průmyslu.",
  "Každý zákazník je pro nás prioritou — nasloucháme, doporučujeme a hledáme nejefektivnější řešení na míru.",
];

function About() {
  return (
    <section id="o-nas" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <p className="eyebrow" data-reveal>
        O nás
      </p>
      <h2
        className="mt-6 max-w-4xl text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
        data-reveal
      >
        <span className="text-primary">Autoservis Vesmír</span> spojuje preciznost, moderní
        technologie a individuální přístup
      </h2>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-3xl" data-reveal>
          <img
            src={shopImg}
            alt="Budova autoservisu Vesmír"
            loading="lazy"
            width={1024}
            height={1280}
            className="h-[420px] w-full object-cover sm:h-[520px]"
          />
          <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-full bg-black/40 px-5 py-3 text-sm text-white backdrop-blur-md">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">Pražská tř. 559/9, 500 04 Hradec Králové 4</span>
          </div>
        </div>

        <ul className="flex flex-col justify-center">
          {FACTS.map((f, i) => (
            <li
              key={i}
              data-reveal
              className="flex gap-6 border-t border-border py-7 first:border-t-0 first:pt-0"
            >
              <span className="shrink-0 font-bold text-primary">0{i + 1}.</span>
              <p className="text-base leading-relaxed text-foreground/85 sm:text-lg">{f}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Wrench,
    title: "Rychlý servis",
    text: "Pravidelná údržba: výměna oleje, diagnostika a rychlé opravy.",
  },
  {
    icon: Filter,
    title: "Čištění DPF",
    text: "Rychlé čištění DPF a katalyzátorů s videopotvrzením.",
  },
  {
    icon: Gauge,
    title: "Geometrie kol",
    text: "Přesné nastavení odklonu pro bezpečnost a dlouhou životnost pneumatik.",
  },
  {
    icon: CircleDot,
    title: "Pneuservis",
    text: "Přezouvání a vyvažování kol s moderní technologií pro bezpečnou jízdu.",
  },
  {
    icon: Disc3,
    title: "Renovace kol",
    text: "Rovnání pokřivených kol na počkání! CNC opravy a profesionální práškové lakování.",
  },
  {
    icon: Wind,
    title: "Servis klimatizace",
    text: "Diagnostika a údržba klimatizace pro maximální výkon a čistý vzduch ve vozidle.",
  },
];

function Services() {
  return (
    <section id="sluzby" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow" data-reveal>
          Služby
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl" data-reveal>
            Naše odbornost,
            <br />
            <span className="text-primary">vaše jistota!</span>
          </h2>
          <a
            href="#kontakty"
            data-reveal
            className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Konzultace a kalkulace nákladů
            <span className="grid size-9 place-items-center rounded-full bg-primary-foreground/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              data-reveal
              className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <s.icon className="size-5 text-primary" />
                <h3 className="text-lg font-bold">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const TEAM = [
  { name: "Dominik Bičiště", role: "Vedoucí autoservisu" },
  { name: "Vladimír Palinkaš", role: "Vedoucí mechanik" },
  { name: "Mikuláš Stepaněnko", role: "Mladší mechanik" },
  { name: "Julie Uchaň", role: "Administrátorka" },
];

function Team() {
  return (
    <section id="tym" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <p className="eyebrow" data-reveal>
        Náš tým
      </p>
      <h2
        className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
        data-reveal
      >
        <span className="text-primary">Profesionálové,</span> kteří se o vaše vozidlo postarají s
        maximální péčí
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m, i) => (
          <article
            key={m.name}
            data-reveal
            className={`rounded-3xl border p-4 transition-transform duration-300 hover:-translate-y-1 ${
              i === 0
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary/40 bg-card"
            }`}
          >
            <div
              className={`grid aspect-[4/3] place-items-center rounded-2xl text-4xl font-extrabold ${
                i === 0 ? "bg-primary-foreground/15" : "bg-secondary text-primary"
              }`}
            >
              {m.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </div>
            <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
            <p
              className={`mt-1 text-sm ${i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}
            >
              {m.role}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const CERTS = [
  {
    title: "Certifikát o odborném školení v oblasti autoklimatizace",
    text: "Tento certifikát potvrzuje absolvování odborného školení v oblasti autoklimatizace a obnovy fluorovaných skleníkových plynů. Mykola Stepanenko se kvalifikoval k provádění činností spojených s těmito technologiemi.",
    meta: "LKQ Academy · 04.03.2025, Praha",
  },
  {
    title: "Certifikát o odborném školení v oblasti autoklimatizace",
    text: "Certifikát vydaný Vitalii Bereshovi potvrzuje absolvování školení zaměřeného na obnovu fluorovaných skleníkových plynů v autoklimatizacích. Nezbytný pro odborníky v této oblasti.",
    meta: "LKQ Academy · 17.04.2024, Praha",
  },
  {
    title: "Osvědčení o diagnostice podvozku",
    text: "Školení zaměřené na vibrační diagnostiku podvozku a práci s měřicími přístroji Texa a Bosch pro přesné odhalení skrytých závad.",
    meta: "Texa Academy · 2024",
  },
];

function Certificates() {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow" data-reveal>
          Certifikáty a diplomy
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <h2 className="text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl" data-reveal>
            Naše odbornost,
            <br />
            <span className="text-primary">vaše jistota!</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground" data-reveal>
            Jsme hrdí na naše certifikáty a diplomy, které potvrzují naši profesionalitu a vysoký
            standard služeb. Neustále se vzděláváme, abychom vám mohli nabídnout ty nejlepší
            technologie a servis.
          </p>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {CERTS.map((c) => (
            <article
              key={c.meta}
              className="min-w-[85%] snap-start rounded-3xl border border-primary/40 bg-card p-7 sm:min-w-[60%] lg:min-w-[48%]"
            >
              <h3 className="text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-primary">
                {c.meta}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            aria-label="Předchozí"
            onClick={() => scroll(-1)}
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Další"
            onClick={() => scroll(1)}
            className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Place() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <p className="eyebrow" data-reveal>
        Naše místo
      </p>
      <h2
        className="mt-6 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
        data-reveal
      >
        <span className="text-primary">Najdete nás</span> na strategickém místě s pohodlným
        parkováním
      </h2>
      <div className="mt-12 overflow-hidden rounded-3xl border border-border" data-reveal>
        <iframe
          title="Mapa — Autoservis Vesmír"
          src="https://www.google.com/maps?q=Pra%C5%BEsk%C3%A1%20t%C5%99%C3%ADda%20559%2F9%2C%20500%2004%20Hradec%20Kr%C3%A1lov%C3%A9&output=embed"
          loading="lazy"
          className="h-[380px] w-full sm:h-[460px]"
        />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="kontakty" className="bg-secondary/60 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow" data-reveal>
            Kontakty
          </p>
          <h2
            className="mt-6 text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl"
            data-reveal
          >
            Domluvte si termín <span className="text-primary">ještě dnes</span>
          </h2>

          <ul className="mt-10 space-y-5">
            {[
              { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
              { icon: Phone, label: "+420 721 477 459", href: "tel:+420721477459" },
              { icon: Mail, label: "info@autoservisvesmir.cz", href: "mailto:info@autoservisvesmir.cz" },
              { icon: MapPin, label: "Pražská tř. 559/9, 500 04 Hradec Králové 4" },
              { icon: Clock, label: "Po – Pá: 8:00 – 16:00" },
            ].map((c) => (
              <li key={c.label} className="flex items-center gap-4" data-reveal>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <c.icon className="size-5" />
                </span>
                {c.href ? (
                  <a href={c.href} className="font-semibold hover:text-primary">
                    {c.label}
                  </a>
                ) : (
                  <span className="font-semibold">{c.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <span className="text-base font-extrabold text-foreground">Vesmír</span>
        <span>© {new Date().getFullYear()} Autoservis Vesmír s.r.o. — Hradec Králové</span>
      </div>
    </footer>
  );
}

function Index() {
  const ref = useReveal();
  return (
    <div ref={ref} className="bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Certificates />
        <Place />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
