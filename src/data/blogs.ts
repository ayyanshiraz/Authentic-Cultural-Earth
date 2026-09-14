export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export const blogsData: BlogPost[] = [
  {
    id: "1",
    slug: "architecture-of-cultural-heritage",
    title: "The Architecture of Cultural Heritage",
    category: "Research",
    date: "September 2026",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800",
    excerpt: "Exploring how ancient civilizations mapped geographic and philosophical attributes into unified visual systems.",
    content: [
      "Ancient civilizations understood geography not merely as physical terrain but as a canvas of philosophical expression. By mapping celestial alignments and regional myths into structural layouts, they built permanent legacies.",
      "Our modern approach bridges this historic discipline with contemporary design systems. Every visual element reflects rigorous research into regional identity and spatial harmony.",
      "Through tactile card design and digital integration, we preserve these traditions for future generations to explore and experience firsthand."
    ]
  },
  {
    id: "2",
    slug: "observation-to-understanding",
    title: "From Observation to Understanding",
    category: "Philosophy",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=800",
    excerpt: "Why tactile physical objects outperform digital archives in long term cognitive retention and cultural appreciation.",
    content: [
      "Digital screens offer endless volume but often lack lasting resonance. Physical interaction engages tactile senses, deepening cognitive engagement and memory retention.",
      "When learners hold cards representing diverse global regions, abstract geographic data transforms into a tangible reality.",
      "We design our collections to honor this profound connection between human touch and intellectual discovery."
    ]
  },
  {
    id: "3",
    slug: "designing-across-continents",
    title: "Designing Across Continents",
    category: "Craftsmanship",
    date: "August 2026",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800",
    excerpt: "The rigorous research workflow behind synthesizing fifteen distinct elements per country into cohesive artwork.",
    content: [
      "Synthesizing an entire nation cultural footprint into a concise visual format requires extensive investigation. Historians and artists collaborate to distill symbols, architecture, and folklore.",
      "Each design passes through multiple iterative phases to ensure absolute accuracy and aesthetic elegance.",
      "The result is a comprehensive collection that celebrates global diversity with precision and profound respect."
    ]
  }
];