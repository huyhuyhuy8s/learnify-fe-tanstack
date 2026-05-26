import "./verify-email.scss";

import { createFileRoute } from "@tanstack/react-router";

type VerifyEmailSearch = { token?: string; email?: string };

export const Route = createFileRoute("/auth/verify-email/")({
  validateSearch: (search: Record<string, unknown>): VerifyEmailSearch => ({
    token: typeof search.token === "string" ? search.token : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
  }),
  head: () => ({
    meta: [{ title: "Verify Email - Learnify" }],
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
