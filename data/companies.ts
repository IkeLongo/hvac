// ─────────────────────────────────────────────────────────────────────────────
// Company configuration data.
// Service content lives in data/services.ts (SERVICE_CATEGORIES)
// Service area content lives in data/serviceAreas.ts (SERVICE_AREAS)
// ─────────────────────────────────────────────────────────────────────────────

export type CompanyAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type CompanySocial = {
  facebook?: string;
  instagram?: string;
  yelp?: string;
  birdeye?: string;
};

export type CompanyHero = {
  headline: string;
  subheadline: string;
};

export type CompanyAbout = {
  headline: string;
  body: string;
  yearsExperience: number;
  img?: { src: string; alt: string };
};

export type CompanyProcessStep = {
  step: number;
  title: string;
  description: string;
};

export type CompanyWhyChooseUs = {
  title: string;
  description: string;
};

export type CompanyStat = {
  label: string;
  value: string;
};

export type CompanyTeamMember = {
  name: string;
  title: string;
  description: string;
  imageSrc?: string;
  alt?: string;
};

export type Company = {
  // Core (used by existing chatbot, metadata, booking)
  name: string;
  phone: string;
  /** Kept as top-level for backward compatibility with existing layout/metadata */
  city: string;
  services: string[];
  primaryColor: string;
  accentColor: string;
  /** Second accent — a complementary pop color for depth in gradients / shader */
  accentColor2: string;
  /** Light neutral — used as a soft background tint in shader and section fills */
  neutral1: string;
  /** Mid neutral — used as a secondary base layer in shader and dividers */
  neutral2: string;
  logo: string;
  logoHorizontal: string;

  // Extended brand & contact
  tagline: string;
  email: string;
  address: CompanyAddress;
  social: CompanySocial;

  // Homepage hero
  hero: CompanyHero;

  // About page content
  about: CompanyAbout;

  // "How It Works" process steps (about & homepage)
  process: CompanyProcessStep[];

  // Trust signals (about & homepage)
  whyChooseUs: CompanyWhyChooseUs[];

  // Headline stats bar (about & homepage)
  statsBar: CompanyStat[];

  /**
   * Service area slugs this company covers (e.g. ["san-antonio", "boerne"]).
   * Full content for each slug is in SERVICE_AREAS from data/serviceAreas.ts
   */
  serviceAreas: string[];

  /**
   * Service category slugs this company offers (e.g. ["cooling", "heating", "air-quality", "commercial"]).
   * Full content for each slug is in SERVICE_CATEGORIES from data/services.ts
   */
  serviceCategories?: string[];

  // Credentials displayed on the About page trust strip
  certifications: string[];

  // Google Reviews integration
  googlePlaceId?: string;

  // Optional team members for the About page
  teamMembers?: CompanyTeamMember[];
};

export const companies: Record<string, Company> = {
  "riverside": {
    name: "RiverSide HVAC Solutions",
    phone: "(210) 730-6232",
    city: "San Antonio",
    services: ["AC Repair", "Installation", "Maintenance", "System Inspection"],
    primaryColor: "#0c2244",
    accentColor: "#bfee3c",
    accentColor2: "#1a6fd4",
    neutral1: "#e6f0fb",
    neutral2: "#c8dff5",
    logo: "/riverside-hvac-logo.png",
    logoHorizontal: "/riverside-hvac-logo.png",
    googlePlaceId: "ChIJbxPRT5n3XIYRarQ1akEeXvc",

    tagline: "San Antonio's Trusted HVAC Experts Since 1999",
    email: "service@riversidehvac.com",
    address: {
      street: "1842 Commerce St",
      city: "San Antonio",
      state: "TX",
      zip: "78205",
    },
    social: {
      facebook: "https://facebook.com/riversidehvacsatx",
      instagram: "https://instagram.com/riversidehvac",
      yelp: "https://yelp.com/biz/riverside-hvac-solutions-san-antonio",
    },

    hero: {
      headline: "Keep Your Home Comfortable Year-Round",
      subheadline:
        "Fast, honest HVAC repair and installation in San Antonio. Licensed technicians, upfront pricing, and 24/7 emergency service when you need it most.",
    },

    about: {
      headline: "San Antonio's HVAC Team You Can Trust",
      body: "RiverSide HVAC Solutions has served the San Antonio area since 1999. What started as a two-truck operation has grown into one of the city's most trusted HVAC companies — still family-owned, still committed to honest work and fair pricing. Every technician on our team is NATE-certified, background-checked, and trained to treat your home with respect. We don't cut corners, we don't upsell what you don't need, and we show up on time.",
      yearsExperience: 25,
    },

    process: [
      {
        step: 1,
        title: "Schedule Online or Call",
        description:
          "Book a same-day or next-day appointment in minutes. We'll confirm your time slot and send a technician profile so you know who's coming.",
      },
      {
        step: 2,
        title: "Diagnose & Explain",
        description:
          "Our technician performs a full system diagnostic and walks you through exactly what's wrong — no jargon, no pressure.",
      },
      {
        step: 3,
        title: "Upfront Quote",
        description:
          "You receive a written quote before any work begins. No surprise charges, no hidden fees. You approve it or we walk away — no hard feelings.",
      },
      {
        step: 4,
        title: "Fixed & Guaranteed",
        description:
          "We complete the repair or installation, test everything, and back our work with a 90-day labor warranty. Your comfort is guaranteed.",
      },
    ],

    whyChooseUs: [
      {
        title: "24/7 Emergency Service",
        description:
          "AC or heater go out at midnight? We answer the phone and dispatch a tech the same night — no after-hours surcharge.",
      },
      {
        title: "Upfront, Honest Pricing",
        description:
          "Every job starts with a written quote. You know the full cost before we touch anything. No surprises on the final invoice.",
      },
      {
        title: "Licensed & Insured",
        description:
          "All technicians carry a valid HVAC license, are background-checked, and are covered by full liability insurance for your protection.",
      },
      {
        title: "100% Satisfaction Guarantee",
        description:
          "If you're not completely satisfied with our work, we'll make it right — free of charge. That's our promise on every job.",
      },
    ],

    statsBar: [
      { value: "25+", label: "Years in Business" },
      { value: "8,000+", label: "Happy Customers" },
      { value: "24/7", label: "Emergency Service" },
      { value: "100%", label: "Satisfaction Guarantee" },
    ],

    serviceAreas: [
      "san-antonio",
      "boerne",
      "helotes",
      "stone-oak",
      "leon-springs",
      "bulverde",
      "live-oak",
      "leon-valley",
    ],

    certifications: [
      "NATE Certified Technicians",
      "EPA 608 Certified",
      "TACLA Licensed & Bonded",
      "BBB Accredited Business",
      "ENERGY STAR® Partner",
      "90-Day Labor Warranty",
    ],
  },

  "cool-breeze": {
    name: "Cool Breeze HVAC",
    phone: "(210) 730-6232",
    city: "San Antonio",
    services: ["Emergency Repair", "AC Tune-Ups", "Duct Cleaning"],
    primaryColor: "#0d55c2",
    accentColor: "#f8a7a7",
    accentColor2: "#30a8e0",
    neutral1: "#e8f3fb",
    neutral2: "#fce8e8",
    logo: "/cool-breeze.png",
    logoHorizontal: "/cool-breeze.png",

    tagline: "Comfort You Can Count On — Day or Night",
    email: "hello@coolbreezehvac.com",
    address: {
      street: "4420 Blanco Rd",
      city: "San Antonio",
      state: "TX",
      zip: "78212",
    },
    social: {
      facebook: "https://facebook.com/coolbreezehvacsa",
      instagram: "https://instagram.com/coolbreezehvac",
      yelp: "https://yelp.com/biz/cool-breeze-hvac-san-antonio",
    },

    hero: {
      headline: "Stay Cool All Summer Long",
      subheadline:
        "San Antonio's emergency HVAC specialists. When your AC breaks down in the Texas heat, Cool Breeze is there — fast response, fair prices, and repairs done right.",
    },

    about: {
      headline: "Built for San Antonio Summers",
      body: "Cool Breeze HVAC was founded on one simple idea: San Antonio homeowners deserve a reliable HVAC company that shows up fast and fixes it right the first time. We specialize in emergency AC repair and preventive maintenance — because the best way to beat the Texas heat is to never lose your cool in the first place. Our technicians average over 10 years of field experience and carry every part needed for same-day repairs.",
      yearsExperience: 15,
    },

    process: [
      {
        step: 1,
        title: "Call or Book Online",
        description:
          "Reach us 24/7 by phone or schedule online. We prioritize emergency calls and offer same-day appointments throughout San Antonio.",
      },
      {
        step: 2,
        title: "Fast On-Site Diagnosis",
        description:
          "A tech arrives in a fully stocked truck ready to diagnose your system quickly and accurately on the first visit.",
      },
      {
        step: 3,
        title: "Clear, Written Quote",
        description:
          "We explain the problem in plain English and give you a written price before starting any work. No pressure, no surprises.",
      },
      {
        step: 4,
        title: "Repaired & Tested",
        description:
          "We fix the issue, run a full performance test, and make sure your home is back to a comfortable temperature before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Same-Day Emergency Repairs",
        description:
          "We prioritize emergency calls and carry common parts on every truck so most repairs are completed same-day, even on weekends.",
      },
      {
        title: "Flat-Rate Pricing",
        description:
          "No hourly rates, no guessing. We quote a flat rate per job so you always know exactly what you'll pay — upfront.",
      },
      {
        title: "10+ Years Average Experience",
        description:
          "Every Cool Breeze technician has a minimum of five years in the field. Most have over a decade of hands-on HVAC experience.",
      },
      {
        title: "Warranty on Every Repair",
        description:
          "All repairs come with a 1-year parts warranty and 90-day labor warranty. We stand behind our work long after we leave.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: [
      "san-antonio",
      "helotes",
      "leon-springs",
      "stone-oak",
      "shavano-park",
      "hollywood-park",
      "universal-city",
      "converse",
    ],

    certifications: [
      "NATE Certified Technicians",
      "EPA 608 Certified",
      "TACLA Licensed & Bonded",
      "1-Year Parts Warranty",
      "5-Star Rated on Google",
      "Same-Day Emergency Service",
    ],
  },

  "allstarairconditioning": {
    name: "All Star Air Conditioning",
    phone: "(210) 361-4020",
    city: "San Antonio",
    services: ["Emergency Repair", "AC Tune-Ups", "Duct Cleaning"],
    primaryColor: "#0F1D36",
    accentColor: "#e7632b",
    accentColor2: "#1e4a8a",
    neutral1: "#f5ece6",
    neutral2: "#e8edf5",
    logo: "/allstar-heating-and-air-conditioning.png",
    logoHorizontal: "/allstar-heating-and-air-conditioning.png",

    tagline: "All Star Service on Every Call",
    email: "info@allstarac.com",
    address: {
      street: "2215 NW Military Hwy",
      city: "San Antonio",
      state: "TX",
      zip: "78213",
    },
    social: {
      facebook: "https://facebook.com/allstaracsa",
      yelp: "https://yelp.com/biz/all-star-air-conditioning-san-antonio",
    },

    hero: {
      headline: "San Antonio's All Star HVAC Team",
      subheadline:
        "Dependable heating and cooling service from technicians who put your home first. Competitive pricing, fast turnaround, and a repair guarantee on every job.",
    },

    about: {
      headline: "Dependable HVAC Since 2006",
      body: "All Star Air Conditioning has been keeping San Antonio families comfortable since 2006. We built our reputation the old-fashioned way — by showing up on time, doing quality work, and treating every customer like a neighbor. Our team services all major HVAC brands and handles everything from emergency repairs to full system replacements. When you call All Star, you get a real technician who cares about getting it right.",
      yearsExperience: 18,
    },

    process: [
      {
        step: 1,
        title: "Book Your Appointment",
        description:
          "Call us or use our online booking tool. We offer flexible scheduling including evenings and Saturdays to work around your schedule.",
      },
      {
        step: 2,
        title: "Thorough System Check",
        description:
          "Our technician performs a complete inspection of your HVAC system, identifies the root cause, and checks for any secondary issues.",
      },
      {
        step: 3,
        title: "Honest Estimate",
        description:
          "We provide a detailed, itemized estimate with no inflated labor padding. You see exactly what you're paying for before we begin.",
      },
      {
        step: 4,
        title: "Quality Repair, Backed by Warranty",
        description:
          "We use OEM or equivalent parts on every repair and back all labor with a 90-day warranty. Quality work you can count on.",
      },
    ],

    whyChooseUs: [
      {
        title: "All Major Brands Serviced",
        description:
          "We work on Trane, Carrier, Lennox, Rheem, Goodman, and all other major HVAC brands. One call covers every make and model.",
      },
      {
        title: "Flexible Scheduling",
        description:
          "Evening and Saturday appointments available at no extra charge. We work around your schedule, not the other way around.",
      },
      {
        title: "No Hidden Fees",
        description:
          "Our quotes are itemized and transparent. The price you approve is the price you pay — guaranteed, no exceptions.",
      },
      {
        title: "Local & Family-Owned",
        description:
          "All Star is a San Antonio business through and through. We live here, raise our families here, and take pride in serving our community.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: [
      "san-antonio",
      "nw-military-hwy-corridor",
      "balcones-heights",
      "windcrest",
      "kirby",
      "schertz",
      "seguin",
      "new-braunfels",
    ],

    certifications: [
      "NATE Certified Technicians",
      "EPA 608 Certified",
      "TACLA Licensed & Bonded",
      "All Major Brands Serviced",
      "4.8★ Google Rating",
      "90-Day Labor Warranty",
    ],
  },

  "conquer-all-mechanical": {
    name: "Conquer All Mechanical Services",
    phone: "(210) 438-4558",
    city: "San Antonio",
    services: [
      "AC Repair",
      "Heating Repair",
      "HVAC Installation",
      "Preventative Maintenance",
      "Indoor Air Quality",
    ],
    primaryColor: "#23262b",
    accentColor: "#ff7a1a",
    accentColor2: "#2f8cff",
    neutral1: "#f4f7fb",
    neutral2: "#d6e2f0",
    logo: "/conquer-all-mechanical-services-logo.png",
    logoHorizontal: "/conquer-all-mechanical-services-logo-2.png",
    googlePlaceId: "ChIJbxPRT5n3XIYRarQ1akEeXvc",

    tagline: "Reliable HVAC Solutions You Can Count On",
    email: "info@conquerallmechanicalservices.com",
    address: {
      street: "",
      city: "San Antonio",
      state: "TX",
      zip: "",
    },
    social: {
      facebook: "https://www.facebook.com/p/Conquer-All-Mechanical-Services-100094743332315/",
      instagram: "",
      yelp: "https://www.yelp.com/biz/conquer-all-mechanical-and-services-san-antonio",
      birdeye: "https://reviews.birdeye.com/conquer-all-mechanical-and-services-167506820915056",
    },

    hero: {
      headline: "Your Trusted HVAC Experts in San Antonio",
      subheadline:
        "Professional heating and cooling services designed to keep your home comfortable year-round. Fast response times, honest service, and reliable results you can depend on.",
    },

    about: {
      headline: "Dedicated to Quality HVAC Service",
      body: "Conquer All Mechanical Services is committed to delivering dependable HVAC solutions across San Antonio. With a focus on customer satisfaction, quality workmanship, and honest communication, their team ensures every job is done right the first time. Whether it's a repair, installation, or routine maintenance, they approach every project with professionalism and care.",
      yearsExperience: 10,
    },

    process: [
      {
        step: 1,
        title: "Request Service",
        description:
          "Call or submit a request online to schedule your HVAC service at a time that works best for you.",
      },
      {
        step: 2,
        title: "Inspection & Diagnosis",
        description:
          "A technician will inspect your system, identify the issue, and explain the solution in clear terms.",
      },
      {
        step: 3,
        title: "Transparent Pricing",
        description:
          "Receive an upfront quote before any work begins so you know exactly what to expect.",
      },
      {
        step: 4,
        title: "Service Completion",
        description:
          "We complete the repair or installation efficiently and ensure your system is running properly before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Fast & Reliable Service",
        description: "Quick response times and dependable service to restore your comfort as soon as possible.",
      },
      {
        title: "Honest Recommendations",
        description: "We provide straightforward advice without upselling unnecessary services.",
      },
      {
        title: "Experienced Technicians",
        description: "Skilled professionals trained to handle all types of HVAC systems.",
      },
      {
        title: "Customer-First Approach",
        description: "We prioritize your comfort and satisfaction on every job we take.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "leon-valley", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],
  },

  "flo-aire-service": {
    name: "Flo-Aire Service Inc",
    phone: "(210) 655-1738",
    city: "San Antonio",
    services: [
      "AC Repair",
      "Heating Repair",
      "HVAC Installation",
      "Preventative Maintenance",
      "Commercial HVAC",
    ],
    primaryColor: "#2b2a2a",
    accentColor: "#c52727",
    accentColor2: "#e9c4c4",
    neutral1: "#f5f7fa",
    neutral2: "#dce3ea",
    logo: "/flo-aire-service.png",
    logoHorizontal: "/flo-aire-service.png",

    tagline: "Keeping San Antonio Comfortable Since Day One",
    email: "service@floaireservice.com",
    address: {
      street: "",
      city: "San Antonio",
      state: "TX",
      zip: "",
    },
    social: {},

    hero: {
      headline: "Reliable HVAC Service in San Antonio",
      subheadline:
        "From emergency AC repairs to full system replacements, Flo-Aire delivers dependable comfort solutions backed by years of experience.",
    },

    about: {
      headline: "A Team You Can Trust",
      body: "Flo-Aire Service Inc has built a strong reputation in San Antonio for dependable HVAC service and honest work. Their team focuses on delivering long-term solutions, not quick fixes, ensuring every customer gets lasting comfort and peace of mind.",
      yearsExperience: 15,
    },

    process: [
      {
        step: 1,
        title: "Schedule Service",
        description: "Call us or book online to schedule your HVAC service at a time that works for you.",
      },
      {
        step: 2,
        title: "Diagnose & Explain",
        description:
          "Our technician inspects your system and walks you through exactly what's needed before any work begins.",
      },
      {
        step: 3,
        title: "Upfront Quote",
        description: "You receive a clear, written quote before we start. No surprise charges, no hidden fees.",
      },
      {
        step: 4,
        title: "Service & Follow-Up",
        description: "We complete the work, test the system, and make sure you're satisfied before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Experienced Team",
        description: "Years of hands-on HVAC experience across residential and commercial systems in San Antonio.",
      },
      {
        title: "Honest Pricing",
        description: "Straightforward written quotes before any work begins — no hidden fees or surprise charges.",
      },
      { title: "Reliable Service", description: "We show up on time and get the job done right the first time." },
      {
        title: "Local & Trusted",
        description: "A San Antonio business committed to the community we serve.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "leon-valley", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],
  },

  "air-dynamics-mechanical": {
    name: "Air Dynamics Mechanical",
    phone: "(210) 852-3535",
    city: "San Antonio",
    services: ["AC Repair", "Heating Repair", "HVAC Installation", "Commercial HVAC", "System Design"],
    primaryColor: "#0b2545",
    accentColor: "#44b5f7",
    accentColor2: "#ff9f1c",
    neutral1: "#f7f9fb",
    neutral2: "#d9e2ec",
    logo: "/air-dynamics-mechanical.png",
    logoHorizontal: "/air-dynamics-mechanical.png",

    tagline: "Precision HVAC Solutions Built to Perform",
    email: "info@airdynamicsmech.com",
    address: {
      street: "",
      city: "San Antonio",
      state: "TX",
      zip: "",
    },
    social: {},

    hero: {
      headline: "Engineered Comfort for Homes & Businesses",
      subheadline:
        "Air Dynamics Mechanical provides high-performance HVAC solutions designed for efficiency, reliability, and long-term value.",
    },

    about: {
      headline: "Built on Precision & Performance",
      body: "Air Dynamics Mechanical specializes in delivering high-quality HVAC systems and services for both residential and commercial clients. Their focus on precision, system performance, and customer satisfaction sets them apart in the San Antonio market.",
      yearsExperience: 12,
    },

    process: [
      {
        step: 1,
        title: "Schedule Service",
        description: "Call or request service online at a time that works for you.",
      },
      {
        step: 2,
        title: "System Assessment",
        description:
          "We evaluate your HVAC system thoroughly and explain our findings clearly before recommending any work.",
      },
      {
        step: 3,
        title: "Upfront Pricing",
        description: "Receive a detailed, written quote before any work begins — no surprises.",
      },
      {
        step: 4,
        title: "Precision Service",
        description:
          "We complete the job to the highest standard and verify everything is performing correctly before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Precision Installation",
        description:
          "Every system installed and serviced to exact manufacturer specifications for maximum performance.",
      },
      {
        title: "Commercial & Residential",
        description: "Experienced with both residential and commercial HVAC systems of all complexities.",
      },
      {
        title: "Transparent Pricing",
        description: "Written quotes before work begins — the price you approve is the price you pay.",
      },
      {
        title: "Performance Focused",
        description: "We optimize systems for efficiency and long-term reliability, not just a quick fix.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "leon-valley", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],
  },

  "felix-air-services": {
    name: "Felix Air Services",
    phone: "(726) 249-5961",
    city: "San Antonio",
    services: [
      "AC Repair",
      "Heating Repair",
      "HVAC Installation",
      "Maintenance",
      "Indoor Air Quality",
    ],
    primaryColor: "#051a47",
    accentColor: "#45bbff",
    accentColor2: "#457b9d",
    neutral1: "#f8f9fa",
    neutral2: "#dee2e6",
    logo: "/felix-air-services.png",
    logoHorizontal: "/felix-air-services.png",

    tagline: "Fast, Honest HVAC Service You Can Count On",
    email: "service@felixairservices.com",
    address: {
      street: "",
      city: "San Antonio",
      state: "TX",
      zip: "",
    },
    social: {},

    hero: {
      headline: "San Antonio HVAC Service Done Right",
      subheadline:
        "Felix Air Services delivers fast response times, honest pricing, and reliable HVAC solutions for homes across San Antonio.",
    },

    about: {
      headline: "Focused on Service & Reliability",
      body: "Felix Air Services is known for quick turnaround times and dependable HVAC work. Their team prioritizes clear communication, fair pricing, and getting the job done right the first time.",
      yearsExperience: 10,
    },

    process: [
      {
        step: 1,
        title: "Call or Book Online",
        description: "Reach us by phone or schedule online for fast, responsive service.",
      },
      {
        step: 2,
        title: "Fast Diagnosis",
        description:
          "A technician arrives ready to diagnose your system and explain what's wrong in plain terms.",
      },
      {
        step: 3,
        title: "Clear Quote",
        description: "We provide written pricing before starting — honest and upfront with no hidden charges.",
      },
      {
        step: 4,
        title: "Repair & Verify",
        description: "We complete the repair and confirm your system is running correctly before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Fast Response Times",
        description: "We prioritize quick scheduling so you're not left waiting in discomfort.",
      },
      {
        title: "Honest Pricing",
        description: "Fair, upfront quotes — the price you're given is the price you pay.",
      },
      {
        title: "Reliable Repairs",
        description: "We fix it right the first time and stand behind our work on every job.",
      },
      {
        title: "Clear Communication",
        description: "We keep you informed from the first call through the final invoice — no surprises.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "leon-valley", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],
  },

  "toughac": {
    name: "Tough AC & Heating",
    phone: "830-212-2892",
    city: "San Antonio",
    services: ["AC Maintenance", "AC Services", "Heating & Furnace"],
    primaryColor: "#053447",
    accentColor: "#45bbff",
    accentColor2: "#457b9d",
    neutral1: "#f8f9fa",
    neutral2: "#dee2e6",
    logo: "/logos/tough-ac-logo-2.avif",
    logoHorizontal: "/logos/tough-ac-logo-1.avif",
    googlePlaceId: "ChIJufHTGSlDnmsRcqQ_XkIWetI",

    tagline: "Fast, Honest HVAC Service You Can Count On",
    email: "office@toughac.com",
    address: {
      street: "",
      city: "Spring Branch",
      state: "TX",
      zip: "",
    },
    social: {},

    hero: {
      headline: "San Antonio HVAC Service Done Right",
      subheadline:
        "Tough AC & Heating delivers fast response times, honest pricing, and reliable HVAC solutions for homes across San Antonio.",
    },

    about: {
      headline: "Focused on Service & Reliability",
      body: "At Tough AC, our mission is to deliver reliable, high-quality air conditioning solutions with integrity, expertise, and a personal touch. We are committed to keeping our customers comfortable year-round by providing top-tier service, energy-efficient systems, and building lasting relationships based on trust and transparency.",
      yearsExperience: 10,
      img: { 
        src: "/team/tough-ac/repair-brothers.avif", 
        alt: "Tough AC & Heating team at work"
      },
    },

    process: [
      {
        step: 1,
        title: "Call or Book Online",
        description: "Reach us by phone or schedule online for fast, responsive service.",
      },
      {
        step: 2,
        title: "Fast Diagnosis",
        description:
          "A technician arrives ready to diagnose your system and explain what's wrong in plain terms.",
      },
      {
        step: 3,
        title: "Clear Quote",
        description: "We provide written pricing before starting — honest and upfront with no hidden charges.",
      },
      {
        step: 4,
        title: "Repair & Verify",
        description: "We complete the repair and confirm your system is running correctly before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Fast Response Times",
        description: "We prioritize quick scheduling so you're not left waiting in discomfort.",
      },
      {
        title: "Honest Pricing",
        description: "Fair, upfront quotes — the price you're given is the price you pay.",
      },
      {
        title: "Reliable Repairs",
        description: "We fix it right the first time and stand behind our work on every job.",
      },
      {
        title: "Clear Communication",
        description: "We keep you informed from the first call through the final invoice — no surprises.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "500+", label: "Jobs Completed" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "24/7", label: "Emergency Service" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "spring-branch", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],

    teamMembers: [
      {
        name: "Fernando Garcia",
        title: "Operations Manager",
        description:
          "With 12+ years of HVAC experience, Fernando started Tough AC to provide honest, reliable service. He's a hands-on leader who loves meeting customers. Outside of work, he enjoys fishing and family time.",
        imageSrc: "/team/tough-ac/Fernando-Garcia.avif",
        alt: "Fernando Garcia, Operations Manager at Tough AC & Heating",
      },
      {
        name: "Antonio Garcia",
        title: "Operations Manager",
        description:
          "Antonio has oversees daily operations, ensuring efficiency and excellent service. With a decade in the HVAC field, he's passionate about customer satisfaction. In his free time, he loves fishing.",
        imageSrc: "/team/tough-ac/Antonio-Garcia.avif",
        alt: "Antonio Garcia, Operations Manager at Tough AC & Heating",
      },
    ],
  },

  "jbaire": {
    name: "JB Aire Heating & Air Conditioning",
    phone: "830-885-6640",
    city: "San Antonio",
    services: ["AC Maintenance", "AC Services", "Heating & Furnace"],
    primaryColor: "#140a0a",
    accentColor: "#dd2a2a",
    accentColor2: "#4a4e5e",
    neutral1: "#f8f9fa",
    neutral2: "#dee2e6",
    logo: "/logos/jbaire/jbaire.png",
    logoHorizontal: "/logos/jbaire/jbaire.png",
    googlePlaceId: "ChIJufHTGSlDnmsRcqQ_XkIWetI",

    tagline: "Fast, Honest HVAC Service You Can Count On",
    email: "office@jbaire.com",
    address: {
      street: "",
      city: "Spring Branch",
      state: "TX",
      zip: "",
    },
    social: {},

    hero: {
      headline: "San Antonio HVAC Service Done Right",
      subheadline:
        "JB Aire Heating & Air Conditioning delivers fast response times, honest pricing, and reliable HVAC solutions for homes across San Antonio.",
    },

    about: {
      headline: "Focused on Service & Reliability",
      body: "At JB Aire Heating & Air Conditioning, our mission is to deliver reliable, high-quality air conditioning solutions with integrity, expertise, and a personal touch. We are committed to keeping our customers comfortable year-round by providing top-tier service, energy-efficient systems, and building lasting relationships based on trust and transparency.",
      yearsExperience: 10,
    },

    process: [
      {
        step: 1,
        title: "Call or Book Online",
        description: "Reach us by phone or schedule online for fast, responsive service.",
      },
      {
        step: 2,
        title: "Fast Diagnosis",
        description:
          "A technician arrives ready to diagnose your system and explain what's wrong in plain terms.",
      },
      {
        step: 3,
        title: "Clear Quote",
        description: "We provide written pricing before starting — honest and upfront with no hidden charges.",
      },
      {
        step: 4,
        title: "Repair & Verify",
        description: "We complete the repair and confirm your system is running correctly before we leave.",
      },
    ],

    whyChooseUs: [
      {
        title: "Fast Response Times",
        description: "We prioritize quick scheduling so you're not left waiting in discomfort.",
      },
      {
        title: "Honest Pricing",
        description: "Fair, upfront quotes — the price you're given is the price you pay.",
      },
      {
        title: "Reliable Repairs",
        description: "We fix it right the first time and stand behind our work on every job.",
      },
      {
        title: "Clear Communication",
        description: "We keep you informed from the first call through the final invoice — no surprises.",
      },
    ],

    statsBar: [
      { value: "10+", label: "Years in Business" },
      { value: "Fast", label: "Response Times" },
      { value: "100%", label: "Satisfaction Guarantee" },
      { value: "All", label: "Major Brands Serviced" },
    ],

    serviceAreas: ["san-antonio", "boerne", "helotes", "stone-oak", "spring-branch", "live-oak"],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: ["cooling", "heating", "air-quality", "commercial"],

    teamMembers: [
      {
        name: "Fernando Garcia",
        title: "Operations Manager",
        description:
          "With 12+ years of HVAC experience, Fernando started JB Aire Heating & Air Conditioning to provide honest, reliable service. He's a hands-on leader who loves meeting customers. Outside of work, he enjoys fishing and family time.",
        imageSrc: "/team/jbaire/Fernando-Garcia.avif",
        alt: "Fernando Garcia, Operations Manager at JB Aire Heating & Air Conditioning",
      },
      {
        name: "Antonio Garcia",
        title: "Operations Manager",
        description:
          "Antonio has oversees daily operations, ensuring efficiency and excellent service. With a decade in the HVAC field, he's passionate about customer satisfaction. In his free time, he loves fishing.",
        imageSrc: "/team/jbaire/Antonio-Garcia.avif",
        alt: "Antonio Garcia, Operations Manager at JB Aire Heating & Air Conditioning",
      },
    ],
  },
};
