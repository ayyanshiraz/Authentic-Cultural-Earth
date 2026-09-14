import type { Metadata } from "next";
import FaqsClient from "../../components/FaqsClient";

export const metadata: Metadata = {
  title: "FAQs | Authentic Cultural Earth",
  description: "Answers to common inquiries regarding our premium visual cultural discovery collection.",
};

export default function FaqsPage() {
  return <FaqsClient />;
}