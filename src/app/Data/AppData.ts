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
  StoreIcon,
  UtensilsCrossed,
  Dumbbell,
  Store,
  Scissors,
  Building2,
  Baby,
  School,
  ShieldAlert,
  Truck,
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

/** Featured property listings — homepage carousel and `/Properties/[slug]` use this array. */
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
    cardSummary:
      "Abena Yedua is a modern, purpose-built rental community in Kasoa, Nyanyano kakraba, designed for individuals, couples, and families who want a secure, organized place to live without the usual moving stress. The development is taking shape with a secure gate post, perimeter fencing, and dependable electricity and water. Residents will enjoy fast internet, an on-site supermarket, and apartments with ultramodern washrooms and practical layouts. Landscaped sidewalks and green spaces add to a calm, welcoming neighborhood feel. Flexible rental options and quality infrastructure come together so you can settle in and focus on daily life with confidence.",
    description:
      "Abena Yedua Housing is a modern, purpose-built community designed specifically for comfortable rental living. Currently under construction, it provides a secure, convenient, and well-organized environment for individuals, couples, and families seeking a hassle-free lifestyle. Every detail of the development has been carefully planned to ensure residents enjoy comfort, safety, and modern amenities from day one, with a seamless living experience that removes the usual stress of settling into a new home. The community will feature a secure gate post and a fully enclosed perimeter fence wall, offering privacy and peace of mind. Residents will benefit from fast and reliable internet, a conveniently located on-site supermarket, and dependable electricity and water supply for uninterrupted living. Each apartment is being designed with ultramodern washrooms, spacious layouts, and functional interiors that maximize both comfort and practicality. In addition, well-constructed sidewalks and landscaped green spaces will create a safe, relaxing, and welcoming environment for everyday living. Abena Yedua Housing is more than just a place to rent—it is a thoughtfully planned neighborhood that promotes a sense of community and belonging. With flexible rental options, quality infrastructure, and modern conveniences, it offers a balanced lifestyle where comfort, security, and convenience come together, making it an ideal choice for anyone seeking a modern and stress-free living experience.",
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
        name: "Supermarket",
        icon: StoreIcon,
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
     
    ],

    href: "/Properties/abena-yedua-apartments",
    price: "$1,650,500",
    additionalInfo:
      "One bedroom and 2 bedroom apartments, and they will be up to let, not selling",
    additionalInfoLeadingIcon: "home",
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
    location: "Kasoa Winneba Road, Akrampa",
    cardSummary:
      "Rocky Mountains Estate sits along the Kasoa–Winneba Road in Akrampa, offering a well-planned, eco\u2011conscious setting that combines natural serenity with modern infrastructure. The estate is fully serviced with utilities, roads, drainage, lighting, and security so you can focus on building rather than fixing basics. Lifestyle amenities include a gated community, pool, gym, supermarket, restaurant, and on-site management support for everyday convenience. The location sits in a growing corridor with access to urban centers while keeping a calmer residential atmosphere. Flexible, affordable payment options make owning a serviced plot here realistic for families and investors alike.",
    description:
      "Rocky Mountains Estate, located along the Kasoa–Winneba Road in Akrampa, offers a unique opportunity to own property in a well-planned, eco\u2011conscious community that seamlessly combines natural serenity with modern infrastructure. Designed to eliminate the typical challenges of land development, the estate comes fully serviced with essential infrastructure including reliable electricity and water supply, well-constructed asphalt roads, proper drainage systems, sidewalks, ambient street lighting, a secure gatehouse, and a fully walled perimeter to ensure safety and order. At the heart of the development is a strong focus on lifestyle and convenience, with key amenities such as a gated community with 24/7 security, a community swimming pool, restaurant and bar, fully equipped gym, on-site supermarket, unisex salon, laundry services office, children's playground, and a dedicated facility management office all thoughtfully integrated to support comfortable everyday living. Strategically positioned within a fast-developing area and within easy reach of key urban centers, Rocky Mountains Estate offers both immediate livability and strong long-term investment value, with flexible and affordable payment options that make owning a serviced plot both simple and accessible. Whether you are looking to build your dream home or secure a valuable real estate asset, this development provides the perfect foundation for both, offering a serene environment that promotes a balanced lifestyle away from city congestion while still keeping you connected. With increasing development in the surrounding area, property value appreciation is highly promising, making this an investment you can confidently make today.",
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
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Kasoa Winneba Road, Akrampa",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Kasoa+Winneba+Road,+Akrampa,+Ghana&z=15&output=embed",
      mapTitle: "Map - Kasoa Winneba Road, Akrampa",
      brochureButtonText: "Download Brochure",
      brochureHref: "/PropertiesAssets/Rocky_Mountain_brochure.jpeg",
    },
    propertyFeatures: [
      "En-suite bedrooms",
      "Fitted wardrobes in all bedrooms",
      "Fully tiled with fitted kitchen",
      "Spacious tiled compound with perimeter wall",
      "Solar power supply available in case of power outage",
      "Poly tank available for your reserved water supply",
      "P.O.P ceiling",
    ],
  },
  {
    id: "3",
    slug: "nhyira-city-estate",
    heroTitle: "Nhyira City Estate",
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
    priceRange: "GHC 12,000 - GHC 20,000",
    cardSummary:
      "Nhyira City Estate is a carefully planned 385-acre eco\u2011friendly community in Winneba – Gomoa Apre/Mprumen, created for homeowners who want nature and modern convenience in one place. Fully serviced plots are supported by electricity, water, a transport yard, drainage, security, perimeter fencing, and ambient street lighting so you are not starting from scratch. A green park, recreational facilities, and community-focused amenities add to everyday quality of life. The location keeps schools, markets, and nearby towns within practical reach while preserving a quieter residential setting. Flexible payment terms are designed to help you secure the right plot and move your dream home forward with confidence.",
    description:
      "Nhyira City Estate is where life offers you the opportunity to blend nature seamlessly with the conveniences of modern living. This carefully planned 385\u2011acre eco\u2011friendly community is located in the lush, serene enclave of Winneba – Gomoa Apre/Mprumen. The development offers fully serviced plots designed to provide a sustainable and organic lifestyle, freeing you from the burdens of infrastructure development. Nhyira City Estate is more than just a residential area; it is a model community created in response to the high demand from discerning homeowners. Nasqo Properties has ensured that essential infrastructure—including electricity, water, Transport yard for easy mobility, sidewalks, a green park, efficient drainage, a secure gate post, perimeter fence wall, and ambient street lighting—is already in place. This allows residents to focus entirely on designing and building their dream homes while embracing a holistic, stress-free way of life from day one. Nhyira City Estate also provides flexible and convenient payment terms, making it easier for homeowners to secure their ideal plots. The community is strategically located with easy access to nearby towns, schools, markets, and essential services, offering the perfect balance of tranquility and convenience. Embrace the ease of holistic and organic living at Nhyira City Estate, where thoughtfully planned infrastructure, natural surroundings, and a vibrant community come together to turn your dream lifestyle into reality.",
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
      "GHS 1,500 yearly rent per acre for 1–4 acres (includes 1 single-room apartment on-site); GHS 1,300 yearly rent per acre for 5–9 acres (includes 1 single-room apartment); GHS 1,200 yearly rent per acre for 10–19 acres (includes 2 single-room apartments); GHS 1,000 yearly rent per acre for 20–50 acres (includes 3 single-room apartments).",
    amenities: [
      { id: "1", name: "Security Gate Post", icon: CctvIcon },
      { id: "2", name: "Perimeter fence wall", icon: FenceIcon },
      { id: "3", name: "Fast and Reliable internet", icon: WifiIcon },
      { id: "4", name: "Transport yard for easy mobility", icon: Truck },
      { id: "5", name: "Good electricity", icon: CableIcon },
      { id: "6", name: "Good water supply", icon: ShowerHeadIcon },
      { id: "7", name: "Ultramodern washrooms", icon: CctvIcon },
      { id: "8", name: "Recreational center", icon: Building2 },
      { id: "9", name: "Police station for security", icon: ShieldAlert },
      { id: "10", name: "Schools for education", icon: School },
    ],
    href: "/Properties/nhyira-city-estate",
    price: "$78,000",
    locationDetails: {
      sectionTitle: "Location Details",
      locationName: "Winneba – Gomoa Apre/Mprumen",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Winneba,+Gomoa+Apre+Mprumen,+Ghana&z=15&output=embed",
      mapTitle: "Map - Winneba, Gomoa Apre/Mprumen",
      brochureButtonText: "Download Brochure",
      brochureHref: "/PropertiesAssets/Nhyira_City_brochure.jpeg",
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
    cardSummary:
      "Skycity Dwellings is an upcoming residential development along Bawjiase Road in Kasoa, envisioned as a contemporary place to live with calmer surroundings and city convenience within reach. The project is planned around one-bedroom and two-bedroom apartments with spacious layouts, generous windows, and private balconies for light-filled, comfortable homes. Secure access and organized infrastructure are part of the vision, supporting peace of mind for residents and investors in a fast-growing area. Everyday needs—from shops to transport links—are easier to reach from this central Kasoa position. Together, design, security, and location aim to create a community you will be proud to call home.",
    description:
      "Skycity Dwellings is an upcoming residential development envisioned as a modern expression of comfortable urban living. Strategically located along Bawjiase Road in Kasoa, the project is being thoughtfully planned to combine contemporary architecture with a calm and organized living environment, offering the perfect balance between city accessibility and peaceful residential life. Its location also places residents within reach of essential amenities, making everyday living both convenient and efficient. The development is positioned within a fast-growing area, making it an attractive option for both residents and investors alike. The development is set to feature one-bedroom and two-bedroom apartments, designed with spacious layouts, large windows, and private balconies to create bright, airy, and comfortable living spaces. Every detail is being carefully considered to ensure functionality, style, and everyday convenience for individuals, young professionals, and families. The design approach focuses on maximizing space and natural light, creating homes that feel both modern and welcoming. These features are intended to enhance daily living while maintaining a strong sense of comfort and practicality. Skycity Dwellings is also planned to include secure access, organized infrastructure, and a well-structured environment that promotes safety and ease of living. With its strategic location and forward-thinking design, it will offer residents easy access to key services, transport links, and commercial areas within Kasoa. More than just a future housing project, Skycity Dwellings represents a vision for modern living—where comfort, security, and community come together to create a place residents will be proud to call home.",
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
    slug: "general-building-construction",
    heroTitle: "General building construction",
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
      "At Nasqo Properties, our general building construction services are driven by a commitment to delivering exceptional quality, precision, and forward-thinking innovation. We understand that construction goes beyond simply assembling materials—it is about turning your vision into durable, high-value structures designed to stand the test of time. Every project we undertake is guided by meticulous planning, advanced technical expertise, and a strong dedication to excellence at every stage. From elegant residential homes and luxury apartments to expansive commercial and institutional developments, our team of skilled architects, engineers, and craftsmen work seamlessly together to bring each concept to life. We focus on both structural integrity and refined aesthetics, ensuring that every space we create is functional, resilient, and visually compelling. By incorporating premium materials, modern construction technologies, and industry-leading practices, we guarantee superior safety, durability, and long-term value. Our approach is transparent and client-centered, keeping you informed and involved from the initial consultation through design, execution, and final delivery—ensuring projects are completed on time and beyond expectations. At Nasqo Properties, we don’t just build structures—we create spaces where families thrive, businesses succeed, and communities grow. With a strong reputation for reliability, integrity, and outstanding craftsmanship, we are dedicated to delivering construction solutions that not only meet today’s needs but define the standards of tomorrow.",
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
    name: "Kelvin Ampadu",
    title: "Real Estate Developer",
    icon: "/Main_Assets/Tag_outline_main.svg",
    imageSrc: "/HomeAssets/TEAM-1.webp",
  },
  {
    id: "2",
    description:
      "I discovered the perfect property much faster than I expected! The platform provided clear descriptions, high-quality images, and all the essential details I needed to make a confident decision. The entire experience was smooth and hassle-free, and the support team was incredibly responsive whenever I needed assistance. I would absolutely recommend this service to anyone searching for their next home and will gladly return in the future.",
    name: "Bright Elikem",
    title: "MD, Rome Estate",
    icon: "/Main_Assets/Tag_outline_main.svg",
    imageSrc: "/HomeAssets/TEAM-2.webp",
  },
  {
    id: "3",
    description:
      "I had an amazing experience using this platform to find my new home! The property listings were informative and well-organized, making it easy to compare options and narrow down my choices. The photos truly reflected what was available, and the entire process felt straightforward and stress-free. Whenever I had questions, the customer support team responded promptly and professionally. I wouldn’t hesitate to use this service again and highly recommend it to anyone looking for a reliable real estate solution.",
    name: "Evans Tetteh",
    title: "Real Estate Agent",
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
    title: "Transparent, verifiable transactions",
    subtext:
      "From documentation to closing, NASQO Properties prioritizes clarity and due diligence—so buyers and investors understand every step and can move forward with confidence.",
    icon: ShieldCheck,
  },
  {
    id: "2",
    title: "Guidance rooted in local expertise",
    subtext:
      "We pair honest advice with deep knowledge of Ghana’s property landscape, helping you choose land and homes in well-positioned communities that fit your goals and budget.",
    icon: Users,
  },
  {
    id: "3",
    title: "Communities built for lasting value",
    subtext:
      "We focus on thoughtfully planned developments—reliable infrastructure, security, and growth potential—so your property remains a sound place to live or invest for years to come.",
    icon: Building2,
  },
  {
    id: "4",
    title: "Clear pricing & honest communication",
    subtext:
      "No surprises: we explain costs, payment options, and timelines upfront, so you can plan your purchase or investment with confidence and peace of mind.",
    icon: BadgeCent,
  },
  {
    id: "5",
    title: "Quality infrastructure you can rely on",
    subtext:
      "We align with developments that emphasize roads, utilities, drainage, and sound construction—protecting both everyday comfort and long-term resale value.",
    icon: FunnelPlus,
  },
  {
    id: "6",
    title: "Safety and peace of mind",
    subtext:
      "From gated layouts to professional security where provided, we prioritize environments where families and investors feel secure in the community they choose.",
    icon: CctvIcon,
  },
];
