import { useTranslations } from "next-intl";
import { Link } from "@/routing";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, Shield, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectNumberToKey, PROJECT_IDS, projectKeyToNumber } from "@/lib/projects";

const baseUrl = "https://linkable.se";

const urgencyMap: Record<string, "high" | "medium" | "low"> = {
  groundworks: "high",
  specialized: "high",
  "umea-centrum": "high",
  "skelleftea-campus": "high",
  infrastructure: "medium",
  "lulea-hamn": "medium",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const projectKey = projectNumberToKey(id);
  if (!projectKey) notFound();

  const t = await getTranslations({ locale, namespace: "Index.Projects.items" });
  const tIndex = await getTranslations({ locale, namespace: "Index.Projects" });

  try {
    const title = t(`${projectKey}.title`);
    const description = t(`${projectKey}.description`);
    const locations = t.raw(`${projectKey}.locations`) as string[];
    const startDate = t(`${projectKey}.startDate`);
    const roles = t.raw(`${projectKey}.roles`) as string[];

    const shortDescription = description.length > 200 
      ? description.substring(0, 197) + "..." 
      : description;

    const ogTitle = `${title} | LinkableWork`;
    const ogDescription = `${locations.join(", ")} • ${tIndex("startDate")}: ${startDate} • ${roles.join(", ")}`;

    return {
      title: ogTitle,
      description: shortDescription,
      alternates: {
        canonical: `${baseUrl}/${locale}/projects/${id}`,
        languages: {
          en: `${baseUrl}/en/projects/${id}`,
          sv: `${baseUrl}/sv/projects/${id}`,
          fi: `${baseUrl}/fi/projects/${id}`,
        },
      },
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: `${baseUrl}/${locale}/projects/${id}`,
        siteName: "LinkableWork",
        type: "website",
        locale: locale === "sv" ? "sv_SE" : locale === "fi" ? "fi_FI" : "en_SE",
        images: [
          {
            url: `${baseUrl}/og-image.png`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description: ogDescription,
        images: [`${baseUrl}/og-image.png`],
      },
    };
  } catch {
    return {
      title: "Project | LinkableWork",
    };
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { id } = await params;
  const projectKey = projectNumberToKey(id);
  if (!projectKey) notFound();

  const t = await getTranslations("Index");

  const project = {
    id,
    key: projectKey,
    urgency: urgencyMap[projectKey] || "low",
  };

  const roles = t.raw(`Projects.items.${projectKey}.roles`) as string[];
  const locations = t.raw(`Projects.items.${projectKey}.locations`) as string[];
  const hasMachines = roles.includes("Maskinförare") || roles.includes("Maskinforare");

  let projectMachines: string[] | undefined;
  let projectRequirements: string[] | undefined;
  
  try {
    projectMachines = t.raw(`Projects.items.${projectKey}.machines`) as string[];
  } catch {}
  
  try {
    projectRequirements = t.raw(`Projects.items.${projectKey}.requirements`) as string[];
  } catch {}

  const machineExamples = projectMachines || (t.raw("Form.machineOptions") as string[]);
  const certList = projectRequirements || [
    t("Certs.items.id06"),
    t("Certs.items.safe"),
    t("Certs.items.apv1"),
    t("Certs.items.heta"),
    t("Certs.items.basP") + " / " + t("Certs.items.basU"),
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
              {t(`Projects.items.${projectKey}.title`)}
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
                <p className="mt-0.5 text-sm font-medium">{t(`Projects.items.${projectKey}.startDate`)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.applyDeadline")}
                </p>
                <p className="mt-0.5 text-sm font-medium">{t(`Projects.items.${projectKey}.applyDeadline`)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("Projects.individual")}
                </p>
                <p className="mt-0.5 text-sm font-medium text-green-600">{t(`Projects.items.${projectKey}.individual`)}</p>
              </div>
              {t.raw(`Projects.items.${projectKey}.accommodation`) && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("Projects.accommodation")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-emerald-600">{t(`Projects.items.${projectKey}.accommodation`)}</p>
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
              {t(`Projects.items.${projectKey}.description`)}
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
                <span className="font-medium text-foreground">{t("Footer.contact.thomas")}</span>
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">E-post:</span>{" "}
                <a href="mailto:lexcoab@gmail.com" className="text-amber-600 hover:underline">lexcoab@gmail.com</a>
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">Tel:</span>{" "}
                <a href="tel:+46760952921" className="text-amber-600 hover:underline">+46760952921</a>
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
              <li>{t("Projects.checklistDeadline", { deadline: t(`Projects.items.${projectKey}.applyDeadline`) })}</li>
            </ol>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 border-t border-border/40 pt-8 sm:flex-row">
            <Link href="/apply" className="flex-1">
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
