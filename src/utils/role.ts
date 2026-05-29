import type { TRole } from "@/types/global";

const VALID_ROLES: readonly TRole[] = [
  "learner",
  "teacher",
  "reviewer",
  "admin",
  "instructor",
];

const ROLE_ALIASES: Record<string, TRole> = {
  instructor: "teacher",
};

export function normalizeRole(raw: unknown): TRole {
  const lowered = typeof raw === "string" ? raw.toLowerCase() : "";
  if (lowered in ROLE_ALIASES) return ROLE_ALIASES[lowered] as TRole;
  return (VALID_ROLES as readonly string[]).includes(lowered)
    ? (lowered as TRole)
    : "learner";
}
