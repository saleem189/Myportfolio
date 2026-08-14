# Muhammad Saleem Ayoub — Engineering Portfolio

Public portfolio for a full-stack software engineer focused on Laravel, PHP, Vue.js, backend APIs, and product systems.

## Highlights

- Product-company work across e-commerce, fintech, logistics, multi-tenant SaaS, and customer engagement.
- Featured engineering themes: Laravel architecture, API design, Redis, queues, PostgreSQL/MySQL, Docker, Elasticsearch, and performance work.
- The portfolio is intentionally a small Vue application; private employer code is not included.

## Stack

- Vue 3, Vite, Tailwind CSS
- Firebase for analytics and the view counter
- Vitest and Vue Test Utils

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm test -- --run
npm run build
```

`npm run lint` is read-only. Use `npm run lint:fix` only when you intentionally want ESLint to edit files.

## Portfolio content

Public content is kept in [`info.js`](./info.js). Keep it accurate, concise, and safe to publish. Do not add credentials, private customer data, or confidential internal implementation details.

For a flagship project, prefer this structure:

1. Problem and business context
2. Personal role and ownership
3. Engineering decision and trade-off
4. Implementation approach
5. Verifiable outcome or a clearly labelled qualitative result

## Deployment

The Vite `base` path is configured for GitHub Pages at `/Myportfolio/`. Update `vite.config.js`, `public/robots.txt`, and `public/sitemap.xml` together if the deployment URL changes.
