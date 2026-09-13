import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    const url = request.nextUrl.clone();
    url.pathname = `/md-mirror${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|md-mirror|og|favicon.ico|.*\\..*).*)"],
};
