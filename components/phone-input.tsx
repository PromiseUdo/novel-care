// components/PhoneInput.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Ensure default styles are imported
import { parsePhoneNumberFromString } from "libphonenumber-js";

interface PhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  name: string;
  label: string;
}

const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <FormItem className="col-span-2 md:col-span-1">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <PhoneInput
          international // Enables country code dropdown
          defaultCountry="AU" // Default to Australia
          withCountryCallingCode // Ensures country code is included
          countryCallingCodeEditable={false} // Prevents editing the country code
          value={value}
          onChange={(val) => onChange(val || "")}
          placeholder="Enter phone number"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default PhoneInputComponent;
