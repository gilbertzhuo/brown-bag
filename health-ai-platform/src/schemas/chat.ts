import { z } from "zod";

export const ChatSchema = z.object({
  role: z.string(),
  userImage: z.string(),
  message: z.string(),
});
