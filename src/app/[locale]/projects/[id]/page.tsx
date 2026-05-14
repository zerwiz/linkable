import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Shield, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations({ locale, namespace: "Index.Projects.items" });
  
  // This is a bit tricky because the keys are dynamic. 
  // For now, let's just use the project title if it exists.
  try {
    const title = t(`${id}.title`);
    return {
      title: `${title} | LinkableWork`,
    };
  } catch {
    return {
      title: "Project | LinkableWork",
    };
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { id } = await params;
  const t = await getTranslations("Index");

  // Define the available project IDs
  const projectIds = [
    "groundworks", "infrastructure", "specialized", "building",
    "umea-centrum", "lulea-hamn", "skelleftea-campus", "pitea-industri",
  ];

  if (!projectIds.includes(id)) {
    notFound();
  }

  const project = {
    id,
    urgency:
      id === "groundworks" || id === "specialized" || id === "umea-centrum" || id === "skelleftea-campus"
        ? "high"
        : id === "infrastructure" || id === "lulea-hamn"
          ? "medium"
          : "low",
  };

  const roles = t.raw(`Projects.items.${id}.roles`) as string[];
  const locations = t.raw(`Projects.items.${id}.locations`) as string[];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Breadcrumb */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("Navbar.projects")}
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Title & Badge */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                className={`rounded-full text-[10px] font-bold ${
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
              <span className="text-sm text-muted-foreground">ID: {id}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t(`Projects.items.${id}.title`)}
            </h1>
          </div>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-6 border-y border-border/40 py-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.location")}
                </p>
                <p className="text-sm font-medium">{locations.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.startDate")}
                </p>
                <p className="text-sm font-medium">{t(`Projects.items.${id}.startDate`)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.applyDeadline")}
                </p>
                <p className="text-sm font-medium">{t(`Projects.items.${id}.applyDeadline`)}</p>
              </div>
            </div>
            {t.raw(`Projects.items.${id}.accommodation`) && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("Projects.accommodation")}
                  </p>
                  <p className="text-sm font-medium">{t(`Projects.items.${id}.accommodation`)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.about")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(`Projects.items.${id}.description`)}
            </p>
          </div>

          {/* Requirements / Roles */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.rolesTitle")}</h2>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge
                  key={role}
                  variant="outline"
                  className="rounded-full border-border/60 px-4 py-1 text-sm"
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Certifications Needed */}
          <Card className="border-amber-100 bg-amber-50/50">
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 font-semibold text-amber-900">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
                {t("Projects.requirements")}
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-amber-800 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.id06")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.safe")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.apv1")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.heta")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.bas")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.hlr")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.sakralyft")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-amber-600" />
                  {t("Certs.items.stockholm")}
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex flex-col gap-4 pt-8 sm:flex-row">
            <Link href="/projects#apply" className="flex-1">
              <Button size="lg" className="w-full rounded-full bg-amber-500 text-white hover:bg-amber-600">
                {t("Projects.applyNow")}
              </Button>
            </Link>
            <a href="#contact" className="flex-1">
              <Button size="lg" variant="outline" className="w-full rounded-full border-border/60 hover:bg-muted/50">
                {t("Projects.askQuestion")}
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
