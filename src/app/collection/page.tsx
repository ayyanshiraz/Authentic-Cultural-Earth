import type { Metadata } from "next";
import CollectionClient from "../../components/CollectionClient";

export const metadata: Metadata = {
  title: "Collection | Authentic Cultural Earth",
  description: "Explore our entire repository of curated cultural artifacts, continental data, and interactive visual displays.",
};

export default function CollectionPage() {
  return (
    <main className="bg-[#050505] min-h-screen flex flex-col w-full">
      <CollectionClient />
    </main>
  );
}