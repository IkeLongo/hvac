import { NextRequest, NextResponse } from "next/server";
import { companies } from "./data/companies";

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  // Extract subdomain: e.g. "riverside" from "riverside.mydomain.com"
  // Works locally too: "riverside.localhost:3000"
  const subdomain = host.split(".")[0];

  // Skip if it's the root domain (www, naked domain, or localhost)
  const isRoot =
    subdomain === "www" ||
    subdomain === "localhost" ||
    !host.includes(".");

  if (isRoot || !(subdomain in companies)) {
    // Rewrite to a 404 page or let the default page handle it
    return NextResponse.next();
  }

  // Pass the subdomain to the page via a header
  const res = NextResponse.next();
  res.headers.set("x-company-slug", subdomain);
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|logos|.*\\..*).*)"],
};
