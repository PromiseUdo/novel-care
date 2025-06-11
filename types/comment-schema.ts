import { z } from "zod";

export const CommentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required").optional(),
  comment: z.string().min(1, "Message is required"),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
