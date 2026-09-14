import { Metadata } from "next";
import PrivacyClient from "../../components/PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Authentic Cultural Earth",
  description: "Read the privacy policy and data protection guidelines for Authentic Cultural Earth.",
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}