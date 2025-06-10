import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

// Derive TypeScript type from the array

export const ContactSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  email: z.string().email("Valid email is required"),

  message: z.string().min(1, "Message is required"),
});

export type ContactSchemaType = z.infer<typeof ContactSchema>;
