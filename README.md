# mihai.codes

Personal portfolio and blog built with modern web technologies.

[![CI](https://github.com/chindris-mihai-alexandru/mihai.codes/actions/workflows/ci.yml/badge.svg)](https://github.com/chindris-mihai-alexandru/mihai.codes/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/chindris-mihai-alexandru/mihai.codes/graph/badge.svg)](https://codecov.io/gh/chindris-mihai-alexandru/mihai.codes)

[![Qwik](https://img.shields.io/badge/Qwik-000000?style=flat-square&logo=qwik&logoColor=white)](https://qwik.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=flat-square&logo=sanity&logoColor=white)](https://sanity.io)

## Features

- **Instant Loading** - Qwik's resumability means near-zero JavaScript on initial load
- **Dark/Light Theme** - System-aware with manual toggle, persisted to localStorage
- **Blog with CMS** - Content managed via Sanity Studio with Markdown support
- **Dynamic Sitemap** - Auto-generated from Sanity content for SEO
- **Edge Deployed** - Cloudflare Pages for global performance

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Qwik](https://qwik.dev) + [Qwik City](https://qwik.dev/docs/qwikcity/) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| CMS | [Sanity](https://sanity.io) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Language | [TypeScript](https://typescriptlang.org) |

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Sanity Studio  │────▶│   Sanity API    │◀────│   mihai.codes   │
│  (Content CMS)  │     │   (Content DB)  │     │  (Qwik + CF)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                                │
        ▼                                                ▼
  mihai-codes.sanity.studio                        mihai.codes
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # Qwik context providers
├── data/           # Static data (profile, etc.)
├── lib/            # Utilities (Sanity client, etc.)
└── routes/         # File-based routing
    ├── index.tsx   # Home page
    ├── blog/       # Blog routes (fetches from Sanity)
    └── sitemap.xml/# Dynamic sitemap
```

## Related Repositories

- **Sanity Studio**: [mihai-codes-studio](https://github.com/chindris-mihai-alexandru/mihai-codes-studio)

## Development Workflow

- **Branch**: `main` only - simple single-branch workflow
- **CI**: All pushes run lint, typecheck, tests, and build via GitHub Actions
- **Branch Protection**: CI must pass before merging PRs
- **Tags**: Milestone-based (e.g., `phase2-complete`), not semantic versioning

## License

MIT

---

Built by [Mihai Chindris](https://github.com/chindris-mihai-alexandru)
