import type { Metadata } from "next";
import ContactClient from "../../components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Authentic Cultural Earth",
  description: "Reach out to us for any inquiries regarding our cultural packs, digital collections, and shipping details.",
};

export default function ContactUsPage() {
  return <ContactClient />;
}