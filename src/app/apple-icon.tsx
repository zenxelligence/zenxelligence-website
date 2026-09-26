import { ImageResponse } from "next/og";
import { ZX_X_PATH, ZX_Z_PATH } from "@/components/zx-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0b",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path fill="#FFFFFF" d={ZX_Z_PATH} />
          <path fill="#FF7A1A" d={ZX_X_PATH} />
          <mask id="zx-apple">
            <rect width="32" height="32" fill="#000" />
            <path fill="#fff" d={ZX_Z_PATH} />
          </mask>
          <path fill="#A73D10" d={ZX_X_PATH} mask="url(#zx-apple)" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
