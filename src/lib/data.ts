// ============================================
// Ready Go Trips — Content Data
// ============================================

// === Contact Info ===
export const contactInfo = {
  brand: "Ready Go Trips",
  tagline: "Travel More. Worry Less.",
  subTagline: "Handpicked Destinations. Best Experiences.",
  email: "readygotripsindia@gmail.com",
  phone: "+91 72898 15497",
  whatsapp: "917289815497",
  instagram: "https://www.instagram.com/readygotrips",
  instagramHandle: "@readygotrips",
  address: "India",
};

// === Types ===
export interface Destination {
  id: number;
  name: string;
  slug: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: "mountains" | "beaches" | "pilgrimage" | "adventure";
  featured: boolean;
  description: string;
  highlights: string[];
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  trip: string;
  rating: number;
  text: string;
  date: string;
}

export interface Stat {
  id: number;
  value: number;
  suffix: string;
  label: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  aspect: "tall" | "wide" | "square";
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

// === Destinations (from client's 13 packages) ===
export const destinations: Destination[] = [
  {
    id: 1,
    name: "Chopta & Tungnath",
    slug: "chopta-tungnath",
    duration: "2N / 3D",
    price: 4999,
    originalPrice: 6999,
    image: "/images/chopta.png",
    rating: 4.8,
    reviews: 124,
    category: "mountains",
    featured: true,
    description:
      "Trek to the highest Shiva temple in the world amidst breathtaking Himalayan meadows.",
    highlights: [
      "Tungnath Temple Trek",
      "Chandrashila Summit",
      "Alpine Meadows",
      "Bird Watching",
    ],
  },
  {
    id: 2,
    name: "Manali with Rohtang",
    slug: "manali-rohtang",
    duration: "2N / 3D",
    price: 4999,
    originalPrice: 6999,
    image: "/images/manali.png",
    rating: 4.9,
    reviews: 256,
    category: "mountains",
    featured: true,
    description:
      "Experience the magic of Manali with a thrilling Rohtang Pass excursion through snow-capped peaks.",
    highlights: [
      "Rohtang Pass",
      "Solang Valley",
      "Old Manali",
      "Adventure Activities",
    ],
  },
  {
    id: 3,
    name: "Manali \u2013 Kasol",
    slug: "manali-kasol",
    duration: "2N / 3D",
    price: 4999,
    originalPrice: 7499,
    image: "/images/manali.png",
    rating: 4.7,
    reviews: 189,
    category: "mountains",
    featured: false,
    description:
      "Explore the serene Parvati Valley from Manali to the hippie paradise of Kasol.",
    highlights: [
      "Parvati Valley",
      "Kasol Village",
      "Manikaran Hot Springs",
      "Riverside Camping",
    ],
  },
  {
    id: 4,
    name: "Kedarnath",
    slug: "kedarnath",
    duration: "3N / 4D",
    price: 6499,
    originalPrice: 8999,
    image: "/images/kedarnath.png",
    rating: 4.9,
    reviews: 312,
    category: "pilgrimage",
    featured: true,
    description:
      "Embark on a sacred journey to one of the holiest Jyotirlinga temples nestled in the Himalayas.",
    highlights: [
      "Kedarnath Temple",
      "Helicopter Option",
      "Gaurikund",
      "Mountain Views",
    ],
  },
  {
    id: 5,
    name: "Do-Dham",
    slug: "do-dham",
    duration: "4N / 5D",
    price: 7999,
    originalPrice: 10999,
    image: "/images/kedarnath.png",
    rating: 4.8,
    reviews: 178,
    category: "pilgrimage",
    featured: false,
    description:
      "Visit two sacred dhams \u2014 Kedarnath and Badrinath \u2014 in one spiritual expedition.",
    highlights: [
      "Kedarnath Temple",
      "Badrinath Temple",
      "Mana Village",
      "Spiritual Journey",
    ],
  },
  {
    id: 6,
    name: "Jibhi",
    slug: "jibhi",
    duration: "2N / 3D",
    price: 4999,
    originalPrice: 6499,
    image: "/images/jibhi.png",
    rating: 4.7,
    reviews: 145,
    category: "mountains",
    featured: true,
    description:
      "Discover the hidden gem of Himachal Pradesh \u2014 quaint wooden cottages amidst dense forests.",
    highlights: [
      "Jibhi Waterfall",
      "Serolsar Lake",
      "Wooden Cottages",
      "Nature Walks",
    ],
  },
  {
    id: 7,
    name: "Jibhi \u2013 Jalori Pass",
    slug: "jibhi-jalori",
    duration: "2N / 3D",
    price: 5499,
    originalPrice: 7499,
    image: "/images/jibhi.png",
    rating: 4.6,
    reviews: 98,
    category: "adventure",
    featured: false,
    description:
      "Combine the tranquility of Jibhi with the adventure of Jalori Pass trek.",
    highlights: [
      "Jalori Pass Trek",
      "Raghupur Fort",
      "Serolsar Lake",
      "Tirthan Valley",
    ],
  },
  {
    id: 8,
    name: "Udaipur \u2013 Mount Abu",
    slug: "udaipur-mountabu",
    duration: "2N / 3D",
    price: 6499,
    originalPrice: 8999,
    image: "/images/hero.png",
    rating: 4.5,
    reviews: 87,
    category: "adventure",
    featured: false,
    description:
      "Explore the romantic city of lakes and the cool hill station of Mount Abu.",
    highlights: [
      "Lake Pichola",
      "City Palace",
      "Dilwara Temples",
      "Nakki Lake",
    ],
  },
  {
    id: 9,
    name: "Madhmeshwar",
    slug: "madhmeshwar",
    duration: "2N / 3D",
    price: 6999,
    originalPrice: 9499,
    image: "/images/chopta.png",
    rating: 4.8,
    reviews: 67,
    category: "pilgrimage",
    featured: false,
    description:
      "Trek to the ancient and remote Madhmeshwar temple, one of the Panch Kedar.",
    highlights: [
      "Madhmeshwar Temple",
      "Alpine Trek",
      "Ukhimath",
      "Sacred Valley",
    ],
  },
  {
    id: 10,
    name: "Spiti \u2013 Chandratal",
    slug: "spiti-chandratal",
    duration: "6N / 7D",
    price: 21999,
    originalPrice: 27999,
    image: "/images/spiti.png",
    rating: 4.9,
    reviews: 203,
    category: "adventure",
    featured: true,
    description:
      "Journey through the cold desert of Spiti Valley to the mystical Chandratal Lake.",
    highlights: ["Chandratal Lake", "Key Monastery", "Kaza", "Kunzum Pass"],
  },
  {
    id: 11,
    name: "Ladakh Bike Ride",
    slug: "ladakh-bike",
    duration: "14 Days",
    price: 29000,
    originalPrice: 35000,
    image: "/images/ladakh.png",
    rating: 5.0,
    reviews: 156,
    category: "adventure",
    featured: true,
    description:
      "The ultimate adventure \u2014 ride through the highest motorable passes in the world.",
    highlights: [
      "Khardung La Pass",
      "Pangong Lake",
      "Nubra Valley",
      "Magnetic Hill",
    ],
  },
  {
    id: 12,
    name: "McLeodganj \u2013 Triund",
    slug: "mcleodganj-triund",
    duration: "2N / 3D",
    price: 6499,
    originalPrice: 8499,
    image: "/images/jibhi.png",
    rating: 4.7,
    reviews: 178,
    category: "mountains",
    featured: false,
    description:
      "Experience the Tibetan culture of McLeodganj and trek to the stunning Triund summit.",
    highlights: [
      "Triund Trek",
      "Dalai Lama Temple",
      "Bhagsu Waterfall",
      "Tibetan Market",
    ],
  },
  {
    id: 13,
    name: "Goa",
    slug: "goa",
    duration: "7N / 8D",
    price: 9999,
    originalPrice: 13999,
    image: "/images/goa.png",
    rating: 4.8,
    reviews: 289,
    category: "beaches",
    featured: true,
    description:
      "Sun, sand, and unforgettable sunsets \u2014 experience the best of India\u2019s beach paradise.",
    highlights: [
      "Beach Hopping",
      "Water Sports",
      "Nightlife",
      "Portuguese Heritage",
    ],
  },
];

export const featuredDestinations = destinations.filter((d) => d.featured);

// === Features (Why Travel With Us) ===
export const features: Feature[] = [
  {
    id: 1,
    title: "Curated Itineraries",
    description:
      "Every trip is handcrafted by travel experts who\u2019ve personally explored each destination. No cookie-cutter routes.",
    icon: "Map",
  },
  {
    id: 2,
    title: "Comfort & Safety",
    description:
      "Premium stays, verified transport, and experienced trip captains ensure your safety and comfort throughout.",
    icon: "ShieldCheck",
  },
  {
    id: 3,
    title: "Best Prices",
    description:
      "We negotiate the best deals directly with hotels and operators, passing the savings to you. No hidden costs.",
    icon: "BadgeIndianRupee",
  },
  {
    id: 4,
    title: "24/7 Trip Support",
    description:
      "Our dedicated support team is available round the clock. From booking to return, we\u2019ve got your back.",
    icon: "Headphones",
  },
];

// === Testimonials ===
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    avatar: "AM",
    trip: "Ladakh Bike Ride",
    rating: 5,
    text: "The most incredible 14 days of my life! The passes, the lakes, the people \u2014 everything was perfectly organized. Ready Go Trips made my dream ride a reality.",
    date: "March 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "PS",
    trip: "Manali with Rohtang",
    rating: 5,
    text: "From the cozy stays to the Rohtang excursion, every detail was taken care of. The trip captain was amazing and made the whole group feel like family.",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Rahul Verma",
    avatar: "RV",
    trip: "Spiti \u2013 Chandratal",
    rating: 5,
    text: "Spiti Valley is another world entirely. The itinerary was perfectly paced \u2014 we got to explore everything without feeling rushed. Chandratal at sunset was magical.",
    date: "May 2026",
  },
  {
    id: 4,
    name: "Sneha Patel",
    avatar: "SP",
    trip: "Kedarnath",
    rating: 5,
    text: "A spiritual journey I\u2019ll never forget. The arrangements were flawless \u2014 comfortable stays, great food, and a trek that was challenging yet rewarding.",
    date: "April 2026",
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "VS",
    trip: "Goa",
    rating: 4,
    text: "Best Goa trip ever! Great hotel right near the beach, fun group activities, and the nightlife tour was epic. Already planning my next trip with them.",
    date: "December 2025",
  },
  {
    id: 6,
    name: "Ananya Roy",
    avatar: "AR",
    trip: "Jibhi",
    rating: 5,
    text: "Jibhi was the peaceful escape I desperately needed. The wooden cottages, the misty mornings, the waterfall trek \u2014 pure bliss. Thank you Ready Go Trips!",
    date: "February 2026",
  },
  {
    id: 7,
    name: "Karan Malhotra",
    avatar: "KM",
    trip: "Chopta & Tungnath",
    rating: 5,
    text: "The Tungnath trek was the highlight of my year. The views from Chandrashila peak were absolutely unreal. Great team, great vibes, great memories!",
    date: "June 2026",
  },
  {
    id: 8,
    name: "Diya Nair",
    avatar: "DN",
    trip: "McLeodganj \u2013 Triund",
    rating: 5,
    text: "Triund at night under the stars was a life-changing experience. The whole trip was well-organized and the group was amazing. Would recommend to everyone!",
    date: "July 2026",
  },
];

// === Stats ===
export const stats: Stat[] = [
  { id: 1, value: 3, suffix: "+", label: "Years of Adventure" },
  { id: 2, value: 50, suffix: "+", label: "Destinations Explored" },
  { id: 3, value: 500, suffix: "+", label: "Trips Completed" },
  { id: 4, value: 2000, suffix: "+", label: "Happy Travelers" },
];

// === FAQs ===
export const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I book a trip with Ready Go Trips?",
    answer:
      "Booking is simple! Browse our packages, select your preferred trip, and click \u2018Book Now\u2019. You can also reach us directly via WhatsApp at +91 72898 15497 or email us at readygotripsindia@gmail.com. Our team will guide you through the entire booking process.",
  },
  {
    id: 2,
    question: "What is included in the trip packages?",
    answer:
      "Our packages typically include accommodation, meals (as specified), local transport, a dedicated trip captain, sightseeing as per itinerary, and all applicable taxes. Specific inclusions vary by package \u2014 check the detailed itinerary for each trip.",
  },
  {
    id: 3,
    question: "Are the trips suitable for solo travelers?",
    answer:
      "Absolutely! Most of our trips are group departures, making them perfect for solo travelers who want to explore with like-minded people. You\u2019ll make incredible friendships along the way. We also offer customized private trips on request.",
  },
  {
    id: 4,
    question: "What is the cancellation and refund policy?",
    answer:
      "We understand plans can change. Cancellations made 15+ days before departure receive a full refund minus processing fees. 7\u201314 days before: 50% refund. Less than 7 days: no refund. Trip date changes are subject to availability.",
  },
  {
    id: 5,
    question: "Do you provide travel insurance?",
    answer:
      "While we don\u2019t include travel insurance in our packages, we strongly recommend purchasing it. We can suggest trusted insurance providers who offer comprehensive coverage for adventure travel in India.",
  },
  {
    id: 6,
    question: "What should I pack for a mountain trip?",
    answer:
      "We send a detailed packing list after booking. Generally, you\u2019ll need warm layers, a rain jacket, comfortable trekking shoes, a daypack, sunscreen, personal medications, and a refillable water bottle. We provide specific lists based on your destination and season.",
  },
  {
    id: 7,
    question: "How experienced are your trip captains?",
    answer:
      "All our trip captains are experienced travelers and certified guides with extensive knowledge of local terrain, culture, and safety protocols. They undergo regular training and are equipped with first-aid kits and emergency communication devices.",
  },
  {
    id: 8,
    question: "Can I customize a trip for my group?",
    answer:
      "Yes! We love creating custom itineraries. Whether it\u2019s a corporate retreat, college trip, birthday celebration, or a friends\u2019 getaway \u2014 tell us your dates, group size, budget, and preferences, and we\u2019ll craft the perfect trip for you.",
  },
];

// === Navigation Links ===
export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/#destinations" },
  { name: "Packages", href: "/#packages" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Reviews", href: "/#reviews" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Priyanshu Dhoundiyal",
    role: "Founder and CEO",
    image: "/images/team/priyanshu-dhoundiyal.png",
    description:
      "Leads Ready Go Trips with a focus on safe planning, memorable routes, and trustworthy guest experiences.",
  },
  {
    id: 2,
    name: "Anshika Dhoundiyal",
    role: "Business Development Manager",
    image: "/images/team/anshika-dhoundiyal-close.png",
    description:
      "Builds partner relationships and helps shape smooth, guest-friendly travel experiences across every trip.",
  },
];

// === Gallery Images ===
export const galleryImages: GalleryImage[] = [
  { id: 1, src: "/images/hero.png", alt: "Himalayan mountains at golden hour", aspect: "tall" },
  { id: 2, src: "/images/manali.png", alt: "Manali valley landscape", aspect: "wide" },
  { id: 3, src: "/images/kedarnath.png", alt: "Kedarnath temple in the Himalayas", aspect: "square" },
  { id: 4, src: "/images/ladakh.png", alt: "Pangong Lake in Ladakh", aspect: "wide" },
  { id: 5, src: "/images/goa.png", alt: "Goa beach at sunset", aspect: "tall" },
  { id: 6, src: "/images/spiti.png", alt: "Key Monastery in Spiti Valley", aspect: "square" },
  { id: 7, src: "/images/jibhi.png", alt: "Jibhi forest retreat", aspect: "wide" },
  { id: 8, src: "/images/chopta.png", alt: "Chopta alpine meadows", aspect: "tall" },
  { id: 9, src: "/images/gallery-1.png", alt: "Travelers at a mountain viewpoint", aspect: "wide" },
  { id: 10, src: "/images/manali.png", alt: "River valley adventure", aspect: "square" },
  { id: 11, src: "/images/kedarnath.png", alt: "Temple in the mountains", aspect: "tall" },
  { id: 12, src: "/images/spiti.png", alt: "Remote mountain landscapes", aspect: "wide" },
];
