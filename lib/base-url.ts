export default function getBaseURL() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_DOMAIN_URL}`;
  return "http://localhost:3000";
}
