import { NextResponse } from "next/server";

/** Liveness only. Uptime and incident history are not published until they are measured. */
export function GET() {
  return NextResponse.json({ status: "ok" });
}
