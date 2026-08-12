# sprinter.studio

Sprinter Studio is a truth-labeled, services-backed venture portfolio. We build and operate our own products, take on selective client work, and co-build with domain insiders who bring distribution, cash, a real wedge, and clean IP. Sprinter Studio is services-backed, not a fund. We do not raise outside capital, promise portfolio returns, or manage other people’s money.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui `base-nova` preset primitives
- framer-motion
- Vercel AI SDK for the on-site chat

## Local Development

```bash
npm run dev
```

The local dev server runs at `http://localhost:3000`.

## Commits

This repo enforces Conventional Commits via husky and commitlint.

Use `type: subject` format with one of these types:

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `build`, `revert`

Subjects should be lower-case and no more than 72 characters.
