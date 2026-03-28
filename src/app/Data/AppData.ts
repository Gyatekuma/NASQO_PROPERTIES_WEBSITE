import {
  FunnelPlus,
  CctvIcon,
  FenceIcon,
  WifiIcon,
  BusFrontIcon,
  CableIcon,
  ShowerHeadIcon,
  FootprintsIcon,
  WavesIcon,
  AmpersandIcon,
  UtensilsCrossed,
  Dumbbell,
  Store,
  Scissors,
  Building2,
  Baby,
} from "lucide-react";
import { Users } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { BadgeCent } from "lucide-react";
import type { PropertiesPageItem } from "../Types/types";
import type { ServicesPageItem } from "../Types/types";

export const contactConfig = {
  /** E.164 digits for wa.me (024 022 1212 → +233 24 022 1212) */
  whatsappNumber: "233240221212",
  /** Must match the WhatsApp / WhatsApp Business display name for that number */
  whatsappDisplayName: "NASQO Properties",
  phone: "0302864956",
  email: "homely@gmail.com",
  whatsappIntroMessage:
    "Hi! I came across NASQO Properties and I'm interested in learning more about your properties and services. Could you please help me with more information?",
};

export const coreValuesData = [
  {
    id: "1",
    title: "Long lasting service",
    subtext: "Built with durability in mind to ensure your investment stands the test of time.",
    icon: FunnelPlus,
  },
  {
    id: "2",
    title: "Client-Focused Service",
    subtext: "We prioritize your needs, delivering solutions tailored to your goals and satisfaction.",
    icon: Users,
  },
  {
    id: "3",
    title: "Safe Haven Living",
    subtext: "Designed to provide comfort, security, and peace of mind for everyday living",
    icon: ShieldCheck,
  },
  {
    id: "4",
    title: "Transparent Transactions",
    subtext: "Clear processes and honest communication at every step, with no hidden surprises",
    icon: BadgeCent,
  },
];

// Properties Data
export const propertiesData = [
  {
    id: "1",
    title: "Abena Yedua Apartments",
    location: "Kasoa, Nyanyano kakraba",
    description:
      "Abena Yedua Housing offers a unique blend of comfort, community, and modern living. This thoughtfully planned residential development provides a serene, well-organized environment for individuals and families. With reliable utilities, organized layouts, and green spaces, residents can focus on building their dream homes stress-free. Flexible ownership options make it easy to secure your place in this thriving community.",
    imageSrc: "/PropertiesAssets/ImgAY8.webp",
    amenities: [
      { id: "1", name: "Security Gate Post", icon: CctvIcon },
      { id: "2", name: "Perimeter fence wall", icon: FenceIcon },
      { id: "3", name: "Fast and Reliable internet", icon: WifiIcon },
      { id: "4", name: "Asphalt Roads", icon: BusFrontIcon },
      { id: "5", name: "Good electricity", icon: CableIcon },
      { id: "6", name: "Good water supply", icon: ShowerHeadIcon },
      { id: "7", name: "Ultramodern washrooms", icon: CctvIcon },
      { id: "8", name: "Sidewalks", icon: FootprintsIcon },
      { id: "9", name: "Swimming Pool", icon: WavesIcon },
    ],
    href: "/Properties/abena-yedua-apartments",
    price: "$10,000 - $100,000",
  },
  {
    id: "2",
    title: "Rocky Mountains Estate",
    location: "Kasoa Winneba Road, Akrampa",
    description:
      "Rocky Mountains is a carefully planned 500-acre eco-friendly community nestled in the serene enclave of Aburi, Eastern Region. It offers fully serviced plots with essential infrastructure—electricity, water, asphalt roads, sidewalks, and secure gate posts—already in place. Convenient payment terms with just 30% deposit and proximity to major landmarks make this the ideal foundation for your dream lifestyle.",
    imageSrc: "/PropertiesAssets/Img22.webp",
    amenities: [
      { id: "1", name: "Gated community", icon: FenceIcon },
      { id: "2", name: "24/7 security", icon: CctvIcon },
      { id: "3", name: "Community swimming pool", icon: WavesIcon },
      { id: "4", name: "Restaurant and bar", icon: UtensilsCrossed },
      { id: "5", name: "Gym", icon: Dumbbell },
      { id: "6", name: "Supermarket", icon: Store },
      { id: "7", name: "Unisex saloon", icon: Scissors },
      { id: "8", name: "Laundry services office", icon: ShowerHeadIcon },
      { id: "9", name: "Children playground", icon: Baby },
      { id: "10", name: "On-site facility management office", icon: Building2 },
    ],
    href: "/Properties/rocky-mountains-estate",
    price: "$50,000 - $85,000",
  },
  {
    id: "3",
    title: "Nhyira City Prime Lands",
    location: "Winneba – Gomoa Apre/Mprumen",
    description:
      "Nhyira City Prime Lands blends nature seamlessly with modern living in a carefully planned 500-acre eco-friendly community in Aburi. Fully serviced plots come with essential infrastructure including electricity, water, asphalt roads, sidewalks, and secure perimeter fencing already in place. Multiple purchasing phases with convenient and affordable payment terms ensure accessibility for all buyers.",
    imageSrc: "/PropertiesAssets/ImgN1.webp",
    amenities: [
      { id: "1", name: "Security Gate Post", icon: CctvIcon },
      { id: "2", name: "Perimeter fence wall", icon: FenceIcon },
      { id: "3", name: "Fast and Reliable internet", icon: WifiIcon },
      { id: "4", name: "Asphalt Roads", icon: BusFrontIcon },
      { id: "5", name: "Good electricity", icon: CableIcon },
      { id: "6", name: "Good water supply", icon: ShowerHeadIcon },
      { id: "7", name: "Ultramodern washrooms", icon: CctvIcon },
      { id: "8", name: "Sidewalks", icon: FootprintsIcon },
      { id: "9", name: "Swimming Pool", icon: WavesIcon },
    ],
    href: "/Properties/nhyira-city-prime-lands",
    price: "$78,000",
  },
  {
    id: "4",
    title: "Skycity Dwellings",
    location: "Kasoa, Bawjiase Road, downtown",
    description:
      "Skycity Dwellings is a modern expression of comfortable urban living along Bawjiase Road in Kasoa. Featuring contemporary architecture with spacious layouts, large windows, and private balconies, it offers one-bedroom and two-bedroom apartments for individuals, professionals, and families. Organized infrastructure, 24/7 security, and easy access to essential services make Skycity a lifestyle destination you can truly call home.",
    imageSrc: "/PropertiesAssets/ImgSC1.webp",
    amenities: [
      { id: "1", name: "24/7 security", icon: CctvIcon },
      { id: "2", name: "Community swimming pool", icon: WavesIcon },
      { id: "3", name: "Restaurant and bar", icon: UtensilsCrossed },
      { id: "4", name: "Gym", icon: Dumbbell },
      { id: "5", name: "Supermarket", icon: Store },
      { id: "6", name: "Unisex saloon", icon: Scissors },
      { id: "7", name: "Laundry services office", icon: ShowerHeadIcon },
      { id: "8", name: "Children playground", icon: Baby },
      { id: "9", name: "On-site facility management office", icon: Building2 },
    ],
    href: "/Properties/skycity-dwellings",
    price: "$30,000 - $180,000",
  },
];

export const propertiesPageData: PropertiesPageItem[] = [
  {
    id: "1",
    slug: "abena-yedua-apartments",
    heroTitle: "Abena Yedua Apartments",
    heroImages: [
      "/PropertiesAssets/ImgAY8.webp",
      "/PropertiesAssets/ImgAY10.webp",
      "/PropertiesAssets/ImgAY7.webp",
      "/PropertiesAssets/ImgAY6.webp",
      "/PropertiesAssets/ImgAY1.webp",
      "/PropertiesAssets/ImgAY2.webp",
      "/PropertiesAssets/ImgAY9.webp",
      
    ],
    ctoHref: "/Contact",
    SectionTag: "Properties",
    priceRange: "$10,000 - $100,000",
    description:
      "Abena Yedua Housing offers a unique opportunity to experience a lifestyle where comfort, community, and modern living come together seamlessly. Designed as a thoughtfully planned residential development, this project provides a serene and well-organized environment where individuals and families can build their dream homes and enjoy a peaceful way of life. More than just a housing development, Abena Yedua Housing is envisioned as a model community created to meet the growing demand for quality living spaces. Every aspect of the development has been carefully planned to ensure residents enjoy convenience, safety, and a harmonious living environment. The community is designed with essential infrastructure already considered, ensuring a smooth and stress-free home building experience. With well-planned road networks, reliable utilities, organized layouts, and green spaces, residents can focus on creating their ideal homes without the usual burdens associated with starting from scratch. Abena Yedua Housing is not just about owning property — it is about becoming part of a vibrant and well-structured community. The development offers an opportunity for homeowners to enjoy a balanced lifestyle that combines modern residential comfort with a welcoming neighborhood atmosphere. With convenient ownership opportunities and flexible acquisition options, Abena Yedua Housing makes it easier for individuals and families to secure their place in a thriving residential community. It is a place where dreams of homeownership are transformed into reality, offering a foundation for a comfortable and fulfilling lifestyle.",
    amenities: [
      {
        id: "1",
        name: "Security Gate Post",
        icon: CctvIcon,
      },
      {
        id: "2",
        name: "Perimeter fence wall",
        icon: FenceIcon,
      },
      {
        id: "3",
        name: "Fast and Reliable internet",
        icon: WifiIcon,
      },
      {
        id: "4",
        name: "Asphalt Roads",
        icon: BusFrontIcon,
      },
      {
        id: "5",
        name: "Good electricity",
        icon: CableIcon,
      },

      {
        id: "6",
        name: "Good water supply",
        icon: ShowerHeadIcon,
      },
      {
        id: "7",
        name: "Ultramodern washrooms",
        icon: CctvIcon,
      },
      {
        id: "8",
        name: "Sidewalks",
        icon: FootprintsIcon,
      },
      {
        id: "9",
        name: "Swimming Pool",
        icon: WavesIcon,
      },
    ],

    href: "/Properties/abena-yedua-apartments",
    price: "$1,650,500",
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Kasoa, Nyanyano kakraba",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kasoa,+Nyanyano+kakraba,+Ghana&z=15&output=embed",
      mapTitle: "Map - Kasoa, Nyanyano kakraba",
      brochureButtonText: "Download Brochure",
      brochureHref: "#",
    },
  },
  {
    id: "2",
    slug: "rocky-mountains-estate",
    title: "Rocky Mountains Estate",
    heroTitle: "Rocky Mountains Estate",
    location: "Palm Springs, CA",
    description:
      "Rocky Mountains is where life offers you the opportunity to blend nature seamlessly with the conveniences of modern living. It is a carefully planned 500-acre eco-friendly community located in the lush, serene enclave of Aburi, in the Eastern Region. This development offers fully serviced plots, designed to provide a sustainable and organic lifestyle, freeing you from the burdens of infrastructure development. Grace City Prime Land is more than just a residential area; it's a model community birthed from the high demand of our discerning clientele. Responding to countless requests, RKE has stepped in to create a space where essential infrastructure- including electricity, water, asphalt roads, sidewalks, a green park, efficient drainage, a secure gate post, parameter fence wall and ambient street lights – is already in place. This means you can focus on building your dream home and embracing a holistic way of life from day one, without the stress of coordinating these essential amenities yourself. Grace City Prime Land offers a unique opportunity to own fully serviced plots with convenient and affordable payment terms. The community is within reasonable proximity to major landmarks and amenities, and just a 40-minute drive from the airport, this is your chance to move into a community that takes away the burden of infrastructure worries. Embrace the ease of holistic and organic living at Grace City Prime Land, where your dream lifestyle becomes a reality.",
    imageSrc: "/HomeAssets/Img111.webp",
    heroImages: [
      "/PropertiesAssets/Img11.webp",
      "/PropertiesAssets/Img22.webp",
      "/PropertiesAssets/Img33.webp",
      "/PropertiesAssets/Img44.webp",
      "/PropertiesAssets/Img55.webp",
      "/PropertiesAssets/Img66.webp",
    ],
    amenities: [
      { id: "1", name: "Gated community", icon: FenceIcon },
      { id: "2", name: "24/7 security", icon: CctvIcon },
      { id: "3", name: "Community swimming pool", icon: WavesIcon },
      { id: "4", name: "Restaurant and bar", icon: UtensilsCrossed },
      { id: "5", name: "Gym", icon: Dumbbell },
      { id: "6", name: "Supermarket", icon: Store },
      { id: "7", name: "Unisex saloon", icon: Scissors },
      { id: "8", name: "Laundry services office", icon: ShowerHeadIcon },
      { id: "9", name: "Children playground", icon: Baby },
      { id: "10", name: "On-site facility management office", icon: Building2 },
    ],
    href: "/Properties/rocky-mountains-estate",
    price: "$50,000 - $85,000",
    priceTiers: [
      { label: "2 bedroom semi-detached", price: "$50,000" },
      { label: "2 bedroom detached", price: "$60,000" },
      { label: "3 bedroom", price: "$75,000" },
      { label: "4 bedroom", price: "$85,000" },
    ],
    paymentMode:
      "Pay 30% deposit and pay the rest in 3 years (monthly instalment)",
    paymentDeposits: [
      { label: "30% of $50,000", amount: "$15,000" },
      { label: "30% of $60,000", amount: "$18,000" },
      { label: "30% of $75,000", amount: "$22,500" },
      { label: "30% of $85,000", amount: "$25,500" },
    ],
    additionalInfo:
      "All rooms ensuite. Wardrobes, kitchen cabinet, tiled compound, solar power supply available in case of power-outage. Reserved poly tank also available.",
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Kasoa Winneba Road, Akrampa",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kasoa+Winneba+Road,+Akrampa,+Ghana&z=15&output=embed",
      mapTitle: "Map - Kasoa Winneba Road, Akrampa",
      brochureButtonText: "Download Brochure",
      brochureHref: "#",
    },
  },
  {
    id: "3",
    slug: "nhyira-city-prime-lands",
    heroTitle: "Nhyira City Prime Lands",
    heroImages: [
      "/PropertiesAssets/ImgN1.webp",
      "/PropertiesAssets/ImgN2.webp",
      "/PropertiesAssets/ImgN3.webp",
      "/PropertiesAssets/ImgN4.webp",
      "/PropertiesAssets/ImgN5.webp",
      "/PropertiesAssets/ImgN6.webp",
      "/PropertiesAssets/ImgN7.webp",
      "/PropertiesAssets/ImgN8.webp",
    ],
    ctoHref: "/Contact",
    SectionTag: "Properties",
    priceRange: "$45,000 - $85,000",
    description:
      "Nhyira City Prime Lands is where life offers you the opportunity to blend nature seamlessly with the conveniences of modern living. It is a carefully planned 500-acre eco-friendly community located in the lush, serene enclave of Aburi, in the Eastern Region. This development offers fully serviced plots, designed to provide a sustainable and organic lifestyle, freeing you from the burdens of infrastructure development. Grace City Prime Land is more than just a residential area; it's a model community birthed from the high demand of our discerning clientele. Responding to countless requests, RKE has stepped in to create a space where essential infrastructure- including electricity, water, asphalt roads, sidewalks, a green park, efficient drainage, a secure gate post, parameter fence wall and ambient street lights – is already in place. This means you can focus on building your dream home and embracing a holistic way of life from day one, without the stress of coordinating these essential amenities yourself. Grace City Prime Land offers a unique opportunity to own fully serviced plots with convenient and affordable payment terms. The community is within reasonable proximity to major landmarks and amenities, and just a 40-minute drive from the airport, this is your chance to move into a community that takes away the burden of infrastructure worries. Embrace the ease of holistic and organic living at Grace City Prime Land, where your dream lifestyle becomes a reality.",
    priceTiers: [
      { label: "Phase 1", price: "GHS 20,000" },
      { label: "Phase 2", price: "GHS 15,000" },
      { label: "Phase 3", price: "GHS 12,000" },
    ],
    paymentMode:
      "Outright payment attracts a 10% discount. 3-month instalment attracts a 7% discount. 6-month instalment attracts a 4% discount. 12-month instalment attracts no discount.",
    paymentDeposits: [
      {
        label:
          "Phase 1: Deposit GHS 2,000, then GHS 1,500 monthly for 12 months",
        amount: "GHS 2,000",
      },
      {
        label:
          "Phase 2: Deposit GHS 1,500, then GHS 1,125 monthly for 12 months",
        amount: "GHS 1,500",
      },
      {
        label: "Phase 3: Deposit GHS 1,000, then GHS 917 monthly for 12 months",
        amount: "GHS 1,000",
      },
      {
        label:
          "Phase 4 (Agricultural zone): see details below for yearly rent per acre and included apartments",
        amount: "From GHS 1,000/acre per year",
      },
    ],
    additionalInfo:
      "Phase 4 (Agricultural zone): GHS 1,500 yearly rent per acre for 1–4 acres (includes 1 single-room apartment on-site); GHS 1,300 yearly rent per acre for 5–9 acres (includes 1 single-room apartment); GHS 1,200 yearly rent per acre for 10–19 acres (includes 2 single-room apartments); GHS 1,000 yearly rent per acre for 20–50 acres (includes 3 single-room apartments). Special package: Free site visitation, free documentation (site plan and indenture), and free corner pillars.",
    amenities: [
      {
        id: "1",
        name: "Security Gate Post",
        icon: CctvIcon,
      },
      {
        id: "2",
        name: "Perimeter fence wall",
        icon: FenceIcon,
      },
      {
        id: "3",
        name: "Fast and Reliable internet",
        icon: WifiIcon,
      },
      {
        id: "4",
        name: "Asphalt Roads",
        icon: BusFrontIcon,
      },
      {
        id: "5",
        name: "Good electricity",
        icon: CableIcon,
      },
      {
        id: "6",
        name: "Good water supply",
        icon: ShowerHeadIcon,
      },
      {
        id: "7",
        name: "Ultramodern washrooms",
        icon: CctvIcon,
      },
      {
        id: "8",
        name: "Sidewalks",
        icon: FootprintsIcon,
      },
      {
        id: "9",
        name: "Swimming Pool",
        icon: WavesIcon,
      },
    ],
    href: "/Properties/nhyira-city-prime-lands",
    price: "$78,000",
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Winneba – Gomoa Apre/Mprumen",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Winneba,+Gomoa+Apre+Mprumen,+Ghana&z=15&output=embed",
      mapTitle: "Map - Winneba, Gomoa Apre/Mprumen",
      brochureButtonText: "Download Brochure",
      brochureHref: "#",
    },
  },
  {
    id: "4",
    slug: "skycity-dwellings",
    heroTitle: "Skycity Dwellings",
    heroImages: [
      "/PropertiesAssets/ImgSC1.webp",
      "/PropertiesAssets/ImgSC2.webp",
      "/PropertiesAssets/ImgSC3.webp",
    
    ],
    ctoHref: "/Contact",
    SectionTag: "Properties",
    priceRange: "$30,000 - $180,000",
    description:
      "Skycity Dwellings rises as a modern expression of comfortable urban living, thoughtfully designed to meet the needs of today’s lifestyle. Set along the vibrant Bawjiase Road in Kasoa, this development blends contemporary architecture with a calm residential atmosphere, offering residents a perfect balance between city accessibility and peaceful living. The buildings stand with clean, elegant lines and a refined finish, creating a striking yet welcoming presence. From the secure, well-designed entrance to the neatly planned surroundings, every element reflects intentional design and attention to detail. Spacious layouts, large windows, and private balconies invite natural light and fresh air into each home, creating bright and relaxing living spaces. Skycity Dwellings offers both one-bedroom and two-bedroom apartments, carefully crafted to suit individuals, young professionals, and families alike. Each unit is designed for functionality and comfort, making everyday living simple and enjoyable. Whether you are starting out, downsizing, or looking for a secure rental in a growing area, Skycity provides a flexible and practical housing solution. Beyond the apartments, the development fosters a sense of community. With organized infrastructure, accessible roads, and a secure environment, residents can enjoy peace of mind alongside convenience. The location in downtown Kasoa ensures easy access to essential services, transport links, and commercial hubs, making daily life seamless. Inspired by the structured planning of Abena Yedua Housing, Skycity Dwellings is more than just a place to live—it is a lifestyle destination. It represents a forward-thinking approach to housing, where modern design, security, and community come together to create a place you can truly call home.",
    amenities: [
      {
        id: "1",
        name: "24/7 security",
        icon: CctvIcon,
      },
      {
        id: "2",
        name: "Community swimming pool",
        icon: WavesIcon,
      },
      {
        id: "3",
        name: "Restaurant and bar",
        icon: UtensilsCrossed,
      },
      {
        id: "4",
        name: "Gym",
        icon: Dumbbell,
      },
      {
        id: "5",
        name: "Supermarket",
        icon: Store,
      },
      {
        id: "6",
        name: "Unisex saloon",
        icon: Scissors,
      },
      {
        id: "7",
        name: "Laundry services office",
        icon: ShowerHeadIcon,
      },
      {
        id: "8",
        name: "Children playground",
        icon: Baby,
      },
      {
        id: "9",
        name: "On-site facility management office",
        icon: Building2,
      },
    ],
    href: "/Properties/skycity-dwellings",
    price: "$2,150,000",
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Kasoa, Bawjiase Road, downtown",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kasoa,+Bawjiase+Road,+downtown,+Ghana&z=15&output=embed",
      mapTitle: "Map - Kasoa, Bawjiase Road, downtown",
      brochureButtonText: "Download Brochure",
      brochureHref: "#",
    },
  },
];

// Services Data
export const servicesPageData: ServicesPageItem[] = [
  {
    id: "1",
    slug: "land-acquisition",
    heroTitle: "Land Acquisition",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/PropertiesAssets/ImgN3.webp",
      "/PropertiesAssets/ImgN4.webp",
      "/PropertiesAssets/ImgN5.webp",
      "/PropertiesAssets/ImgN6.webp",
      "/PropertiesAssets/ImgN7.webp",
      "/PropertiesAssets/ImgN8.webp",
    ],
    description:
      "At Nasqo Properties, land acquisition is not just a service — it is the cornerstone of what we do. We understand that owning land is more than a purchase; it is a foundation for building wealth, security, and a lifestyle that can last for generations.\n\nThat is why we carefully source, verify, and secure every parcel we offer, ensuring all our lands are properly documented and fully litigation-free, giving you complete peace of mind and confidence in every transaction.\n\nThrough our professional land acquisition process, we identify high-potential locations with strong growth prospects, strategic accessibility, and long\u2011term value. Whether you are drawn to prime urban areas that offer convenience and fast development, or you prefer the calm, open beauty of the countryside, Nasqo Properties provides options that align perfectly with your vision and goals.\n\nEvery plot we present is selected with appreciation potential in mind, making it an excellent opportunity for investors seeking sustainable, long\u2011term returns. At the same time, for individuals and families ready to build a dream home, our lands offer the security and stability needed to plan the future with confidence.\n\nBeyond simply selling land, Nasqo Properties partners with you throughout the acquisition journey — from identification and verification to documentation and transfer — ensuring a smooth, transparent, and stress-free experience. With flexible options across diverse settings, our properties offer more than just space; they offer opportunity — the opportunity to grow your assets, secure your legacy, and create a future rooted in comfort, prosperity, and lasting value.",
    additionalInfo:
      "We handle complex land transactions across residential, commercial, industrial, and mixed-use developments. Our team maintains strong relationships with local authorities and works diligently to ensure all permits, approvals, and compliance requirements are met before and after acquisition.",
  },
  {
    id: "2",
    slug: "general-construction",
    heroTitle: "General Construction",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/ServicesAssets/CS7.webp",
      "/ServicesAssets/CS8.webp",
      "/ServicesAssets/CS9.webp",
      "/ServicesAssets/CS10.webp",
      "/ServicesAssets/CS11.webp",
      "/ServicesAssets/CS12.webp",
    ],
    description:
      "At Nasqo Properties, our general construction services are built on a foundation of quality, precision, and innovation. We believe that construction is more than assembling materials — it is about transforming ideas into solid, lasting structures that serve generations. Every project we undertake is approached with strategic planning, technical expertise, and a commitment to delivering excellence from start to finish. From beautifully crafted residential homes and luxury apartments to large-scale commercial developments and institutional projects, our team of experienced architects, engineers, and skilled craftsmen work collaboratively to bring each vision to life. We pay close attention to every structural and aesthetic detail, ensuring that functionality, durability, and modern design blend seamlessly. We utilize premium-grade materials, advanced building technologies, and industry-best construction practices to guarantee strength, safety, and long-term value. Our process is transparent and client-focused — from initial consultation and design to project management and final delivery — ensuring timelines are met and expectations are exceeded. Beyond simply erecting buildings, Royal Kingdom Estate creates environments where families can feel secure, businesses can flourish, and communities can grow. With a reputation for reliability, integrity, and superior workmanship, we are committed to delivering construction solutions that not only meet today’s standards but set the benchmark for tomorrow.",
    additionalInfo:
      "Our construction projects include defect liability periods and responsive maintenance support. We provide as-built documentation, operation manuals, and handover training to ensure smooth transition and long-term asset performance.",
  },
  {
    id: "3",
    slug: "facility-management",
    heroTitle: "Facility Management",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/ServicesAssets/FS1.webp",
      "/ServicesAssets/FS2.webp",
      "/ServicesAssets/FS3.webp",
      "/ServicesAssets/FS4.webp",
      "/ServicesAssets/FS5.webp",
      "/ServicesAssets/FS6.webp",
    ],
    description:
      "At Nasqo Properties, our facility management services are designed to protect, maintain, and enhance the value of your property long after construction or acquisition is complete. We understand that owning real estate is a significant investment, and proper management is essential to preserving its performance, safety, and long-term profitability. We take a proactive and preventive approach to facility management, ensuring that every property under our care operates efficiently and remains in excellent condition. From routine maintenance and technical inspections to security coordination, cleaning services, landscaping, and tenant relations, we provide comprehensive solutions tailored to the specific needs of each development. Our experienced and responsive team works diligently to identify and address potential issues before they escalate, minimizing downtime and preventing costly repairs. We prioritize professionalism, transparency, and accountability in every aspect of our operations, ensuring that property owners and tenants enjoy seamless, stress-free experiences. Whether managing residential estates, commercial buildings, or mixed-use developments, Nasqo Properties creates structured systems that promote smooth day-to-day operations and long-term sustainability. With us, your property is not just maintained — it is strategically managed and carefully cared for, ensuring consistent value, comfort, and reliability for years to come.",
    additionalInfo:
      "We offer 24/7 support for critical systems, emergency call-out services, and dedicated account managers. Our facility management platform provides real-time dashboards, work order tracking, and data-driven insights to optimize operational costs and improve building performance over time.",
  },
  {
    id: "4",
    slug: "project-management",
    heroTitle: "Project Management",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/ServicesAssets/PS1.webp",
      "/ServicesAssets/PS2.webp",
      "/ServicesAssets/PS3.webp",
      "/ServicesAssets/PS4.webp",
      "/ServicesAssets/PS5.webp",
      "/ServicesAssets/PS6.webp",
    ],
    description:
      "At Nasqo Properties, successful projects don’t just happen — they are strategically designed, carefully coordinated, and executed with precision from inception to completion. Our project management service is structured to remove the complexity and stress from property development, giving you confidence at every stage of the journey. We oversee the entire project lifecycle, from feasibility studies and planning to design coordination, procurement, contractor supervision, and final handover. Every timeline, budget, resource, and stakeholder is meticulously managed to ensure smooth collaboration and efficient execution. By keeping your vision at the center of every decision, we align strategy with results — delivering outcomes that not only meet expectations but exceed them. Our experienced team blends technical expertise with strong organizational leadership, allowing us to anticipate challenges, mitigate risks, and implement practical solutions before issues arise. Through a structured and transparent approach, we maintain strict cost control, uphold quality standards, and ensure projects are delivered on schedule. With Nasqo Properties, you gain more than a project manager — you gain a dedicated partner committed to transforming ideas into reality with professionalism, accountability, and excellence at every step.",
    additionalInfo:
      "We provide transparent, real-time reporting to all stakeholders including owners, investors, and end users. Our project closeout includes documentation archiving, lessons learned sessions, and warranty handover to support long-term asset management.",
  },
  {
    id: "5",
    slug: "architecture-and-engineering",
    heroTitle: "Architecture and Engineering",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/ServicesAssets/AS1.webp",
      "/ServicesAssets/AS2.webp",
      "/ServicesAssets/AS3.webp",
      "/ServicesAssets/AS4.webp",
      "/ServicesAssets/AS5.webp",
    ],
    description:
      "At Nasqo Properties, our architecture and engineering services are driven by creativity, technical excellence, and forward-thinking innovation. We believe exceptional design is more than visual appeal — it is about creating functional, sustainable, and inspiring spaces that enhance lives and endure for generations. Our architects develop visionary concepts tailored to each client’s needs, blending modern aesthetics with purposeful design. At the same time, our engineers ensure that every concept is structurally sound, efficient, and built to meet the highest safety and regulatory standards. This seamless collaboration between creativity and technical precision allows us to transform ideas into practical, high-performing realities. From elegant residential homes and luxury developments to sophisticated commercial and mixed-use projects, we approach each assignment with meticulous attention to detail and a commitment to world-class standards. By integrating advanced technologies, smart design solutions, and environmentally responsible practices, we deliver structures that are energy-efficient, durable, and cost-effective over the long term. With Nasqo Properties, your project is not simply constructed — it is intelligently designed and expertly engineered to reflect excellence, innovation, and lasting value at every stage.",
    additionalInfo:
      "We integrate sustainability, energy efficiency, and resilient design into all our work. We use modern standards including green building certifications where applicable, and select materials and systems that create buildings built for the future.",
  },
  {
    id: "6",
    slug: "interior-design",
    heroTitle: "Interior Design",
    SectionTag: "Services",
    ctoHref: "/Contact",
    heroImages: [
      "/ServicesAssets/IS1.webp",
      "/ServicesAssets/IS2.webp",
      "/ServicesAssets/IS3.webp",
      "/ServicesAssets/IS4.webp",
      "/ServicesAssets/IS5.webp",
      "/ServicesAssets/IS6.webp",
    ],
    description:
      "At Nasqo Properties, our interior design services are dedicated to transforming spaces into refined, functional, and inspiring environments that truly reflect your personality and lifestyle. We believe interior design is far more than selecting colors or arranging furniture — it is about creating harmonious spaces that balance beauty, comfort, and purpose. From initial concept development to the final finishing touches, our design team works closely with clients to understand their vision, preferences, and practical needs. Every detail is carefully considered — including lighting, materials, textures, spatial flow, and ergonomics — to ensure each space feels cohesive, welcoming, and highly functional. We specialize in residential, commercial, and hospitality interiors, delivering bespoke solutions that maximize space, enhance natural light, and elevate the overall experience of the environment. Whether designing a warm and elegant home, a sophisticated office setting, or a vibrant hospitality space, we blend creativity with practicality to achieve outstanding results. By combining modern trends with timeless design principles, Nasqo Properties creates interiors that are visually striking, comfortable, and built to stand the test of time. With us, your space is not simply decorated — it is thoughtfully curated to enhance well-being, productivity, and everyday living while reflecting excellence at every level.",
    additionalInfo:
      "We work with a curated network of trusted vendors and artisans to source quality materials, furniture, and furnishings. We provide detailed specifications, procurement support, and on-site supervision to ensure the final result matches the design intent.",
  },
];

// Testimonial Data

export const testimonialData = [
  {
    id: "1",
    description:
      "After months of searching across different websites, I finally found my ideal home in no time using this platform. The listings were detailed, and the photos accurately reflected each property. Everything was clearly presented, which made comparing options easy and stress-free. Scheduling viewings and making inquiries felt smooth and straightforward. Customer service was top-notch, answering all my questions promptly and professionally. I will definitely use this platform again in the future and highly recommend it to others!",
    name: "John Doe",
    title: "Property Owner",
    icon: "/Main_Assets/Tag_outline_main.svg",
    imageSrc: "/HomeAssets/TEAM-1.webp",
  },
  {
    id: "2",
    description:
      "I discovered the perfect property much faster than I expected! The platform provided clear descriptions, high-quality images, and all the essential details I needed to make a confident decision. The entire experience was smooth and hassle-free, and the support team was incredibly responsive whenever I needed assistance. I would absolutely recommend this service to anyone searching for their next home and will gladly return in the future.",
    name: "Caleb Mensah",
    title: "MD, Rome Estate",
    icon: "/Main_Assets/Tag_outline_main.svg",
    imageSrc: "/HomeAssets/TEAM-2.webp",
  },
  {
    id: "3",
    description:
      "I had an amazing experience using this platform to find my new home! The property listings were informative and well-organized, making it easy to compare options and narrow down my choices. The photos truly reflected what was available, and the entire process felt straightforward and stress-free. Whenever I had questions, the customer support team responded promptly and professionally. I wouldn’t hesitate to use this service again and highly recommend it to anyone looking for a reliable real estate solution.",
    name: "Caleb Mensah",
    title: "MD, Rome Estate",
    icon: "/Main_Assets/Tag_outline_main.svg",
    imageSrc: "/HomeAssets/TEAM-3.webp",
  },
];

// FAQ Data
export const faqData = [
  {
    id: "1",
    number: "01",
    question: "What services does Nasqo Properties offer?",
    answer:
      "Nasqo Properties provides a full range of real estate services including land acquisition, property sales, general construction, project management, facility management, and interior design. We support clients from property purchase all the way to development and long-term management.",
  },
  {
    id: "2",
    number: "02",
    question: "Are your lands and properties properly documented?",
    answer:
      "Yes, all our lands and properties are carefully verified and come with proper documentation. We ensure every property is litigation-free and legally secure, giving you complete peace of mind throughout the purchase process.",
  },
  {
    id: "3",
    number: "03",
    question: "Do you offer flexible payment plans?",
    answer:
      "Yes, we offer flexible and convenient payment options depending on the property. Many of our developments allow installment payments with an initial deposit, making it easier for clients to own property without financial strain.",
  },
  {
    id: "4",
    number: "04",
    question: "Can I schedule a site visit before making a purchase?",
    answer:
      "Absolutely. We encourage all clients to schedule a site visit to experience the property firsthand. Our team will guide you through the location, amenities, and answer any questions to help you make an informed decision.",
  },
  {
    id: "5",
    number: "05",
    question: "Do you help with building after purchasing land?",
    answer:
      "Yes, we provide end-to-end support. After land acquisition, our construction and project management teams can help design and build your property, ensuring quality, efficiency, and a stress-free experience.",
  },
  {
    id: "6",
    number: "06",
    question: "What makes Nasqo Properties different from other real estate companies?",
    answer:
      "We focus on transparency, quality, and long-term value. From verified properties and structured communities to modern infrastructure and client-focused service, we go beyond selling land—we help you build a secure future and lasting investment.",
  },
  {
    id: "7",
    number: "07",
    question: "Do you provide property management services after purchase?",
    answer:
      "Yes, we offer professional facility management services to maintain and enhance the value of your property. This includes maintenance, security coordination, and overall property care to ensure long-term performance.",
  },
  {
    id: "8",
    number: "08",
    question: "Where are your properties located?",
    answer:
      "Our properties are strategically located in high-growth areas such as East Legon, Kasoa, and Aburi in the Eastern Region. These locations are selected for their accessibility, development potential, and long-term investment value.",
  },
];

// Core Values Data - About Page

export const coreValuesDataAboutPage = [
  {
    id: "1",
    title: "Long lasting service",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: FunnelPlus,
  },
  {
    id: "2",
    title: "Client-Focused Service",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: Users,
  },
  {
    id: "3",
    title: "Safe Haven Living",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: ShieldCheck,
  },
  {
    id: "4",
    title: "Transparent Transactions",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: BadgeCent,
  },

  {
    id: "5",
    title: "Transparent Transactions",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: BadgeCent,
  },
  {
    id: "6",
    title: "Transparent Transactions",
    subtext:
      "We ensure every deal is transparent, secure, and reliable, giving clients peace of mind.Our commitment to honesty and integrity sets the foundation for lasting client relationships.",
    icon: BadgeCent,
  },
];
