# mihai.codes

Personal portfolio and blog built with modern web technologies.

[![Qwik](https://img.shields.io/badge/Qwik-000000?style=flat-square&logo=qwik&logoColor=white)](https://qwik.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)

## Features

- **Instant Loading** - Qwik's resumability means near-zero JavaScript on initial load
- **Dark/Light Theme** - System-aware with manual toggle, persisted to localStorage
- **Blog** - Markdown-based posts with syntax highlighting
- **Edge Deployed** - Cloudflare Pages for global performance

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Qwik](https://qwik.dev) + [Qwik City](https://qwik.dev/docs/qwikcity/) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Language | [TypeScript](https://typescriptlang.org) |

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
├── content/        # Blog posts and content
├── context/        # Qwik context providers
├── data/           # Static data (profile, etc.)
└── routes/         # File-based routing
    ├── index.tsx   # Home page
    └── blog/       # Blog routes
```

## License

MIT

---

Built by [Mihai Chindris](https://github.com/chindris-mihai-alexandru)
