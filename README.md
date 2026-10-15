# ActionPocket AI

> Turn everyday information into actions you won't forget.

ActionPocket AI helps you capture text, screenshots, and documents, extract important tasks and deadlines using AI, and manage them as clear reminders.

---

## Features

- **Capture** — paste text, upload images or PDFs
- **AI Extraction** — powered by Google Gemini; never invents dates or amounts
- **Action Management** — create, edit, complete, archive, delete
- **Views** — Today, Upcoming, Overdue, Completed, All Actions
- **Search & Filter** — by status, priority, category
- **Demo Mode** — works out of the box with no credentials
- **Responsive** — sidebar on desktop, bottom nav on mobile

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Auth & DB | Supabase |
| AI | Google Gemini (`gemini-1.5-flash`) |
| Validation | Zod |
| Tests | Vitest |

---

## Project Structure

```
ActionPocket-AI/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Login, signup pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (app)/           # Authenticated app shell
│   │   │   ├── layout.tsx   # Sidebar + bottom nav shell
│   │   │   ├── dashboard/   # Main dashboard
│   │   │   ├── inbox/       # Captured items
│   │   │   ├── today/
│   │   │   ├── upcoming/
│   │   │   ├── overdue/
│   │   │   ├── completed/
│   │   │   ├── actions/     # All actions + [id] detail
│   │   │   └── settings/
│   │   ├── api/
│   │   │   ├── actions/     # GET, POST, PATCH, DELETE
│   │   │   └── captures/    # GET, POST, DELETE
│   │   ├── privacy/
│   │   └── terms/
│   ├── components/
│   │   ├── actions/         # ActionCard, ActionForm, ActionFilters
│   │   ├── capture/         # CaptureModal, ExtractionReview
│   │   ├── layout/          # Sidebar, BottomNav, Header
│   │   └── ui/              # Button, Input, Card, Badge, Modal, Select, Textarea, StatsCard
│   ├── lib/
│   │   ├── ai/              # extractor.ts, demo-adapter.ts, types.ts
│   │   ├── supabase/        # client.ts, server.ts, middleware.ts
│   │   └── demo-store.ts    # Demo mode detection + sample data
│   ├── middleware.ts        # Route protection + /app redirect
│   └── types/               # Shared TypeScript types
├── tests/                   # Vitest unit tests
├── supabase/
│   └── 001_initial.sql  # Full schema with RLS policies
├── .env.example
└── .gitignore
```

---

## Quick Start (Demo Mode)

No credentials needed — runs with sample data.

```bash
npm install
npm run dev
```

Open http://localhost:3000, then log in with **any** email and password. A yellow banner confirms demo mode.

---

## Production Setup

### 1. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key
AI_MODEL=gemini-1.5-flash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Supabase database

In your Supabase project → SQL Editor, run:

```
supabase/001_initial.sql
```

This creates the `profiles`, `captures`, and `actions` tables with Row Level Security.

### 3. Run

```bash
npm run dev
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm test         # Run unit tests (vitest)
npm run lint     # ESLint
```

---

## Database Schema

| Table | Description |
|---|---|
| `profiles` | User profile, timezone, locale, currency |
| `captures` | Raw text / file captures with processing status |
| `actions` | Tasks extracted or created manually |

All tables have Row Level Security — users access only their own data.

---

## License

MIT
