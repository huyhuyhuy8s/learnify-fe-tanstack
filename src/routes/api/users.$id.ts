import { createFileRoute } from "@tanstack/react-router";
import axios from "redaxios";
import type { User } from "@/utils/users";
import { logger } from "@/utils/logger";

export const Route = createFileRoute("/api/users/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        logger.info(`Fetching users by id=${params.id}... @`, request.url);
        try {
          const res = await axios.get<User>(
            "https://jsonplaceholder.typicode.com/users/" + params.id
          );
          return Response.json({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
          });
        } catch (e) {
          logger.error(e);
          return Response.json({ error: "User not found" }, { status: 404 });
        }
      },
    },
  },
});
