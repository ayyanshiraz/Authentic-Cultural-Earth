import React from "react";
import ShopClient from "../../components/ShopClient";

async function fetchAcquisitionData() {
  return [
    { 
      id: "full-collection", 
      title: "The Master Archive", 
      price: 299, 
      heroImage: "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=1600", 
      quote: "UNDERSTANDING IS NOT A WASTE OF TIME.",
      paragraphs: [
        "Authentic Cultural Earth is embarking on a journey of visual discovery. It is an exploration into the geography, languages, ideas, and architecture of 199 nations mapped into a single, cohesive tactile experience.",
        "There are endless nuances to explore. Our master collection allows you to free your mind and immerse yourself in the interconnectedness of global heritage. From classical European philosophies to the indigenous knowledge of Oceania, every card serves as a gateway to new perspectives.",
        "Meticulously researched and cinematically designed, the Master Archive brings the entire world to your hands. It improves cultural fluency, boosts global awareness, and provides an unparalleled educational foundation for both individuals and institutions."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-africa", 
      title: "Africa Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1600", 
      quote: "DISCOVER THE CRADLE OF HUMANITY.",
      paragraphs: [
        "The Africa Continental Pack encompasses 54 distinct national identities. It is an exploration of vast landscapes, ancient languages, and intricate belief systems that have shaped human history.",
        "From the sweeping dunes of the Sahara to the dense rainforests of the Congo basin, this collection visualizes the deep-rooted craftsmanship and modern urban identities thriving across the continent.",
        "Each of the 54 cards maps 15 specific cultural elements, offering an unfiltered, deeply researched look into the architectural marvels, national emblems, and mythological symbols of Africa."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1523805009056-2448a5e5a2db?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-asia", 
      title: "Asia Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&q=80&w=1600", 
      quote: "TRADITION MEETS RAPID EXPANSION.",
      paragraphs: [
        "A meticulous visual journey traversing one of the most culturally dense and varied regions on Earth. The Asia pack features 49 cards capturing the essence of the East.",
        "Experience the intersection of ancient spiritual traditions and hyper-modern infrastructure. The collection highlights the unique geographic topologies, distinct textiles, and historical currencies that define Asian heritage.",
        "Whether examining the central core of island nations or the vast mainland empires, this pack delivers a comprehensive structural breakdown of Asian culture."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1610977271815-5d9dcbf968c3?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-europe", 
      title: "Europe Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1600", 
      quote: "CLASSICAL FOUNDATIONS AND MODERN IDENTITY.",
      paragraphs: [
        "The Europe Continental Pack archives 46 nations, bridging the gap between historical antiquity and contemporary living traditions.",
        "Observe the philosophical undertones, architectural triumphs, and distinct regional identities that stretch from the Mediterranean coast to the Nordic fjords.",
        "This collection serves as a visual encyclopedia of European heritage, detailing everything from national mythologies to enduring urban craftsmanship."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1619546952812-520e9806f87d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-north-america", 
      title: "North America Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1600", 
      quote: "A TAPESTRY OF CONTINENTAL CONNECTIONS.",
      paragraphs: [
        "Spanning 23 distinct cultural profiles, the North America and Caribbean collection reveals the deep geographical and historical ties of the region.",
        "From the extreme northern tundras to the vibrant island nations of the Caribbean, this pack visualizes a dynamic blend of indigenous heritage and modern development.",
        "Each card provides a detailed examination of shared cultural elements, local crafts, and iconic natural landmarks."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518182170546-076616fd4651?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-south-america", 
      title: "South America Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1619546952812-520e9806f87d?auto=format&fit=crop&q=80&w=1600", 
      quote: "VIBRANT LANDSCAPES AND ENDURING SPIRIT.",
      paragraphs: [
        "The South America Pack features 12 comprehensive cards that dive into the vivid and enduring spirit of the continent.",
        "Explore the dense Amazonian ecosystems, the towering peaks of the Andes, and the rich textiles that tell stories of ancient civilizations seamlessly merging with modern life.",
        "A breathtaking visual study that captures the musical rhythms, profound faith systems, and central core identities of South American nations."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800"
      ]
    },
    { 
      id: "pack-oceania", 
      title: "Oceania Pack", 
      price: 65, 
      heroImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=1600", 
      quote: "ISLAND CULTURES AND INDIGENOUS KNOWLEDGE.",
      paragraphs: [
        "Comprising 13 carefully curated profiles, the Oceania Pack offers a rare glimpse into the isolated yet deeply connected island cultures of the Pacific.",
        "This collection focuses heavily on oceanic identity, showcasing the unique mythologies, maritime navigation history, and distinctive natural environments.",
        "Discover the delicate balance between humanity and nature that defines the overarching philosophy of the Oceania region."
      ],
      gridImages: [
        "https://images.unsplash.com/photo-1469522859132-e56525164bc7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800"
      ]
    }
  ];
}

export default async function ShopPage() {
  const products = await fetchAcquisitionData();
  return <ShopClient products={products} />;
}