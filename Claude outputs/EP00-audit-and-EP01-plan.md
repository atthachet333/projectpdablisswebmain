# PDA BLISS Corporate Website V2 — EP00 Repository Audit

**Repository:** `D:\S2A_PROJECT\projectpdablisswebmain` (origin `github.com/atthachet333/projectpdablisswebmain`)
**Audit date:** 2026-10-28 · **Mode:** read-only — no file in the repository was modified, nothing was built, nothing was deployed.
**Evidence base:** every source/config file under `frontend/src`, `backend/src`, root configs, git metadata, the latest PM2 process snapshot (`D:\S2A_PROJECT\_deploy\logs\pm2-pre-20261021-194829.json`, captured 2026-10-21), and a live fetch of `pdabliss.com`.

---

## 0. Executive summary

| # | Finding | Severity |
|---|---|---|
| 1 | **Production is served in-place from this working tree.** PM2 app `pda-bliss-web` runs `pm2 serve` on `projectpdablisswebmain\frontend\dist`. Any `npm run build` in this folder — on any branch — ships to pdabliss.com immediately. | **Critical** |
| 2 | **This repo's backend is not running in production.** No PM2 process points at `projectpdablisswebmain\backend`. The only "pdabliss" backend is `pdabliss-backend` from a *different* repo (`D:\S2A_PROJECT\projectpdabliss\backend`). Where `/api/contact` on pdabliss.com actually goes is unverified — contact leads may be lost or landing in another codebase. | **High** |
| 3 | The current site is positioned as **"PDA BLISS SOLUTIONS" — migrant-worker documents, membership packages, business/accounting consulting.** This is a completely different business message from the V2 scope (software engineering + consulting). | Strategic |
| 4 | The live homepage shows **20 generic partner names** ("Nexon Industries", "Oceanic Supply"…) and **5 named testimonials** that look like placeholders. These conflict with spec Rule 20 (no fabricated clients/testimonials). | High (reputational) |
| 5 | Stack is a **client-rendered Vite SPA + JSON-file Express API**. No database, no CMS, no SSR, no OG/sitemap, no lint/test tooling installed. Most V2 requirements (Sections 15–18, 21) need new infrastructure. | Structural |
| 6 | One **uncommitted production edit** exists: `frontend/vite.config.ts` (`allowedHosts: pdabliss.com` + `/api` proxy). A branch switch or reset would lose it. | Medium |

---

## 1. Current architecture

```
projectpdablisswebmain/            root package.json → "pda-bliss-solutions" (concurrently runner)
├── frontend/   React 18 + Vite 5 + TypeScript 5 + Tailwind 3  (pure CSR SPA, port 5555 in dev)
├── backend/    Express 4 + TypeScript (CommonJS), JSON files as data store (port 5556)
├── .claude/launch.json            dev launcher (frontend only)
├── IMAGE_PLACEMENT_GUIDE.md
└── README.md                      describes Vercel/Railway deploy — does NOT match reality
```

- **Git:** branch `main` @ `3200b86`, cloned 2026-08-27 11:13 (+07). Single commit history locally; no other branches.
- **Working-tree state:** all text files have CRLF endings (Windows autocrlf). After normalising line endings, the **only real local change is `frontend/vite.config.ts`** (production host/proxy settings, edited 2026-08-27 11:29).
- **Rendering:** SPA. `index.html` ships an empty `<div id="root">`; title/description are swapped client-side by `App.tsx`. Crawlers that don't execute JS see one generic Thai title for every URL.
- **Data flow:** most copy comes from `locales/{th,en}/common.json` + `data/company.ts`; only testimonials (homepage), packages (pricing) and contact submit touch the API.

## 2. Existing routes (frontend — `src/App.tsx`)

| Path | Page | Notes |
|---|---|---|
| `/` | HomePage | Hero, TrustBar, Services, About, Stats, WhyUs, Process, Testimonials, ClientLogos, CTA; inline JSON-LD `ProfessionalService` |
| `/about` | AboutPage (34 KB) | hero illustration, expertise cards, process timeline (team image slots exist in `config/images.ts` but are not rendered) |
| `/services` | ServicesPage | anchors `#foreign-labor`, `#membership`, `#consulting` |
| `/pricing` | PricingPage (53 KB) | membership packages from `/api/packages`, 127 hard-coded Thai fragments |
| `/contact` | ContactPage (39 KB) | react-hook-form + zod → `POST /api/contact`; references missing `/location-map.png` |
| `/privacy`, `/terms` | legal pages | |
| `/dev/image-guide` | ImageGuidePage | `import.meta.env.DEV` only |
| `*` | inline 404 | |

None of the V2 routes exist yet (`/company`, `/consulting`, `/services/*`, `/solutions/*`, `/work/*`, `/knowledge/*`).

## 3. Frontend architecture

- **Entry:** `main.tsx` → `App.tsx` (BrowserRouter, `lazy()` per page, framer-motion `AnimatePresence` page transitions honouring `prefers-reduced-motion`, skip-link, `ScrollProgress`, `ScrollToTop`, `FloatingContact`).
- **Layout:** `Header` (nav from `NAV_ITEMS`, `LanguageSwitcher`, `BrandLogo`), `Footer`, `FloatingContact`.
- **Components:** 9 common, 9 home sections, 4 layout. Image system: `config/images.ts` + `SmartImage` + `ServiceImageFrame` (designed around opaque poster PNGs).
- **i18n:** i18next + react-i18next, `th` default, `en` secondary, detection via `localStorage['pda-language']` only — **no URL locale**, so EN pages are not indexable separately.
- **Styling:** Tailwind 3 with a custom green/black palette (`deep-green #064E2B`, `primary-green #0E8F4D`, `bright-green #19B965` …) plus legacy aliases; `index.css` 616 lines, 17 keyframes.
- **Fonts:** Google Fonts — Anuphan (Thai), Manrope, Plus Jakarta Sans (render-blocking stylesheet).
- **Production bundle (current `dist`):** 920 KB JS total; first load ≈ 606 KB (index 217 KB + router chunk 162 KB + motion 123 KB + CSS 105 KB). ContactPage chunk 113 KB.

## 4. Backend architecture

- `server.ts` → `app.ts`: helmet, CORS allowlist (`FRONTEND_URL`, `localhost:5555`), morgan, JSON body limit 10 MB, `/api` router, 404 + error handler (stack hidden in production).
- **Layering:** routes → controllers → services → `data/*.json` (imported at build time via `resolveJsonModule`). Content is localised server-side via `Accept-Language` (`th`/`en`).
- **Validation:** zod (`contactValidator.ts`, Thai error messages).
- **Persistence:** contact submissions appended to `path.join(__dirname,'../data/submissions.json')` → in production that resolves to `backend/dist/data/submissions.json`. Synchronous read-modify-write, no locking, no notification (email/LINE), no admin to read them.
- **Rate limiting:** `contactRateLimiter` 5 req / 15 min / IP. `generalRateLimiter` is defined but never mounted. `app.set('trust proxy')` is **not** set.
- No auth, no database, no admin, no tests.

## 5. Existing APIs

| Method | Path | Source | Consumed by frontend? |
|---|---|---|---|
| GET | `/api/health` | inline | defined in `api.ts`, unused |
| GET | `/api/services` | `services.json` (3 services: migrant-worker docs, membership, consulting) | defined, **unused** (services copy comes from locales) |
| GET | `/api/packages` | `packages.json` (3 plans, from 990 THB/mo) | PricingPage |
| GET | `/api/testimonials` | `testimonials.json` (5 items) | TestimonialsSection (with hard-coded fallbacks) |
| GET | `/api/faqs` | `faqs.json` (8 items) | defined, **unused** |
| POST | `/api/contact` | zod → JSON file | ContactPage |

No endpoint from spec Section 15 exists yet.

## 6. Content currently hard-coded

| Location | Content | Status / issue |
|---|---|---|
| `frontend/src/data/company.ts` | `COMPANY_INFO` (names, phone `0638693614`, email, LINE `@pdabliss`, address "88/8 อาคารไทยธุรกิจ ชั้น 5 ถ.พระราม 4", `website: www.pdabliss.co.th`, founded 2016, social links), `NAV_ITEMS`, `WHY_CHOOSE_US` | Used across 10 files. **Address, founding year and social URLs need owner verification.** JSON-LD uses `https://www.pdabliss.co.th` — wrong domain for pdabliss.com. |
| same file | `COMPANY_STATS` (1,000+ clients, 10,000+ docs, 98 %), `TEAM_MEMBERS` (4 named people), `TIMELINE_EVENTS`, `COMPANY_VALUES`, `CLIENT_LOGOS`, `PROCESS_STEPS`, `HOME_FAQ`, `CONTACT_*` | **Defined but unused** — dead code containing unverified claims. Must not be migrated. |
| `frontend/src/data/partners.ts` | 20 partner names with `website: "#"` | **Rendered on the live homepage** (ClientLogosSection). Look like placeholders. |
| `backend/src/data/testimonials.json` + locales + `TestimonialsSection.tsx` fallbacks | 5 named testimonials (triplicated) | **Rendered on the live homepage.** Unverified. |
| `locales/th/common.json` (95 KB), `locales/en/common.json` (48 KB) | Nearly all page copy, meta title/description | Old business positioning. |
| `PricingPage.tsx`, `ContactPage.tsx`, `ServicesPage.tsx` | ~220 Thai string fragments inline (mostly `t()` fallbacks) | |
| `backend/src/data/*.json` | services, packages, FAQs, testimonials | Duplicates locale content. |
| `frontend/update_translations.cjs`, `update_testimonials.cjs` | one-off scripts that inject copy into locale files | Tracked in git; should be retired. |
| `frontend/.env.example` | `VITE_PHONE_NUMBER=02-123-4567`, `contact@pdabliss.co.th` | Placeholders (not read by code except maps URL). |
| `index.html` | Title "PDA BLISS SOLUTIONS - โซลูชันธุรกิจครบวงจร", migrant-worker description | Confirmed live on pdabliss.com and www.pdabliss.com. |
| `backend/src/data/submissions.json` | one test submission (`test@example.com`) | **Tracked in git**; `.gitignore` lists `backend/data/submissions.json` (wrong path) so the real file is not ignored. |

## 7. Assets

| Asset | Facts | V2 assessment |
|---|---|---|
| `public/logo.png` | 1254×1254, **RGB, no alpha**, white background, 917 KB. Serif "PDA" monogram (green P/D, charcoal A) in green ring, "BLISS", "PDA BLISS COMPANY LIMITED". Also used as favicon. | Only official logo source in repo. **No vector, no transparent, no white/green mono, no compact symbol.** Need the original vector (AI/SVG/PDF) before EP03. |
| `public/favicon.svg` | Generic green circle with text "PDA" | Not the official mark; unused by `index.html`. |
| `hero.png` + 13 other PNGs | 1.6–2.1 MB each, **≈23 MB total**, no WebP/AVIF, no `srcset`. `hero.png` is an AI render of a reception desk with the logo on the wall and signage "LABOR DOCUMENT SERVICES / SUBSCRIPTION SERVICES / BUSINESS / ACCOUNTING / FINANCE". | Off-message for V2 and too heavy. Replace. |
| `team-01.jpg`, `team-02.jpg`, `team-03.png` | Team imagery | Identity/consent unknown — confirm before reuse. |
| `/location-map.png` | Referenced by ContactPage | **Missing** (fallback renders). |
| Video, 3D models, self-hosted fonts | None | All new. |
| Master visual reference image (spec §4) | **Not supplied in this session** | Needed before the first visual EP. |

## 8. Dependencies

**Frontend:** react/react-dom 18.3, react-router-dom 6.24, framer-motion 11.3, i18next 23 + react-i18next 15 + browser-languagedetector 8, axios 1.7, react-hook-form 7.52 + @hookform/resolvers 3.9 + zod 3.23, swiper 11.1, lucide-react 0.400. Dev: vite 5.3, @vitejs/plugin-react 4.3, typescript 5.5, tailwindcss 3.4, postcss, autoprefixer.
**Backend:** express 4.19, helmet 7.1, cors 2.8, express-rate-limit 7.3, morgan 1.10, dotenv 16.4, uuid 10, zod 3.23. Dev: ts-node-dev 2, typescript 5.5, @types/*.
**Root:** concurrently 8.2.
**Missing for quality gates:** `frontend` has a `lint` script that calls **eslint, which is not installed**; no Prettier, no test runner (Vitest/Jest), no Playwright/axe, no CI workflow.

## 9. Animation libraries

- **framer-motion 11** — page transitions, `whileInView` reveals, hover states.
- **swiper 11** — testimonial carousel.
- **CSS/Tailwind keyframes** — marquee, float, orb-breathe, shimmer, mask-reveal, etc. (17 `@keyframes`).
- **Not present:** GSAP, ScrollTrigger, Lenis, Three.js, React Three Fiber, any shader/WebGL, any video player.
- `prefers-reduced-motion` is respected in `App.tsx`, `AboutPage`, `ServiceImageFrame`, `index.css` — partial coverage.

## 10. Build / deployment system

**Build:** root `npm run build` → `backend: tsc` → `backend/dist`; `frontend: tsc && vite build` → `frontend/dist` (manual chunks: react, router, motion, swiper). No typecheck-only or test scripts.

**Production (from the PM2 snapshot, 2026-10-21, daemon owner `NT AUTHORITY\SYSTEM`, `PM2_HOME C:\Users\This PC\.pm2`):**

| PM2 app | id | What it runs | Relevance |
|---|---|---|---|
| `pda-bliss-web` | 6 | `pm2 serve` → `D:\S2A_PROJECT\projectpdablisswebmain\frontend\dist` | **This repo — serves pdabliss.com** (live title matches this repo's `dist/index.html`) |
| `pdabliss-backend` | 7 | `D:\S2A_PROJECT\projectpdabliss\backend\dist\server.js` | Different repo ("projectpdabliss") |
| `pdabliss-frontend` | 5 | `pm2 serve` → `D:\S2A_PROJECT\projectpdabliss\frontend\dist` | Different repo; pid 0 at capture time |
| — | — | `projectpdablisswebmain\backend` | **Not running under PM2** |

The same daemon hosts ~22 apps (S2A ERP, payroll, HR LINE Bot, POS, PDA ONE app/marketing/backend, PDA-Bliss property, PDA Surprise, PDA BLISS Solution, S2 NAS, s2-pro-web).

**Not found / unknown (needs confirmation):** the `pm2 serve` port and whether `--spa` is set (without it, refreshing `/about` returns 404); the reverse proxy/TLS layer that maps `pdabliss.com` and routes `/api` (nginx, IIS, Caddy or Cloudflare Tunnel — none is in this repo); which port the `/api` traffic reaches. No ecosystem file is committed.

## 11. Current production risks

| ID | Risk | Impact | Mitigation |
|---|---|---|---|
| R1 | **In-place serving:** production = this folder's `frontend/dist`. Building here deploys. | A redesign build on `redesign/v2` in this folder would replace the live site. | Do all V2 work in a **separate git worktree** (e.g. `D:\S2A_PROJECT\projectpdablisswebmain-v2`). Never run `build` in the production folder until cutover. |
| R2 | **Contact pipeline unverified:** this repo's backend isn't in PM2; `/api` may go to `projectpdabliss` backend or nowhere. | Lost leads; schema mismatch. | First EP01 step: verify `/api/health` + a test `POST /api/contact` on pdabliss.com, and identify the proxy rule. |
| R3 | Uncommitted `vite.config.ts` production edit. | Lost on checkout/reset. | Commit to `main` as "chore: record production host config" (or back up) before branching. |
| R4 | Submissions in a JSON file under `dist/` (wiped by a clean build), no locking, no notification, test data tracked in git, wrong `.gitignore` path. | Data loss / PII in git. | V2 inquiry store in a DB + notification; fix ignore path. |
| R5 | No `trust proxy` behind a reverse proxy → every visitor appears as the proxy IP. | Contact limiter becomes **5 submissions per 15 min for the whole site**. | `app.set('trust proxy', 1)` in V2 backend. |
| R6 | Unverified claims live: 20 partner names, 5 testimonials; unused files contain stats and team names. JSON-LD URL points to `pdabliss.co.th`. | Credibility / legal exposure; wrong canonical signal. | Remove in V2; seed only verified data. Optionally hot-fix legacy site (owner decision — out of EP scope). |
| R7 | SEO: CSR only, one static meta, no OG/Twitter/canonical/hreflang, no sitemap, `robots.txt` points to `http://localhost:5555/sitemap.xml`. | Poor indexing, broken social previews. | V2 SSR/SSG + full SEO layer (§17). |
| R8 | ≈23 MB of PNGs, render-blocking Google Fonts, 606 KB first-load JS. | Weak Core Web Vitals, especially mobile. | Image pipeline (AVIF/WebP, srcset), self-hosted subset fonts, route-level splitting. |
| R9 | Quality gates (§21) can't run: no eslint installed, no tests, no CI. | "Do not proceed after failed gate" is unenforceable. | EP01 installs the gate toolchain. |
| R10 | Shared production host (22 PM2 apps incl. payroll/ERP), daemon runs as SYSTEM. | Heavy builds/video encoding on the server can starve payroll/ERP. | Build on a dev machine/CI; ship artifacts only at cutover. |
| R11 | Business positioning conflict (migrant docs / membership pricing vs software + consulting). | Old services/pricing either need a home in V2 or a redirect plan. | Owner decision (see Decisions). |

## 12. What should be preserved

- The repository, its remote, and `main` history; PM2 app name `pda-bliss-web` and the static-serve fallback **until a verified cutover**.
- The production `vite.config.ts` host/proxy settings (as the record of how the domain is wired).
- `public/logo.png` as the brand source of truth (until a vector original is supplied).
- Backend engineering patterns: helmet, zod validation, rate limiting, central error/404 handlers, `Accept-Language` localisation, `{ success, data, message, errors }` response envelope.
- The `POST /api/contact` request contract (fields `fullName, companyName, email, phone, subject, service, message, privacyAccepted`) — keep it accepted (or proxied) until V2 inquiry replaces it, so nothing breaks mid-transition.
- Thai-first bilingual approach (react-i18next key structure is a reasonable migration source for any copy that survives).
- Accessibility basics already present: skip link, `aria-*` usage (≈230), reduced-motion checks, focus rings.
- Verified contact channels: phone `0638693614`, `pdablissoffice@gmail.com`, LINE `@pdabliss` (owner to re-confirm).
- `/privacy` and `/terms` pages (content to be re-reviewed for the new business scope).

## 13. What should be replaced

| Area | Replace with |
|---|---|
| All page UI, home sections, layout, Tailwind palette, `index.css` effects | V2 design system + new components (EP02+) |
| Opaque poster PNG imagery, `config/images.ts`, `SmartImage`, `ServiceImageFrame` | Generated PDA BLISS image universe + optimised media pipeline |
| `data/company.ts`, `partners.ts`, locale-embedded business data, backend JSON data | Canonical content model in a database, served by the Company API (§15) and edited via CMS (§16) |
| Partner logos, testimonials, stats, team names, timeline | Removed; reintroduced only with verified data |
| JSON-file submission storage | DB-backed inquiry + project-configurator payload + notification |
| Client-only rendering + static meta | Server/static rendering with per-route metadata, OG, schema, sitemap |
| Google Fonts (Anuphan / Manrope / Plus Jakarta Sans) | Self-hosted subset fonts per V2 type system |
| framer-motion-only motion + swiper | GSAP/ScrollTrigger + Lenis (+ Three/R3F lazy), framer-motion kept for component state transitions where it fits |
| `update_*.cjs` scripts, unused exports, README deploy section | Removed / rewritten |
| `/pricing` membership page | Decision required (retain under a sub-brand, move, or 301) |

---

# EP01 — Implementation Plan: Foundation & Safety Rails (no visual redesign)

**Goal:** a safe, isolated V2 workspace with the architecture, content API contract, design tokens and quality gates in place — without touching what pdabliss.com currently serves.

### EP01-A · Production safety (first, blocking)
1. Back up `frontend/dist` and the uncommitted `vite.config.ts`; commit the config to `main` as a record (no build, no restart).
2. Verify the live API path: `GET https://pdabliss.com/api/health` and the reverse-proxy rule for `/api`; find the `pm2 serve` port and `--spa` flag (`pm2 describe pda-bliss-web`). Document in `docs/redesign/production-topology.md`.
3. Create branch `redesign/v2` and a **separate git worktree** outside the served folder. All V2 builds happen there or in CI — never in `projectpdablisswebmain\frontend`.

### EP01-B · Architecture decision record (ADR-001)
Recommended target (pending your approval):
- **Web app:** Next.js (App Router, TypeScript) in a new `web/` workspace — needed for per-route SSR/SSG metadata, OpenGraph, hreflang, sitemap and structured data (§17) that a CSR Vite SPA cannot deliver without a prerender layer. Next.js is already operated on this server (HR LINE Bot, PDA ONE marketing, S2A web), so the ops model is familiar. The legacy `frontend/` stays untouched until cutover.
- **API/CMS:** evolve the existing Express `backend/` into the Company Content API (§15) + admin API, keeping its patterns. Add a database (proposal: PostgreSQL if already available on the server, otherwise SQLite with Drizzle ORM + migrations).
- **Locale routing:** `/` (TH default) and `/en/...` with `hreflang`.
- **Deploy model at cutover (EP19+):** new PM2 apps (`pdabliss-web-v2`, `pdabliss-api-v2`) on new ports behind the existing proxy; `pda-bliss-web` kept as instant rollback.
- Alternative if you prefer minimal change: keep Vite + add SSG prerendering; documented trade-offs in the ADR.

### EP01-C · Monorepo & tooling (quality gates §21)
- npm workspaces: `web/`, `backend/`, `packages/content-schema` (shared zod schemas & types), legacy `frontend/` excluded from V2 gates.
- ESLint (flat config, typescript-eslint, jsx-a11y), Prettier, `typecheck` scripts, Vitest (unit), Playwright + @axe-core/playwright (smoke, responsive at 390/768/1440, a11y), Lighthouse CI budget (perf ≥ 90 mobile on content pages).
- Root `npm run verify` = lint → typecheck → test → build; GitHub Actions workflow running it on `redesign/**`.

### EP01-D · Content model & API contract (no fabricated data)
- Zod schemas for: `CompanyProfile`, `ContactInfo`, `Service`, `Solution`, `Project/CaseStudy`, `ConsultingService`, `Article`, `SiteSettings`, `Navigation`, `Footer`, `SeoEntry`, `Media`, `Inquiry` (with configurator fields: build type, scope, budget band, timeline). All localisable fields `{ th, en }`.
- Endpoints from §15 stubbed with OpenAPI spec + contract tests; `POST /api/contact/inquiry` plus a compatibility route for the legacy `POST /api/contact`.
- Seed data: only owner-confirmed facts (legal name, verified contacts, scope text from §2). Anything unknown is empty or carries `status: "dev-placeholder"`, and production queries exclude that status.
- Backend hardening: `trust proxy`, mounted general limiter, request IDs, structured logs, inquiry notification interface (email first; LINE Messaging API as option).

### EP01-E · Design tokens v0 (foundation only)
- Sample the emerald/charcoal values directly from `logo.png` and derive a premium dark palette (black, charcoal, deep forest, PDA emerald, controlled warm light, silver, off-white) with WCAG contrast checks.
- Type system: Thai `IBM Plex Sans Thai` or `Noto Sans Thai` + English `Geist`/`Inter` (UI) and a mono for technical labels; self-hosted, subset, `font-display: swap`.
- Spacing, radius, elevation/glass, motion tokens (durations, easings), `useMotionPolicy()` hook (reduced-motion, save-data, device tier → decides WebGL/video/static).

### EP01-F · Brand & media pipeline
- Request vector logo; until received, derive interim transparent/white/green variants from `logo.png` for internal preview only.
- `sharp`-based pipeline → AVIF/WebP, responsive widths, blur placeholders; video encoding presets (H.264/AV1, poster, mobile cut) documented — encoding runs off the production server.

### EP01-G · Route skeleton
- All §9 routes scaffolded in `web/` with metadata plumbing and empty states (no visual design yet); legacy redirect map drafted (`/pricing`, `/services#…` → V2 targets).

### EP01 exit criteria
`npm run verify` green in CI · ADR-001 approved · API contract tests passing · token file + type ramp rendered on an internal `/_system` page · production folder byte-identical to pre-EP01 except the committed config record · design review not applicable (no visuals yet).

### Decisions needed from you before EP01 starts
1. **Architecture:** approve Next.js + Express API + DB (recommended), or stay on Vite with prerendering?
2. **Database:** is PostgreSQL already available on the server, or should V2 use SQLite?
3. **Legacy services:** do migrant-worker documents / membership packages stay in V2 (and where), or retire with 301 redirects?
4. **Assets:** please supply the vector logo and the master visual reference image mentioned in §4 of the spec.
5. **Verified facts:** confirm the office address, founding year, social URLs, and whether any real clients/projects (e.g. PDA ONE, S2A systems) may be named publicly.
6. **Legacy hot-fix:** do you want the placeholder partners/testimonials removed from the live site now (separate from V2), or left until cutover?
