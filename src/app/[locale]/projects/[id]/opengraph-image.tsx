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

const emojiMap: Record<string, string> = {
  "skagersvagen": "🏗️",
  "groundworks": "⛏️",
  "infrastructure": "🛣️",
  "specialized": "🚜",
  "building": "🏢",
  "umea-centrum": "🏙️",
  "lulea-hamn": "⚓",
  "skelleftea-campus": "🎓",
  "pitea-industri": "🏭",
};

function getProjectEmoji(key: string): string {
  return emojiMap[key] || "🔨";
}

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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 160,
              height: 130,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: 160,
                height: 100,
                borderRadius: 12,
                backgroundColor: "#f59e0b",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                width: 100,
                height: 50,
                borderRadius: "50% 50% 0 0",
                backgroundColor: "#f59e0b",
                transform: "scaleX(1.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 60,
                width: 80,
                height: 12,
                borderRadius: 4,
                backgroundColor: "#d97706",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
              <span style={{ fontSize: 72, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
                Linkable
              </span>
              <span style={{ fontSize: 72, fontWeight: 800, color: "#f59e0b", letterSpacing: -1 }}>
                Work
              </span>
            </div>
            <span style={{ fontSize: 28, color: "#94a3b8", marginTop: 16 }}>
              Project Not Found
            </span>
          </div>
        </div>
      </div>,
      { ...size }
    );
  }

  const t = await getTranslations({ locale, namespace: "Index.Projects.items" });
  
  let title = "Project";
  let locations: string[] = [];
  let startDate = "";
  let roles: string[] = [];

  try {
    title = t(`${projectKey}.title`);
    locations = t.raw(`${projectKey}.locations`) as string[];
    startDate = t(`${projectKey}.startDate`);
    roles = t.raw(`${projectKey}.roles`) as string[];
  } catch (e) {
    // fallback
  }

  const emoji = getProjectEmoji(projectKey);
  const locationText = locations.join(", ");
  const rolesText = roles.join(" • ");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: 60,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          transform: "translate(100px, -100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          transform: "translate(-100px, 100px)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: "auto",
        }}
      >
        <div
          style={{
            width: 40,
            height: 32,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: 40,
              height: 25,
              borderRadius: 4,
              backgroundColor: "#f59e0b",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              width: 25,
              height: 12,
              borderRadius: "50% 50% 0 0",
              backgroundColor: "#f59e0b",
              transform: "scaleX(1.6)",
            }}
          />
        </div>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
          Linkable<span style={{ color: "#f59e0b" }}>Work</span>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 24 }}>{emoji}</div>
        
        <h1
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            marginBottom: 24,
            letterSpacing: -1,
          }}
        >
          {title}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 32,
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            <span>📍</span>
            <span>{locationText}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 24,
              color: "#64748b",
            }}
          >
            <span>📅</span>
            <span>{locale === "sv" ? "Start: " : "Starts: "}{startDate}</span>
          </div>

          {rolesText && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              {roles.map((role, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "rgba(245,158,11,0.15)",
                    borderRadius: 999,
                    border: "1px solid rgba(245,158,11,0.3)",
                    color: "#f59e0b",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {role}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 24,
          borderTop: "1px solid rgba(148,163,184,0.1)",
        }}
      >
        <span style={{ fontSize: 18, color: "#64748b" }}>
          linkable.se
        </span>
      </div>
    </div>,
    {
      ...size,
      fonts: [],
    }
  );
}
