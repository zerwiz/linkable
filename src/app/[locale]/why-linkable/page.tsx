"use client";

import { PageShell } from "@/components/page-shell";
import { WhySection, CertificationGuideBanner } from "@/components/sections";

export default function WhyLinkablePage() {
  return (
    <PageShell>
      <WhySection />
      <CertificationGuideBanner />
    </PageShell>
  );
}
