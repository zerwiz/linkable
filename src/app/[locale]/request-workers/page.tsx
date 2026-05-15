"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, LayoutDashboard, ShieldCheck, ArrowRight, CheckCircle2, Phone, Mail } from "lucide-react";
import { Link } from "@/routing";
import { CertificationGuideBanner } from "@/components/sections";

export default function RequestWorkersPage() {
  const t = useTranslations("Index.RequestWorkers");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);

    const subject = encodeURIComponent("Förfrågan om personal från LinkableWork");
    const body = encodeURIComponent(
      [
        "Företagsnamn: " + (fd.get("companyName") as string),
        "Kontaktperson: " + (fd.get("contactPerson") as string),
        "E-post: " + (fd.get("email") as string),
        "Telefon: " + (fd.get("phone") as string),
        "Plats: " + (fd.get("projectLocation") as string),
        "Typ av arbete: " + (fd.get("workType") as string),
        "Antal personer: " + (fd.get("workersNeeded") as string),
        "Startdatum: " + (fd.get("startDate") as string),
        "",
        "Beskrivning:",
        fd.get("description") as string,
      ].join("\n")
    );

    window.location.href = `mailto:lexcoab@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const benefits = [
    { id: "supply", icon: <Users className="h-6 w-6" /> },
    { id: "portal", icon: <LayoutDashboard className="h-6 w-6" /> },
    { id: "vetted", icon: <ShieldCheck className="h-6 w-6" /> },
  ];

  if (submitted) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <h1 className="mt-6 text-3xl font-bold">{t("form.success")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("form.successDescription")}</p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-full">
            Back to form
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left - Content */}
            <div>
              <Badge variant="secondary" className="mb-4 rounded-full border-amber-500/30 bg-amber-500/10 px-4 py-1 text-amber-600">
                {t("badge")}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
                {t("description")}
              </p>

              <div className="mt-12 space-y-8">
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{t(`benefits.${benefit.id}.title`)}</h3>
                      <p className="text-muted-foreground">{t(`benefits.${benefit.id}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div className="space-y-6">
              <Card className="border-border/60 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold">{t("form.title")}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t("form.description")}</p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">{t("form.companyName")}</Label>
                        <Input id="companyName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">{t("form.contactPerson")}</Label>
                        <Input id="contactPerson" required />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">E-post *</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="projectLocation">{t("form.projectLocation")}</Label>
                        <Input id="projectLocation" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="workType">{t("form.workType")}</Label>
                        <Input id="workType" placeholder="e.g. Groundworks" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="workersNeeded">{t("form.workersNeeded")}</Label>
                        <Input id="workersNeeded" type="number" min="1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">{t("form.startDate")}</Label>
                        <Input id="startDate" type="date" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">{t("form.descriptionLabel")}</Label>
                      <Textarea id="description" rows={4} required />
                    </div>

                    <Button type="submit" className="w-full rounded-full bg-amber-500 py-6 text-lg font-bold text-white hover:bg-amber-600">
                      {t("form.submit")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-amber-500/20 bg-amber-50/50 shadow-sm">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-foreground">Eller kontakta oss direkt</p>
                  <div className="mt-4 flex flex-wrap gap-6">
                    <Link href="tel:+46701234567" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-amber-600">
                      <Phone className="h-4 w-4 text-amber-500" />
                      +46 70 123 45 67
                    </Link>
                    <Link href="mailto:lexcoab@gmail.com" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-amber-600">
                      <Mail className="h-4 w-4 text-amber-500" />
                      lexcoab@gmail.com
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700">
                      Alla kontakter →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <CertificationGuideBanner />
    </PageShell>
  );
}
