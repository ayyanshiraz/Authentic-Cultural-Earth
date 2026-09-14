import type { Metadata } from "next";
import ReturnsClient from "../../components/ReturnsClient";

export const metadata: Metadata = {
  title: "Return Policy | Authentic Cultural Earth",
  description: "Information regarding our return windows, refund processing, and product replacement guidelines.",
};

export default function ReturnsPage() {
  return <ReturnsClient />;
}