import { z } from "zod";

export const RoleSchema = z.object({
    role: z.string(),
    permissions: z.array(z.string()).optional(),
    // userId: z.number()
  });