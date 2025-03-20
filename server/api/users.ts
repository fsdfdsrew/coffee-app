import type { User } from "@/types/User";

export default defineEventHandler(async (): Promise<User[]> => {
  const users = await import("./users.json");
  return users.default as User[];
});
