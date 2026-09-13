import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "operational",
    uptime_30d: "99.982%",
    open_incidents: 0,
    last_incident: "2026-07-14T03:22:00Z",
    measured_by: "pulse",
  });
}
