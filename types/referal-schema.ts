import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

export const ReferralSchema = z.object({
  id: z.string().optional(),
  apply_date: z.date({
    required_error: "A date is required.",
  }),
  referrer_firstName: z.string().min(1, "First name is required"),
  referrer_lastName: z.string().min(1, "Last name is required"),
  referrer_organizationName: z.string().min(1, "Organization name is required"),

  referrer_phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine((value) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  referrer_email: z.string().email("Valid email is required"),
  referrer_consent: z.enum(["Yes", "No"], {
    required_error: "Consent selection is required",
  }),
  referrer_relationship: z
    .string()
    .min(1, "Relationship with the client is required"),

  // Client fields (prefixed with client_)
  client_firstName: z.string().min(1, "First name is required"),
  client_lastName: z.string().min(1, "Last name is required"),
  client_preferredName: z.string().optional(),
  client_dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  client_gender: z.string().min(1, "Gender is required"),
  // Client address fields (prefixed with client_address_)
  client_address_houseNumberAndStreet: z
    .string()
    .min(1, "House number and street are required"),
  client_address_suburb: z.string().min(1, "Suburb is required"),
  client_address_postcode: z.string().min(1, "Postcode is required"),
  client_canBePhoned: z.enum(["Yes", "No"], {
    required_error: "Phone contact preference is required",
  }),

  client_phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
  client_riskAssessment: z.enum(["Low", "Medium", "High"], {
    required_error: "Risk assessment is required",
  }),
  client_riskDetails: z.string().optional(),
  client_ndisNumber: z.string().optional(),
  client_privateDetails: z.string().optional(),
  client_preferredLanguages: z
    .array(z.string())
    .min(1, "At least one preferred language is required"),
  client_interpreterRequired: z.enum(["Yes", "No"], {
    required_error: "Interpreter requirement is required",
  }),
  client_indigenousIdentity: z.enum(["Yes", "No"], {
    required_error: "Indigenous identity selection is required",
  }),
  client_otherIdentity: z.string().optional(),
  client_diagnosis: z.string().optional(),
  client_livingArrangements: z.string().optional(),
  client_clientPlanDetails: z.string().optional(),
  client_planStartDate: z.date().optional(),
  client_planEndDate: z.date().optional(),
  client_planManagement: z.enum(["SelfManaged", "PlanManaged", "NDISManaged"], {
    required_error: "Plan management type is required",
  }),
  client_planManagerDetails: z.string().optional(),
  client_carerGuardianAdvocate: z.string().optional(),
  client_supportServicesRequired: z
    .array(z.string())
    .min(1, "At least one support service is required")
    .max(3, "Maximum of three support services allowed"),
  client_otherComments: z.string().optional(),
});

export type ReferralSchemaType = z.infer<typeof ReferralSchema>;
