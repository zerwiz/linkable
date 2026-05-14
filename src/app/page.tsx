"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Clock,
  MapPin,
  FileCheck,
  Users,
  HardHat,
  Truck,
  Wrench,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Projects", href: "#projects" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Linkable", href: "#why" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
            <HardHat className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Linkable
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button size="sm" className="rounded-full bg-amber-500 px-5 font-semibold text-white hover:bg-amber-600">
            Apply Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-border/40 bg-background md:hidden"
        >
          <div className="flex flex-col gap-4 px-4 py-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button className="w-full rounded-full bg-amber-500 font-semibold text-white hover:bg-amber-600">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Background image overlay */}
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
          {/* Left content */}
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
                Now recruiting for Summer &amp; Autumn 2026
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your skills.{" "}
              <span className="text-amber-400">Our projects.</span>
              <br />
              Built together.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-slate-300"
            >
              Linkable connects skilled subcontractors, machine operators, and work
              teams with construction projects across Sweden. Register once, get
              matched instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="rounded-full bg-amber-500 px-8 text-base font-semibold text-white shadow-lg shadow-amber-500/25 hover:bg-amber-600"
              >
                Apply as Partner
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-500 px-8 text-base text-white hover:bg-white/10"
              >
                View Open Projects
              </Button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-400"
            >
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                Secure document uploads
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                Response within 24 h
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400" />
                Projects across Sweden
              </span>
            </motion.div>
          </div>

          {/* Right - Quick stats card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <Card className="border-0 bg-white/10 p-0 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Currently Recruiting
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: <HardHat className="h-5 w-5 text-amber-400" />,
                      title: "Groundworks & Excavation",
                      loc: "Lulea, Skelleftea, Umea",
                      urgent: true,
                    },
                    {
                      icon: <Truck className="h-5 w-5 text-amber-400" />,
                      title: "Infrastructure & Road Works",
                      loc: "Stockholm, Goteborg",
                      urgent: false,
                    },
                    {
                      icon: <Wrench className="h-5 w-5 text-amber-400" />,
                      title: "Machine Operators (APV Licensed)",
                      loc: "Multiple Locations",
                      urgent: true,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
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
                              URGENT
                            </Badge>
                          )}
                        </div>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <MapPin className="h-3 w-3" />
                          {item.loc}
                        </span>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-xs text-slate-500">
                  Scroll down to see all open positions
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
const openProjects = [
  {
    category: "Groundworks",
    roles: ["Anlaggare", "Maskinforare", "Arbetslag"],
    locations: ["Lulea", "Skelleftea", "Umea"],
    urgency: "high",
    description:
      "Foundation work, excavation, and site preparation for new residential and commercial developments across Norrbotten and Vasterbotten. Immediate starts available for crews with valid ID06 and APV certification.",
  },
  {
    category: "Infrastructure",
    roles: ["Maskinforare", "Arbetslag"],
    locations: ["Stockholm", "Goteborg"],
    urgency: "medium",
    description:
      "Road construction, utilities installation, and civil infrastructure projects in Sweden's two largest metropolitan areas. Looking for experienced teams with safe construction training and machine operator licenses.",
  },
  {
    category: "Specialized Machine Work",
    roles: ["Maskinforare"],
    locations: ["Multiple Locations"],
    urgency: "high",
    description:
      "Skilled machine operators needed for grading, paving, and heavy earthmoving operations. Valid Maskinforarbevis and Arbete pa vag (APV) certification required. Competitive hourly rates.",
  },
  {
    category: "Building & Construction",
    roles: ["Anlaggare", "Arbetslag"],
    locations: ["Umea", "Stockholm"],
    urgency: "low",
    description:
      "General construction crews needed for residential building projects from foundation to finishing. F-tax status required for individual applicants. Teams of 3-8 preferred.",
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
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
            Open Projects
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Find the right project for your skills
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We are actively recruiting across Sweden for groundworks,
            infrastructure, and specialized construction roles. Browse current
            openings and apply in minutes.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {openProjects.map((project, i) => (
            <motion.div
              key={project.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <Card className="group h-full border border-border/60 bg-card transition-all hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-500/5">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.category}
                    </h3>
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
                        ? "URGENT"
                        : project.urgency === "medium"
                          ? "RECRUITING"
                          : "OPEN"}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Roles */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.roles.map((role) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="rounded-full border-border/60 text-xs"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>

                  {/* Locations */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {project.locations.join("  /  ")}
                  </div>

                  {/* CTA */}
                  <div className="mt-5 border-t border-border/40 pt-4">
                    <Button
                      variant="ghost"
                      className="group/btn -ml-2 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                    >
                      Apply for this project
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
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
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */
const steps = [
  {
    step: "01",
    title: "Register Your Profile",
    description:
      "Create your partner account in under 5 minutes. Tell us about your company or individual F-tax status, primary roles, specializations, and team capacity. The form is designed for quick completion even on mobile devices at the construction site.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    step: "02",
    title: "Upload Credentials",
    description:
      "Securely upload your mandatory certifications — ID06, Safe Construction, APV (Arbete pa vag), and Maskinforarbevis. All documents are encrypted and stored in compliance with Swedish data protection regulations, accessible only by authorized Linkable recruiters.",
    icon: <FileCheck className="h-6 w-6" />,
  },
  {
    step: "03",
    title: "Get Matched",
    description:
      "Our team reviews your profile and matches you with active projects based on your location preferences, certifications, and availability. High-match applicants receive instant notifications via email, ensuring you never miss the right opportunity.",
    icon: <CheckCircle2 className="h-6 w-6" />,
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/40 bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/how-it-works.png"
              alt="How the Linkable portal works"
              className="w-full rounded-2xl border border-border/60 shadow-xl"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-amber-100" />
          </motion.div>

          {/* Steps */}
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
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Three steps to your next project
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our streamlined process is designed for construction
                professionals. Apply from your phone between tasks, no paperwork
                required.
              </p>
            </motion.div>

            <div className="mt-10 space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.15 }}
                  className="flex gap-5"
                >
                  {/* Icon + step number */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                      {step.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="h-full w-px bg-gradient-to-b from-amber-300 to-transparent" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <span className="text-xs font-bold tracking-widest text-amber-500">
                      STEP {step.step}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
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
const benefits = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fast Matching",
    description:
      "Our recruiters review applications within 24 hours. High-match candidates with in-demand certifications like APV and Machine Operator licenses are prioritized and contacted immediately.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Projects Across Sweden",
    description:
      "From Lulea to Goteborg, we partner with major construction firms to bring you projects in your preferred region. Specify your geographic preferences and willingness to travel during onboarding.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Compliant",
    description:
      "All uploaded documents are encrypted and stored securely. We handle F-tax verification, ID06 checks, and certification validation so you can focus on the work that matters.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Built for Teams & Individuals",
    description:
      "Whether you are a large subcontractor, a small company, or an individual with F-tax status, our portal adapts to your profile. Register as a crew of 20 or a solo specialist.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "Transparent Requirements",
    description:
      "Every project listing clearly states required certifications, role expectations, and duration. No surprises — you know exactly what is needed before you apply.",
  },
  {
    icon: <HardHat className="h-6 w-6" />,
    title: "Construction-First Design",
    description:
      "Our portal is built mobile-first because we know you are often on-site. The application form works seamlessly on any smartphone, tablet, or desktop browser.",
  },
];

function WhySection() {
  return (
    <section id="why" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Why Linkable
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The smarter way to find construction work
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We eliminate the friction between skilled workers and the projects
            that need them. Here is what sets us apart from traditional
            recruitment.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
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
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
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
/*  Certifications Banner                                               */
/* ------------------------------------------------------------------ */
function CertificationsBanner() {
  const certs = [
    "ID06",
    "Safe Construction",
    "APV (Arbete pa vag)",
    "Maskinforarbevis",
    "F-skatt",
  ];

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
            Certifications We Verify
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Upload your certifications during onboarding — we handle validation
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
function CTASection() {
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
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-amber-100">
            Whether you are a subcontractor, a machine operator, or a work team
            looking for the next project — register today and let us connect you
            with opportunities across Sweden.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 text-base font-semibold text-amber-600 shadow-lg hover:bg-amber-50"
            >
              Apply as Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
            >
              Talk to Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer id="contact" className="border-t border-border/40 bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500">
                <HardHat className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Linkable
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Connecting skilled construction professionals with projects across
              Sweden. Fast, secure, and built for the industry.
            </p>
          </div>

          {/* Portal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Portal</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#projects" className="transition-colors hover:text-foreground">
                  Open Projects
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="transition-colors hover:text-foreground">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Apply Now
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-foreground">
                  Partner Login
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Certifications</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>ID06</li>
              <li>Safe Construction Training</li>
              <li>APV (Arbete pa vag)</li>
              <li>Maskinforarbevis</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@linkable.se"
                  className="transition-colors hover:text-foreground"
                >
                  info@linkable.se
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+46701234567"
                  className="transition-colors hover:text-foreground"
                >
                  +46 70 123 45 67
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Linkable. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <HowItWorksSection />
        <WhySection />
        <CertificationsBanner />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
