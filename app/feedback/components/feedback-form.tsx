"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import PhoneInputComponent from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  FeedbackSchema,
  FeedbackSchemaType,
  FEEDBACK_CATEGORIES,
} from "@/types/feedback-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FeedbackSuccessModal from "./feedback-success-modal";

const defaultValues: FeedbackSchemaType = {
  id: undefined,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  relationship: "Client",
  feedbackCategories: [],
  details: "",
  suggestedOutcome: "",
  authorization: false,
  completedBy: "",
};

// Define feedback options with proper typing
const feedbackOptions: {
  id: (typeof FEEDBACK_CATEGORIES)[number];
  label: string;
}[] = [
  { id: "CommunicationIssue", label: "Communication Issue" },
  { id: "PolicyProcedureIssue", label: "Policy/Procedure Issue" },
  { id: "PrivacyConfidentiality", label: "Privacy/Confidentiality" },
  { id: "ServiceProvision", label: "Service Provision" },
  { id: "ServiceQuality", label: "Service Quality" },
  { id: "PositiveFeedback", label: "Positive Feedback" },
  { id: "Other", label: "Other (please describe below)" },
];

const FeedbackForm = () => {
  const form = useForm<FeedbackSchemaType>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues,
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: FeedbackSchemaType) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Feedback submitted successfully!");
        setIsModalOpen(true); // Show modal on success
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    form.reset(); // Reset form when modal closes
  };

  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className="w-full md:max-w-5xl border border-[#D4D0E280] shadow rounded-[40px] p-[40px] flex flex-col gap-[40px]">
          <h2 className="text-[40px] text-[#4E4D4D] text-center">
            FEEDBACK AND COMPLAINTS
          </h2>

          <div className="flex flex-col gap-[40px]">
            <div>
              <p className="text-[#1E1E1E]">
                As a disability service provider, we strive to provide the best
                service possible to you. However, we acknowledge that our
                services may not always be to your satisfaction at all times. We
                would always welcome feedback from you. This will enable us to
                improve our services and address your concerns as quickly as
                possible. To give feedback or make a complaint, kindly complete
                the form below and email it to:{" "}
                <a
                  href="mailto:info@novelcareservices.com.au"
                  className="text-[#E67817] hover:underline"
                >
                  info@novelcareservices.com.au
                </a>
                . You can also complete a complaint and feedback form on our
                website:{" "}
                <Link
                  href="https://www.novelcareservices.com.au/"
                  className="text-[#E67817] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.novelcareservices.com.au/
                </Link>
                . Please be aware that you have a right to make a complaint
                directly to the NDIS Quality and Safeguards Commission by:
              </p>

              <ol className="leading-[28px] list-decimal pl-[20px] text-[#1E1E1E] mt-4">
                <li>Calling this number: 1800 035 544</li>
                <li>
                  Completing a complaint form on the NDIS website via this web
                  link:{" "}
                  <Link
                    href="https://forms.business.gov.au/smartforms/servlet/SmartForm.html?formCode=PRD00-OCF"
                    className="text-[#E67817] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NDIS Complaint Form
                  </Link>
                </li>
              </ol>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <PhoneInputComponent
                        label="Phone Number"
                        name="phone"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Your Relationship with Us</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Employee" />
                              </FormControl>
                              <FormLabel>Employee</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Client" />
                              </FormControl>
                              <FormLabel>Client</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Other" />
                              </FormControl>
                              <FormLabel>Other</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="feedbackCategories"
                    render={() => (
                      <FormItem className="col-span-2">
                        <FormLabel>Feedback Categories</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {feedbackOptions.map((option) => (
                              <FormItem
                                key={option.id}
                                className="flex items-center space-x-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={form
                                      .getValues("feedbackCategories")
                                      .includes(option.id)}
                                    onCheckedChange={(checked) => {
                                      const currentCategories =
                                        form.getValues("feedbackCategories");
                                      const updatedCategories = checked
                                        ? [...currentCategories, option.id]
                                        : currentCategories.filter(
                                            (cat) => cat !== option.id
                                          );
                                      form.setValue(
                                        "feedbackCategories",
                                        updatedCategories
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel>{option.label}</FormLabel>
                              </FormItem>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Details of Feedback/Complaint</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide details of your feedback or complaint"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="suggestedOutcome"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Suggested Outcome/Resolution</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your suggested outcome or resolution"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="authorization"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <FormLabel>
                              I authorize the use of this information to address
                              my feedback or complaint
                            </FormLabel>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="completedBy"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Person Completing This Form</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name of person completing the form"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full flex items-center justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-[300px] font-semibold h-[52px] text-black bg-[#E67817] rounded-[64px]"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <FeedbackSuccessModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default FeedbackForm;
