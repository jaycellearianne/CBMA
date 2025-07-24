import { NextResponse } from "next/server";
import { fetchPassage } from "@/lib/bibleGatewayClient"; // server‑only

export async function GET() {
  try {
    // pick “Psalm N” by day of month
    const day = new Date().getDate();
    const osis = `Psalm ${day}`;

    const passages = await fetchPassage(osis, "niv");
    if (!passages.length) {
      return NextResponse.json({ error: "No verse returned" }, { status: 502 });
    }

    const first = passages[0];
    const reference = (first.title as any)?.osis || osis;
    const html = first.content;

    return NextResponse.json({ reference, html });
  } catch (e: any) {
    console.error("API › verse-of-day error:", e);
    return NextResponse.json(
      { error: e.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
