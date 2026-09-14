import { Metadata } from "next";
import BlogsClient from "../../components/BlogsClient";

export const metadata: Metadata = {
  title: "Blogs | Authentic Cultural Earth",
  description: "Read the latest dispatches and research articles from Authentic Cultural Earth.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}