import { Metadata } from "next";
import TermsClient from "../../components/TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Authentic Cultural Earth",
  description: "Read the terms of service and usage conditions for Authentic Cultural Earth.",
};

export default function TermsPage() {
  return <TermsClient />;
}