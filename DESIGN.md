# Zen xElligence — Design system

Source of truth for color, type, layout, motion, and UI. Tokens live in `src/app/globals.css` and fonts load in `src/app/layout.tsx`. Do not introduce a second palette, a second type family, or rounded “SaaS card” chrome.

**Voice:** product + services studio. Dark, editorial, technical. Quiet luxury — not neon startup, not consulting deck.

---

## Brand

| | |
|---|---|
| Name | Zen xElligence |
| Mark | Temporary `Zx` (JetBrains Mono, accent). Final mark: see `LOGO.md` |
| Wordmark | `ZEN xELLIGENCE` (Archivo semibold, 13px, tracking `0.14em`) |
| Tagline | End to end. Web to VLSI. |
| Framework | ZX A³ Innovation™ |
| Email | hello@zenxelligence.com |
| Site | https://zenxelligence.com |

**ZX A³ Innovation™** is the industry frame (see `/industries`):

| Pillar | Practice | Fields |
|---|---|---|
| Autonomous | Autonomous Intelligence | AI/ML, Data, Cloud |
| Adaptive | Adaptive Silicon | VLSI |
| Architected | Architected Determinism · Architect Training | Electronics / Embedded · Education |

Five build surfaces, always in this order: **Web apps & APIs · Android/iOS Apps · AI Agent Automation · IoT · VLSI**. Web and mobile sit under Services; they fold into Autonomous when the product is cloud-backed intelligence.

Do not invent Pulse, ERP, managed-services copy, fake KPIs, or EDA vendor names.

---

## Color

Dark-only. `color-scheme: dark`.

| Token | Hex | RGB | Tailwind | Use |
|---|---|---|---|---|
| Background | `#0b0c0e` | `11, 12, 14` | `bg-bg` / `text-bg` | Page, canvas fog, grain base |
| Raised | `#101114` | `16, 17, 20` | `bg-bg-raised` | Forms, inset panels, 3D disc |
| Foreground | `#f2f2ef` | `242, 242, 239` | `text-fg` | Headlines, body on dark |
| Muted | `#8a8d91` | `138, 141, 145` | `text-fg-muted` | Lede, meta, kickers |
| Accent | `#3ddc84` | `61, 220, 132` | `text-accent` / `bg-accent` | Links, CTAs, live dots, Logic Core |
| Border | `#1e2023` | `30, 32, 35` | `border-border` | Rules, chips, inputs |

CSS variables (`:root` and `@theme inline`):

```
--bg          #0b0c0e
--bg-raised   #101114
--fg          #f2f2ef
--fg-muted    #8a8d91
--accent      #3ddc84
--border      #1e2023
```

**Accent rgba helpers** (field, glow, overlays):

| Mix | Use |
|---|---|
| `rgba(61, 220, 132, 0.07)` | Large radial wash |
| `rgba(242, 242, 239, 0.02–0.04)` | Grid lines, soft wash |
| `bg-bg/80` | Sticky header |
| `bg-bg/82` | Command palette veil |

**Rules**

- Selection: accent fill, background text.
- Focus ring: `1px solid accent`, offset `2px`.
- Links default to accent; hover to foreground.
- Primary button: `bg-accent text-bg`, hover `bg-fg text-bg`.
- Ghost / header CTA: `border-accent text-accent`, hover fill accent.
- Never add a second green, a blue link color, or white `#fff`.

---

## Typography

### Families

| Role | Face | Weights | CSS | Tailwind |
|---|---|---|---|---|
| Display / UI | [Archivo](https://fonts.google.com/specimen/Archivo) | 400, 500, 600 | `--font-sans` | `font-sans` |
| Meta / chrome | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | 400, 500 | `--font-mono` | `font-mono` |

Fallbacks: Helvetica, Arial, sans-serif · `"JetBrains Mono"`, monospace.

Body uses Archivo. Antialiased. Do not add Inter, Geist, or a serif.

### Scale

| Role | Size | Weight | Line | Tracking | Face |
|---|---|---|---|---|---|
| Hero (default stack) | `clamp(40px, 6.6vw, 92px)` | 600 | 0.95 | `-0.038em` | Sans |
| Home opening | `clamp(26px, 4.6vw, 54px)` | 600 | 1.05 | `-0.038em` | Sans |
| Page title | `clamp(32px, 4.6vw, 58px)` | 600 | 1.04 | `-0.034em` | Sans |
| Plate / section title | `clamp(26px, 3.6vw, 42px)` | 600 | 1.08 | `-0.03em` | Sans |
| Doorway title | 25px | 600 | — | `-0.02em` | Sans |
| Tile title | 19px | 600 | — | `-0.015em` | Sans |
| Lede / prose | 17px | 400 | relaxed | — | Sans |
| Subhead | 18px (`text-lg`) | 400 | relaxed | — | Sans muted |
| Body compact | 15px | 400 | relaxed | — | Sans muted |
| Wordmark | 13px | 600 | — | `0.14em` | Sans |
| Logo mark `Zx` | 17px | 500 | — | — | Mono accent |
| Primary CTA | 12.5px | 400 | — | — | Mono |
| Nav / chip / button | 11–12px | 400 | — | — | Mono |
| Kicker / plate chrome | 11px | 400 | — | `0.06em–0.14em` | Mono muted |
| Micro / index | 10–10.5px | 400 | — | `0.08em` | Mono |

Italic is rare: only for an accented hero line (weight 500, accent color).

---

## Layout

| Token | Value |
|---|---|
| Canvas | `max-w-[1280px]`, centered |
| Gutter | `px-4` / `sm:px-6.5` |
| Header | sticky, `min-h-16`, `bg-bg/80`, `backdrop-blur-sm`, `border-b border-border`, `z-90` |
| Main scroll pad | `5.5rem` |
| Opening plate | `min-h-[calc(100dvh-4.25rem)]` — full first screen, next plate must not peek |
| Measure | lede 560–680px · prose 720–760px · titles 820–1000px |
| Home grid | `lg:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.9fr)]` |
| Plate rhythm | `py-20 md:py-28` with `border-t border-border` |
| Interior page | `pt-18 pb-6` |

Hairline borders. No drop shadows. No cards with radius. The only rounds are 6px live-status dots (`rounded-full`).

---

## Shape & chrome

- Corners: **square**. Buttons, chips, inputs, panels — `border`, no `rounded-*`.
- Dividers: `1px border-border`. Quotes use `border-l border-accent`.
- Chips: `border-border`, hover `border-accent text-accent`.
- Inputs: `border-border bg-bg`, focus `border-accent`. Raised wrap: `bg-bg-raised p-7`.
- Code / machine panels: mono, `leading-loose`, `border-border`.
- Command palette selected row: `#16181c` (one-off, do not promote to a token unless reused).

---

## Motion

| Token | Value |
|---|---|
| Ease | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Plate enter | 0.7s, `opacity 0 → 1`, `y 14 → 0`, once in view |
| Hero line | 0.6s easeOut, stagger `0.1 + i * 0.24` |
| Index / rules | 500ms, same ease |
| Field fade-in | 700ms opacity |
| Pulse | `vs-pulse` 1.8s — live dots |
| Scroll cue | `vs-cue` 2.4s |

Honor `prefers-reduced-motion`: no grain, no field animation, no Logic Core orbit, instant scroll.

---

## Surface (site field)

Always-on backdrop behind content (`SiteField` + `body.grain`).

1. Base `#0b0c0e`
2. Accent radial at ~72% 82%, `rgba(61, 220, 132, 0.07)`
3. Foreground radial at ~24% 96%, `rgba(242, 242, 239, 0.04)`
4. 96px repeating grid, ~2% white
5. Canvas nodes + links in accent
6. Film grain overlay, opacity `0.035`, `z-40` (content sits at `z-10`)

Do not replace this with a flat fill or a stock gradient mesh.

---

## Logic Core (opening 3D)

Hard-coded in `src/components/logic-core.tsx` — keep hexes in lockstep with this file.

| | |
|---|---|
| Accent / spokes | `#3ddc84` |
| Cage / nodes | `#f2f2ef` |
| Muted rings | `#8a8d91` |
| Disc | `#101114` / `#1e2023` |
| Fog | `#0b0c0e` |
| Tone mapping | `NoToneMapping` (ACES blows the core into a mint ball) |

Five labeled nodes only: Web apps, Android/iOS Apps, AI Agent Automation, IoT, VLSI. Long names wrap to two lines. Labels stay outside the cage (same arm length, core exclusion). Small nucleus — the wireframe does the work. No ASCII leaders. Click jumps to the matching plate.

---

## Type of control

**Primary** — fill accent, mono 12.5px, `px-6 py-3`, hover invert to foreground.

**Secondary** — border accent, mono, hollow, hover fill.

**Text** — mono muted, hover accent.

**Chip** — border, mono ~11.5px, hover accent.

**Kicker** — mono 11px, wide tracking, muted. Plate chrome: `01 / 10 · Role`.

---

## Copy tone

- Short sentences. What you sell, who it is for, what to do next.
- First screen must answer those three. CTA stays above the fold.
- Stack names belong below the hero.
- Plate jargon (`ZX-1`, Repose) stays off the opening.
- No fake metrics. No “we partner with [vendor]” unless the user listed the vendor.

---

## Z-index

| Layer | z |
|---|---|
| Site field | behind |
| Page chrome | 10 |
| Grain | 40 |
| Header | 90 |
| Command palette | 200 |
| Skip link | 300 |

---

## Files

| What | Where |
|---|---|
| Tokens | `src/app/globals.css` |
| Fonts | `src/app/layout.tsx` |
| Copy / offer | `src/lib/site-data.ts` |
| Backdrop | `src/components/site-field.tsx` |
| Hero 3D | `src/components/logic-core.tsx` |
| Header / footer | `src/components/site-header.tsx`, `site-footer.tsx` |
