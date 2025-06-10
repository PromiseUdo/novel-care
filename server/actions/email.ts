// server/actions/email.ts
"use server";

import { ContactFormEmailTemplate } from "@/components/emails/contact-form-email";
import { FeedbackFormEmailTemplate } from "@/components/emails/feedback-form-email";
import { ReferralFormEmailTemplate } from "@/components/emails/referral-form-email";
import getBaseURL from "@/lib/base-url";
import { ContactSchema, ContactSchemaType } from "@/types/contact-schema";
import { FeedbackSchema, FeedbackSchemaType } from "@/types/feedback-schema";
import { ReferralSchema, ReferralSchemaType } from "@/types/referal-schema";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReferralFormDataEmail = async (
  formData: ReferralSchemaType
) => {
  try {
    // Validate the incoming data
    const validatedData = ReferralSchema.parse(formData);

    const { data, error } = await resend.emails.send({
      from: "Greenage Technologies <no-reply@powerring.ng>",
      to: "info.promiseudo@gmail.com", // Admin email
      subject: `New Referral Submission from ${validatedData.referrer_firstName} ${validatedData.referrer_lastName}`,
      react: ReferralFormEmailTemplate({ formData: validatedData }),
    });

    if (error) {
      console.error("Error sending referral form email:", error);
      return { error: "Failed to send email", details: error };
    }

    return { data, message: "Referral form email sent successfully" };
  } catch (error) {
    console.error("Error in sendReferralFormDataEmail:", error);
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to send referral form data email" };
  }
};

export const sendFeedbackEmailData = async (formData: FeedbackSchemaType) => {
  try {
    // Validate the incoming data
    const validatedData = FeedbackSchema.parse(formData);

    const { data, error } = await resend.emails.send({
      from: "Greenage Technologies <no-reply@powerring.ng>",
      to: "info.promiseudo@gmail.com", // Admin email
      subject: `New Feedback/Complaint Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      react: FeedbackFormEmailTemplate({ formData: validatedData }),
    });

    if (error) {
      console.error("Error sending feedback form email:", error);
      return { error: "Failed to send email", details: error };
    }

    return { data, message: "Feedback form email sent successfully" };
  } catch (error) {
    console.error("Error in sendFeedbackFormDataEmail:", error);
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to send feedback form data email" };
  }
};

export const sendContactFormDataEmail = async (formData: ContactSchemaType) => {
  try {
    // Validate the incoming data
    const validatedData = ContactSchema.parse(formData);

    const { data, error } = await resend.emails.send({
      from: "Greenage Technologies <no-reply@powerring.ng>",
      to: "info.promiseudo@gmail.com", // Admin email
      subject: `New Contact Form Submission from ${validatedData.firstName}`,
      react: ContactFormEmailTemplate({ formData: validatedData }),
    });

    if (error) {
      console.error("Error sending contact form email:", error);
      return { error: "Failed to send email", details: error };
    }

    return { data, message: "Contact form email sent successfully" };
  } catch (error) {
    console.error("Error in sendContactFormDataEmail:", error);
    if (error instanceof z.ZodError) {
      return { error: "Validation failed", details: error.errors };
    }
    return { error: "Failed to send contact form data email" };
  }
};
