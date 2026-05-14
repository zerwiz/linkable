"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Clock, MapPin, FileCheck, Users, HardHat, Truck, Wrench,
  ChevronRight, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/routing";
import { useLocale, useTranslations } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
export function HeroSection() {
  const t = useTranslations("Index");

  const recruitingItems = [
    {
      id: "groundworks",
      icon: <HardHat className="h-5 w-5 text-amber-400" />,
      title: t("Hero.recruiting.items.groundworks"),
      loc: t("Hero.recruiting.items.groundworksLoc"),
      urgent: true,
    },
    {
      id: "infrastructure",
      icon: <Truck className="h-5 w-5 text-amber-400" />,
      title: t("Hero.recruiting.items.infrastructure"),
      loc: t("Hero.recruiting.items.infrastructureLoc"),
      urgent: false,
    },
    {
      id: "specialized",
      icon: <Wrench className="h-5 w-5 text-amber-400" />,
      title: t("Hero.recruiting.items.machine"),
      loc: t("Hero.recruiting.items.machineLoc"),
      urgent: true,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Construction site background"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-400"
              >
                {t("Hero.badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              <span className="block">{t("Hero.titlePart1")}</span>
              <span className="block text-amber-400">{t("Hero.titlePart2")}</span>
              <span className="block text-amber-500/90">{t("Hero.titlePart3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-slate-300"
            >
              {t("Hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/projects">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
                >
                  {t("Hero.applyButton")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  className="rounded-full bg-white px-8 text-base font-semibold text-slate-900 shadow-lg hover:bg-slate-100"
                >
                  {t("Hero.viewProjects")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                {t("Hero.trust.secure")}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                {t("Hero.trust.response")}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                {t("Hero.trust.projects")}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Card className="border-0 bg-white/10 p-0 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {t("Hero.recruiting.title")}
                </h3>
                <div className="space-y-4">
                  {recruitingItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/projects`}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {item.title}
                          </span>
                          {item.urgent && (
                            <Badge className="h-5 rounded-full bg-red-500/20 px-2 text-[10px] font-bold text-red-400">
                              {t("Hero.recruiting.urgent")}
                            </Badge>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="h-3 w-3" />
                          {item.loc}
                        </span>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                    </Link>
                  ))}
                </div>
                <div className="mt-4 text-center text-xs text-slate-500">
                  {t("Hero.recruiting.scroll")}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Open Projects                                                      */
/* ------------------------------------------------------------------ */
export function ProjectsSection({ onSelectProject }: { onSelectProject?: (id: string, role?: string) => void }) {
  const t = useTranslations("Index");

  const roleProjects = [
    { id: "groundworks", urgency: "high" },
    { id: "infrastructure", urgency: "medium" },
    { id: "specialized", urgency: "high" },
    { id: "building", urgency: "low" },
  ];

  const worksiteProjects = [
    { id: "umea-centrum", urgency: "high" },
    { id: "lulea-hamn", urgency: "medium" },
    { id: "skelleftea-campus", urgency: "high" },
    { id: "pitea-industri", urgency: "low" },
  ];

  function renderProjectGrid(projects: typeof roleProjects, sectionKey: string) {
    return (
      <>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-xl font-semibold tracking-tight text-foreground"
        >
          {t(`Projects.${sectionKey}`)}
        </motion.h3>
        <div className="mb-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Card className="group h-full border border-border/60 bg-card transition-all hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-500/5">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      {t(`Projects.items.${project.id}.title`)}
                    </h4>
                    <Badge
                      className={`shrink-0 rounded-full text-[10px] font-bold ${
                        project.urgency === "high"
                          ? "bg-red-500/10 text-red-600"
                          : project.urgency === "medium"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-emerald-500/10 text-emerald-600"
                      }`}
                    >
                      {project.urgency === "high"
                        ? t("Projects.urgency.urgent")
                        : project.urgency === "medium"
                          ? t("Projects.urgency.recruiting")
                          : t("Projects.urgency.open")}
                    </Badge>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`Projects.items.${project.id}.description`)}
                  </p>

                  <div className="mt-3 space-y-1">
                    {(t.raw(`Projects.items.${project.id}.roles`) as string[])?.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => {
                          onSelectProject?.(project.id, role);
                          document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        {role}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {(t.raw(`Projects.items.${project.id}.locations`) as string[])?.join("  /  ")}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      {t("Projects.startDate")}: {t(`Projects.items.${project.id}.startDate`)}
                    </span>
                    <span>
                      {t("Projects.applyDeadline")}: {t(`Projects.items.${project.id}.applyDeadline`)}
                    </span>
                    {t.raw(`Projects.items.${project.id}.accommodation`) && (
                      <span className="text-emerald-600">
                        {t("Projects.accommodation")}: {t(`Projects.items.${project.id}.accommodation`)}
                      </span>
                    )}
                    {(() => {
                      const certs = t.raw(`Projects.items.${project.id}.locationCerts`);
                      return Array.isArray(certs) && certs.length > 0 ? (
                        <span className="text-amber-600">
                          {t("Projects.locationCertsTitle")}: {certs.join(", ")}
                        </span>
                      ) : null;
                    })()}
                    <span className="text-blue-600">
                      {t("Projects.id06Note")}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t("Projects.moreInfo")}
                      <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                    </Link>
                    <Button
                      variant="ghost"
                      className="group/btn rounded-full text-sm font-medium text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                      onClick={() => {
                        onSelectProject?.(project.id);
                        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {t("Projects.applyButton")}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </>
    );
  }

  return (
    <section id="projects" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-600"
          >
            {t("Projects.badge")}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("Projects.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("Projects.description")}
          </p>
        </motion.div>

        {renderProjectGrid(roleProjects, "roleSpecific")}
        {renderProjectGrid(worksiteProjects, "worksites")}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */
export function HowItWorksSection() {
  const t = useTranslations("Index");

  const steps = [
    { id: "apply", step: "01", icon: <ArrowRight className="h-6 w-6" /> },
    { id: "step2", step: "02", icon: <FileCheck className="h-6 w-6" /> },
    { id: "step3", step: "03", icon: <CheckCircle2 className="h-6 w-6" /> },
    { id: "step1", step: "04", icon: <Users className="h-6 w-6" /> },
  ];

  return (
    <section className="border-y border-border/40 bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/how-it-works.png"
              alt={t("HowItWorks.title")}
              className="w-full rounded-2xl border border-border/60 shadow-xl"
            />
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-amber-100" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-600"
              >
                {t("HowItWorks.badge")}
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {t("HowItWorks.title")}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t("HowItWorks.description")}
              </p>
            </motion.div>

            <div className="mt-10 space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.15 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="h-full w-px bg-gradient-to-b from-amber-300 to-transparent" />
                    )}
                  </div>
                  <div className="pb-2">
                    <span className="text-xs font-bold tracking-widest text-amber-500">
                      {t("HowItWorks.step")} {step.step}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {t(`HowItWorks.steps.${step.id}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`HowItWorks.steps.${step.id}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why Linkable                                                       */
/* ------------------------------------------------------------------ */
export function WhySection() {
  const t = useTranslations("Index");

  const benefits = [
    { id: "matching", icon: <Clock className="h-6 w-6" /> },
    { id: "location", icon: <MapPin className="h-6 w-6" /> },
    { id: "secure", icon: <Shield className="h-6 w-6" /> },
    { id: "teams", icon: <Users className="h-6 w-6" /> },
    { id: "transparent", icon: <FileCheck className="h-6 w-6" /> },
    { id: "mobile", icon: <HardHat className="h-6 w-6" /> },
  ];

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-600"
          >
            {t("Why.badge")}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("Why.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("Why.description")}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Card className="group h-full border border-border/60 bg-card transition-all hover:border-amber-300/60 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                    {b.icon}
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {t(`Why.benefits.${b.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`Why.benefits.${b.id}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Certifications Banner                                              */
/* ------------------------------------------------------------------ */
export function CertificationsBanner() {
  const t = useTranslations("Index");
  const certItems = t.raw("Certs.items") as Record<string, string>;
  const certs = Object.values(certItems);

  return (
    <section className="bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h3 className="text-sm font-semibold tracking-widest text-amber-400 uppercase">
            {t("Certs.title")}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {t("Certs.description")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {certs.map((cert) => (
              <span
                key={cert}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Section                                                        */
/* ------------------------------------------------------------------ */
export function CTASection() {
  const t = useTranslations("Index");
  return (
    <section className="bg-amber-500 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("CTA.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-100">
            {t("CTA.description")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/projects">
              <Button
                size="lg"
                className="rounded-full bg-white px-8 text-base font-semibold text-amber-600 shadow-lg hover:bg-amber-50"
              >
                {t("CTA.applyButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
              >
                {t("CTA.talkToTeam")}
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Application Form                                                   */
/* ------------------------------------------------------------------ */
export function ApplicationForm({ selectedProjectId, selectedRole }: { selectedProjectId?: string | null; selectedRole?: string | null }) {
  const t = useTranslations("Index");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    roles: [] as string[],
    locations: [] as string[],
    certifications: [] as string[],
    machineLicenses: [] as string[],
    tradeCertificates: [] as string[],
    cv: "",
    message: "",
  });
  const roleOptions = t.raw("Form.roleOptions") as string[];

  useEffect(() => {
    if (selectedRole && roleOptions.includes(selectedRole)) {
      setData((prev) => {
        if (prev.roles.includes(selectedRole)) return prev;
        return { ...prev, roles: [...prev.roles, selectedRole] };
      });
    }
  }, [selectedRole, roleOptions]);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCheckbox = (field: "roles" | "locations" | "certifications" | "machineLicenses" | "tradeCertificates", value: string) => {
    setData((prev) => {
      const arr = prev[field];
      if (arr.includes(value)) return { ...prev, [field]: arr.filter((v) => v !== value) };
      return { ...prev, [field]: [...arr, value] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formPayload = new FormData();
    formPayload.append("form-name", "application");
    formPayload.append("name", data.name);
    formPayload.append("email", data.email);
    formPayload.append("phone", data.phone);
    formPayload.append("company", data.company);
    formPayload.append("type", data.type);
    data.roles.forEach((r) => formPayload.append("roles[]", r));
    data.locations.forEach((l) => formPayload.append("locations[]", l));
    data.certifications.forEach((c) => formPayload.append("certifications[]", c));
    data.machineLicenses.forEach((m) => formPayload.append("machineLicenses[]", m));
    data.tradeCertificates.forEach((t) => formPayload.append("tradeCertificates[]", t));
    formPayload.append("cv", data.cv);
    formPayload.append("message", data.message);
    if (selectedProjectId) {
      formPayload.append("project", selectedProjectId);
      formPayload.append("projectTitle", t(`Projects.items.${selectedProjectId}.title`));
    }

    try {
      const res = await fetch("/", { method: "POST", body: formPayload });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError(t("Form.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-semibold">{t("Form.success")}</h3>
        <p className="mt-2 text-muted-foreground">{t("Form.successDescription")}</p>
      </div>
    );
  }

  const types = t.raw("Form.typeOptions") as string[];
  const locationOptions = t.raw("Form.locationOptions") as string[];
  const certOptions = t.raw("Form.certOptions") as string[];
  const machineOptions = t.raw("Form.machineOptions") as string[];
  const tradeOptions = t.raw("Form.tradeOptions") as string[];

  return (
    <form onSubmit={handleSubmit} data-netlify="true" name="application" className="space-y-6">
      <input type="hidden" name="form-name" value="application" />

      {selectedProjectId && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t("Form.applyingFor")}: <strong>{t(`Projects.items.${selectedProjectId}.title`)}</strong>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("Form.name")} *</Label>
          <Input id="name" required value={data.name} onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="email">{t("Form.email")} *</Label>
          <Input id="email" type="email" required value={data.email} onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="phone">{t("Form.phone")} *</Label>
          <Input id="phone" type="tel" required value={data.phone} onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="company">{t("Form.company")}</Label>
          <Input id="company" value={data.company} onChange={(e) => setData((p) => ({ ...p, company: e.target.value }))} className="mt-1" />
        </div>
      </div>

      <div>
        <Label>{t("Form.type")} *</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {types.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="radio" name="type" value={type} required checked={data.type === type} onChange={(e) => setData((p) => ({ ...p, type: e.target.value }))} className="sr-only" />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>{t("Form.roles")}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {roleOptions.map((role) => (
            <label key={role} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="checkbox" name="roles[]" value={role} checked={data.roles.includes(role)} onChange={() => handleCheckbox("roles", role)} className="sr-only" />
              {role}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>{t("Form.locations")}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {locationOptions.map((loc) => (
            <label key={loc} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="checkbox" name="locations[]" value={loc} checked={data.locations.includes(loc)} onChange={() => handleCheckbox("locations", loc)} className="sr-only" />
              {loc}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>{t("Form.certifications")}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {certOptions.map((cert) => (
            <label key={cert} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="checkbox" name="certifications[]" value={cert} checked={data.certifications.includes(cert)} onChange={() => handleCheckbox("certifications", cert)} className="sr-only" />
              {cert}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>{t("Form.machineLicenses")}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {machineOptions.map((machine) => (
            <label key={machine} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="checkbox" name="machineLicenses[]" value={machine} checked={data.machineLicenses.includes(machine)} onChange={() => handleCheckbox("machineLicenses", machine)} className="sr-only" />
              {machine}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>{t("Form.tradeCertificates")}</Label>
        <div className="mt-2 flex flex-wrap gap-3">
          {tradeOptions.map((trade) => (
            <label key={trade} className="flex cursor-pointer items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm hover:border-amber-300/60 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
              <input type="checkbox" name="tradeCertificates[]" value={trade} checked={data.tradeCertificates.includes(trade)} onChange={() => handleCheckbox("tradeCertificates", trade)} className="sr-only" />
              {trade}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="cv">{t("Form.cv")}</Label>
        <p className="mt-1 text-xs text-muted-foreground">{t("Form.cvHint")}</p>
        <Textarea id="cv" rows={6} value={data.cv} onChange={(e) => setData((p) => ({ ...p, cv: e.target.value }))} className="mt-1" placeholder={t("Form.cvPlaceholder")} />
      </div>

      <div>
        <Label htmlFor="message">{t("Form.message")}</Label>
        <Textarea id="message" rows={4} value={data.message} onChange={(e) => setData((p) => ({ ...p, message: e.target.value }))} className="mt-1" placeholder={t("Form.messagePlaceholder")} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={submitting} size="lg" className="w-full rounded-full bg-amber-500 text-white hover:bg-amber-600">
        {submitting ? t("Form.sending") : t("Form.submit")}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

export function ApplySection({ selectedProjectId, selectedRole }: { selectedProjectId?: string | null; selectedRole?: string | null }) {
  const t = useTranslations("Index");
  return (
    <section id="apply" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Badge variant="secondary" className="mb-4 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-600">
            {t("Form.badge")}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("Form.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("Form.description")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <Card className="border border-border/60 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <ApplicationForm selectedProjectId={selectedProjectId} selectedRole={selectedRole} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
