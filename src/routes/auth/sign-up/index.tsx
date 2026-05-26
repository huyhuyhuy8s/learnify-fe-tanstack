import "./sign-up.scss";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/sign-up/")({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
        title: "Sign Up - Learnify",
      },
    ],
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
