# Zen xElligence site audit — 26 September 2026

Audited the local redesign after applying `local-redesign.patch` (commit on this branch: “Local redesign snapshot (orange theme)”) on top of `ca5bbca`. The live site at zenxelligence.com was still the older green build when the attached audit was written; this document is about the code and the pages rendered from it.

Checked: every public route in the production build (`next build` then `next start`) at 1440, 1024, 768, and 390; source in `src/app`, `src/components`, `src/content`, and `src/lib`; `robots.txt`, `sitemap.xml`, `llms.txt`, JSON-LD, and the contact server action. Mobile Lighthouse 13 on the production home page, after the contrast fix: **Performance 98, Accessibility 100, Best practices 100, SEO 100**. TBT 40 ms, LCP 2.4 s, CLS 0.

The earlier attached audit is the starting point. Items below are ones verified in this tree. If a perspective has a long list, each row is a different page, file, or failure.

## Needs owner input

Do not invent these. The UI hides the section, or shows only a true sentence, until the file has real data.

| Item | Where to add it | What the site does until then |
|---|---|---|
| Founder names, roles, bios, photos, LinkedIn, GitHub | `src/content/team.ts` | About does not render portrait cards. Organization schema has no `founder`. |
| Case studies the client has approved | `src/content/case-studies.ts` | `/case-studies` says work is available on request. Home does not show a fake rail. |
| Industries actually worked in | `src/content/industries.ts` | `/industries` is titled “Our approach.” It is not in the top nav. |
| Starting prices, durations, and budget ranges | `src/content/pricing.ts` (`startingFrom`, `duration`, `BUDGET_OPTIONS`) | Engagement cards omit the price line. The form only offers “Not sure yet”. |
| Confirmed social URLs | `src/content/site.ts` `social` | Icons are not rendered. A scripted check of the old LinkedIn URL returned 404, and `wa.me/zenxelligence` is not a phone number. |
| Booking link | `src/content/site.ts` `bookingUrl` | “Book 20 minutes” is not shown. |
| City, time zone, founding year | `src/content/site.ts` | Not stated anywhere. |
| Service detail (hosting, auth, evals, MCUs, EDA, PDK, certifications, store process, and the rest of the empty arrays) | `src/content/services.ts` | Those headings are not rendered. |
| Two or more real field notes | `src/content/posts.ts` | `/resources` is `noindex` and absent from the footer and sitemap. |
| Email delivery | `CONTACT_PROVIDER=resend`, `RESEND_API_KEY`, optional `CONTACT_FROM` | The form validates. In production without those variables it tells the visitor to email hello@zenxelligence.com. It does not pretend the message was sent. |
| NDA wording, if you want it public | FAQ copy, after you confirm the policy | Not claimed. |
| Analytics vendor, if you want one | New integration | None is installed. |

## 1. Customer (founder or PM hiring the studio)

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| C01 | Home | No named proof: no client, result, or quote on the first screen. | A buyer cannot tell the work is real. | Render a case rail only from `content/case-studies.ts`. | H | Needs owner input |
| C02 | About `PAGES.about` | “01 Us / 02 Us” tiles stood in for the two engineers. | It looks unfinished and unnamed. | Removed the tiles. Portraits render only when `team.ts` has a name. | H | Fixed in this PR |
| C03 | `/case-studies` | “First named file TBD” slots and a file-template code block. | The page advertised that there is nothing to show. | Replaced with one true sentence and the existing FAQ. | H | Fixed in this PR |
| C04 | `/pricing` | No numbers, and the H1 was framed as what the page will not do. | Buyers leave when they cannot tell the shape of a quote. | Three engagement cards (scoping, build, retainer) with the price line hidden while `startingFrom` is empty. | H | Fixed in this PR |
| C05 | `/pricing` | Public prices were never supplied. | The cards cannot show “from X”. | Owner fills `startingFrom` and `BUDGET_OPTIONS`. | H | Needs owner input |
| C06 | `/industries` | No industry list. The page was a trademark diagram. | A fintech or hardware buyer cannot find themselves. | Title is “Our approach.” Tiles appear only from `content/industries.ts`. | H | Fixed in this PR |
| C07 | `/products` | The name “Products” reads as software for sale. The page says the opposite. | Wrong expectation, then a letdown. | H1 is “What you own at handover.” Nav label in the footer is “What you get”. | H | Fixed in this PR |
| C08 | Home service cards | “AI Agent Automation” in search pointed at `/products`. | The buyer lands on a non-product page. | Search and cards go to `/services/ai-agents`. | H | Fixed in this PR |
| C09 | Home | “10 / 10 · PLATE INDEX” and tiles that repeated their own labels. | The last third of the page was an internal index. | Not rendered. Home order is hero, facts, services, process, FAQ. | H | Fixed in this PR |
| C10 | Home CTA | Secondary link said “Home” on the home page. | A dead end. | “See pricing”, and “Read the FAQ” on `/pricing`. | H | Fixed in this PR |
| C11 | `/contact` | Form had no trustworthy submit path a buyer could see succeed or fail. | A failed script looked like a sent brief. | Server action, field errors, and a status message. Without Resend, production tells them to email. | H | Fixed in this PR |
| C12 | `/contact` | The form did not ask which service, budget, or timeline. | The reply cannot be scoped. | Chips, budget select, timeline, optional link. Budget amounts stay “Not sure yet”. | H | Fixed in this PR |
| C13 | `/contact` | Right column at 1440 was empty. | The page looks unfinished next to a short form. | “What happens next” aside. Founders appear there only when `team.ts` is filled. | M | Fixed in this PR |
| C14 | `/contact` | No booking alternative. | Some buyers will not write a form. | Link renders only if `bookingUrl` is set. | M | Needs owner input |
| C15 | Footer social | LinkedIn, Instagram, and `wa.me/zenxelligence` were linked. | A 404 or a username chat looks careless. | Icons render only for non-empty URLs in `content/site.ts`. | H | Fixed in this PR |
| C16 | About | No city or time zone. | A buyer in another country cannot tell overlap. | Left blank on purpose. | M | Needs owner input |
| C17 | FAQ | “Who owns the work?” and “after handover” were only in Legal. | Buyers ask this before they scroll to legal. | Both answers added from the existing ownership sentence. | M | Fixed in this PR |
| C18 | FAQ | No NDA answer. | Hardware and agent buyers ask. | Not invented. | M | Needs owner input |
| C19 | `/careers` | A table row of “— / — / No opening”. | Looks broken. | One sentence and the write-in email. | M | Fixed in this PR |
| C20 | `/resources` | Empty notes still looked like a content section. | A buyer who finds it thinks the studio does not write. | `noindex`, hidden in the footer until two posts exist. | M | Fixed in this PR |
| C21 | Home study plates | Five more sections repeated the cards, with thin visuals. | Long scroll, little new information. | Removed from home. Depth lives on `/services/[slug]`. | M | Fixed in this PR |
| C22 | Home, AI section | “This session — Core Web Vitals” sat inside AI agents. | A buyer reading about agents saw TTFB. | Widget is only on `/services/web-apps`. INP says “Interact to measure”. | M | Fixed in this PR |
| C23 | Services index | Tiles did not all go to a service page. | The buyer cannot go deeper. | Each surface links to its slug. | H | Fixed in this PR |
| C24 | Service pages | Deliverables are one line each. | Not enough to choose a vendor. | Structure is there. Empty detail arrays stay hidden. | H | Needs owner input |
| C25 | VLSI page | No plain limit on what “full chip” includes (node, tools, tapeout). | A chip buyer will assume too much or too little. | `scope` renders when set. It is empty. | H | Needs owner input |
| C26 | IoT page | Tools are the words “Sensors, firmware, electronics”. | Not specific enough to trust a hardware shop. | Specific MCU, RTOS, and PCB fields stay empty. | H | Needs owner input |
| C27 | AI page | No published eval, guardrail, or data-privacy practice. | Agent buyers ask before they share data. | Those groups hide until filled. | H | Needs owner input |
| C28 | Mobile page | Store account ownership was not stated as a fact. | Buyers fear the studio owns the listing. | FAQ says to put the account in the brief so it is scoped. It does not invent a past policy. | M | Fixed in this PR |
| C29 | Home hero | “End to end.” split across lines in the annotated capture. | The line that defines the studio breaks. | Explicit lines and `white-space: nowrap` on “End to end.” Measured 96.48px at 1440, three lines. | H | Fixed in this PR |
| C30 | Home hero, 390 | Orbit labels were cut off at the edges. | The five services are unreadable on a phone. | Labels, pins, leader lines, and the mobile legend are removed. The globe stands alone. The chips under the headline name the services. | H | Fixed in this PR |
| C31 | `/products` | “No Pulse” was the memorable sentence. | Pulse is not a product a visitor knows. | Sentence removed. The page talks about handover. | M | Fixed in this PR |
| C32 | Data file `PAGES.clients` | Invented quotes and logo names (Ridgeline, Corbett, and others). | If that route is ever served, it is a false claim. | Replaced with a refusal to publish unsourced quotes. `/clients` redirects. | H | Fixed in this PR |
| C33 | `PAGES.partners` | Invented AWS, Salesforce, NetSuite, and Okta badges. | False credentials. | Stub says badges are not published. `/partners` redirects to About. | H | Fixed in this PR |
| C34 | `/api/status` | Returned a fake 99.982% uptime “measured by pulse”. | A buyer or a monitor would cite a made-up number. | Route returns `{ status: "ok" }` only. | H | Fixed in this PR |
| C35 | Legal privacy | The privacy paragraph mentioned Pulse, and the render filter then hid the whole paragraph. | The privacy section could disappear. | Rewritten without that name so the section shows. | H | Fixed in this PR |
| C36 | 404 | Default Next.js 404 used the home title. | A mistyped URL offers no next step. | Branded page, title “Page not found — Zen xElligence”, `noindex`, links to Services and Contact. | M | Fixed in this PR |
| C37 | Header | Seven links plus ⌘K crowded 1024. | The buyer cannot find Contact. | Top nav is Services, Pricing, About, Contact. Menu button from 1150px down. | M | Fixed in this PR |
| C38 | ⌘K | Visible “⌘K” with a different accessible name. | Non-developers do not know what it does. | `aria-label="Search (⌘K)"`. Hidden when the menu button is showing. | L | Fixed in this PR |
| C39 | Home | Same CTA headline used to appear three times, including the plate index. | Repetition without a new step. | “Tell us what you want built.” is the orange panel only. | L | Fixed in this PR |
| C40 | Case studies FAQ | Still explains why the list is empty. | Honest, but it is the main content of the page. | Kept. Real studies replace it when added. | M | Needs owner input |
| C41 | Home stats | “2 engineers”, “5 disciplines”, “1 business day”, “Brief to handover” match published facts. | These are the only proof-like numbers that are safe. | Shown in the stat strip. No other counts were added. | M | Fixed in this PR |
| C42 | Pricing FAQ | “Why isn’t there a price?” is still the tone. | Fine until numbers exist. After numbers exist it will sound evasive. | Leave until `startingFrom` is filled, then rewrite that answer. | L | Deferred — depends on real prices |
| C43 | Service cards | Tag “firmware” is lowercase next to title-case neighbors. | Looks unfinished. | Left as the owner’s tool label. A proper tool list replaces it. | L | Needs owner input |
| C44 | `/contact` copy | Still says there is no calendar-only flow. | True today. Becomes false if `bookingUrl` is set. | Update that note when a booking link is added. | L | Deferred — tied to bookingUrl |
| C45 | Footer | “commit local” was in the annotated footer. | Ships internal build noise. | Removed. The SHA is not printed. | M | Fixed in this PR |
| C46 | Home | Email and the one-business-day line are in the hero meta. | The buyer can act without scrolling to the form. | Kept, and repeated beside the submit button. | L | Fixed in this PR |
| C47 | About | “Names and photos go here when we put them on the page” was a second placeholder. | Still sounds like a template. | One sentence: two engineers, same standing, write the email. | M | Fixed in this PR |
| C48 | `/products` tiles | Pointed at `/services` or `/contact` instead of the surface. | Extra click. | Each tile links to its service page. | M | Fixed in this PR |
| C49 | Careers | Still in the footer, not the header. | Correct for a studio with no opening. | Kept in the footer only. | L | Fixed in this PR |
| C50 | Global | No phone number. | Some buyers want one. | Not invented. Email is the path. | L | Needs owner input |
| C51 | Home process | Steps were a second stat strip, not Brief → Handover. | The buying process was unclear. | Four named steps with the existing scope and handover rules. | M | Fixed in this PR |
| C52 | Orange CTA | On short pages the only next step was easy to miss above the footer. | The panel is the close. | Present on every page via the layout, with a working secondary link. | M | Fixed in this PR |

## 2. Designer

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| D01 | Home H1 | Spec is `clamp(57px, 6.7vw, 100px)` (96px at 1440). An earlier capture measured ~75px and five lines. On a 1024–1100px laptop the three sentences wrapped to about seven lines, so the buttons sat below the fold. | The hero is the brand, and the next step has to be on the first screen. | From 801px up the type is `clamp(48px, 8.7cqw, 96px)` of the text column, and that column is about 70% of the hero. Playwright: 3 lines at 1024×640, 1280×720, 1366×768, and 1440×900, with the eyebrow, subcopy, and both buttons inside the viewport and a gap before the globe. 57px at 390. | H | Fixed in this PR |
| D02 | Home H1 | “End / to end.” split. | Breaks the lockup. | Nowrap span. It stays on one line at 1440 and 390. | H | Fixed in this PR |
| D03 | Home H1 tracking | Spec asks −0.055em and line-height 1.07. The snapshot used −0.03em and 1.02. | The size was right, the color of the type was tighter than the spec in the wrong way. | Set to the spec values. Still one viewport wide, no horizontal scroll. | M | Fixed in this PR |
| D04 | Orbit, 1440 | HTML labels collided with the H1 in the annotated shot. | Two messages occupy one point. | Labels, pins, and leader lines are gone. The globe is centered on the three-line headline. | H | Fixed in this PR |
| D05 | Orbit, 390 | Labels crossed the 390 edge. | Clipped words. | No legend. The poster is the globe only, with no pins or leader lines. | H | Fixed in this PR |
| D06 | Hero stage | No orange orb, hard canvas crop. | The spec’s §8.3 stage was missing. | `--grad-orb` circle plus a radial mask on the canvas and the poster. | H | Fixed in this PR |
| D07 | Hero, mobile and reduced motion | `public/hero-orbit.webp` was referenced and missing, so the stage was empty when WebGL did not start. | The phone hero was a blank box. | `public/hero-orbit.svg` is the poster. | H | Fixed in this PR |
| D08 | Home | Plate numbers “03 / 10 · WEB” and a duplicate side label on each H2. | Hangly leftovers. | Eyebrows are “Services”, “How we work”, “Questions”. | H | Fixed in this PR |
| D09 | Home cards | Five cards in two columns left a hole at 1024. | Broken grid. | Six-column grid: first three span 2, last two span 3. At 640–1023 the fifth card spans the row. | H | Fixed in this PR |
| D10 | Inner `.tile-grid` | Odd counts left a hole (services, products). | Same problem on inner pages. | Last odd item spans the row. Three items at ≥1150px use three columns. | M | Fixed in this PR |
| D11 | Home | Spec sections missing: stats, numbered steps, FAQ. | The page did not match §7. | All three are on the home page. Case rail waits for data. | M | Fixed in this PR |
| D12 | Inner pages | Eyebrows had no 27px H2, so hierarchy was flat. | Lighthouse `heading-order` and a flat page. | `PageBlocks` prints an H2 under each label. FAQ page has “Common questions”. | M | Fixed in this PR |
| D13 | About | Spec §6.10 portrait layout had no portraits. | The about page cannot match the spec without photos. | Component is ready and hidden. | M | Needs owner input |
| D14 | Pricing | Spec plan cards were not used. | The page was tables only. | Engagement cards. Highlighted card uses the accent border and the primary button. | M | Fixed in this PR |
| D15 | `--text-faint` #77746e | 4.22:1 on #0b0b0b. Fails AA for small text. | Notes and footer were the regression called out in the attached audit. | Readable notes and the footer use `--text-dim` (5.79:1). Placeholders may stay faint. | M | Fixed in this PR |
| D16 | Section H2 | `opacity: 0.3` before scroll made large headings #545454 on #0b0b0b (2.59:1). | Lighthouse accessibility failed. | Headings stay at opacity 1. The arrive animation only moves them. | H | Fixed in this PR |
| D17 | CTA note `#5c2c13` | About 1.8:1 on the dark end of the orange gradient. | The email under the CTA failed for small text. | Note and eyebrow use `#170e08`. Gradient starts at `#c56a18` so that color clears 4.5:1. | H | Fixed in this PR |
| D18 | CTA H2 on the dark orange | `#170e08` on `#a73d10` was ~3.0:1, only barely large-text AA. | The close of every page was the weakest contrast. | Same gradient change. | M | Fixed in this PR |
| D19 | Header ≤1150 | Menu button showed, but `.mobile-menu` stayed `display: none` until 800px. | The menu could not open on a tablet. | Open-state rules apply from 1150px, and `[hidden]` forces none. | H | Fixed in this PR |
| D20 | Status pill at 390 | “Now booking new product builds” wrapped to two lines. | The eyebrow chip looked broken. | Shorter label under 640px: “Booking new builds”. | L | Fixed in this PR |
| D21 | Type | Inter Tight and Inter are loaded. Mono UI is gone from nav and buttons. | Matches §4. | Kept. One `pre` remains for the handover example on Products. | L | Fixed in this PR |
| D22 | OG images | Snapshot orange card used a bullet, not a word in accent, and service routes fell through to the site name. | Shares did not match the page. | Accent period. Service slugs resolve to the service title. | M | Fixed in this PR |
| D23 | OG images | ImageResponse does not embed Inter Tight. | The share image is system sans. | Deferred. Fetching a font at request time needs a font file in the repo. | M | Deferred — no font file shipped, and a network fetch is not reliable |
| D24 | Focus | `:focus-visible` is 2px `--accent`. | Keyboard users can see place. | Kept from the snapshot. | L | Fixed in this PR |
| D25 | Reduced motion | CSS sets `animation: none` and opacity 1. WebGL is not mounted. | The spec’s §8.5. | Poster stays. Confirmed in the hero component. | H | Fixed in this PR |
| D26 | Buttons | Primary, outline, and quiet styles match §6.1, including the arrow nudge. | Spec components. | Kept. | L | Fixed in this PR |
| D27 | Cards | Tinted service cards use the five spec glows. | The five surfaces are distinguishable. | Kept on home and service pages. | L | Fixed in this PR |
| D28 | Radius | Snapshot moved from the square system to pills and 18px cards, matching the new spec, while `DESIGN.md` still describes the green square system. | Two design docs disagree. | The redesign spec is the source of truth for this PR. `DESIGN.md` is the old system. | M | Deferred — do not rewrite DESIGN.md in the same pass as the visual system it contradicts; owner should retire it |
| D29 | Header height | 108px desktop, 84px under 800px, not sticky. | Matches §5. | Kept. | L | Fixed in this PR |
| D30 | Container | `min(1320px, 100% - 112px)`, tighter under 1150 and 640. | Matches §5. | Kept. | L | Fixed in this PR |
| D31 | Home stack table | A full stack table repeated on Home, Services, Industries, and About. | Same picture four times. | Table stays on Services. Others link to `/services#stack`. | M | Fixed in this PR |
| D32 | Empty band | A double hairline sat between process and the stack in the old home. | A section with no content. | Those plates are gone. | M | Fixed in this PR |
| D33 | Mobile phone mock | Empty device frame on the mobile study. | A picture of nothing. | Study plates removed. No fake screenshot was drawn. | M | Fixed in this PR |
| D34 | IoT visual | Boxes labeled “firmware” and “electronics”. | Not a diagram. | Removed with the study plates. | L | Fixed in this PR |
| D35 | Footer | Five columns are tight at 1024. | Labels wrap. | Still five columns. Stacking starts at 800px. | L | Deferred — a four-column footer needs an IA change beyond the contrast and tap fixes |
| D36 | Footer bottom | Three-column bar collapses to one column under 800px. | Readable. | Kept. | L | Fixed in this PR |
| D37 | Chips | Selected service chips did not change color. | The buyer cannot see what they picked. | `:has(input:checked)` uses the accent border. | M | Fixed in this PR |
| D38 | Form fields | Spec radius 14px, panel background, accent focus ring. | Matches §7 Contact. | Kept and used by the new form. | L | Fixed in this PR |
| D39 | Process steps | Spec §6.5 circles and a connecting line were missing. | The process did not look like the spec. | `ProcessSteps` on home, services, and each service page. | M | Fixed in this PR |
| D40 | Breadcrumbs | Inner pages had no way to see where you are except the H1. | Wayfinding. | Breadcrumb under the header on inner pages. | L | Fixed in this PR |
| D41 | Short pages | FAQ, Legal, and Careers were a single narrow column. | The right side was a void at 1440. | Aside from 1150px. | M | Fixed in this PR |
| D42 | Hero subcopy | Max-width 390px matches the spec and leaves a gap beside the orbit. | Intentional measure. | Kept. | L | Fixed in this PR |
| D43 | Accent word | Spec wants one accent word. The hero accents “automation” and “end” plus the period, which is the spec’s own example. | Could be read as two accents. | Left as the spec example. | L | Fixed in this PR |
| D44 | Two-tone H2 | Second line uses `#807b73` (4.69:1). Passes large-text AA, not body AA. | Safe only because the type is large. | Do not reuse that color under 18px. | L | Deferred — current H2 size passes; no small text uses it |
| D45 | Selection and scrollbar | Spec §6.13. | Already in `globals.css`. | Kept. | L | Fixed in this PR |
| D46 | Hanging CTA mark | `cta-sway` 10s. | Matches §8.2. | Kept, and reduced motion kills it. | L | Fixed in this PR |
| D47 | Page background | Flat `#0b0b0b`, no full-page noise. | Matches §3. | Kept. | L | Fixed in this PR |
| D48 | Logo | Orange disc plus Inter Tight wordmark. | Matches §6.2. | Kept. Favicon is the same disc. | L | Fixed in this PR |
| D49 | 404 | Was an unstyled Next default. | Off-brand. | Same type, buttons, and background as the rest of the site. | M | Fixed in this PR |
| D50 | Service page hero card | Tint class is applied, but there is no illustration, only the lead repeated. | The card is thin. | Illustration needs real work images. Not drawn from nothing. | M | Needs owner input |
| D51 | Pricing highlight | The build card is highlighted with no price, so the highlight is emphasis without a number. | Slightly odd, still the main offer. | Kept. The number appears when `startingFrom` is set. | L | Needs owner input |

## 3. Developer

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| V01 | `contact/actions.ts` | Email check was `includes("@")`. | `a@b` was accepted. | Requires a dot in the domain and length limits. | H | Fixed in this PR |
| V02 | Contact form | No per-field errors. | One vague banner. | `fieldErrors` and `aria-invalid`. Verified in the browser: a bad submit returns “Check the highlighted fields…”. | H | Fixed in this PR |
| V03 | Contact form | `aria-live` was on the `<form>`, so the whole form was a live region. | Noisy for assistive tech. | `role="status"` on the message only. | M | Fixed in this PR |
| V04 | Contact form | `.sr-only` was used and not defined, so the honeypot could show. | Bots and humans both see a fake Website field. | Off-screen `.honeypot`. | M | Fixed in this PR |
| V05 | Rate limit | Used the entire `x-forwarded-for` string. | Easy to bypass or to collide. | First hop only. Five hits per 10 minutes. | M | Fixed in this PR |
| V06 | Rate limit | The map lives in one server instance. | A multi-instance deploy does not share it. | Enough for a first cut. A shared store needs a vendor the owner chooses. | M | Deferred — no Redis or Upstash account in the repo |
| V07 | Resend | Production without env vars used to be easy to misread as success. | Lost leads. | Verified on the production server: a valid submit says to email hello@zenxelligence.com. | H | Needs owner input |
| V08 | `CONTACT_FROM` | The default from-address may be unverified in Resend. | The API will 403. | Override with `CONTACT_FROM`. | M | Needs owner input |
| V09 | `next.config.ts` | No security headers. `X-Powered-By` on. | Baseline hardening. | nosniff, Referrer-Policy, SAMEORIGIN, Permissions-Policy, HSTS, `poweredByHeader: false`. | H | Fixed in this PR |
| V10 | CSP | No Content-Security-Policy. | XSS containment. | A strict CSP fights Next inline scripts, JSON-LD, and the WebGL bundle. Not guessed. | M | Deferred — needs a nonce policy tested against the 3D page |
| V11 | Home JS | three.js on the critical path. Live mobile TBT was 1.6s on the old site. | The phone cannot use the page. | Dynamic import, idle mount, poster under 640px, reduced motion, and saveData. `dpr` capped at 1.5. `frameloop="demand"`. Pauses when hidden or offscreen. Production mobile TBT 40ms. | H | Fixed in this PR |
| V12 | Desktop hero | The 3D chunk still downloads after idle on wide screens. | Extra JS for a decoration. | Accepted on desktop. Mobile does not mount it. | M | Deferred — further three.js tree-shaking is a separate pass |
| V13 | `logic-core.tsx` | Labels are projected HTML and can escape a small stage. | Overflow. | The label anchors, pins, and leader lines are removed from the scene. The poster SVG has none either. | H | Fixed in this PR |
| V14 | JSON-LD | `JSON.stringify` without escaping `<`. | The Next docs flag this for XSS. | `jsonLd()` replaces `<`. | M | Fixed in this PR |
| V15 | Organization `sameAs` | LinkedIn, Instagram, WhatsApp, and a 404 GitHub org. | Structured data cited dead URLs. | `sameAs` only lists non-empty `content/site.ts` social URLs. Currently omitted. | H | Fixed in this PR |
| V16 | Root layout canonical | Every route, including 404, inherited `https://www.zenxelligence.com/`. | The 404 canonicalized to home. | Canonical is set per page. 404 has no canonical. Confirmed in the rendered HTML. | H | Fixed in this PR |
| V17 | `next.config` redirects | `/resources/:slug` 301’d to `/resources`. | Real notes could never have URLs. | Redirect removed. Unknown slugs 404. | H | Fixed in this PR |
| V18 | Sitemap | `lastModified: new Date()` on every request. | Crawlers see a constant change. | Fixed date 2026-09-26. | M | Fixed in this PR |
| V19 | Sitemap | `/resources` listed while empty and indexable. | Soft 404 in the index. | Omitted until `POSTS.length >= 2`. | M | Fixed in this PR |
| V20 | `/api/status` | Fake uptime JSON. | A health check that lies. | `{ status: "ok" }`. | H | Fixed in this PR |
| V21 | Client bundle | `site-header` and the form imported `@/lib/site-data`, which also holds every page’s copy, including the old fake clients. | The browser downloaded copy it never rendered, including names that should not ship. | Client UI imports `@/content/site`. Fake client and partner copy deleted. | H | Fixed in this PR |
| V22 | `error.tsx` | Missing. A runtime error was the default Next overlay in dev and a generic page in prod. | No recovery. | Branded error page with reset and Contact. The message is not shown. | M | Fixed in this PR |
| V23 | Favicon | No `icon`. | Browser tab is blank. | `src/app/icon.svg`. | L | Fixed in this PR |
| V24 | Mobile nav | Closed menu was only visually hidden in one breakpoint, and not `inert`. | Focus could enter it. | `hidden` and `inert` when closed. CSS shows it only when open, from 1150px down. | M | Fixed in this PR |
| V25 | `SEARCH_INDEX` | AI agents path was `/products`. | Command palette lied. | Points at `/services/ai-agents`. | M | Fixed in this PR |
| V26 | FAQ page | Accordion headers are H3 (Radix) directly under H1. | `heading-order`. | An H2 “Common questions” comes first. | M | Fixed in this PR |
| V27 | Home H2 animation | Opacity 0.3 failed contrast (Lighthouse). | Accessibility 96 until fixed. | Opacity stays 1. Re-run: accessibility 100. | H | Fixed in this PR |
| V28 | `plate-index.tsx` | Called `Date.now()` during render. ESLint `react-hooks/purity` error. Unused. | Lint failed. Dead Hangly UI. | File removed. | M | Fixed in this PR |
| V29 | `package.json` name | `test-claude-design`. | Confusing in deploy logs. | Left. Renaming the npm package does not change the site. | L | Deferred — cosmetic, not user-facing |
| V30 | Tests | No unit or e2e suite. | Regressions rely on a manual pass. | This PR used `tsc`, ESLint, a production build, route renders, and a form submit in Chrome. | M | Deferred — a Playwright suite is a follow-up, not a blocker for the content fixes |
| V31 | Service pages | `areaServed: "Worldwide"` was almost added. | A claim the site does not make. | Removed. | M | Fixed in this PR |
| V32 | `BLOG_POSTS` and `POSTS` | Two empty post lists. | Easy to fill the wrong one. | Public pages read `content/posts.ts`. The old list remains for the OG and markdown helpers. | L | Deferred — deleting `BLOG_POSTS` touches the markdown mirror; both are empty |
| V33 | Legacy routes | `/services/consulting` and the Pulse page still have page modules, plus redirects. | Dead code still typechecks. | Copy stubs no longer contain fake metrics. Redirects remain. | L | Fixed in this PR |
| V34 | `md-mirror` | `Accept: text/markdown` rewrites before some readers notice. | Useful for agents. It must not serve the old fake pages. | Those page objects no longer contain invented clients. `/clients` still 308s to case studies. | M | Fixed in this PR |
| V35 | Headers on static CSS | A stale `next start` after a rebuild returned 500 `text/plain` for CSS. | Unstyled HTML and false Lighthouse failures. | Restarted the server on the new build. CSS is `text/css`. Not a source bug. | L | Fixed in this PR |
| V36 | Images | Hero poster is an `<img>`, not `next/image`. | The lint rule prefers Image. | SVG poster, with the lint exception, because it swaps with a canvas. | L | Fixed in this PR |
| V37 | Form lengths | No max length. | A multi-megabyte “brief” could be posted. | Name 120, email 200, problem 4000, link 400. | M | Fixed in this PR |
| V38 | Service and timeline values | Not checked against the lists. | Junk in the email. | Whitelist. | M | Fixed in this PR |
| V39 | Link field | Any string was accepted. | Broken URLs in the inbox. | Must start with http or https when present. | L | Fixed in this PR |
| V40 | Honeypot | A filled `website` field returns the success sentence and does not send. | Standard. Bots are not told they failed. | Kept. | L | Fixed in this PR |
| V41 | `security.txt` | Missing. Legal already asks people to mail holes. | Researchers have no standard path. | `public/.well-known/security.txt` points at the same email. No bounty was invented. | L | Fixed in this PR |
| V42 | Analytics | None. | No funnel data. | Not added. The owner picks the vendor. | M | Needs owner input |
| V43 | Source maps and errors | `error.tsx` logs to the console only. | Production errors are invisible to the studio. | Hook a reporter when analytics or Sentry is chosen. | L | Deferred — no vendor |
| V44 | `robots.ts` | Legacy `Disallow` lines advertised old URLs. | The attached audit flagged this. | Allow all. AI crawlers are named. Old paths 301. | M | Fixed in this PR |
| V45 | Duplicate metadata | Home sets its own title and the layout also sets a default. | Easy to drift. | Home uses `title.absolute` so the template is not applied twice. | L | Fixed in this PR |
| V46 | Titles | Several inner titles plus “ — Zen xElligence” exceed ~60 characters. | Truncation in Google. | Shortened the approach title. Others are still long because the phrase is the offer. | L | Deferred — cutting “two engineers, brief to handover” makes the title worse |
| V47 | `generateStaticParams` on case studies | Empty, so there is no bogus `/case-studies/014` page in the build. | The old numeric slugs 301. | Kept. | L | Fixed in this PR |
| V48 | Web vitals widget | Imports `web-vitals` on the web service page only. | It used to ship on the home hero path. | Moved. | M | Fixed in this PR |
| V49 | Focus order | Skip link exists and points at `#main`. | Keyboard entry. | Kept. | L | Fixed in this PR |
| V50 | ESLint and `tsc` | The snapshot’s plate index failed the purity rule. | CI would fail. | Lint is clean. `tsc --noEmit` is clean. `next build` completes. | H | Fixed in this PR |
| V51 | Contact no-JS | `method="post"` and `action={serverAction}`. | A no-JS browser still posts. | Kept, per the Next forms guide. | M | Fixed in this PR |
| V52 | IP ownership in the action | The action does not store submissions when email is unconfigured. | A lead can be lost if Resend is down. | The UI says so. A queue needs a database the owner does not have here. | M | Deferred — no database in the project |

## 4. Industry experts

Ten or more for each line. Tools that are not already published on the site were not filled in.

### Web

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| I01 | `/services/web-apps` | The offer is “design, build, auth, data, and a live API” with no hosting, auth, or test practice named. | A web buyer compares you to a team that names its deploy path. | Fields exist and render when filled. | H | Needs owner input |
| I02 | Web tools | Next.js, React, Node, FastAPI, Django are already on the site. | That list is credible and broad. | Kept. Do not add clouds that are not in `STUDIO_STACK` as a promise. | M | Fixed in this PR |
| I03 | Home web card | Links to the service page. | The card is a doorway, not the whole pitch. | Kept. | M | Fixed in this PR |
| I04 | CWV widget | On the web page, session-only, INP waits for input. | Shows you measure the thing you sell. It is not a fake benchmark. | Placed here, not on the AI page. | M | Fixed in this PR |
| I05 | Handover row | “Live application, auth, and API docs.” | Thin for a production handover (envs, runbook, repo ownership). | `handover` array is empty and hidden. | H | Needs owner input |
| I06 | Security | No mention of OWASP, headers, or dependency review on the web page. | Security buyers ask. | Not invented. Legal says you do not claim SOC 2 or ISO. | H | Needs owner input |
| I07 | Performance | The marketing site itself now keeps the 3D scene off phones. | You cannot sell fast web apps on a slow site. | Mobile TBT 40ms on the production home page. | H | Fixed in this PR |
| I08 | API story | FastAPI and Django are both listed. | A buyer does not know which one they will get. | The page says you choose. The scope names it. | M | Fixed in this PR |
| I09 | Accessibility of the marketing site | Was failing contrast. | You sell interfaces. | Home accessibility 100 after the type fix. | H | Fixed in this PR |
| I10 | Ownership | “Credentials stay in your name” is on the web FAQ. | The right default. | Kept. | M | Fixed in this PR |
| I11 | Testing | No CI, preview, or test stack on the page. | “Production” without a check is a claim. | `testing` array hidden. | M | Needs owner input |

### Mobile

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| I12 | `/services/mobile-apps` | Flutter, React Native, and native are all offered. No OS versions. | “Native” with no minimum OS is vague. | `osSupport` hidden. | H | Needs owner input |
| I13 | Store listing | The page did not say whose developer account ships. | A common dispute. | FAQ tells the buyer to put it in the brief. | H | Fixed in this PR |
| I14 | Crash reporting and OTA | Empty. | Production mobile without a crash path is incomplete. | Fields hidden. | H | Needs owner input |
| I15 | Shared backend | Copy says the app uses the same API as the web product. | The actual differentiator versus a mobile shop. | Kept. | M | Fixed in this PR |
| I16 | Empty device mock | A phone frame with no UI was on the home study. | Implies a product you did not ship. | Removed. No fake screen was generated. | H | Fixed in this PR |
| I17 | Offline, push, deep links | Not mentioned. | Buyers assume them. | Not added. | M | Needs owner input |
| I18 | Store review and signing | Not mentioned. | The last mile of mobile. | Not invented. | M | Needs owner input |
| I19 | One team | “One system, not two” is the pitch. | Matches the studio size if it is true. | Kept as the existing claim. | M | Fixed in this PR |
| I20 | Accessibility on device | Not discussed (dynamic type, TalkBack, VoiceOver). | A gap versus a specialist mobile team. | Not invented. | L | Needs owner input |
| I21 | Handover | “App on the same backend” is the only deliverable line. | Missing build flavors, signing keys, and store metadata. | `handover` hidden. | H | Needs owner input |

### AI agents

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| I22 | `/services/ai-agents` | LangChain, LangGraph, CrewAI, AutoGen are named. Evals are not. | Agent work without evals does not survive contact with production. | `evals` hidden. | H | Needs owner input |
| I23 | Guardrails | No human-in-the-loop statement. | Buyers will not connect tools to an unattended agent. | `guardrails` hidden. | H | Needs owner input |
| I24 | Data privacy | No statement of where prompts and traces live. | This blocks procurement. | `privacy` hidden. | H | Needs owner input |
| I25 | Models | “The model is named in the written scope” is the only public line. | Correct, because no provider was verified beyond the existing tool list. | FAQ says that. It does not name a default vendor. | M | Fixed in this PR |
| I26 | Observability | “Run traces” is promised in the card and not specified. | Traces of what, stored where. | `observability` hidden. | H | Needs owner input |
| I27 | Demo vs system | Copy rejects a chatbot demo. | The right bar. | Kept. | M | Fixed in this PR |
| I28 | CWV widget | Was embedded in this section. | Confuses agents with web perf. | Moved. | M | Fixed in this PR |
| I29 | Tool list vs LlamaIndex | `llms.txt` and the stack table also name LlamaIndex and RAG. The service chips do not. | Two lists. | Service chips stay the shorter published set. The stack table remains on Services. | L | Fixed in this PR |
| I30 | Cost of tokens | Not discussed. | Agent projects die on usage cost. | Not invented. The pricing page already says constraint changes the number. | M | Deferred — say it when a real pricing note exists |
| I31 | Evaluation data | No sample task or trace. | Proof would be a case study. | Hidden until `case-studies.ts` has an agents entry. | H | Needs owner input |

### IoT

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| I32 | `/services/iot` | No MCU, RTOS, radio, or PCB tool. | An electronics buyer cannot qualify you. | Arrays exist and are empty. | H | Needs owner input |
| I33 | Certifications | None listed. The FAQ says certification is only in the scope. | Prevents implying CE, FCC, or BIS. | Kept that limit. | H | Fixed in this PR |
| I34 | “Not a kit” | The differentiator versus a dev-board shop. | Good if the work really ships in a product. | Kept. | M | Fixed in this PR |
| I35 | Cloud for devices | Empty. | MQTT versus HTTPS matters. | `cloud` and `connectivity` hidden. | H | Needs owner input |
| I36 | OTA | Empty. | Field devices without an update story are a liability. | Hidden. | H | Needs owner input |
| I37 | Firmware wordmark | The chip still says “firmware” in lowercase. | Looks like a placeholder tool. | Replace when real tools are added. | L | Needs owner input |
| I38 | Safety | No statement on what you will not put on a mains or medical device. | Scope risk. | Not invented. | H | Needs owner input |
| I39 | Mechanical and enclosure | Not mentioned. | IoT often dies on the enclosure. | Not added. | M | Needs owner input |
| I40 | Same product backend | The device is described as talking to the product, not as a standalone gadget. | Matches the studio’s end-to-end claim. | Kept. | M | Fixed in this PR |
| I41 | Manufacturing | No DFM, fab, or assembly partner. | “Electronics” can mean a prototype or a run. | Not invented. | H | Needs owner input |

### VLSI

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| I42 | `/services/vlsi` | “Spec and RTL through verification, implementation, and sign-off” with no HDL, simulator, or PDK. | A silicon buyer will not engage on that sentence alone. | Detail arrays hidden. | H | Needs owner input |
| I43 | Scope boundary | Two people cannot silently mean a full SoC at an advanced node. | The biggest overclaim risk on the site. | `scope` is empty so the page does not add a node or a tapeout. | H | Needs owner input |
| I44 | Sign-off | The word is used. The checks (lint, CDC, formal, STA, DRC) are not. | “Sign-off” means a specific list. | `verification` hidden. | H | Needs owner input |
| I45 | FPGA vs ASIC | Not distinguished. | Buyers hear different things. | Not guessed. | H | Needs owner input |
| I46 | IP and foundry | No foundry, no third-party IP policy. | Contractual. | Not invented. | H | Needs owner input |
| I47 | Handover | “Signed-off design, ready to hand over.” | Better than a netlist in email, still vague. | Existing line kept. Pack contents wait on the owner. | M | Needs owner input |
| I48 | One team through handover | The page says you do not pass the design to another house. | The actual promise. | Kept, including the FAQ. | M | Fixed in this PR |
| I49 | EDA names | The old design doc says not to invent EDA vendors. | Correct. | None added. | H | Fixed in this PR |
| I50 | Education pillar | Architect Training is on the approach page, not on the VLSI page. | A training buyer may miss it. | It remains on `/industries` and in the services stack note. | L | Fixed in this PR |
| I51 | Case study | No silicon example. | Required before this line converts. | Hidden. | H | Needs owner input |

## 5. SEO

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| S01 | Canonical host | Live site 308s apex to www while older canonicals pointed at the apex. | Split signals. | `metadataBase` and canonicals use `https://www.zenxelligence.com` unless `NEXT_PUBLIC_SITE_URL` overrides. | H | Fixed in this PR |
| S02 | 404 canonical | Pointed at `/`. | Soft home duplicate. | No canonical. `noindex`. Title confirmed in HTML. | H | Fixed in this PR |
| S03 | Titles | Home title is absolute so it is not “Title — Zen — Zen”. | Double brand. | `title.absolute` on home. | M | Fixed in this PR |
| S04 | Descriptions | Each indexable page has a description under the layout default. | Snippets. | Kept in `page-metadata.ts`. | M | Fixed in this PR |
| S05 | `/industries` title | Was the trademark string, which does not match the H1 “Our approach.” | Title and H1 disagreed. | Title is “Our approach”. | M | Fixed in this PR |
| S06 | Service URLs | Five indexable URLs with their own titles and canonicals. | One page was doing five jobs. | `/services/web-apps` and the other four are in the sitemap. | H | Fixed in this PR |
| S07 | Sitemap | Included redirects and empty resources. | Wasted crawl. | Only live routes. Resources omitted until there are two posts. | H | Fixed in this PR |
| S08 | `lastmod` | Changed every request. | Useless. | Stable date. | M | Fixed in this PR |
| S09 | robots | AI bots allowed. Legacy Disallow removed. | Old paths are redirected instead of blocked. | `robots.ts`. | M | Fixed in this PR |
| S10 | OG | One image route, orange ground, per-route title. | Shares. | Service paths included. | M | Fixed in this PR |
| S11 | OG font | Not Inter Tight. | Slightly off-brand shares. | Needs a font file. | L | Deferred — see D23 |
| S12 | Headings | FAQ H3 under H1. | `heading-order` failed on the live site. | H2 inserted. Home Lighthouse heading-order passed. | H | Fixed in this PR |
| S13 | One H1 | Confirmed on the rendered routes checked. | Basic. | Kept. | M | Fixed in this PR |
| S14 | Internal links | Service anchors use “Web app development” and similar, not “See web apps” alone. | Anchor text. | Footer and cards. | M | Fixed in this PR |
| S15 | `/products/pulse` | 301 to `/products`. | Old URL. | Kept. | M | Fixed in this PR |
| S16 | Consulting URLs | 301 to `/services`. | Old IA. | Kept. | M | Fixed in this PR |
| S17 | `/resources` index | Empty and was indexable. | Thin content. | `noindex` until two posts. | H | Fixed in this PR |
| S18 | RSS | `/resources/feed.xml` is real XML, not the HTML page. | The live bug in the attached audit. | Route returns RSS. Empty channel until posts exist. | M | Fixed in this PR |
| S19 | `llms.txt` | Used the apex host and a “Not sold: Pulse” line. | Wrong host, negative entity. | Regenerated on www with positive facts only. | H | Fixed in this PR |
| S20 | JSON-LD Organization | Missing logo. `sameAs` was dirty. | Entity confusion. | Logo URL is `/icon.svg`. `sameAs` omitted until URLs are real. `numberOfEmployees` 2 matches the copy. | H | Fixed in this PR |
| S21 | Founder Person nodes | Cannot be emitted. | Weaker entity. | Omitted until `team.ts` has names. | H | Needs owner input |
| S22 | FAQPage | Only `/faq` emitted it, while other pages showed FAQs. | Lost rich results. | Home, services, pricing, products, careers, case studies, and each service page emit the questions that are visible. | H | Fixed in this PR |
| S23 | BreadcrumbList | Missing on inner pages. | SERP trail. | JSON-LD plus visible crumbs. | M | Fixed in this PR |
| S24 | Service schema | Missing on the five service routes. | Service queries. | Added, without a fake area or price. | H | Fixed in this PR |
| S25 | SearchAction | No site search URL. | A fake SearchAction 404s. | Not added. The command palette is not a public search endpoint. | M | Fixed in this PR |
| S26 | Keywords meta | Layout still lists a keyword string. | Ignored by Google, harmless. | Left. | L | Deferred — removing it does not change ranking |
| S27 | Hreflang | English only, no alternates. | Correct if you only publish English. | Not invented. | L | Fixed in this PR |
| S28 | Image sitemap | No content images. | Nothing to list. | Not added. | L | Deferred — no real photos |
| S29 | Core Web Vitals of this site | Old mobile home was performance 59, TBT 1.6s. | Ranking input. | Production mobile home: performance 98, TBT 40ms, LCP 2.4s, CLS 0. | H | Fixed in this PR |
| S30 | LCP element | Was delayed by the 3D boot. | LCP. | Poster is in the HTML. 3D waits for idle and only on large screens. | H | Fixed in this PR |
| S31 | Canonical on service pages | Confirmed `https://www.zenxelligence.com/services/vlsi`. | Right host. | Kept. | H | Fixed in this PR |
| S32 | Trailing slash and host | Sitemap locs have no trailing slash. Home is the bare origin. | Consistent. | Kept. | L | Fixed in this PR |
| S33 | Duplicate stack text | Same tool list on four URLs. | Thin duplication. | One table, on Services. | M | Fixed in this PR |
| S34 | Case study URLs | None to index. | No work queries. | Will appear when studies exist. | H | Needs owner input |
| S35 | About page | No person names for “Zen xElligence founder” queries. | You will not rank for a name you have not published. | Waiting on `team.ts`. | H | Needs owner input |
| S36 | Title length on services index | “Services — web, mobile, AI agents, IoT, and VLSI — Zen xElligence” is long. | Truncates. | The keywords are the point of the title. | L | Deferred — shortening drops a service |
| S37 | `robots` host | `Host:` is not a Google directive. | Harmless extra line. | Left so the preferred host is explicit for other bots. | L | Deferred — not harmful |
| S38 | Status route | Was indexable JSON with fake stats if linked. | Bad snippet. | Not in the sitemap. Returns no marketing numbers. | M | Fixed in this PR |
| S39 | Markdown mirror | Not linked in the sitemap. | Fine. | Left as a content-negotiation rewrite. | L | Fixed in this PR |
| S40 | Legal anchors | `/legal#privacy` and the others are real ids. | Footer links work. | Kept. | L | Fixed in this PR |
| S41 | Open Graph url | Per page, www. | Shares. | Set in `pageMetadata` and service metadata. | M | Fixed in this PR |
| S42 | Twitter card | `summary_large_image` using the same OG image. | Shares. | Kept. | L | Fixed in this PR |
| S43 | No blog cadence | Resources is empty. | No fresh URLs. | Correct until notes exist. | M | Needs owner input |
| S44 | Internal orphan risk | Field notes hidden. | Good. | Footer filter. | L | Fixed in this PR |
| S45 | Redirect chain | Apex to www is a platform concern, not in this repo. | Still the owner’s DNS. | Canonicals already use www. | M | Needs owner input |
| S46 | `llms.txt` linked from resources code block | Now the www URL. | Consistent. | Updated. | L | Fixed in this PR |
| S47 | Heading text | Home H1 contains the five services in plain text. | The query terms are in the H1, not only in images. | Kept. | M | Fixed in this PR |
| S48 | Alt text | Poster is decorative (`alt=""`). The canvas has an accessible name. | No keyword stuffing in alt. | Kept. | L | Fixed in this PR |
| S49 | Pagination | None. | N/A. | Not added. | L | Deferred — no lists long enough |
| S50 | Mobile friendliness | No horizontal overflow at 390 on the routes measured. | Mobile-first indexing. | Orbit labels removed. Grids stay inside the viewport. | H | Fixed in this PR |
| S51 | Structured data errors | Lighthouse structured-data audit did not fail on the home page. | Validity. | Sanitized JSON-LD. | M | Fixed in this PR |

## 6. AEO (being cited by answer engines)

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| A01 | Entity | The studio is “two engineers” but the people are unnamed. | Models will not attribute the work to a person. | Person nodes wait on `team.ts`. | H | Needs owner input |
| A02 | `llms.txt` | Old file used the apex and ended on “Not sold: Pulse”. | Negative facts get quoted. | Positive, checkable facts on the www host. Explicitly says what is omitted. | H | Fixed in this PR |
| A03 | Organization schema | `sameAs` pointed at URLs that 404 or are not phones. | Models repeat bad profiles. | Omitted. | H | Fixed in this PR |
| A04 | FAQ content | Answers are short and match the visible copy. | Citability. | Home emits FAQPage for the five visible questions. `/faq` emits the full list. | H | Fixed in this PR |
| A05 | FAQ vs visible text | Schema must match the page. | Google can ignore mismatched FAQ. | Service FAQ schema is the same array the page renders. | H | Fixed in this PR |
| A06 | Fake numbers | Status JSON, Pulse stats, “312 deployments”, “300+ platforms”, invented quotes. | Models cite the most specific number they find. | Deleted from the content module and the status route. | H | Fixed in this PR |
| A07 | AI crawlers | GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot-Extended are allowed. | Blocking them hides the studio from answers. | `robots.ts`. | H | Fixed in this PR |
| A08 | `llms.txt` discovery | It is at `/llms.txt` and mentioned on the resources page. | Some crawlers look for it. | Kept and rewritten. | M | Fixed in this PR |
| A09 | Markdown mirror | `Accept: text/markdown` still works. | Useful for agents that prefer markdown. | Fake pages no longer have invented clients in the source it reads. | M | Fixed in this PR |
| A10 | Service schema | Each surface is a `Service` with a stable URL. | “Who builds VLSI in a small studio” can point at a URL. | Added. | H | Fixed in this PR |
| A11 | Offer prices | No `price` in schema. | A made-up price would be cited. | Omitted. | H | Fixed in this PR |
| A12 | `numberOfEmployees` | 2, matching the copy. | A checkable fact. | Kept. | M | Fixed in this PR |
| A13 | Address | None. | Do not let a model invent a city. | `llms.txt` says location is omitted. | H | Needs owner input |
| A14 | Founding year | None. | Same. | Omitted. | M | Needs owner input |
| A15 | Tools | Only tools already on the site are repeated in `llms.txt`. | Extra tool names become false citations. | No new vendors. | H | Fixed in this PR |
| A16 | Case studies | The page says a file appears when the client agrees. | Models should not invent a portfolio. | That sentence is the public fact. | H | Fixed in this PR |
| A17 | Pulse | Removed from rendered copy, legal, products, and the machine-lens stub. | Stops “Zen xElligence Pulse” answers. | Done. | H | Fixed in this PR |
| A18 | Partner badges | Removed. | Stops “NetSuite partner” answers. | Done. | H | Fixed in this PR |
| A19 | Question headings | FAQ questions are real buyer questions, not “Click here”. | Extractable Q&A. | Kept and extended with ownership. | M | Fixed in this PR |
| A20 | Accordion | Answers are in the HTML (`forceMount`). | Crawlers see them without a click. | Kept. | M | Fixed in this PR |
| A21 | Speakable / citation anchors | No `id` on each answer. | Harder to deep-link a sentence. | Questions are the headings. | L | Deferred — ids are nice and not required for the FAQ schema |
| A22 | Author byline | Posts have no author because there are no posts and no public names. | Articles would be anonymous. | `posts.ts` can grow a byline when both exist. | M | Needs owner input |
| A23 | Date on facts | Sitemap `lastmod` is a real edit date, not “now”. | Stale-now signals. | Fixed date. | L | Fixed in this PR |
| A24 | Contact fact | hello@zenxelligence.com and one business day are repeated in hero, form, FAQ, and `llms.txt`. | Consistent citation. | Kept. | M | Fixed in this PR |
| A25 | Ownership fact | “You own what we ship” is on products, legal, FAQ, and `llms.txt`. | The offer is quotable. | Kept. | M | Fixed in this PR |
| A26 | Process fact | Brief, scope, build, handover is the same four steps on home and service pages. | One process to cite. | Component reused. | M | Fixed in this PR |
| A27 | ZX A³ | Explained in one sentence on the approach page and in the FAQ. | The mark is defined, not just displayed. | Kept, and the page is no longer pretending to be an industry list. | M | Fixed in this PR |
| A28 | Comparisons | No “versus agency X” page. | Nothing false to cite. Not a gap that needs filler. | Not added. | L | Deferred — comparison pages need real differences, not slogans |
| A29 | Original data | The only measurements published are the visitor’s own CWV on the web page. | Good. Do not publish a lab score as a client result. | Widget is session-only. | M | Fixed in this PR |
| A30 | `security.txt` and legal | Point at the same mailbox. | One contact for “how do I report a hole”. | Aligned. | L | Fixed in this PR |
| A31 | Social proof | Hidden rather than fabricated. | Models prefer a quote to a gap. A fake quote is worse. | Empty state is explicit. | H | Fixed in this PR |
| A32 | Homepage first paragraph | The lede states who, what, and the boundary (“you don’t need to know the tools”). | First-paragraph citation. | Kept. | M | Fixed in this PR |
| A33 | H1 as a definition | The H1 lists the five lines of work. | Extractable. | Kept as three lines. | M | Fixed in this PR |
| A34 | Negative space in old `llms.txt` | “No SaaS seats” is still true and is now said as “you own what ships”. | Clearer. | Rewritten. | M | Fixed in this PR |
| A35 | Machine-lens page | Claimed an MCP server, a status API, and a Pulse measurement. | False capabilities. | Redirects home. Stub copy no longer describes those systems. | H | Fixed in this PR |
| A36 | Breadcrumbs | Give a model the site structure. | Inner pages. | Added. | M | Fixed in this PR |
| A37 | Canonical URLs in schema | Service `url` uses www. | One URL per entity. | Matches canonical. | M | Fixed in this PR |
| A38 | Language | `lang="en"` and WebSite `inLanguage`. | Correct locale. | Kept and added. | L | Fixed in this PR |
| A39 | Logo | Organization `logo` points at the icon. | Entity image. | `/icon.svg`. | L | Fixed in this PR |
| A40 | KnowsAbout | Five disciplines on the organization node. | Topical entity. | Added from the published offer. | M | Fixed in this PR |
| A41 | ContactPoint | Email, sales, English. | How to reach the entity. | Kept. | L | Fixed in this PR |
| A42 | Empty resources | A model that hits `/resources` sees “no posts yet”, and the page is `noindex`. | Will not cite a blog that does not exist. | Done. | M | Fixed in this PR |
| A43 | Pricing quotability | “Written scope first, then a number” and “one business day”. | The commercial fact. | On the page, FAQ, and `llms.txt`. | M | Fixed in this PR |
| A44 | Engagement names | Scoping sprint, build, retainer. | Three nouns a model can repeat without inventing a SKU. | Cards. | M | Fixed in this PR |
| A45 | What we will not pretend | `llms.txt` lists the omitted facts. | Instructs a careful reader not to fill gaps. | Added. | H | Fixed in this PR |
| A46 | Duplicate FAQ wording | Home uses five of the FAQ items, not a paraphrase. | Same answer everywhere. | Sliced from `FAQ_ITEMS`. | M | Fixed in this PR |
| A47 | WebSite node | No potential search action. | Avoids a broken “search the site” citation. | Omitted. | L | Fixed in this PR |
| A48 | Old green site | The live domain may still be the previous build until this ships. | Models cite whatever is live. | This PR is the replacement. DNS is already www. | H | Needs owner input |
| A49 | Per-service FAQ | Four of the five lines now answer the obvious specialist question without new metrics. | A VLSI or IoT answer can point at the service URL. | On-page and in FAQ schema. | M | Fixed in this PR |
| A50 | Citation of tools | IoT and VLSI pages do not name tools the studio has not published. | Prevents “they use Cadence” style hallucinations from our own HTML. | Empty arrays. | H | Fixed in this PR |
| A51 | Content negotiation | The proxy rewrites markdown before the HTML shell. | Agents that send `Accept: text/markdown` get the page, not a tag soup. | Kept. | L | Fixed in this PR |

## 7. Business owner

| ID | Page / area | Finding | Why it matters | Fix | Priority | Status |
|---|---|---|---|---|---|---|
| B01 | Positioning | “Two engineers, five disciplines, brief to handover” is clear. Proof is not. | The offer is understandable and still hard to buy. | Proof waits on real studies and names. | H | Needs owner input |
| B02 | Nav | Was a long template nav. | Too many doors, weak close. | Services, Pricing, About, Contact. Start a build is the header button. | H | Fixed in this PR |
| B03 | Products in the header | Read as a second business. | Splits attention. | Footer only, retitled. | H | Fixed in this PR |
| B04 | Pricing | No public number is an honest choice and a conversion cost. | Some buyers will not write blind. | Show the three shapes. Publish floors when you will stand behind them. | H | Needs owner input |
| B05 | Budget field | Only “Not sure yet”. | You learn nothing about fit. | Add ranges you actually use. | H | Needs owner input |
| B06 | Lead form | Now qualifies service, timeline, and problem, and fails visibly. | You can reply with a plan. | Shipped. Wire Resend or leads stop at the inbox instruction. | H | Needs owner input |
| B07 | Reply SLA | One business day is repeated next to the button. | Sets the expectation you already claim. | Kept. | M | Fixed in this PR |
| B08 | Booking | No calendar. | Loses people who will not type a brief. | `bookingUrl`. | M | Needs owner input |
| B09 | Trust | Fake logos and badges were in the data file. | One leak ends the studio’s credibility. | Removed. | H | Fixed in this PR |
| B10 | Pulse | A product you do not sell was still in the copy and the status API. | Confuses the offer with a SaaS. | Removed from rendered and API surfaces. | H | Fixed in this PR |
| B11 | Case studies | Empty on purpose. | The highest-intent page does not convert. | Honest line. Fill `case-studies.ts` when a client agrees. | H | Needs owner input |
| B12 | About | Anonymous team. | People buy the two engineers, not the mark. | Ready for bios. Hidden until then. | H | Needs owner input |
| B13 | Industries | Pretending to cover verticals you have not named is worse than “our approach”. | Trust. | Renamed. | H | Fixed in this PR |
| B14 | Five services | The menu is wide for two people. | A buyer may not believe VLSI and mobile from the same pair. | The copy says one surface is a complete job, and that you say no when it is too much. That limit should stay. | H | Fixed in this PR |
| B15 | VLSI scope | The widest claim on the site has the least detail. | It can attract the wrong brief. | Do not add a node. Write the real boundary in `scope`. | H | Needs owner input |
| B16 | Retainer | Listed with no price and no hours. | Fine as a shape. | Card shows includes only. | M | Fixed in this PR |
| B17 | Scoping sprint | Described as a written scope and a fixed quote, no fee. | The entry product. | Card is there. Fee is empty. | M | Needs owner input |
| B18 | Fixed bid vs T&M | Still explained. | Matches how you already sell. | Kept on the pricing page. | M | Fixed in this PR |
| B19 | “What moves the number” | Surfaces, constraint, ownership. | Teaches the buyer before the call. | Kept. | M | Fixed in this PR |
| B20 | CTA | Every page ends in the same ask. | One action. | “Start a build” plus pricing or FAQ. | M | Fixed in this PR |
| B21 | Footer IA | Careers, approach, and what-you-get are out of the header and still findable. | Cleaner buy path, nothing deleted. | Footer columns. | M | Fixed in this PR |
| B22 | Careers | No fake opening. | You do not look like you are staffing up. | One sentence. | L | Fixed in this PR |
| B23 | Resources | Not a content-marketing promise you are not keeping. | Focus. | Hidden until two notes. | M | Fixed in this PR |
| B24 | Social | Unpublished rather than wrong. | A dead icon is worse than none. | Hidden. | M | Fixed in this PR |
| B25 | Email | The only reliable channel. | It has to work. | Form falls back to the mailbox in production until Resend is set. | H | Needs owner input |
| B26 | Analytics | You cannot see which service page starts a build. | Pricing and copy decisions stay blind. | Not installed. | M | Needs owner input |
| B27 | Home order | Hero, four facts, five services, four steps, questions, orange close. | A short path to the form. | Replaced the plate index and the repeated studies. | H | Fixed in this PR |
| B28 | Mobile performance | A slow phone home page loses the brief. | Revenue. | 3D stays off small screens. TBT 40ms. | H | Fixed in this PR |
| B29 | 404 | Sends people to Services or Contact. | Recovers a bad link. | Branded page. | M | Fixed in this PR |
| B30 | Ownership | Stated as the commercial difference versus a seat license. | The reason to hire you instead of a SaaS. | On products, FAQ, legal, llms. | H | Fixed in this PR |
| B31 | Hosting | “In your account” is the commercial boundary. | Avoids a surprise retainer for hosting you do not sell. | Kept. | M | Fixed in this PR |
| B32 | Subcontracting | Copy says you will not hide a subcontract. | Sets a limit you can be held to. | Kept on About. | M | Fixed in this PR |
| B33 | Training | Architect Training is a quiet fourth offer inside Architected. | Easy to miss, and easy to oversell. | Stays on the approach page. Not given a fake curriculum. | L | Fixed in this PR |
| B34 | Quote speed | “First reply in a business day” is not “a price in a business day”. | The FAQ already separates them. | Kept. | M | Fixed in this PR |
| B35 | Paid slice | FAQ allows a paid scope as a start. | A small yes. | Kept. The price of that slice is not public. | M | Needs owner input |
| B36 | Competitive frame | “You should not need five vendors” is the line. | Good. It needs one example. | Example waits on a case study. | H | Needs owner input |
| B37 | Risk reversal | No sample, warranty, or kill fee is published. | Buyers ask. | Not invented. | M | Needs owner input |
| B38 | Contract | Legal says work starts after a written scope. | Aligns the site with how you sell. | Kept. | M | Fixed in this PR |
| B39 | Privacy of leads | The form lists the fields you store in the email. | Matches the privacy paragraph. | Updated. | M | Fixed in this PR |
| B40 | Brand | Orange system is consistent enough to look like one studio. | Trust at a glance. | Spec tokens kept. Contrast adjusted where they failed AA. | M | Fixed in this PR |
| B41 | Name | “Zen xElligence” and the email domain match. | Entity. | Kept. | L | Fixed in this PR |
| B42 | Trademark line | ZX A³ is explained once, not used as a nav item. | Less jargon in the buy path. | Header does not include it. | M | Fixed in this PR |
| B43 | Search | Command palette still exists for people who know it. | Not the primary funnel. | Labeled, and hidden on small screens. | L | Fixed in this PR |
| B44 | Service-specific close | Each service page ends in “Start this build”. | The click is tied to the page they read. | Kept. | M | Fixed in this PR |
| B45 | Qualification | Timeline options are qualitative, not dates you cannot keep. | Honest. | “As soon as we can start”, “This quarter”, “Later”. | L | Fixed in this PR |
| B46 | Empty case studies in the footer | Still linked. | A buyer can hit the honest page. The header does not promise a portfolio. | Footer keeps the link. Header does not. | M | Fixed in this PR |
| B47 | Two-engineer capacity | The site says you decline work two people should not carry. | Protects delivery. | Kept. | H | Fixed in this PR |
| B48 | Measurement | You measure your own marketing site’s CWV on the web page. | A small proof of craft, not a client metric. | Session widget only. | L | Fixed in this PR |
| B49 | Deploy | This PR does not change DNS or Resend. | The live green site stays until you ship and set env vars. | Owner deploys and sets `CONTACT_*`. | H | Needs owner input |
| B50 | Offer clarity | A stranger can now say what you sell, how a job starts, and what they own. They still cannot say what it costs or who did a previous job. | That is the remaining commercial gap, and it is data, not layout. | Fill the content files listed at the top. | H | Needs owner input |
| B51 | Negative pricing chips | “What this page will not list” spent the page refusing. | Wastes the moment. | Removed. | M | Fixed in this PR |

## What was measured

| Check | Result |
|---|---|
| Home H1 at 1440 | 96.48px, three lines, “End to end.” intact |
| Home H1 at 390 | 57px |
| Horizontal overflow | 0 at 390 and 768 on the routes measured. At 1440, `scrollWidth` is 15px under `innerWidth` (scrollbar), not over it. |
| Strings removed from rendered home and about | Plate index, commit local, Pulse, NetSuite, TBD, “01 Us” |
| 404 | Title “Page not found — Zen xElligence”, `noindex`, no canonical |
| Contact form in Chrome | Invalid submit shows field errors. Valid submit without Resend shows the email fallback. |
| Mobile Lighthouse, production `/` | Performance 98, Accessibility 100, Best practices 100, SEO 100, TBT 40 ms, LCP 2.4 s, CLS 0 |
| `tsc`, ESLint, `next build` | Pass |
