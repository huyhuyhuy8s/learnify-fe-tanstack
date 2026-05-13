import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "@/utils/session";
import { z } from "zod";

type UserData = {
  id: string | number;
  email: string;
  username?: string;
};

const sessionSchema = z.object({
  id: z.string(),
  email: z.email({
    pattern:
      /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/i,
  }),
  username: z.string().optional(),
});

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    return session.data.user || null;
  }
);

export const setSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: UserData) => sessionSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await useAppSession();
    await session.update({ user: data });
    return { success: true };
  });

export const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  await session.clear();
  return { success: true };
});
