# sprinter.studio

sprinter.studio is the public site of Sprinter Studio, the venture studio of Sprinter. It publishes two clearly separated tracks — products incubated with partners, and internal experiments run on Sprinter's own bench — with the stage, status, and evidence behind each one, including what gets stopped.

Commercial training and workflow offers live at [sprinter.ai](https://sprinter.ai); implementation work lives at [sprinterconsulting.com](https://sprinterconsulting.com).

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
