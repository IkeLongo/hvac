import { ImageResponse } from "next/og";
import { headers } from "next/headers";
import { companies } from "@/data/companies";

export const runtime = "edge";
export const alt = "HVAC Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FALLBACK_SLUG = "alamo-air";

export default async function Image() {
  const headersList = await headers();
  const slug = headersList.get("x-company-slug") ?? FALLBACK_SLUG;
  const company = companies[slug] ?? companies[FALLBACK_SLUG];

  // Build an absolute URL for the logo so ImageResponse can fetch it
  const host = headersList.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const logoUrl = `${protocol}://${host}${company.logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: company.primaryColor,
          padding: "60px 80px",
        }}
      >
        {/* Logo + name row */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            alt={company.name}
            width={160}
            height={160}
            style={{ objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.1,
              }}
            >
              {company.name}
            </span>
            <span
              style={{
                fontSize: 28,
                color: company.accentColor,
                fontWeight: 600,
              }}
            >
              {company.city}, TX &bull; {company.phone}
            </span>
          </div>
        </div>

        {/* Services + tagline row */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {company.services.map((service) => (
              <span
                key={service}
                style={{
                  backgroundColor: company.accentColor,
                  color: company.primaryColor,
                  borderRadius: "6px",
                  padding: "6px 18px",
                  fontSize: "22px",
                  fontWeight: 700,
                }}
              >
                {service}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
            Licensed &amp; Insured &bull; 24/7 Emergency Service
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
