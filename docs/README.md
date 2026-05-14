# LinkableWork Portal

Multi-page Next.js recruitment portal for LinkableWork. Hosted on Netlify with full Swedish/English i18n.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript + React 19
- **i18n:** next-intl v4 (SV/EN, default: SV)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animation:** framer-motion
- **Forms:** Netlify Forms (no server-side API)
- **Deployment:** Netlify (Node 22, `next build`)

## Project Structure

```
src/
├── app/
│   ├── [locale]/             # Locale-routed pages
│   │   ├── page.tsx          # Home (Hero, Certs, CTA)
│   │   ├── projects/
│   │   │   ├── page.tsx      # Project listing + apply form
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Project detail page
│   │   ├── how-it-works/
│   │   │   └── page.tsx
│   │   ├── why-linkable/
│   │   │   └── page.tsx
│   │   ├── request-workers/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── layout.tsx        # Root locale layout, metadata, OG
│   ├── globals.css
│   ├── manifest.ts
│   ├── sitemap.ts
│   ├── not-found.tsx
│   └── api/route.ts
├── components/
│   ├── page-shell.tsx        # Navbar (active page indicator), Footer
│   ├── sections.tsx          # ALL section components
│   └── ui/                   # shadcn/ui components (auto-generated)
├── i18n/request.ts           # Dynamic message loading
├── routing.ts                # Locale config (sv, en)
├── middleware.ts             # next-intl middleware
├── lib/utils.ts              # cn() helper
└── hooks/                    # use-toast, use-mobile
messages/
├── sv.json                   # Swedish translations
└── en.json                   # English translations
public/
├── og-image.svg              # 1200×630 OG image
└── ...
```

## Pages & Routes

| Route                        | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `/`                          | Home — Hero, certs banner, CTA                   |
| `/projects`                  | Project listing (grouped) + application form      |
| `/projects/[id]`             | Project detail with Quick Info, roles, certs     |
| `/how-it-works`              | 4-step process explanation                       |
| `/why-linkable`              | Why LinkableWork page                            |
| `/request-workers`           | Company-facing "Need Workers?" form               |
| `/contact`                   | Contact page                                     |

All pages are served under `/[locale]` prefix (`/sv/projects`, `/en/projects`).

## Projects

8 projects in two groups:

### Role-Specific (Rollspecifika uppdrag)
| ID               | Roles                                     | Urgency |
| ---------------- | ----------------------------------------- | ------- |
| groundworks      | Anläggare, Maskinförare, Arbetslag        | high    |
| infrastructure   | Maskinförare, Arbetslag                   | medium  |
| specialized      | Maskinförare                              | high    |
| building         | Anläggare, Arbetslag                      | low     |

### Worksites (Platser / Arbetsplatser)
| ID               | Location      | Roles                                     | Urgency |
| ---------------- | ------------- | ----------------------------------------- | ------- |
| umea-centrum     | Umeå          | Anläggare, Maskinförare, Arbetslag        | high    |
| lulea-hamn       | Luleå         | Maskinförare, Arbetslag                   | medium  |
| skelleftea-campus| Skellefteå    | Anläggare, Maskinförare, Arbetslag        | high    |
| pitea-industri   | Piteå         | Anläggare, Arbetslag                      | low     |

### Project data per item
- `title`, `roles`, `locations`, `startDate`, `applyDeadline`
- `accommodation` — "Baracker / hotell ingår" for northern projects
- `locationCerts` — "Stockholm Stad kurs" if applicable (array, else `[]`)
- `description`
- `id06Note` — rendered via shared key on every card

## i18n

- **next-intl v4** with `sv` (default) and `en`
- Messages in `messages/{locale}.json`
- Translation keys namespaced: `Index.Navbar.projects`, `Index.Projects.items.*`
- `t.raw()` used for arrays (roles, locations, certs, machine options, etc.)
- `t.has()` / try-catch for optional keys

## Components

### Navbar (`page-shell.tsx`)
- Sticky header with locale toggle, mobile menu
- "Ansök nu" button links to `/projects#apply`
- Active page indicator — amber underline (desktop) / bold text (mobile)

### Footer
- LinkableWork brand, nav links, contact info

### Sections (`sections.tsx`)
All page sections are in this file:
- `HeroSection` — main hero with CTA
- `CertificationsBanner` — certification logos/cards
- `ProjectsSection` — grouped project cards with clickable roles
- `ApplySection` → `ApplicationForm` — Netlify form with fields
- `HowItWorksSection` — 4-step process
- `WhyLinkableSection` — benefits
- `RequestWorkersSection` — company form
- `CTASection` — bottom CTA

## Forms

Netlify Forms with `data-netlify="true"` auto-detection. Two forms:
1. **Application form** (`/projects`) — name, email, phone, type, roles, locations, certs, machines, trades, CV textarea
2. **Request Workers form** (`/request-workers`) — company name, contact, location, work type, worker count, start date, description

Form keys in translations: `Index.Form.*`, `Index.RequestWorkers.form.*`

## Key Behaviors

- Clicking a role on a project card pre-selects that role in the application form and scrolls to it
- Northern projects (Umeå, Luleå, Skellefteå, Piteå) show accommodation info
- ID06 note shown on all project cards — "can be arranged upon employment"
- `locationCerts` is an empty array `[]` on projects without location-specific certs to prevent next-intl MISSING_MESSAGE errors

## Deployment

- **Host:** Netlify
- **Build:** `next build` (Node 22)
- **Env vars:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- **Headers:** Security headers + immutable cache for `/assets/*`
- **Redirects:** `/api/*` → Netlify Functions

## Development

```bash
bun install
bun run dev        # http://localhost:3000
bun run build      # Production build
```

## Brand

- Renamed from "Linkable" → "LinkableWork" throughout
- OG image at `public/og-image.svg` (1200×630)
- PWA manifest at `src/app/manifest.ts`
