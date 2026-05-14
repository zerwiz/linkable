"use client";

import { useState, useCallback } from "react";
import { PageShell } from "@/components/page-shell";
import { ProjectsSection, CertificationGuideBanner, ApplySection } from "@/components/sections";

export default function AnlaggningProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSelectProject = useCallback((id: string, role?: string) => {
    setSelectedProject(id);
    setSelectedRole(role ?? null);
  }, []);

  return (
    <PageShell>
      <ProjectsSection onSelectProject={handleSelectProject} />
      <CertificationGuideBanner />
      <ApplySection selectedProjectId={selectedProject} selectedRole={selectedRole} mode="anlaggning" />
    </PageShell>
  );
}
