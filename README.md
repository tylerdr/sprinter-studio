# sprinter.studio

sprinter.studio is the venture factory site for Sprinter's AI-native venture studio, showing the live portfolio of ventures built by one founder plus AI agents.

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
