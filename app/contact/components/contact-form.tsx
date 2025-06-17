"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ContactSchema, ContactSchemaType } from "@/types/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ContactSuccessModal from "./contact-success-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import PhoneInputComponent from "@/components/phone-input";
import { Button } from "@/components/ui/button";

const socialIcons = [
  {
    src: "/facebook.png",
    alt: "Facebook",
    href: "https://www.facebook.com/your-page",
  },
  {
    src: "/x.png",
    alt: "Twitter",
    href: "https://www.twitter.com/your-page",
  },
  {
    src: "/instagram.png",
    alt: "Instagram",
    href: "https://www.instagram.com/your-page",
  },
  {
    src: "/linkedin.png",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/your-page",
  },
  {
    src: "/youtube.png",
    alt: "Youtube",
    href: "https://www.linkedin.com/your-page",
  },
  {
    src: "/pinterest.png",
    alt: "Pinterest",
    href: "https://www.linkedin.com/your-page",
  },
];

const defaultValues: ContactSchemaType = {
  id: undefined,
  firstName: "",
  phone: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ContactSchemaType) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message submitted successfully!");
        setIsModalOpen(true); // Show modal on success
      } else {
        toast.error("Failed to submit Message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
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
        <div className="flex flex-col items-center w-full gap-[40px]">
          <h2 className="text-center text-[40px] text-[#4E4D4D]">
            Get In touch with us
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-[40px]">
            <div className="flex flex-col gap-[32px]">
              <div>
                <p>
                  At Novel Care Services we love to hear from you. We are also
                  eager to assist you in achieving your set goals. Feel free to
                  contact us because we are always here to help.
                </p>
                <p>
                  We would love to hear from you if you are passionate about
                  caring for people with disability and want to use your skills
                  in making a positive difference in the community. Be rest
                  assured that there is ample opportunity for regular training,
                  career progression and motivation at Novel Care Services.
                </p>
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[9px]">
                  {socialIcons.map((icon, idx) => (
                    <a
                      key={idx}
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${icon.alt} page`}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </a>
                  ))}
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <Image
                      src={"/map-pin.png"}
                      alt={"map"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <p className="text-[#4E4D4D]">
                      39 Monticello Meander,Landsdale WA 6065
                    </p>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <Image
                      src={"/mail.png"}
                      alt={"map"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <a
                      href="mailto:info@novelcareservices.com.au"
                      className="text-[#4E4D4D] hover:underline"
                    >
                      info@novelcareservices.com.au
                    </a>
                  </div>
                  <div className="flex items-center gap-[4px]">
                    <Image
                      src={"/phone.png"}
                      alt={"map"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                    <a
                      href="tel:0426414430"
                      className="text-[#4E4D4D] hover:underline"
                    >
                      0426414430
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
            {/* contact form */}
            <div className="w-full flex flex-col gap-[32px]">
              <p className="text-[32px] text-[#1E1E1E]">Contact Form</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
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
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide details of your message"
                              className="h-[108px] resize-none"
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
          </div>

          <ContactSuccessModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ContactForm;
