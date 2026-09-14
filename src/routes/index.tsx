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

import heroImg from "@/assets/workshop-hero.jpg";
import shopImg from "@/assets/workshop-exterior.jpg";
import teamServiceImg from "@/assets/team-service.jpg";
import teamCareImg from "@/assets/team-care.jpg";
import teamDiagnosticsImg from "@/assets/team-diagnostics.jpg";
import teamChassisImg from "@/assets/team-chassis.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vektor Auto Hradec Králové — kompletní autoservis" },
      {
        name: "description",
        content:
          "Spolehlivý servis vozů v Hradci Králové. Diagnostika, pravidelná údržba, pneuservis, geometrie i klimatizace na jednom místě.",
      },
      { property: "og:title", content: "Vektor Auto — autoservis Hradec Králové" },
      {
        property: "og:description",
        content: "Poctivý autoservis s moderním vybavením a srozumitelným přístupem.",
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

const PHONE = "+420 777 000 111";

/* ---------- sections ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-white/15 bg-black/35 px-5 py-3 backdrop-blur-xl">
        <a href="#" className="text-lg font-extrabold tracking-tight text-white">
          VEKTOR AUTO
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
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Mechanik pracující pod zvednutým vozem v autoservisu"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-32 text-center sm:px-6">
        <div className="mx-auto max-w-4xl animate-fade-in">
          <p className="mb-5 text-sm font-bold uppercase text-white/75">Autoservis v Hradci Králové</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
            Váš vůz. Naše odpovědnost.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Servisujeme osobní i užitkové vozy pečlivě, transparentně a bez zbytečného čekání.
          </p>
          <a
            href="#kontakty"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Objednat termín servisu
            <span className="grid size-10 place-items-center rounded-full bg-primary-foreground/20 transition-transform group-hover:translate-x-1">
              <ArrowRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const FACTS = [
  "Moderní diagnostika nám pomáhá rychle odhalit příčinu závady a navrhnout opravu, která dává smysl.",
  "Pracujeme podle ověřených postupů a před každým zásahem vám srozumitelně vysvětlíme rozsah i cenu.",
  "Ke každému vozu přistupujeme individuálně. Doporučíme jen práci, kterou váš automobil skutečně potřebuje.",
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
        <span className="text-primary">Vektor Auto</span> znamená jistotu na každém kilometru
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
             <span className="truncate">Brněnská 700/25, Hradec Králové</span>
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
    text: "Olej, filtry, brzdy a běžné opravy vyřešíme rychle a pečlivě.",
  },
  {
    icon: Filter,
    title: "Čištění DPF",
    text: "Obnovíme správnou funkci filtru a prověříme celý výfukový systém.",
  },
  {
    icon: Gauge,
    title: "Geometrie kol",
    text: "Přesné nastavení náprav pro klidné řízení a rovnoměrné opotřebení pneu.",
  },
  {
    icon: CircleDot,
    title: "Pneuservis",
    text: "Kompletní přezutí, vyvážení i kontrola stavu pneumatik.",
  },
  {
    icon: Disc3,
    title: "Renovace kol",
    text: "Oprava poškozených disků, rovnání a profesionální povrchová úprava.",
  },
  {
    icon: Wind,
    title: "Servis klimatizace",
    text: "Kontrola těsnosti, doplnění chladiva a dezinfekce celého systému.",
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
            Kompletní péče,
            <br />
            <span className="text-primary">jeden spolehlivý servis</span>
          </h2>
          <a
            href="#kontakty"
            data-reveal
            className="group inline-flex items-center gap-3 rounded-full bg-primary py-2 pl-6 pr-2 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Nezávazně se objednat
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
  { title: "Servisní technik", text: "Pravidelná údržba a mechanické opravy", image: teamServiceImg },
  { title: "Péče o zákazníky", text: "Objednávky, kalkulace a předání vozu", image: teamCareImg },
  { title: "Diagnostický specialista", text: "Elektronika a přesná diagnostika závad", image: teamDiagnosticsImg },
  { title: "Specialista podvozku", text: "Pneumatiky, geometrie a zavěšení kol", image: teamChassisImg },
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
        <span className="text-primary">Specialisté,</span> na které se můžete spolehnout
      </h2>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((m) => (
          <article
            key={m.title}
            data-reveal
            className="overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <img src={m.image} alt={m.title} loading="lazy" width={912} height={1104} className="aspect-[4/5] w-full object-cover" />
            <div className="p-5">
              <h3 className="text-lg font-bold">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </div>
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
            Odbornost potvrzená,
            <br />
            <span className="text-primary">praxí i vzděláním</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground" data-reveal>
            Pravidelně se školíme v diagnostice, klimatizacích i opravách moderních vozů. Nové
            znalosti přenášíme přímo do každodenní práce.
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
        <span className="text-primary">Přijeďte pohodlně</span> a vůz nechte v dobrých rukou
      </h2>
      <div className="mt-12 overflow-hidden rounded-3xl border border-border" data-reveal>
        <iframe
          title="Mapa — Autoservis Vesmír"
          src="https://www.google.com/maps?q=Brn%C4%9Bnsk%C3%A1%20700%2F25%2C%20Hradec%20Kr%C3%A1lov%C3%A9&output=embed"
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
            Domluvte si návštěvu <span className="text-primary">bez čekání</span>
          </h2>

          <ul className="mt-10 space-y-5">
            {[
              { icon: Phone, label: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}` },
              { icon: Mail, label: "servis@vektorauto.cz", href: "mailto:servis@vektorauto.cz" },
              { icon: MapPin, label: "Brněnská 700/25, Hradec Králové" },
              { icon: Clock, label: "Pondělí–pátek: 8:00–17:00" },
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
        <span className="text-base font-extrabold text-foreground">VEKTOR AUTO</span>
        <span>© {new Date().getFullYear()} Vektor Auto — Hradec Králové</span>
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
