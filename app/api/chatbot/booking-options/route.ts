import { getStaticBookingOptions } from "@/lib/ghl/calendars";

export async function GET() {
  const options = await getStaticBookingOptions();
  return Response.json(options);
}
