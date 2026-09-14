import { Metadata } from "next";
import { blogsData } from "../../../data/blogs";
import BlogDetailClient from "../../../components/BlogDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogsData.find((p) => p.id === resolvedParams.id);
  if (!post) return { title: "Blog Not Found" };
  return {
    title: `${post.title} | Authentic Cultural Earth`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = blogsData.find((p) => p.id === resolvedParams.id);
  if (!post) {
    notFound();
  }
  return <BlogDetailClient post={post} />;
}