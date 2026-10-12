# 🎶 Tune-Talk

**Tune-Talk** is a demo web application for browsing albums, checking ratings, and reading reviews.  
It’s a full-stack **TanStack Start** app with real album data from **Apple Music**, accounts via **Better Auth**, and reviews stored in **Neon Postgres** through **Drizzle**.

---

## 🌐 Live Demo & Design

- **Live Site (Vercel):** [Tune-Talk Demo](https://tune-talk-theta.vercel.app)  
- **Figma Design:** [View on Figma](https://www.figma.com/proto/Foq6Sw9lVbLgtVp6LcuCz4/Tune-Talk?page-id=0%3A1&node-id=2-2&starting-point-node-id=2%3A2&t=3dvyw3O6RnKeVjsS-1) 

---

## 🚀 Features

- Search real albums from the Apple Music catalog (free **iTunes Search API**, no API key)
- Today's top albums on Apple Music, plus popular albums ranked by Tune Talk ratings
- Email and password accounts with **Better Auth**
- Rate and review albums, and see all your reviews in one place
- Server state cached with **TanStack Query**, with optimistic rating updates

---

## 🛠️ Tech Stack

- **Framework:** TanStack Start (React 19, TanStack Router, server functions), TypeScript
- **Data:** TanStack Query, Drizzle ORM, Neon Postgres
- **Auth:** Better Auth (email and password, Drizzle adapter)
- **Forms:** TanStack Form with zod
- **Styling:** Tailwind CSS
- **Tooling:** Vite, Biome, Vitest

---

## 📁 Project Structure

```
src/
  routes/          file-based routes (_app layout, _protected pages, auth, api/auth)
  features/
    albums/        Apple Music server functions, album queries and components
    reviews/       review server functions, queries, mutation hooks, components
    auth/          login and signup forms
  db/              Drizzle schema and Neon client
  lib/             Better Auth server and client, Apple Music client
drizzle/           SQL migrations
```

---

## 🔧 Installation & Setup

```bash
git clone https://github.com/xnaavii/tune-talk.git
cd tune-talk
npm install
cp .env.example .env
```

Fill in `.env`:

- `DATABASE_URL`: a Neon Postgres connection string
- `BETTER_AUTH_SECRET`: generate with `openssl rand -base64 32`
- `BETTER_AUTH_URL`: the app URL (`http://localhost:3000` locally)

Then create the tables and start the app:

```bash
npm run db:migrate
npm run dev
```

Useful scripts: `npm test`, `npm run check` (Biome), `npm run typecheck`,
`npm run db:generate` after changing `src/db/schema.ts`, `npm run db:studio`.

> Album data comes from Apple's public iTunes Search API and Apple Music RSS
> charts, which need no API key. Apple rate limits them to roughly 20 requests a
> minute per IP, and TanStack Query caching keeps Tune Talk well under that.
