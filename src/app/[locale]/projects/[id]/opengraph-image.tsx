import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { PROJECT_IDS, projectNumberToKey } from "@/lib/projects";

export const runtime = "edge";

export const alt = "LinkableWork Project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <rect x="10" y="22" width="28" height="18" rx="4" fill="#f59e0b"/>
  <rect x="14" y="10" width="20" height="14" rx="4" fill="#f59e0b"/>
</svg>
`;

export default async function OgImage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const projectKey = projectNumberToKey(id);

  if (!projectKey) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, color: "#ffffff", marginBottom: 16 }}>LinkableWork</div>
        <div style={{ fontSize: 24, color: "#94a3b8" }}>Project Not Found</div>
      </div>,
      { ...size }
    );
  }

  const t = await getTranslations({ locale, namespace: "Index.Projects.items" });

  let title = "Project";
  let locations: string[] = [];
  let startDate = "";

  try {
    title = t(`${projectKey}.title`);
    locations = t.raw(`${projectKey}.locations`) as string[];
    startDate = t(`${projectKey}.startDate`);
  } catch (e) {
    // fallback
  }

  const locationText = locations.join(", ");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: 64,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            width: 40,
            height: 32,
            borderRadius: 4,
            backgroundColor: "#f59e0b",
          }}
        />
        <span style={{ fontSize: 24, fontWeight: 700, color: "#ffffff" }}>
          Linkable
        </span>
        <span style={{ fontSize: 24, fontWeight: 700, color: "#f59e0b" }}>
          Work
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            marginBottom: 16,
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {locationText && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              {locationText}
            </div>
          )}
          {startDate && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#64748b",
              }}
            >
              {startDate}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 24,
          borderTop: "1px solid rgba(148,163,184,0.15)",
          fontSize: 16,
          color: "#64748b",
        }}
      >
        linkable.se
      </div>
    </div>,
    {
      ...size,
    }
  );
}
