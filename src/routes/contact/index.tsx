import "./contact.scss";

import { seo } from "@/utils/seo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact/")({
  head: () => ({
    meta: [
      ...seo({
        title: "Contact | Learnify",
        description:
          "Get in touch with the Learnify team. We'd love to hear from you.",
      }),
    ],
  }),
}).lazy(() => import("./index.lazy").then((m) => m.Route));
