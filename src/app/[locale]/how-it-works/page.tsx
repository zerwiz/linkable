"use client";

import { PageShell } from "@/components/page-shell";
import { HowItWorksSection, CertificationGuideBanner } from "@/components/sections";

export default function HowItWorksPage() {
  return (
    <PageShell>
      <HowItWorksSection />
      <CertificationGuideBanner />
    </PageShell>
  );
}
