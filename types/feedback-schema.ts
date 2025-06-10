// import { isValidPhoneNumber } from "libphonenumber-js";
// import { z } from "zod";

// export const FeedbackSchema = z.object({
//   id: z.string().optional(), // Optional ID for database reference
//   firstName: z.string().min(1, "First name is required"),
//   lastName: z.string().min(1, "Last name is required"),
//   phone: z
//     .string()
//     .min(1, "Phone number is required")
//     .refine((value) => isValidPhoneNumber(value), {
//       message: "Invalid phone number",
//     }),
//   email: z.string().email("Valid email is required"),
//   relationship: z.enum(["Employee", "Client", "Other"], {
//     required_error: "Please select your relationship with us",
//   }),
//   feedbackCategories: z
//     .array(
//       z.enum([
//         "CommunicationIssue",
//         "PolicyProcedureIssue",
//         "PrivacyConfidentiality",
//         "ServiceProvision",
//         "ServiceQuality",
//         "PositiveFeedback",
//         "Other",
//       ])
//     )
//     .min(1, "At least one feedback category must be selected"),
//   details: z.string().min(1, "Details of feedback or complaint are required"),
//   suggestedOutcome: z
//     .string()
//     .min(1, "Suggested outcome or resolution is required"),
//   authorization: z.boolean().refine((val) => val === true, {
//     message: "You must authorize the use of this information",
//   }),
//   completedBy: z
//     .string()
//     .min(1, "Name of person completing the form is required"),
// });

// export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

// Define feedback categories as a const array for type safety
export const FEEDBACK_CATEGORIES = [
  "CommunicationIssue",
  "PolicyProcedureIssue",
  "PrivacyConfidentiality",
  "ServiceProvision",
  "ServiceQuality",
  "PositiveFeedback",
  "Other",
] as const;

// Derive TypeScript type from the array
export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const FeedbackSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  email: z.string().email("Valid email is required"),
  relationship: z.enum(["Employee", "Client", "Other"], {
    required_error: "Please select your relationship with us",
  }),
  feedbackCategories: z
    .array(z.enum(FEEDBACK_CATEGORIES))
    .min(1, "At least one feedback category must be selected"),
  details: z.string().min(1, "Details of feedback or complaint are required"),
  suggestedOutcome: z
    .string()
    .min(1, "Suggested outcome or resolution is required"),
  authorization: z.boolean().refine((val) => val === true, {
    message: "You must authorize the use of this information",
  }),
  completedBy: z
    .string()
    .min(1, "Name of person completing the form is required"),
});

export type FeedbackSchemaType = z.infer<typeof FeedbackSchema>;
