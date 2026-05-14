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
  const hasMachines = roles.includes("Maskinförare") || roles.includes("Maskinforare");
  const machineExamples = t.raw("Form.machineOptions") as string[];
  const certList = [
    t("Certs.items.id06"),
    t("Certs.items.safe"),
    t("Certs.items.apv1"),
    t("Certs.items.heta"),
    t("Certs.items.bas"),
    t("Certs.items.hlr"),
    t("Certs.items.sakralyft"),
    t("Certs.items.stockholm"),
  ];

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
        <div className="space-y-10">
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
              <span className="text-sm text-muted-foreground">
                {t("Projects.projectId")}: {id}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {t(`Projects.items.${id}.title`)}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("Projects.detailSubtitle")}
            </p>
          </div>

          {/* Quick Facts */}
          <div className="rounded-2xl border border-border/60 bg-muted/20 p-6">
            <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              <MapPin className="h-4 w-4 text-amber-500" />
              {t("Projects.quickFacts")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.location")}
                </p>
                <p className="mt-0.5 text-sm font-medium">{locations.join(", ")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.startDate")}
                </p>
                <p className="mt-0.5 text-sm font-medium">{t(`Projects.items.${id}.startDate`)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.applyDeadline")}
                </p>
                <p className="mt-0.5 text-sm font-medium">{t(`Projects.items.${id}.applyDeadline`)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.salary")}
                </p>
                <p className="mt-0.5 text-sm font-medium text-green-600">{t(`Projects.items.${id}.salary`)}</p>
              </div>
              {t.raw(`Projects.items.${id}.accommodation`) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("Projects.accommodation")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-emerald-600">{t(`Projects.items.${id}.accommodation`)}</p>
                </div>
              )}
            </div>
          </div>

          {/* About the project */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <span>{t("Projects.about")}</span>
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t(`Projects.items.${id}.description`)}
            </p>
          </div>

          {/* Roles */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.rolesTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("Projects.rolesSubtitle")}</p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Badge
                  key={role}
                  variant="outline"
                  className="rounded-full border-border/60 px-4 py-1.5 text-sm"
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Machine List */}
          {hasMachines && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{t("Projects.machineList")}</h2>
              <p className="text-sm text-muted-foreground">{t("Projects.machineListDesc")}</p>
              <div className="flex flex-wrap gap-2">
                {machineExamples.map((m) => (
                  <Badge key={m} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    {m}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{t("Projects.machineNote")}</p>
            </div>
          )}

          {/* Certifications */}
          <Card className="border-amber-100 bg-amber-50/50">
            <CardContent className="p-6">
              <h3 className="flex items-center gap-2 font-semibold text-amber-900">
                <CheckCircle2 className="h-5 w-5 text-amber-600" />
                {t("Projects.requirements")}
              </h3>
              <ul className="mt-4 grid gap-2 text-sm text-amber-800 sm:grid-cols-2">
                {certList.map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-amber-600" />
                    {cert}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-amber-600">
                {t("Projects.id06Note")}
              </p>
            </CardContent>
          </Card>

          {/* Working Conditions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.workingConditions")}</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{t("Projects.languageReq")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{t("Projects.tools")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{t("Projects.insurance")}</span>
              </li>
            </ul>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.compensation")}</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <span>{t("Projects.paymentTerms")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <span>{t("Projects.compensationType")}</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                <span>{t("Projects.ftaxReq")}</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.contactPerson")}</h2>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">{t("Projects.contactRecruiter")}</span>{" "}
                LinkableWork rekrytering
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">E-post:</span>{" "}
                <a href="mailto:info@linkable.se" className="text-amber-600 hover:underline">info@linkable.se</a>
              </p>
            </div>
          </div>

          {/* Application Checklist */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{t("Projects.application")}</h2>
            <p className="text-sm font-medium text-muted-foreground">{t("Projects.checklistHeader")}</p>
            <ol className="ml-5 list-decimal space-y-2 text-sm text-muted-foreground">
              <li>{t("Projects.checklistProjectId", { id })}</li>
              <li>{t("Projects.checklistFtax")}</li>
              <li>{t("Projects.checklistCerts")}</li>
              <li>{t("Projects.checklistReferences")}</li>
              <li>{t("Projects.checklistDeadline", { deadline: t(`Projects.items.${id}.applyDeadline`) })}</li>
            </ol>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 border-t border-border/40 pt-8 sm:flex-row">
            <Link href="/projects#apply" className="flex-1">
              <Button size="lg" className="w-full rounded-full bg-amber-500 text-white hover:bg-amber-600">
                {t("Projects.applyNow")}
              </Button>
            </Link>
            <Link href="/contact" className="flex-1">
              <Button size="lg" variant="outline" className="w-full rounded-full border-border/60 hover:bg-muted/50">
                {t("Projects.askQuestion")}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
