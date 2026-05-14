"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RequestJobPage() {
  const t = useTranslations("Index.RequestJob");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setSubmitting(false);
  };

  const benefits = [
    { id: "vetted", icon: <ShieldCheck className="h-6 w-6" /> },
    { id: "offer", icon: <FileText className="h-6 w-6" /> },
    { id: "scope", icon: <Building2 className="h-6 w-6" /> },
  ];

  if (submitted) {
    return (
      <PageShell>
        <div className="py-20 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <h1 className="mt-6 text-3xl font-bold">{t("form.success")}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("form.successDescription")}</p>
          <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-8 rounded-full">
            {t("form.submit")}
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
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{t(`benefits.${benefit.id}.title`)}</h3>
                      <p className="text-muted-foreground">{t(`benefits.${benefit.id}.description`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <Card className="border-border/60 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold">{t("form.title")}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{t("form.description")}</p>

                  <form onSubmit={handleSubmit} data-netlify="true" name="request-job" className="mt-8 space-y-6">
                    <input type="hidden" name="form-name" value="request-job" />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("form.name")} *</Label>
                        <Input id="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("form.email")} *</Label>
                        <Input id="email" type="email" required />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("form.phone")} *</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{t("form.company")}</Label>
                        <Input id="company" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobType">{t("form.jobType")} *</Label>
                      <Select required>
                        <SelectTrigger id="jobType">
                          <SelectValue placeholder={t("form.jobType")} />
                        </SelectTrigger>
                        <SelectContent>
                          {(t.raw("form.jobTypeOptions") as string[]).map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">{t("form.location")} *</Label>
                      <Input id="location" required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="budget">{t("form.budget")}</Label>
                        <Select>
                          <SelectTrigger id="budget">
                            <SelectValue placeholder={t("form.budget")} />
                          </SelectTrigger>
                          <SelectContent>
                            {(t.raw("form.budgetOptions") as string[]).map((opt) => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">{t("form.timeline")} *</Label>
                        <Input id="timeline" required placeholder={t("form.timeline")} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">{t("form.descriptionLabel")} *</Label>
                      <Textarea id="description" rows={5} required placeholder={t("form.descriptionPlaceholder")} />
                    </div>

                    <Button type="submit" disabled={submitting} className="w-full rounded-full bg-amber-500 py-6 text-lg font-bold text-white hover:bg-amber-600">
                      {submitting ? t("form.sending") : t("form.submit")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
