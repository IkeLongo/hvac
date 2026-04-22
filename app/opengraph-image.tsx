import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { companies } from "@/data/companies";

export const runtime = "edge";
export const alt = "HVAC Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK_SLUG = "riverside";
const BG_IMAGE = "/hvac-tech-working-in-san-antonio-hero-3.png";
const FALLBACK_PRIMARY_COLOR = "#1a1a2e";

export default async function Image() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  const company = companies[slug] ?? companies[FALLBACK_SLUG];

  // Build absolute URLs — ImageResponse cannot resolve relative paths
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const bgUrl = `${baseUrl}${BG_IMAGE}`;
  const logoUrl = company.logo ? `${baseUrl}${company.logo}` : null;
  const primaryColor = company.primaryColor ?? FALLBACK_PRIMARY_COLOR;

  // ── DEBUG ─────────────────────────────────────────────────────────────────
  // const rawSlugHeader = headersList.get("x-company-slug");
  // const allHeaders: Record<string, string> = {};
  // headersList.forEach((value, key) => { allHeaders[key] = value; });
  // const debugLines = [
  //   `host: ${host}`,
  //   `x-company-slug header: ${rawSlugHeader ?? "(not set — using fallback)"}`,
  //   `resolved slug: ${slug}`,
  //   `company.name: ${company.name}`,
  //   `company.logo: ${company.logo ?? "(none)"}`,
  //   `logoUrl: ${logoUrl ?? "(none)"}`,
  // ];
  // console.log("[OG DEBUG]", JSON.stringify({ host, rawSlugHeader, slug, companyName: company.name, logoUrl }, null, 2));
  // ── END DEBUG ──────────────────────────────────────────────────────────────

  return new ImageResponse(
    (
      // Root layer — establishes the canvas
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: primaryColor,
        }}
      >
        {/* Layer 1: background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bgUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Layer 2: subtle darkening pass so the photo doesn't compete with the logo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.35)",
            display: "flex",
          }}
        />

        {/* Layer 3: primary-color brand overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: primaryColor,
            opacity: 0.58,
            display: "flex",
          }}
        />

        {/* Layer 4: centered logo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={company.name}
              width={420}
              height={280}
              style={{
                objectFit: "contain",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-2px",
              }}
            >
              {company.name}
            </span>
          )}
        </div>

        {/* ── DEBUG BANNER ── remove before going to production ── */}
        {/* <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.82)",
            padding: "14px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {debugLines.map((line) => (
            <span
              key={line}
              style={{ fontSize: 16, color: "#00ff99", fontFamily: "monospace" }}
            >
              {line}
            </span>
          ))}
        </div> */}
        {/* ── END DEBUG BANNER ── */}
      </div>
    ),
    { ...size }
  );
}
