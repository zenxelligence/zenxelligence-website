import { useId } from "react";

export const ZX_Z_PATH = "M3.2 5H28.8V10.2L12.6 21.6H28.8V27H3.2V21.8L19.4 10.4H3.2Z";
export const ZX_X_PATH = "M9 8.4L13.6 7.2L23.4 23.2L18.8 24.4ZM18.4 7.2L23 8.4L13.6 24.4L9 23.2Z";

export function ZxMark({
  size = 28,
  tone = "dark",
  className,
}: {
  size?: number;
  tone?: "dark" | "light";
  className?: string;
}) {
  const id = `zx${useId().replace(/:/g, "")}`;
  const z = tone === "light" ? "#17120D" : "#FFFFFF";

  return (
    <svg
      className={className ? `zx-mark ${className}` : "zx-mark"}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <path fill={z} d={ZX_Z_PATH} />
      <path fill="#FF7A1A" d={ZX_X_PATH} />
      <mask id={id}>
        <rect width="32" height="32" fill="#000" />
        <path fill="#fff" d={ZX_Z_PATH} />
      </mask>
      <path fill="#A73D10" d={ZX_X_PATH} mask={`url(#${id})`} />
    </svg>
  );
}
