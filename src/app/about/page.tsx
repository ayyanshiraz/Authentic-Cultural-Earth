import { Metadata } from "next";
import AboutClient from "../../components/AboutClient";

export const metadata: Metadata = {
  title: "About | Authentic Cultural Earth",
  description: "Discover the story and process behind Authentic Cultural Earth.",
};

export default function AboutPage() {
  return <AboutClient />;
}