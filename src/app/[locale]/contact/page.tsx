import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Index.Footer.contact" });
  return {
    title: `${t("title")} | LinkableWork`,
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("Index");
  
  return (
    <PageShell>
      <div className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t("Footer.contact.title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("Footer.description")}
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Thomas */}
            <Card className="border-amber-500/20 bg-card shadow-lg shadow-amber-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{t("Footer.contact.thomas")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Recruitment & Partnerships</p>
                <div className="mt-6 space-y-4">
                  <a href={`mailto:${t("Footer.contact.thomasEmail")}`} className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Mail className="h-4 w-4 text-amber-500" />
                    {t("Footer.contact.thomasEmail")}
                  </a>
                  <a href={`tel:${t("Footer.contact.thomasPhone").replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Phone className="h-4 w-4 text-amber-500" />
                    {t("Footer.contact.thomasPhone")}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Christer */}
            <Card className="border-amber-500/20 bg-card shadow-lg shadow-amber-500/5">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{t("Footer.contact.christer")}</h3>
                <p className="mt-2 text-sm text-muted-foreground">Recruitment & Partnerships</p>
                <div className="mt-6 space-y-4">
                  <a href={`mailto:${t("Footer.contact.christerEmail")}`} className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Mail className="h-4 w-4 text-amber-500" />
                    {t("Footer.contact.christerEmail")}
                  </a>
                  <a href={`tel:${t("Footer.contact.christerPhone").replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Phone className="h-4 w-4 text-amber-500" />
                    {t("Footer.contact.christerPhone")}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* General Support */}
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">General Support</h3>
                <p className="mt-2 text-sm text-muted-foreground">Response within 24 hours</p>
                <div className="mt-6 space-y-4">
                  <a href="mailto:info@linkable.se" className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    info@linkable.se
                  </a>
                  <a href="tel:+46701234567" className="flex items-center gap-3 text-sm font-medium hover:text-amber-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    +46 70 123 45 67
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-border/60 bg-card shadow-sm">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-white">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-bold">Main Office</h3>
                <p className="mt-2 text-sm text-muted-foreground">Operations Sweden</p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    Umeå / Stockholm / Luleå
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
