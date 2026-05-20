import { createFileRoute } from "@tanstack/react-router";
import axios from "redaxios";
import type { User } from "@/utils/users";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/api/users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        logger.info("Fetching users... @", request.url);
        const res = await axios.get<Array<User>>(
          "https://jsonplaceholder.typicode.com/users"
        );
        const list = res.data.slice(0, 10);
        return Response.json(
          list.map((u) => ({ id: u.id, name: u.name, email: u.email }))
        );
      },
    },
  },
});
