"use client";

import { PageShell } from "@/components/page-shell";
import { HeroSection, CertificationsBanner, CertificationGuideBanner, CTASection } from "@/components/sections";

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <CertificationsBanner />
      <CertificationGuideBanner />
      <CTASection />
    </PageShell>
  );
}
