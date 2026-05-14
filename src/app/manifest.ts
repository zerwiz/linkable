import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LinkableWork Partner Portal",
    short_name: "LinkableWork",
    description:
      "Partner portal for construction recruitment across Sweden. Subcontractors, companies, and individuals can apply for projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
