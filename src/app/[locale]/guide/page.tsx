"use client";

import { PageShell } from "@/components/page-shell";
import { CertificationGuideSection, LinkCollectionSection } from "@/components/sections";

export default function GuidePage() {
  return (
    <PageShell>
      <CertificationGuideSection />
      <LinkCollectionSection />
    </PageShell>
  );
}
