import React from "react";
import { ContactSchemaType } from "@/types/contact-schema";

interface ContactFormEmailProps {
  formData: ContactSchemaType;
}

export const ContactFormEmailTemplate: React.FC<ContactFormEmailProps> = ({
  formData,
}) => {
  const { firstName, phone, email, message } = formData;

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        color: "#333333",
        lineHeight: "1.6",
      }}
    >
      <div
        className="preheader"
        style={{
          display: "none",
          maxWidth: 0,
          maxHeight: 0,
          overflow: "hidden",
          fontSize: "1px",
          lineHeight: "1px",
          color: "#f5f5f5",
          opacity: 0,
        }}
      >
        New contact form submission from {firstName}
      </div>

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#E67817",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <img
            style={{ width: "150px" }}
            src="https://res.cloudinary.com/your-cloudinary-id/image/upload/v1234567890/novel-care-logo.png" // Replace with your logo URL
            alt="Novel Care Services Logo"
          />
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#1E1E1E",
              marginBottom: "16px",
            }}
          >
            New Contact Form Submission
          </h1>
          <p
            style={{ fontSize: "16px", color: "#4E4D4D", marginBottom: "24px" }}
          >
            A new contact form submission has been received from {firstName}.
            Below are the details:
          </p>

          {/* Submitter Details */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1E1E1E",
              marginBottom: "12px",
            }}
          >
            Submitter Information
          </h2>
          <table
            style={{
              width: "100%",
              fontSize: "14px",
              color: "#333333",
              marginBottom: "24px",
            }}
          >
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500, width: "30%" }}>
                Name
              </td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Phone</td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Email</td>
              <td>{email}</td>
            </tr>
          </table>

          {/* Message Details */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1E1E1E",
              marginBottom: "12px",
            }}
          >
            Message Details
          </h2>
          <table style={{ width: "100%", fontSize: "14px", color: "#333333" }}>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500, width: "30%" }}>
                Message
              </td>
              <td>{message}</td>
            </tr>
          </table>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "16px",
            textAlign: "center",
            fontSize: "12px",
            color: "#666666",
          }}
        >
          <p style={{ margin: "0 0 8px" }}>
            Novel Care Services | ABN 3464774641
          </p>
          <p style={{ margin: "0 0 8px" }}>
            Email:{" "}
            <a
              href="mailto:info@novelcareservices.com.au"
              style={{ color: "#E67817" }}
            >
              info@novelcareservices.com.au
            </a>
          </p>
          <p style={{ margin: "0" }}>
            This email was sent because a contact form was submitted to Novel
            Care Services.
          </p>
        </div>
      </div>
    </div>
  );
};
