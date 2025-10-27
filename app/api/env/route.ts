import { debugInfo, environment } from "@/lib/config/environment";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    environment: environment,
    debug: debugInfo,
    timestamp: new Date().toISOString(),
  });
}
