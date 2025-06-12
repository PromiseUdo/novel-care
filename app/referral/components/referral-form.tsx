"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ReferralSchema, ReferralSchemaType } from "@/types/referal-schema";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import PhoneInputComponent from "@/components/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Explicitly define defaultValues to match flattened ReferralSchemaType
const defaultValues: ReferralSchemaType = {
  id: undefined,
  apply_date: new Date(),
  referrer_firstName: "",
  referrer_lastName: "",
  referrer_organizationName: "",
  referrer_phoneNumber: "",
  referrer_email: "",
  referrer_consent: "Yes",
  referrer_relationship: "",
  client_firstName: "",
  client_lastName: "",
  client_preferredName: undefined,
  client_dateOfBirth: new Date(),
  client_gender: "",
  client_address_houseNumberAndStreet: "",
  client_address_suburb: "",
  client_address_postcode: "",
  client_canBePhoned: "Yes",
  client_phoneNumber: undefined,
  client_riskAssessment: "Low",
  client_riskDetails: undefined,
  client_ndisNumber: undefined,
  client_privateDetails: undefined,
  client_preferredLanguages: [],
  client_interpreterRequired: "No",
  client_indigenousIdentity: "No",
  client_otherIdentity: undefined,
  client_diagnosis: undefined,
  client_livingArrangements: undefined,
  client_clientPlanDetails: undefined,
  client_planStartDate: new Date(),
  client_planEndDate: new Date(),
  client_planManagement: "SelfManaged",
  client_planManagerDetails: undefined,
  client_carerGuardianAdvocate: undefined,
  client_supportServicesRequired: [],
  client_otherComments: undefined,
};

const ReferralForm = () => {
  // Explicitly type useForm with ReferralSchemaType
  const form = useForm<ReferralSchemaType>({
    resolver: zodResolver(ReferralSchema),
    defaultValues,
    mode: "onChange",
  });

  const [preferredLanguages, setPreferredLanguages] = useState<string[]>([]);
  const [supportServices, setSupportServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ReferralSchemaType) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Referral submitted successfully!");
        form.reset(); // Reset form after successful submission
        setPreferredLanguages([]);
        setSupportServices([]);
      } else {
        toast.error("Failed to submit referral");
      }
    } catch (error) {
      console.error("Error submitting referral:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-16">
      <MaxWidthWrapper>
        <div className=" w-full md:max-w-5xl border border-[#D4D0E280] shadow rounded-[40px] px-[16px] py-[40px] md:px-[40px] md:p-[40px] flex flex-col gap-[24px]">
          <div className="flex flex-col md:flex-row gap-2 items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-medium text-[#1E1E1E]">Email</p>
              <p className="text-[#1E1E1E]">info@novelcareservices.com.au</p>
            </div>
            <p className="text-[#1E1E1E]">ABN 3464774641</p>
          </div>

          <h2 className="text-[40px] text-[#4E4D4D] text-center">
            Referral Form
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Date Field */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                <FormField
                  control={form.control}
                  name="apply_date"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                        Apply Date
                      </FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 mt-2 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            } // Ensure it's a Date object
                            onSelect={(date) =>
                              field.onChange(date ? new Date(date) : null)
                            } // Convert to Date before updating
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Referrer Section */}
              <div className="space-y-4">
                <h2 className="text-[#1E1E1E] font-medium text-[32px] leading-[44px]">
                  About You - The Referrer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <FormField
                    control={form.control}
                    name="referrer_firstName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referrer_lastName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referrer_organizationName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Organization Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Organization Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referrer_phoneNumber"
                    render={({ field }) => (
                      <PhoneInputComponent
                        label="Phone Number"
                        name="referrer_phoneNumber"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referrer_email"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referrer_consent"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          I have consent from the client to make this referral
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Yes" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="No" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referrer_relationship"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          My relationship with the person needing disability
                          support{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Relationship" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Client Section */}
              <div className="space-y-4">
                <h2 className="text-[#1E1E1E] font-medium text-[32px] leading-[44px]">
                  About the Client
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <FormField
                    control={form.control}
                    name="client_firstName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_lastName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_preferredName"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Preferred Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Preferred Name"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Date of Birth
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 mt-2 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              } // Ensure it's a Date object
                              onSelect={(date) =>
                                field.onChange(date ? new Date(date) : null)
                              } // Convert to Date before updating
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date("1900-01-01")
                              // }
                            />
                          </PopoverContent>
                        </Popover>

                        {/* <FormControl>
                          <Input
                            type="date"
                            className="flex items-center justify-between"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? new Date(e.target.value)
                                  : new Date()
                              )
                            }
                          />
                        </FormControl> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_gender"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Gender" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_address_houseNumberAndStreet"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          House Number and Street
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="House Number and Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_address_suburb"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Suburb
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Suburb" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_address_postcode"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Postcode
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Postcode" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_canBePhoned"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Can the client be phoned?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-2 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Yes" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="No" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="client_phoneNumber"
                    render={({ field }) => (
                      <PhoneInputComponent
                        label="Phone Number"
                        name="client_phoneNumber"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_riskAssessment"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Risk Assessment
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Low" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Low
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Medium" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Medium
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="High" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                High
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_riskDetails"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          More details about risk accessed
                        </FormLabel>
                        <FormControl>
                          {/* <Input
                            placeholder="Risk Details"
                            {...field}
                            value={field.value ?? ""}
                          /> */}

                          <Textarea
                            placeholder="More details about risk accessed"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <p className="font-medium text-[#1E1E1E]">Funding</p>
                  <FormField
                    control={form.control}
                    name="client_ndisNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          NDIS Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="NDIS Number"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_privateDetails"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Private (please supply details)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Private Details"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_preferredLanguages"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Preferred Languages
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {preferredLanguages.map((lang, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Input
                                  value={lang}
                                  onChange={(e) => {
                                    const updatedLanguages = [
                                      ...preferredLanguages,
                                    ];
                                    updatedLanguages[index] = e.target.value;
                                    setPreferredLanguages(updatedLanguages);
                                    field.onChange(updatedLanguages);
                                  }}
                                  placeholder={`Language ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedLanguages =
                                      preferredLanguages.filter(
                                        (_, i) => i !== index
                                      );
                                    setPreferredLanguages(updatedLanguages);
                                    field.onChange(updatedLanguages);
                                  }}
                                  className="text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedLanguages = [
                                  ...preferredLanguages,
                                  "",
                                ];
                                setPreferredLanguages(updatedLanguages);
                                field.onChange(updatedLanguages);
                              }}
                              className="text-blue-500"
                            >
                              Add Language
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_interpreterRequired"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Interpreter Required?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Yes" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="No" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Yes
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_indigenousIdentity"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Identify as Aboriginal/Torres Strait Islander?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="Yes" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="No" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_otherIdentity"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Other Identity
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Other Identity"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_diagnosis"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Diagnosis (Nature of disability)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Diagnosis"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_livingArrangements"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Living arrangements (Group home, support
                          accommodation, independent, family)
                        </FormLabel>
                        <FormControl>
                          {/* <Input
                            placeholder="Living Arrangements"
                            {...field}
                            value={field.value ?? ""}
                          /> */}

                          <Textarea
                            placeholder="Living Arrangements"
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
                    name="client_clientPlanDetails"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Client Plan Details
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Client Plan Details"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_planStartDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Plan start date (please attach NDIS plan)
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 mt-2 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              } // Ensure it's a Date object
                              onSelect={(date) =>
                                field.onChange(date ? new Date(date) : null)
                              } // Convert to Date before updating
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date("1900-01-01")
                              // }
                            />
                          </PopoverContent>
                        </Popover>

                        {/* <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? new Date(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_planEndDate"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Plan End Date
                        </FormLabel>

                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 mt-2 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              } // Ensure it's a Date object
                              onSelect={(date) =>
                                field.onChange(date ? new Date(date) : null)
                              } // Convert to Date before updating
                              // disabled={(date) =>
                              //   date > new Date() || date < new Date("1900-01-01")
                              // }
                            />
                          </PopoverContent>
                        </Popover>
                        {/* <FormControl>
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? new Date(e.target.value)
                                  : undefined
                              )
                            }
                          />
                        </FormControl> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_planManagement"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          How is the Plan Managed?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-y-1 flex-col"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="SelfManaged" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Self-Managed
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="PlanManaged" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                Plan-Managed
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="NDISManaged" />
                              </FormControl>
                              <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                                NDIS-Managed
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_planManagerDetails"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Plan Manager Details
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Plan Manager Details"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_carerGuardianAdvocate"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Carer/Guardian/Advocate
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Carer/Guardian/Advocate"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_supportServicesRequired"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Support Services Required (Up to 3)
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            {supportServices.map((service, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Input
                                  value={service}
                                  onChange={(e) => {
                                    const updatedServices = [
                                      ...supportServices,
                                    ];
                                    updatedServices[index] = e.target.value;
                                    setSupportServices(updatedServices);
                                    field.onChange(updatedServices);
                                  }}
                                  placeholder={`Service ${index + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedServices = [
                                      ...supportServices,
                                    ];
                                    updatedServices.splice(index, 1);
                                    setSupportServices(updatedServices);
                                    field.onChange(updatedServices);
                                  }}
                                  className="text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                            {supportServices.length < 3 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedServices = [
                                    ...supportServices,
                                    "",
                                  ];
                                  setSupportServices(updatedServices);
                                  field.onChange(updatedServices);
                                }}
                                className="text-blue-500"
                              >
                                Add Service
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client_otherComments"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="text-[14px] font-medium text-[#3D4A5C]">
                          Other comments (please explain the goals to be
                          achieved through this referral and funding available
                          for supports)
                        </FormLabel>
                        <FormControl>
                          {/* <Input
                            placeholder="Other Comments"
                            {...field}
                            value={field.value ?? ""}
                          /> */}

                          <Textarea
                            placeholder="Other comments"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-center">
                <Button
                  type="submit"
                  className="w-[300px] font-semibold h-[52px] text-black bg-[#E67817] rounded-[64px]"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ReferralForm;
