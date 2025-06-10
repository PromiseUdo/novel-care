import React from "react";
import { ReferralSchemaType } from "@/types/referal-schema";
import { format } from "date-fns";

interface ReferralFormEmailProps {
  formData: ReferralSchemaType;
}

export const ReferralFormEmailTemplate: React.FC<ReferralFormEmailProps> = ({
  formData,
}) => {
  const {
    apply_date,
    referrer_firstName,
    referrer_lastName,
    referrer_organizationName,
    referrer_phoneNumber,
    referrer_email,
    referrer_consent,
    referrer_relationship,
    client_firstName,
    client_lastName,
    client_preferredName,
    client_dateOfBirth,
    client_gender,
    client_address_houseNumberAndStreet,
    client_address_suburb,
    client_address_postcode,
    client_canBePhoned,
    client_phoneNumber,
    client_riskAssessment,
    client_riskDetails,
    client_ndisNumber,
    client_privateDetails,
    client_preferredLanguages,
    client_interpreterRequired,
    client_indigenousIdentity,
    client_otherIdentity,
    client_diagnosis,
    client_livingArrangements,
    client_clientPlanDetails,
    client_planStartDate,
    client_planEndDate,
    client_planManagement,
    client_planManagerDetails,
    client_carerGuardianAdvocate,
    client_supportServicesRequired,
    client_otherComments,
  } = formData;

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
        New referral submission for {client_firstName} {client_lastName}
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
            New Referral Submission
          </h1>
          <p
            style={{ fontSize: "16px", color: "#4E4D4D", marginBottom: "24px" }}
          >
            A new referral has been submitted by {referrer_firstName}{" "}
            {referrer_lastName}. Below are the details:
          </p>

          {/* Referrer Details */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1E1E1E",
              marginBottom: "12px",
            }}
          >
            Referrer Information
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
              <td>
                {referrer_firstName} {referrer_lastName}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Organization
              </td>
              <td>{referrer_organizationName}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Phone</td>
              <td>{referrer_phoneNumber}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Email</td>
              <td>{referrer_email}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Consent</td>
              <td>{referrer_consent}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Relationship
              </td>
              <td>{referrer_relationship}</td>
            </tr>
          </table>

          {/* Client Details */}
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#1E1E1E",
              marginBottom: "12px",
            }}
          >
            Client Information
          </h2>
          <table style={{ width: "100%", fontSize: "14px", color: "#333333" }}>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500, width: "30%" }}>
                Name
              </td>
              <td>
                {client_firstName} {client_lastName}
                {client_preferredName && ` (${client_preferredName})`}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Date of Birth
              </td>
              <td>{format(client_dateOfBirth, "PPP")}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Gender</td>
              <td>{client_gender}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>Address</td>
              <td>
                {client_address_houseNumberAndStreet}, {client_address_suburb},{" "}
                {client_address_postcode}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Can Be Phoned
              </td>
              <td>{client_canBePhoned}</td>
            </tr>
            {client_phoneNumber && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>Phone</td>
                <td>{client_phoneNumber}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Risk Assessment
              </td>
              <td>{client_riskAssessment}</td>
            </tr>
            {client_riskDetails && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Risk Details
                </td>
                <td>{client_riskDetails}</td>
              </tr>
            )}
            {client_ndisNumber && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  NDIS Number
                </td>
                <td>{client_ndisNumber}</td>
              </tr>
            )}
            {client_privateDetails && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Private Details
                </td>
                <td>{client_privateDetails}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Preferred Languages
              </td>
              <td>{client_preferredLanguages.join(", ")}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Interpreter Required
              </td>
              <td>{client_interpreterRequired}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Indigenous Identity
              </td>
              <td>{client_indigenousIdentity}</td>
            </tr>
            {client_otherIdentity && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Other Identity
                </td>
                <td>{client_otherIdentity}</td>
              </tr>
            )}
            {client_diagnosis && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>Diagnosis</td>
                <td>{client_diagnosis}</td>
              </tr>
            )}
            {client_livingArrangements && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Living Arrangements
                </td>
                <td>{client_livingArrangements}</td>
              </tr>
            )}
            {client_clientPlanDetails && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Plan Details
                </td>
                <td>{client_clientPlanDetails}</td>
              </tr>
            )}
            {client_planStartDate && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Plan Start Date
                </td>
                <td>{format(client_planStartDate, "PPP")}</td>
              </tr>
            )}
            {client_planEndDate && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Plan End Date
                </td>
                <td>{format(client_planEndDate, "PPP")}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Plan Management
              </td>
              <td>{client_planManagement}</td>
            </tr>
            {client_planManagerDetails && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Plan Manager Details
                </td>
                <td>{client_planManagerDetails}</td>
              </tr>
            )}
            {client_carerGuardianAdvocate && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Carer/Guardian/Advocate
                </td>
                <td>{client_carerGuardianAdvocate}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "8px 0", fontWeight: 500 }}>
                Support Services Required
              </td>
              <td>{client_supportServicesRequired.join(", ")}</td>
            </tr>
            {client_otherComments && (
              <tr>
                <td style={{ padding: "8px 0", fontWeight: 500 }}>
                  Other Comments
                </td>
                <td>{client_otherComments}</td>
              </tr>
            )}
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
            This email was sent because a referral was submitted to Novel Care
            Services.
          </p>
        </div>
      </div>
    </div>
  );
};
