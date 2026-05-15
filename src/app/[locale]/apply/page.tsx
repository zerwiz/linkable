"use client";

import { PageShell } from "@/components/page-shell";
import { ApplySection, CertificationGuideSection } from "@/components/sections";

export default function ApplyPage() {
  return (
    <PageShell>
      <ApplySection mode="overall" />
      <div className="border-t border-border/40" />
      <CertificationGuideSection />
    </PageShell>
  );
}
