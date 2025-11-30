export interface Video {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  price: number;
  verified: boolean;
  category: string;
  rights: string[];
  stats: {
    views: string;
    licenses: number;
    rating: number;
  };
}

export const MOCK_VIDEOS: Video[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e",
    title: "Bollywood Dance Challenge",
    description: "High-energy dance performance featuring trending Bollywood moves. Perfect for social media campaigns and entertainment content. Shot in 4K with professional choreography.",
    creator: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1659933357788-9e5fbcd1e130",
      verified: true,
    },
    price: 15,
    verified: true,
    category: "Dance",
    rights: [
      "Commercial advertisements allowed",
      "Social media posts allowed",
      "Remix and edit allowed",
      "Attribution required",
    ],
    stats: {
      views: "3.2M",
      licenses: 52,
      rating: 4.9,
    },
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1606787366850-de6330128bfc",
    title: "Mumbai Street Food Journey",
    description: "Authentic street food tour showcasing Mumbai's vibrant food culture. Includes vada pav, pani puri, and more. Great for food brands and tourism campaigns.",
    creator: {
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      verified: true,
    },
    price: 20,
    verified: true,
    category: "Food",
    rights: [
      "Commercial use permitted",
      "Social media marketing allowed",
      "Editorial use allowed",
      "Creator credit required",
    ],
    stats: {
      views: "5.1M",
      licenses: 68,
      rating: 4.8,
    },
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Tech Product Review 2024",
    description: "In-depth review of latest smartphones and gadgets. Professional production quality with detailed testing. Ideal for tech brands and electronics retailers.",
    creator: {
      name: "Ananya Reddy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      verified: true,
    },
    price: 25,
    verified: true,
    category: "Tech",
    rights: [
      "Product placement allowed",
      "Commercial advertising permitted",
      "Affiliate marketing allowed",
      "Full editing rights included",
    ],
    stats: {
      views: "4.7M",
      licenses: 45,
      rating: 4.9,
    },
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
    title: "Yoga Morning Routine",
    description: "Peaceful yoga practice with sunrise backdrop. Features 15-minute beginner-friendly flow. Perfect for wellness brands and fitness apps.",
    creator: {
      name: "Kavya Iyer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      verified: true,
    },
    price: 12,
    verified: true,
    category: "Lifestyle",
    rights: [
      "Fitness app integration allowed",
      "Commercial use permitted",
      "Social media sharing allowed",
      "Subscription platforms allowed",
    ],
    stats: {
      views: "2.8M",
      licenses: 38,
      rating: 4.7,
    },
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
    title: "Diwali Festival Celebration",
    description: "Vibrant festival coverage with traditional rituals, fireworks, and family gatherings. Captures the essence of Indian culture and celebration.",
    creator: {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      verified: true,
    },
    price: 18,
    verified: true,
    category: "Lifestyle",
    rights: [
      "Cultural content usage allowed",
      "Tourism marketing permitted",
      "Brand campaigns allowed",
      "Full commercial rights included",
    ],
    stats: {
      views: "6.2M",
      licenses: 72,
      rating: 5.0,
    },
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
    title: "Cinematic Mumbai B-Roll",
    description: "Professional b-roll footage of Mumbai's skyline, streets, and landmarks. 4K quality with color grading. Ideal for documentaries and promotional videos.",
    creator: {
      name: "Meera Patel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      verified: true,
    },
    price: 30,
    verified: true,
    category: "Lifestyle",
    rights: [
      "Documentary use allowed",
      "Commercial projects permitted",
      "Tourism campaigns allowed",
      "Unlimited editing rights",
    ],
    stats: {
      views: "3.9M",
      licenses: 55,
      rating: 4.9,
    },
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1533923156502-be31530547fc",
    title: "Stand-up Comedy Snippet",
    description: "Hilarious 2-minute comedy routine about everyday Indian life. Family-friendly content perfect for entertainment platforms and social media.",
    creator: {
      name: "Rohit Desai",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      verified: true,
    },
    price: 10,
    verified: true,
    category: "Comedy",
    rights: [
      "Entertainment platforms allowed",
      "Social media distribution permitted",
      "Streaming services allowed",
      "Attribution required",
    ],
    stats: {
      views: "7.5M",
      licenses: 89,
      rating: 4.8,
    },
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
    title: "Home Cooking Tutorial",
    description: "Step-by-step recipe for authentic butter chicken. Easy to follow with professional cooking tips. Great for food apps and culinary brands.",
    creator: {
      name: "Sunita Kapoor",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      verified: true,
    },
    price: 14,
    verified: true,
    category: "Food",
    rights: [
      "Recipe app integration allowed",
      "Food brand partnerships permitted",
      "Commercial use allowed",
      "Social media sharing included",
    ],
    stats: {
      views: "4.3M",
      licenses: 61,
      rating: 4.9,
    },
  },
  {
    id: 9,
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    title: "Tech Startup Pitch",
    description: "Professional pitch presentation for blockchain startup. Includes slides and speaking segments. Perfect for business and education content.",
    creator: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      verified: true,
    },
    price: 35,
    verified: true,
    category: "Tech",
    rights: [
      "Educational use permitted",
      "Business presentations allowed",
      "Marketing materials included",
      "Full commercial license",
    ],
    stats: {
      views: "1.9M",
      licenses: 28,
      rating: 4.7,
    },
  },
  {
    id: 10,
    thumbnail: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937",
    title: "Classical Dance Performance",
    description: "Bharatanatyam performance showcasing traditional Indian classical dance. Elegant movements and authentic costumes. Cultural content for premium brands.",
    creator: {
      name: "Lakshmi Narayan",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
      verified: true,
    },
    price: 22,
    verified: true,
    category: "Dance",
    rights: [
      "Cultural campaigns allowed",
      "Premium brand partnerships permitted",
      "Tourism content allowed",
      "Educational use included",
    ],
    stats: {
      views: "2.1M",
      licenses: 34,
      rating: 5.0,
    },
  },
];

export const CATEGORIES = ["All", "Dance", "Food", "Tech", "Lifestyle", "Comedy"];
