# STOKED Check-In

A private Next.js application based on the feeling indicators in the **S.T.O.K.E.D. Awareness Path**. Users can create an account, save assessments, and view their patterns over time.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add the Neon pooled connection string.
3. Generate a secret with `npx auth secret` and set `BETTER_AUTH_SECRET`.
4. Run `npm run db:auth` to create Better Auth's user and session tables.
5. Run `npm run db:app` to create the assessment table.
6. Start with `npm run dev`.

For Vercel, add `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` to the project environment. Set `BETTER_AUTH_URL` to the production site URL.

## Result logic

The primary result is the furthest stage where the user checked at least one feeling. The dashboard preserves counts across all six stages so the user can see their broader pattern.
