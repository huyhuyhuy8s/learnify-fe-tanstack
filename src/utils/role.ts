import type { TRole } from "@/types/global";

const VALID_ROLES: readonly TRole[] = [
  "learner",
  "teacher",
  "reviewer",
  "admin",
];

export function normalizeRole(raw: unknown): TRole {
  const lowered = typeof raw === "string" ? raw.toLowerCase() : "";
  return (VALID_ROLES as readonly string[]).includes(lowered)
    ? (lowered as TRole)
    : "learner";
}
