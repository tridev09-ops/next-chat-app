# ProChat

Real-time chat application built with Next.js, MongoDB, and Socket.io.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **MongoDB** + **Mongoose**
- **Socket.io** — real-time messaging
- **Tailwind CSS v4** — Slate & Indigo theme

## Features

- JWT-based auth (signup / login / logout)
- One-on-one conversations
- Real-time messaging via Socket.io
- Emoji avatar picker
- Online presence indicators
- Slate & Indigo dark/light mode (system preference)
- Search users and conversations

![Login page](/screenshots/login.png)

![Chat](/screenshots/chat.png)

![User list](/screenshots/users.png)

## Setup

1. Clone and install dependencies:

```bash
pnpm install
```

2. Create a `.env` file:

```
MONGO_DB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the dev server:

```bash
pnpm dev
```

Opens at `http://localhost:3000`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server with auto-restart |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | Run ESLint |

## Project Structure

```
app/
  auth/login/       — Login page
  auth/signup/      — Signup page (emoji picker)
  conversation/     — Chat conversation page
  data/             — Emoji data
  lib/              — Auth, DB, models, socket, helpers
  routes/           — Server actions
  ui/               — React components
server.ts           — Custom HTTP server (Next.js + Socket.io)
```
