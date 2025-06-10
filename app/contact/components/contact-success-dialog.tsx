import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface FeedbackSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactSuccessModal: React.FC<FeedbackSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal when clicking backdrop
    >
      <div
        className="bg-white rounded-[24px] p-[40px] flex flex-col items-center gap-[12px]"
        style={{
          width: "429px",
          height: "357px",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Tick Icon */}
        <Image
          src="/check-circle.png" // Replace with actual tick PNG URL
          alt="Success Tick"
          width={40}
          height={40}
          className="mb-[12px]"
        />

        {/* Feedback Text */}
        <p className="text-[24px] font-semibold text-[#1E1E1E]">Contact Form</p>

        {/* Success Message */}
        <p className="text-[18px] text-[#4E4D4D] text-center">
          Message submitted successfully
        </p>

        {/* Done Button */}
        <Button
          onClick={onClose}
          className="w-[300px] font-semibold h-[52px] text-black bg-[#E67817] rounded-[64px] mt-[24px]"
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default ContactSuccessModal;
