"use client";

import { motion } from "framer-motion";
import { HardHat, ArrowRight, Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/routing";
import { useLocale, useTranslations } from "next-intl";

function Navbar() {
  const t = useTranslations("Index");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const extraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (extraRef.current && !extraRef.current.contains(e.target as Node)) {
        setExtraOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const extraLinks = [
    { label: t("Navbar.projects"), href: "/projects" as const },
    { label: t("Navbar.howItWorks"), href: "/how-it-works" as const },
    { label: t("Navbar.requestWorkers"), href: "/request-workers" as const },
    { label: t("Navbar.requestJob"), href: "/request-job" as const },
    { label: t("Navbar.whyLinkable"), href: "/why-linkable" as const },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "sv" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
            <HardHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            LinkableWork
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/projects"
            className={`relative text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/projects")
                ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-amber-500"
                : "text-muted-foreground"
            }`}
          >
            {t("Navbar.anlaggningProjects")}
          </Link>
          <Link
            href="/projects#apply"
            className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("Navbar.applyAnlaggning")}
          </Link>

          <div ref={extraRef} className="relative">
            <button
              type="button"
              onClick={() => setExtraOpen(!extraOpen)}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground ${
                extraOpen ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t("Navbar.extra")}
              <ChevronDown className={`h-4 w-4 transition-transform ${extraOpen ? "rotate-180" : ""}`} />
            </button>
            {extraOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-border/60 bg-background p-2 shadow-xl">
                {extraLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setExtraOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted ${
                      isActive(l.href) ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`relative text-sm font-medium transition-colors hover:text-foreground ${
              isActive("/contact")
                ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-amber-500"
                : "text-muted-foreground"
            }`}
          >
            {t("Navbar.contact")}
          </Link>

          <button
            type="button"
            onClick={toggleLocale}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title={locale === "en" ? "Byt till svenska" : "Switch to English"}
          >
            {locale === "en" ? "SV" : "EN"}
          </button>
        </nav>

        <div className="hidden md:block">
          <Link href="/projects#apply">
            <Button size="sm" className="rounded-full bg-amber-500 px-5 font-semibold text-white hover:bg-amber-600">
              {t("Navbar.applyNow")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-xs font-bold text-muted-foreground"
          >
            {locale === "en" ? "SV" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("Navbar.toggleMenu")}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border/40 bg-background md:hidden"
        >
          <div className="flex flex-col gap-4 px-4 py-6">
            <div className="pb-2">
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  isActive("/projects") ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                <HardHat className="h-4 w-4 text-amber-500" />
                {t("Navbar.anlaggningProjects")}
              </Link>
              <Link
                href="/projects#apply"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <ArrowRight className="h-4 w-4 text-amber-500" />
                {t("Navbar.applyAnlaggning")}
              </Link>
            </div>

            <div className="border-t border-border/40 pt-4">
              <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                {t("Navbar.extra")}
              </p>
              {extraLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                    isActive(l.href) ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground ${
                  isActive("/contact") ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {t("Navbar.contact")}
              </Link>
            </div>

            <Link href="/projects#apply" onClick={() => setMobileOpen(false)}>
              <Button className="w-full rounded-full bg-amber-500 font-semibold text-white hover:bg-amber-600">
                {t("Navbar.applyNow")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function Footer() {
  const t = useTranslations("Index");
  return (
    <footer id="contact" className="border-t border-border/40 bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
                <HardHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                LinkableWork
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t("Footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("Footer.portal.title")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/projects" className="transition-colors hover:text-foreground">
                  {t("Footer.portal.projects")}
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition-colors hover:text-foreground">
                  {t("Footer.portal.howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-foreground">
                  {t("Footer.portal.contact")}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="transition-colors hover:text-foreground">
                  {t("Footer.portal.applyNow")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("Footer.certs.title")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>{t("Certs.items.id06")}</li>
              <li>{t("Certs.items.safe")}</li>
              <li>{t("Certs.items.apv1")}</li>
              <li>{t("Certs.items.machine")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("Footer.contact.title")}</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2 font-medium text-foreground">
                <Link href="/contact" className="hover:text-amber-600 transition-colors">
                  {t("Footer.contact.thomas")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${t("Footer.contact.thomasEmail")}`} className="transition-colors hover:text-foreground">
                  {t("Footer.contact.thomasEmail")}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${t("Footer.contact.thomasPhone").replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                  {t("Footer.contact.thomasPhone")}
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1 font-medium text-foreground">
                <Link href="/contact" className="hover:text-amber-600 transition-colors">
                  {t("Footer.contact.christer")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${t("Footer.contact.christerEmail")}`} className="transition-colors hover:text-foreground">
                  {t("Footer.contact.christerEmail")}
                </a>
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${t("Footer.contact.christerPhone").replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                  {t("Footer.contact.christerPhone")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LinkableWork. {t("Footer.rights")}
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("Footer.privacy")}
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("Footer.terms")}
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              {t("Footer.cookie")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
