import "./forgot-password.scss";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/forgot-password/")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Forgot Password - Learnify",
      },
    ],
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
