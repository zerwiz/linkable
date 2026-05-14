"use client";

import { PageShell } from "@/components/page-shell";
import { HeroSection, CertificationsBanner, CTASection } from "@/components/sections";

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <CertificationsBanner />
      <CTASection />
    </PageShell>
  );
}
