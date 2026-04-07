export type ServiceAreaDetail = {
  headline: string;
  subheadline: string;
  intro: string;
  areaContext: string;
  commonProblems: string[];
  serviceHighlights: string[];
  whyChooseUs: string[];
  nearbyAreas: string[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
  metaTitle?: string;
  metaDescription?: string;
};
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

export type ServiceArea = {
  name: string;
  slug: string;
};

export type CompanyStat = {
  label: string;
  value: string;
};

export type ServiceItem = {
  name: string;
  slug: string;
  description: string;
  isFeatured?: boolean;
  benefits?: string[];
  process?: { step: string; detail: string }[];
  signsYouNeed?: string[];
  pricingNote?: string;
};

export type ServiceCategory = {
  name: string;
  slug: string;
  services: ServiceItem[];
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


  // Service areas listed in footer and future SEO pages
  serviceAreas: ServiceArea[];

  // Area-specific SEO and content for dynamic pages
  serviceAreaDetails?: Record<string, ServiceAreaDetail>;

  // Structured service categories for service pages and navigation
  serviceCategories?: ServiceCategory[];

  // Credentials displayed on the About page trust strip
  certifications: string[];

  // Google Reviews integration
  googlePlaceId?: string;
};

export const companies: Record<string, Company> = {
  "alamo-air": {
    // Core
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

    // Extended brand & contact
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

    // Homepage hero
    hero: {
      headline: "Keep Your Home Comfortable Year-Round",
      subheadline:
        "Fast, honest HVAC repair and installation in San Antonio. Licensed technicians, upfront pricing, and 24/7 emergency service when you need it most.",
    },

    // About page content
    about: {
      headline: "San Antonio's HVAC Team You Can Trust",
      body: "RiverSide HVAC Solutions has served the San Antonio area since 1999. What started as a two-truck operation has grown into one of the city's most trusted HVAC companies — still family-owned, still committed to honest work and fair pricing. Every technician on our team is NATE-certified, background-checked, and trained to treat your home with respect. We don't cut corners, we don't upsell what you don't need, and we show up on time.",
      yearsExperience: 25,
    },

    // "How It Works" process steps
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

    // Trust signals
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

    // Stats bar
    statsBar: [
      { value: "25+", label: "Years in Business" },
      { value: "8,000+", label: "Happy Customers" },
      { value: "24/7", label: "Emergency Service" },
      { value: "100%", label: "Satisfaction Guarantee" },
    ],

    // Service areas
    serviceAreas: [
      { name: "San Antonio", slug: "san-antonio" },
      { name: "Boerne", slug: "boerne" },
      { name: "Helotes", slug: "helotes" },
      { name: "Stone Oak", slug: "stone-oak" },
      { name: "Leon Springs", slug: "leon-springs" },
      { name: "Bulverde", slug: "bulverde" },
      { name: "Live Oak", slug: "live-oak" },
      { name: "Leon Valley", slug: "leon-valley" },
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
    // Core
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

    // Extended brand & contact
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

    // Homepage hero
    hero: {
      headline: "Stay Cool All Summer Long",
      subheadline:
        "San Antonio's emergency HVAC specialists. When your AC breaks down in the Texas heat, Cool Breeze is there — fast response, fair prices, and repairs done right.",
    },

    // About page content
    about: {
      headline: "Built for San Antonio Summers",
      body: "Cool Breeze HVAC was founded on one simple idea: San Antonio homeowners deserve a reliable HVAC company that shows up fast and fixes it right the first time. We specialize in emergency AC repair and preventive maintenance — because the best way to beat the Texas heat is to never lose your cool in the first place. Our technicians average over 10 years of field experience and carry every part needed for same-day repairs.",
      yearsExperience: 15,
    },

    // "How It Works" process steps
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

    // Trust signals
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

    // Stats bar
    statsBar: [
      { value: "15+", label: "Years in Business" },
      { value: "4,500+", label: "Repairs Completed" },
      { value: "< 2hr", label: "Avg Emergency Response" },
      { value: "4.9★", label: "Average Review Rating" },
    ],

    // Service areas
    serviceAreas: [
      { name: "San Antonio", slug: "san-antonio" },
      { name: "Helotes", slug: "helotes" },
      { name: "Leon Springs", slug: "leon-springs" },
      { name: "Stone Oak", slug: "stone-oak" },
      { name: "Shavano Park", slug: "shavano-park" },
      { name: "Hollywood Park", slug: "hollywood-park" },
      { name: "Universal City", slug: "universal-city" },
      { name: "Converse", slug: "converse" },
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
    // Core
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

    // Extended brand & contact
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

    // Homepage hero
    hero: {
      headline: "San Antonio's All Star HVAC Team",
      subheadline:
        "Dependable heating and cooling service from technicians who put your home first. Competitive pricing, fast turnaround, and a repair guarantee on every job.",
    },

    // About page content
    about: {
      headline: "Dependable HVAC Since 2006",
      body: "All Star Air Conditioning has been keeping San Antonio families comfortable since 2006. We built our reputation the old-fashioned way — by showing up on time, doing quality work, and treating every customer like a neighbor. Our team services all major HVAC brands and handles everything from emergency repairs to full system replacements. When you call All Star, you get a real technician who cares about getting it right.",
      yearsExperience: 18,
    },

    // "How It Works" process steps
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

    // Trust signals
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

    // Stats bar
    statsBar: [
      { value: "18+", label: "Years in Business" },
      { value: "6,200+", label: "Jobs Completed" },
      { value: "All", label: "Major Brands Serviced" },
      { value: "4.8★", label: "Average Review Rating" },
    ],

    // Service areas
    serviceAreas: [
      { name: "San Antonio", slug: "san-antonio" },
      { name: "NW Military Hwy Corridor", slug: "nw-military-hwy-corridor" },
      { name: "Balcones Heights", slug: "balcones-heights" },
      { name: "Windcrest", slug: "windcrest" },
      { name: "Kirby", slug: "kirby" },
      { name: "Schertz", slug: "schertz" },
      { name: "Seguin", slug: "seguin" },
      { name: "New Braunfels", slug: "new-braunfels" },
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
    // Core
    name: "Conquer All Mechanical Services",
    phone: "(210) 438-4558", // replace if you confirm exact
    city: "San Antonio",
    services: [
      "AC Repair",
      "Heating Repair",
      "HVAC Installation",
      "Preventative Maintenance",
      "Indoor Air Quality"
    ],
    primaryColor: "#23262b",     // deep navy from shield (stronger than your default)
    accentColor: "#ff7a1a",      // fire orange (MAIN CTA color)
    accentColor2: "#2f8cff",     // bright cooling blue (secondary actions / highlights)

    neutral1: "#f4f7fb",         // light background (clean, modern)
    neutral2: "#d6e2f0",         // soft border / card background
    logo: "/conquer-all-mechanical-services-logo.png",
    logoHorizontal: "/conquer-all-mechanical-services-logo-2.png",
    googlePlaceId: "ChIJbxPRT5n3XIYRarQ1akEeXvc", // you should grab this like you did before

    // Extended brand & contact
    tagline: "Reliable HVAC Solutions You Can Count On",
    email: "info@conquerallmechanicalservices.com",
    address: {
      street: "", // not clearly listed — confirm if needed
      city: "San Antonio",
      state: "TX",
      zip: "",
    },
    social: {
      facebook: "https://www.facebook.com/p/Conquer-All-Mechanical-Services-100094743332315/",
      instagram: "",
      yelp: "https://www.yelp.com/biz/conquer-all-mechanical-and-services-san-antonio",
      birdeye: "https://reviews.birdeye.com/conquer-all-mechanical-and-services-167506820915056"
    },

    // Homepage hero
    hero: {
      headline: "Your Trusted HVAC Experts in San Antonio",
      subheadline:
        "Professional heating and cooling services designed to keep your home comfortable year-round. Fast response times, honest service, and reliable results you can depend on.",
    },

    // About page content
    about: {
      headline: "Dedicated to Quality HVAC Service",
      body:
        "Conquer All Mechanical Services is committed to delivering dependable HVAC solutions across San Antonio. With a focus on customer satisfaction, quality workmanship, and honest communication, their team ensures every job is done right the first time. Whether it's a repair, installation, or routine maintenance, they approach every project with professionalism and care.",
      yearsExperience: 10, // adjust if you confirm
    },

    // "How It Works" process steps
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

    // Trust signals
    whyChooseUs: [
      {
        title: "Fast & Reliable Service",
        description:
          "Quick response times and dependable service to restore your comfort as soon as possible.",
      },
      {
        title: "Honest Recommendations",
        description:
          "We provide straightforward advice without upselling unnecessary services.",
      },
      {
        title: "Experienced Technicians",
        description:
          "Skilled professionals trained to handle all types of HVAC systems.",
      },
      {
        title: "Customer-First Approach",
        description:
          "We prioritize your comfort and satisfaction on every job we take.",
      },
    ],

    // Stats bar
    statsBar: [
      { value: "10+", label: "Years Experience" },
      { value: "1,000+", label: "Projects Completed" },
      { value: "24/7", label: "Availability" },
      { value: "100%", label: "Customer Focused" },
    ],

    // Service areas
    serviceAreas: [
      { name: "San Antonio", slug: "san-antonio" },
      { name: "Boerne", slug: "boerne" },
      { name: "Helotes", slug: "helotes" },
      { name: "Stone Oak", slug: "stone-oak" },
      { name: "Leon Valley", slug: "leon-valley" },
      { name: "Live Oak", slug: "live-oak" },
    ],

    certifications: [
      "Licensed HVAC Technicians",
      "EPA Certified",
      "Fully Insured",
      "Residential & Commercial Service",
    ],

    serviceCategories: [
      {
        name: "Cooling",
        slug: "cooling",
        services: [
          {
            name: "AC Repair",
            slug: "ac-repair",
            description: "Fast diagnosis and repair for all central AC and heat pump systems. Most repairs completed same-day.",
            isFeatured: true,
            signsYouNeed: [
              "AC is blowing warm or room-temperature air",
              "System runs but the house won't cool down",
              "Grinding, banging, or squealing noises from the unit",
              "Energy bills spiked without explanation",
              "Unit is short-cycling on and off frequently",
              "Ice visible on refrigerant lines or the outdoor unit",
              "Water pooling around the indoor air handler",
            ],
            benefits: [
              "Same-day diagnosis available",
              "Upfront written quote before any work begins",
              "All makes and models serviced",
              "90-day labor warranty on every repair",
              "NATE-certified technicians",
            ],
            process: [
              { step: "Diagnose", detail: "We run a full system diagnostic to pinpoint the exact failure." },
              { step: "Quote", detail: "You get upfront pricing before any work begins — no surprises." },
              { step: "Repair", detail: "Our tech completes the repair with the right parts on the spot." },
              { step: "Test", detail: "We test the full system to confirm proper cooling." },
              { step: "Warranty", detail: "Every repair comes with our 90-day labor warranty." },
            ],
            pricingNote: "Diagnostic fee starts at $89. Final cost quoted upfront before work begins.",
          },
          {
            name: "AC Installation & Replacement",
            slug: "ac-installation",
            description: "Proper sizing, equipment selection, and installation for new or replacement central AC systems.",
            isFeatured: true,
            signsYouNeed: [
              "Current system is 12 or more years old",
              "Repair costs are approaching the system's replacement value",
              "Inconsistent temperatures from room to room",
              "Energy bills continue rising despite regular maintenance",
              "Building a new home or adding a room addition",
            ],
            benefits: [
              "Free in-home estimate with Manual J load calculation",
              "Top-tier brands across multiple price points",
              "Financing available for qualified homeowners",
              "All permits pulled and city inspections handled",
              "Full manufacturer warranty on new equipment",
            ],
            process: [
              { step: "Consultation", detail: "We visit your home, assess the space, and discuss your comfort goals." },
              { step: "Load Calculation", detail: "A proper Manual J calculation ensures your new system is correctly sized." },
              { step: "Equipment Selection", detail: "We recommend systems that fit your budget and efficiency goals." },
              { step: "Installation", detail: "Our crew installs the system cleanly, correctly, and up to code." },
              { step: "Walk-Through", detail: "We test the full system and walk you through operation and maintenance." },
            ],
            pricingNote: "Installation starts around $3,500 depending on system size. Free in-home estimate.",
          },
          {
            name: "AC Maintenance & Tune-Up",
            slug: "ac-maintenance",
            description: "Pre-season inspection and tune-up to maximize efficiency and catch issues before summer.",
            signsYouNeed: [
              "System hasn't been serviced in over a year",
              "Airflow from vents feels weaker than before",
              "More dust in the home than usual",
              "System works harder than expected to reach set temperature",
              "Manufacturer warranty requires annual maintenance",
            ],
            benefits: [
              "Pre-season inspection before summer heat arrives",
              "Extends system lifespan significantly",
              "Keeps manufacturer warranty valid",
              "Lowers monthly energy bills",
              "Written performance report after every visit",
            ],
            process: [
              { step: "Schedule", detail: "Book your pre-season tune-up before demand peaks in spring." },
              { step: "Inspection", detail: "We inspect coils, filters, electrical, refrigerant, and drainage." },
              { step: "Tune-Up", detail: "We clean, calibrate, and tighten everything to factory spec." },
              { step: "Report", detail: "You receive a written summary of your system's condition and any recommended work." },
            ],
            pricingNote: "Starting at $79 per visit. Annual maintenance plans with priority scheduling available.",
          },
          {
            name: "Ductless Mini-Split Service",
            slug: "mini-split-service",
            description: "Installation, repair, and maintenance for ductless mini-split systems in additions, sunrooms, and detached structures.",
            signsYouNeed: [
              "Room or addition has no existing ductwork",
              "One room consistently runs hot or cold",
              "Garage, sunroom, or detached structure needs AC",
              "Current mini-split is not cooling or heating properly",
              "You want independent temperature control for specific rooms",
            ],
            benefits: [
              "All major brands serviced — Mitsubishi, Daikin, LG, and more",
              "No ductwork required — ideal for additions and garages",
              "Energy-efficient zone control for individual rooms",
              "Installation and repair both available",
              "Licensed and insured technicians",
            ],
            process: [
              { step: "Assess", detail: "We evaluate your space and existing setup to determine the right solution." },
              { step: "Recommend", detail: "We specify the correct system size and placement for optimal efficiency." },
              { step: "Install or Repair", detail: "Work is performed by techs trained on leading mini-split brands." },
              { step: "Test & Train", detail: "We test every zone and walk you through the remote and settings." },
            ],
            pricingNote: "Pricing depends on system size and number of zones. Free estimate provided.",
          },
        ],
      },
      {
        name: "Heating",
        slug: "heating",
        services: [
          {
            name: "Heating Repair",
            slug: "heating-repair",
            description: "Diagnosis and repair for furnaces, heat pumps, and all residential heating systems.",
            isFeatured: true,
            signsYouNeed: [
              "Heater turns on but produces little or no heat",
              "Pilot light is out or won't stay lit",
              "Burning or unusual odors when heat runs",
              "Banging, rattling, or popping during operation",
              "Some rooms stay cold while others are warm",
              "Heating bills are noticeably higher than prior seasons",
            ],
            benefits: [
              "Emergency heating service available",
              "Gas and electric systems serviced",
              "Full safety inspection included with every repair",
              "90-day labor warranty",
              "Licensed and insured technicians",
            ],
            process: [
              { step: "Diagnose", detail: "We perform a full heating system diagnostic to find the root cause." },
              { step: "Safety Check", detail: "We inspect for carbon monoxide risk, gas leaks, and electrical hazards." },
              { step: "Quote", detail: "Upfront pricing provided before any repair begins." },
              { step: "Repair", detail: "Parts sourced and repair completed — most calls resolved in one visit." },
              { step: "Test & Verify", detail: "We confirm proper heat output across all zones before leaving." },
            ],
            pricingNote: "Diagnostic fee starts at $99. Final cost quoted upfront before work begins.",
          },
          {
            name: "Heating Installation & Replacement",
            slug: "heating-installation",
            description: "Full heating system installation and replacement with proper load calculations and equipment sizing.",
            signsYouNeed: [
              "Furnace or heat pump is 15 or more years old",
              "Repair estimates are approaching the cost of a new system",
              "Home takes too long to reach set temperature",
              "Converting from one fuel type to another",
              "New construction or addition requiring a heating system",
            ],
            benefits: [
              "Free in-home estimate with proper load calculation",
              "Gas, electric, and heat pump systems available",
              "Financing options for qualified homeowners",
              "All permits and inspections handled",
              "Installation backed by manufacturer warranty",
            ],
            process: [
              { step: "Consultation", detail: "We assess your heating needs, fuel source, and existing equipment." },
              { step: "Sizing & Selection", detail: "Proper load calculations ensure your new system is correctly sized." },
              { step: "Equipment Order", detail: "We source the right equipment — honest recommendations, no upselling." },
              { step: "Installation", detail: "Clean, code-compliant installation with zero shortcuts." },
              { step: "Walk-Through", detail: "We verify operation and explain maintenance requirements." },
            ],
            pricingNote: "Heating installation starts around $2,500+. Free in-home estimate available.",
          },
          {
            name: "Heating Maintenance",
            slug: "heating-maintenance",
            description: "Fall heating check to ensure your system is ready before the first cold front of the season.",
            signsYouNeed: [
              "Heating system hasn't been serviced in over a year",
              "System has had intermittent starting issues",
              "Gas bills last winter were higher than expected",
              "You want to protect your manufacturer warranty",
              "Preparing for the first cold season in a new home",
            ],
            benefits: [
              "Full safety inspection for gas and electric systems",
              "Cleans and calibrates all components for peak performance",
              "Reduces risk of mid-winter breakdowns",
              "Extends system lifespan and keeps warranty valid",
              "Written report with any findings noted clearly",
            ],
            process: [
              { step: "Schedule", detail: "Book your fall tune-up before the first cold front." },
              { step: "Safety Inspection", detail: "We check for carbon monoxide, gas leaks, and electrical safety." },
              { step: "Tune-Up", detail: "Cleaning, lubricating, and calibrating all heating components." },
              { step: "Report", detail: "Written assessment provided with any recommended work noted clearly." },
            ],
            pricingNote: "Starting at $79 per visit. Fall maintenance plan pricing available.",
          },
        ],
      },
      {
        name: "Air Quality",
        slug: "air-quality",
        services: [
          {
            name: "Indoor Air Quality Assessment",
            slug: "indoor-air-quality",
            description: "Evaluation of filtration, ventilation, and humidity levels to improve air quality in your home.",
            isFeatured: true,
            signsYouNeed: [
              "Family members experience allergy or asthma symptoms at home",
              "Dust builds up quickly on surfaces after cleaning",
              "Musty or stale odors coming from vents",
              "High humidity causing condensation on windows or walls",
              "Pets in the home and unexplained respiratory discomfort",
            ],
            benefits: [
              "Comprehensive assessment of filtration, ventilation, and humidity",
              "Actionable written report with prioritized recommendations",
              "Covers dust, allergens, mold risk, and VOCs",
              "No-obligation consultation",
              "Local HVAC experts familiar with South Texas climate",
            ],
            process: [
              { step: "Walkthrough", detail: "We inspect your home's filtration system, ductwork, and ventilation." },
              { step: "Measurement", detail: "We evaluate humidity levels, airflow, and contamination sources." },
              { step: "Report", detail: "You receive a clear written report with findings and recommended improvements." },
              { step: "Solutions", detail: "We quote only what's needed — from filter upgrades to full purification systems." },
            ],
            pricingNote: "IAQ assessment starts at $89. Recommended solutions quoted separately.",
          },
          {
            name: "Filtration & Air Purification",
            slug: "air-filtration",
            description: "Upgrade to high-efficiency filters or whole-home air purifiers for cleaner indoor air.",
            signsYouNeed: [
              "More dust or pet dander than usual throughout the home",
              "Family members with allergies or respiratory sensitivities",
              "Running standard 1-inch filters that require frequent changes",
              "Concerned about bacteria, viruses, or mold in your air supply",
              "Recently moved into a home with unknown HVAC history",
            ],
            benefits: [
              "Whole-home air purification options available",
              "High-efficiency MERV-rated filter upgrades",
              "UV air purifier installation for pathogen reduction",
              "Compatible with all central air systems",
              "Improves both system efficiency and indoor air quality",
            ],
            process: [
              { step: "Evaluate", detail: "We assess your current filtration setup and identify gaps." },
              { step: "Recommend", detail: "We match the right solution to your air quality concerns and budget." },
              { step: "Install", detail: "Clean installation of filtration or purification equipment." },
              { step: "Verify", detail: "We confirm proper airflow and system compatibility after installation." },
            ],
            pricingNote: "Filter upgrades start under $300 installed. Whole-home purifiers quoted on-site.",
          },
          {
            name: "Humidity Control",
            slug: "humidity-control",
            description: "Whole-home dehumidifier installation and service to address humidity issues common in the San Antonio area.",
            signsYouNeed: [
              "Interior humidity regularly above 55%",
              "Condensation on windows or interior walls",
              "Musty odors in the home, especially in summer",
              "Wood floors, cabinetry, or trim showing warping or swelling",
              "Mold or mildew appearing on surfaces or in closets",
            ],
            benefits: [
              "Whole-home dehumidifier installation and service",
              "Smart integration with your thermostat and HVAC system",
              "Protects wood floors, furniture, and home structure",
              "Reduces mold and dust mite growth",
              "South Texas specialists who understand the local humidity challenge",
            ],
            process: [
              { step: "Evaluate", detail: "We measure your home's relative humidity and identify problem areas." },
              { step: "Recommend", detail: "We specify the right dehumidifier capacity for your square footage." },
              { step: "Install", detail: "Whole-home unit integrated directly into your HVAC system." },
              { step: "Set & Test", detail: "We configure target humidity levels and verify proper operation." },
            ],
            pricingNote: "Whole-home dehumidifiers typically start around $1,200 installed.",
          },
          {
            name: "Duct Cleaning & Sealing",
            slug: "duct-cleaning",
            description: "Professional ductwork inspection, cleaning, and sealing to improve airflow and reduce energy loss.",
            signsYouNeed: [
              "Ductwork hasn't been inspected in more than 5 years",
              "Visible dust or debris at vent openings",
              "Musty odors from vents when the system runs",
              "Recent renovation that generated significant dust",
              "Pets in the home and unexplained allergy symptoms",
            ],
            benefits: [
              "Removes allergens, dust, and debris from your full duct system",
              "Improves system airflow and efficiency",
              "Before-and-after documentation provided",
              "EPA-registered cleaning agents used",
              "Leaks identified and sealed during the process",
            ],
            process: [
              { step: "Inspection", detail: "We inspect ductwork, vents, and connections before cleaning begins." },
              { step: "Containment", detail: "We seal registers and use negative pressure equipment to contain dust." },
              { step: "Cleaning", detail: "High-powered vacuum and brush system cleans the full duct run." },
              { step: "Sealing", detail: "We identify and seal any leaks found during the process." },
              { step: "Report", detail: "Before-and-after documentation and a written summary provided." },
            ],
            pricingNote: "Duct cleaning starts at $299 for standard residential systems.",
          },
        ],
      },
      {
        name: "Commercial",
        slug: "commercial",
        services: [
          {
            name: "Commercial HVAC Repair",
            slug: "commercial-hvac-repair",
            description: "Repair and maintenance for light commercial HVAC systems in offices, retail spaces, and small facilities.",
            isFeatured: true,
            signsYouNeed: [
              "Commercial system is not cooling or heating properly",
              "Unusual noises from the rooftop unit or air handler",
              "Energy costs for your building have increased significantly",
              "Employees or customers are complaining about comfort",
              "System hasn't been professionally serviced in over a year",
            ],
            benefits: [
              "Light commercial systems serviced — offices, retail, restaurants, and more",
              "Fast response to minimize business downtime",
              "All major commercial HVAC brands serviced",
              "Preventative maintenance programs available",
              "Licensed, insured, and bonded",
            ],
            process: [
              { step: "Contact", detail: "Call or request service — commercial calls prioritized for business continuity." },
              { step: "Diagnose", detail: "Technician performs a full assessment and identifies the failure point." },
              { step: "Quote", detail: "Upfront pricing provided before any repair begins." },
              { step: "Repair", detail: "Parts sourced and repair completed to minimize your downtime." },
              { step: "Follow-Up", detail: "We recommend preventative steps to avoid repeat failures." },
            ],
            pricingNote: "Commercial diagnostic fee starts at $125. Maintenance contracts available.",
          },
          {
            name: "Commercial HVAC Installation",
            slug: "commercial-hvac-installation",
            description: "New system installation and replacement for commercial properties with proper load and zoning requirements.",
            signsYouNeed: [
              "Existing commercial HVAC is aging and repairs are no longer cost-effective",
              "Building is under construction or undergoing major renovation",
              "Current system lacks zoning or energy management capabilities",
              "Expanding your facility with new commercial space",
            ],
            benefits: [
              "Proper commercial load calculations and zoning design",
              "Multiple equipment brands and efficiency ratings available",
              "Permits, inspections, and code compliance handled",
              "Minimal disruption to your business during installation",
              "Ongoing maintenance plans available post-installation",
            ],
            process: [
              { step: "Site Assessment", detail: "We evaluate your building layout, occupancy, and climate control needs." },
              { step: "System Design", detail: "Proper zoning and equipment sizing designed for your application." },
              { step: "Proposal", detail: "Detailed proposal with equipment specs, timeline, and total cost." },
              { step: "Installation", detail: "Professional installation by licensed commercial HVAC technicians." },
              { step: "Commissioning", detail: "Final system test and walk-through with your facilities team." },
            ],
            pricingNote: "Commercial installation pricing depends on building size and system type. Contact us for a site assessment.",
          },
          {
            name: "Commercial Preventative Maintenance",
            slug: "commercial-maintenance",
            description: "Scheduled maintenance plans for commercial properties to minimize downtime and extend equipment life.",
            signsYouNeed: [
              "No current preventative maintenance plan in place",
              "System has had multiple unplanned failures in the past year",
              "Manufacturer warranty requires documented maintenance visits",
              "Looking to reduce overall HVAC operating costs",
            ],
            benefits: [
              "Scheduled maintenance prevents unplanned downtime",
              "Extends equipment life and protects your investment",
              "Priority response for maintenance plan customers",
              "Detailed service records provided for every visit",
              "Flexible scheduling to minimize business disruption",
            ],
            process: [
              { step: "Schedule", detail: "We set up a recurring visit schedule that works around your business hours." },
              { step: "Inspection", detail: "Full system inspection covering all commercial equipment." },
              { step: "Maintenance", detail: "Cleaning, lubrication, calibration, and filter replacement completed." },
              { step: "Documentation", detail: "Detailed service report and equipment status provided after every visit." },
            ],
            pricingNote: "Commercial maintenance plans priced by equipment count and visit frequency. Contact us for a quote.",
          },
        ],
      },
    ],

    serviceAreaDetails: {
      "san-antonio": {
        headline: "HVAC Service Across San Antonio, TX",
        subheadline: "Your AC Shouldn't Quit When You Need It Most",
        intro:
          "When temperatures push past 100°F, a broken AC isn't an inconvenience — it's a health concern. We're based here in San Antonio and we keep our schedule open for same-day calls because we know how fast things can go sideways in a Texas summer.",
        areaContext:
          "San Antonio is a big city with a huge range of housing stock — 1950s bungalows on the South Side, 1980s brick homes in the northwest, new construction off 1604. We've worked in all of them. That variety means we don't assume anything when we show up. We diagnose what's actually wrong and explain it before we touch a thing.",
        commonProblems: [
          "Systems that ran fine in spring but can't keep up once July hits",
          "Two-story homes where the upstairs is always 5–8 degrees warmer",
          "AC running constantly but never reaching the set temperature",
          "Older R-22 systems that are expensive to recharge and hard to source parts for",
        ],
        serviceHighlights: [
          "Same-day AC repair for most San Antonio calls",
          "Full system replacements with same-week installation",
          "Preventative maintenance that actually extends equipment life",
          "Indoor air quality assessments for homes with allergy or asthma concerns",
        ],
        whyChooseUs: [
          "We give you the diagnosis in plain language, not industry jargon",
          "Upfront written estimate before any work starts — no verbal surprises",
          "We stock common parts so most repairs don't require a second visit",
          "No commission-based upselling — our techs are paid to fix things, not sell things",
        ],
        nearbyAreas: ["Helotes", "Leon Valley", "Stone Oak", "Boerne", "Live Oak"],
        faqs: [
          {
            question: "How quickly can you get to me in San Antonio?",
            answer:
              "For repair calls, we usually have same-day availability. During peak summer weeks we're busiest midday, so calling early in the morning gets you the fastest slot.",
          },
          {
            question: "My system is older — will you try to talk me into replacing it?",
            answer:
              "Only if replacement genuinely makes more sense for your budget. We'll show you the numbers and let you decide. A lot of older systems have years of life left with the right repair.",
          },
          {
            question: "Do you service both central AC and ductless systems?",
            answer:
              "Yes. We work on central split systems, package units, and ductless mini-splits across all major brands.",
          },
        ],
        ctaHeading: "AC or Heating Issue in San Antonio?",
        ctaText: "Call now for same-day availability or book online and we'll confirm your slot within the hour.",
        metaTitle: "HVAC Repair & Installation in San Antonio, TX | Conquer All Mechanical",
        metaDescription:
          "Same-day HVAC repair in San Antonio, TX. Honest diagnostics, upfront pricing, and local technicians who know the city. Call Conquer All Mechanical.",
      },
      "boerne": {
        headline: "HVAC Repair & Maintenance in Boerne, TX",
        subheadline: "Hill Country Summers Are Beautiful — Until Your AC Goes Out",
        intro:
          "Boerne gets hot, but it also gets genuinely cold in winter — something newer residents sometimes underestimate. We service both sides of the equation: AC tune-ups before the heat arrives and heating checks before the first cold front rolls through in November.",
        areaContext:
          "Boerne's housing stock is diverse. There are limestone homes built in the 1970s along the older streets near Main Plaza, newer subdivisions off Herff Road and IH-10, and large properties on acreage outside of town. Each comes with different HVAC challenges — older homes with original ductwork, new builds with variable-speed equipment, and rural properties where the nearest tech might be 45 minutes away otherwise.",
        commonProblems: [
          "AC units that sit idle all winter and then struggle when first turned on in spring",
          "Heating systems that work fine but cycle too frequently on cold nights",
          "Cedar and oak pollen clogging filters and reducing airflow faster than expected",
          "Older homes where ductwork was never properly sized for the system installed",
        ],
        serviceHighlights: [
          "AC and heating repair for all major brands",
          "Pre-season tune-ups before summer and winter",
          "Ductless mini-split installation for additions, sunrooms, and detached structures",
          "Honest repair-vs-replace assessments with no pressure either way",
        ],
        whyChooseUs: [
          "We schedule Boerne calls in advance so you're not waiting on a vague arrival window",
          "Familiar with the specific systems common in Hill Country new builds",
          "We don't pad quotes — you see exactly what you're paying for",
          "Fully licensed and insured for residential and light commercial work",
        ],
        nearbyAreas: ["Fair Oaks Ranch", "Leon Springs", "Helotes", "Comfort", "San Antonio"],
        faqs: [
          {
            question: "Is Boerne a regular stop for your team or more of an occasional trip?",
            answer:
              "We run Boerne calls on a regular basis. It's not a stretch for us — we have customers out there and schedule efficiently so wait times stay reasonable.",
          },
          {
            question: "We have a large property with a detached guest house. Can you handle that too?",
            answer:
              "Yes. We can assess and service separate structures. Ductless mini-splits are often the right fit for detached buildings where running new ductwork isn't practical.",
          },
          {
            question: "What's the best time of year to schedule a maintenance visit in Boerne?",
            answer:
              "March or April for AC, and October for heating. Both windows are before the system gets stressed, which means we can catch small issues before they become expensive ones.",
          },
        ],
        ctaHeading: "Schedule HVAC Service in Boerne",
        ctaText: "We run regular routes out to Boerne — call or book online and we'll get you on the schedule.",
        metaTitle: "HVAC Repair & Maintenance in Boerne, TX | Conquer All Mechanical",
        metaDescription:
          "HVAC repair, installation, and seasonal maintenance in Boerne, TX. Serving Hill Country homes with honest service and reliable scheduling.",
      },
      "helotes": {
        headline: "HVAC Service in Helotes, TX",
        subheadline: "Ranch Homes, New Builds, and Everything In Between",
        intro:
          "Helotes has a split personality when it comes to housing — there are established ranch-style homes that have been here for decades and newer subdivisions that have gone up in the last several years. The HVAC needs are completely different between them, and we're comfortable with both.",
        areaContext:
          "The older homes in Helotes often have ductwork that was sized for smaller systems, and over the decades that mismatch causes airflow problems and uneven cooling. The newer homes tend to have more efficient equipment but can run into setup and calibration issues, especially with smart thermostats and zoned systems. We diagnose before we recommend — we don't assume.",
        commonProblems: [
          "Original ductwork that's restrictive or leaking, causing weak airflow in back bedrooms",
          "Systems short-cycling — turning on and off every few minutes instead of running full cycles",
          "Heavy cedar pollen season accelerating filter clogging and reducing system efficiency",
          "Heat pump systems that aren't properly calibrated for the area's temperature swings",
        ],
        serviceHighlights: [
          "Ductwork inspection, sealing, and rebalancing",
          "AC and heating repair for all equipment types",
          "Smart thermostat installation and troubleshooting",
          "Whole-home air quality improvements including filtration upgrades",
        ],
        whyChooseUs: [
          "We explain what we find before we recommend anything",
          "Evening and weekend availability for homeowners with tight weekday schedules",
          "We leave the work area clean — no debris, no footprints, no mess",
          "No upsells on parts or services you don't need",
        ],
        nearbyAreas: ["Grey Forest", "Leon Valley", "San Antonio", "Boerne", "Leon Springs"],
        faqs: [
          {
            question: "Our back bedrooms are always hotter than the front of the house — what causes that?",
            answer:
              "Usually airflow. The most common culprits are undersized or leaky ducts, a dirty filter reducing static pressure, or a blower that's not moving enough air. We can measure the airflow at each vent and trace the issue.",
          },
          {
            question: "How often should we change our filters out here?",
            answer:
              "During cedar and oak season — roughly November through March — every 4–6 weeks if you have a standard 1-inch filter. A thicker media filter can go longer, and we can show you what fits your system.",
          },
          {
            question: "Our system is only 7 years old but keeps breaking down. Is that normal?",
            answer:
              "No. Frequent repairs on a system that age usually point to either an installation problem or a maintenance gap. We can do a full diagnostic and give you an honest read on whether repair makes sense or if there's an underlying issue.",
          },
        ],
        ctaHeading: "HVAC Issues in Helotes? Let's Fix It.",
        ctaText: "Call or book online — we'll diagnose the problem and give you straight answers.",
        metaTitle: "HVAC Repair & Service in Helotes, TX | Conquer All Mechanical",
        metaDescription:
          "Helotes HVAC repair and maintenance for ranch homes and new builds. Ductwork, AC, heating, and air quality services. Call Conquer All Mechanical.",
      },
      "stone-oak": {
        headline: "HVAC Service in Stone Oak, TX",
        subheadline: "Modern Homes Need Equipment That Keeps Up",
        intro:
          "Stone Oak homes are newer, nicer, and often more complex from an HVAC standpoint. Variable-speed equipment, multi-zone systems, and smart home integrations are common here — and when something goes wrong, it takes a tech who actually knows those systems, not someone who's going to guess.",
        areaContext:
          "Most Stone Oak homes were built in the 2000s and 2010s during rapid growth along US-281. They're larger, often two stories, and frequently have zoned HVAC setups to manage the temperature difference between floors. That complexity means standard repairs aren't always straightforward. We've worked on these systems enough to diagnose them efficiently — including the quirks that come with two-stage and variable-speed equipment.",
        commonProblems: [
          "Zoned systems where one zone isn't heating or cooling properly",
          "Variable-speed equipment throwing fault codes that require manufacturer-specific diagnostics",
          "Two-story homes where the upstairs zone is overworking in summer",
          "Systems approaching 12–15 years old that are reaching the point of replacement vs. repair decisions",
        ],
        serviceHighlights: [
          "Multi-zone and variable-speed system diagnostics and repair",
          "High-efficiency system replacement with proper sizing for larger homes",
          "Smart thermostat setup and app integration",
          "Seasonal tune-ups to keep warranty-eligible equipment in spec",
        ],
        whyChooseUs: [
          "Experienced with the equipment brands common in Stone Oak builds — no learning curve on your dime",
          "We pull permits and size equipment correctly — not just whatever's cheapest to install",
          "Punctual, professional, and respectful of your home",
          "Honest replacement guidance when repair costs no longer make sense",
        ],
        nearbyAreas: ["Shavano Park", "Hollywood Park", "San Antonio", "Live Oak", "Bulverde"],
        faqs: [
          {
            question: "Our downstairs is cool but the upstairs stays warm all afternoon — what's going on?",
            answer:
              "Heat rises and upper floors absorb more radiant heat from the roof. If it's severe, the usual causes are undersized equipment for the upper zone, damper issues in a zoned system, or insufficient return air. We can measure and diagnose.",
          },
          {
            question: "My system throws an error code and then resets itself. Should I be worried?",
            answer:
              "Yes, eventually. Intermittent fault codes usually mean something is failing but hasn't failed completely yet. Catching it now is almost always cheaper than waiting for a full breakdown in July.",
          },
          {
            question: "We want to upgrade to a smart thermostat — do you handle the full install?",
            answer:
              "Yes. We install, wire, and configure. We also make sure your system is compatible first, since some multi-stage or zoned setups require a specific thermostat type.",
          },
        ],
        ctaHeading: "Stone Oak HVAC — Done Right the First Time",
        ctaText: "Book a diagnostic or schedule a system assessment — we'll give you the full picture.",
        metaTitle: "HVAC Repair & Installation in Stone Oak, TX | Conquer All Mechanical",
        metaDescription:
          "Stone Oak HVAC specialists for multi-zone, high-efficiency, and smart home systems. Honest diagnostics and upfront pricing. Call Conquer All Mechanical.",
      },
      "leon-valley": {
        headline: "HVAC Repair & Service in Leon Valley, TX",
        subheadline: "Straightforward Service for a No-Nonsense Neighborhood",
        intro:
          "Leon Valley homeowners don't need a sales pitch — they need a tech who shows up, figures out what's wrong, and fixes it without running up the bill. That's exactly how we work. We've been in plenty of the homes out here and we know what to look for.",
        areaContext:
          "Leon Valley's housing stock is largely from the 1960s through the 1980s — solid homes, but with HVAC systems that have been updated piecemeal over the decades. It's common to find a newer air handler paired with an older condenser, or a system that was replaced without addressing the ductwork. Those mismatches cause efficiency losses and comfort problems that are easy to overlook until something breaks.",
        commonProblems: [
          "Mismatched systems where the indoor and outdoor units aren't sized for each other",
          "Ductwork that was never updated when the system was replaced",
          "Refrigerant loss from fittings that have loosened over years of thermal cycling",
          "Capacitors and contactors failing on condensers that are 10+ years old",
        ],
        serviceHighlights: [
          "AC and heating repair with same-day availability for most calls",
          "Refrigerant leak detection and recharge",
          "Ductwork evaluation and targeted repairs",
          "Honest system assessments when it's time to decide between repair and replacement",
        ],
        whyChooseUs: [
          "We tell you what we find, not what generates the biggest invoice",
          "Familiar with the older system configurations common in Leon Valley homes",
          "We show up in the agreed window — we don't leave you guessing all afternoon",
          "Financing available for replacements so you're not forced into a bad repair",
        ],
        nearbyAreas: ["Helotes", "Balcones Heights", "San Antonio", "Grey Forest", "Lackland area"],
        faqs: [
          {
            question: "My AC isn't cooling well but the technician last year just recharged the refrigerant. It's happening again — why?",
            answer:
              "Refrigerant doesn't disappear on its own — if it needs recharging again, there's a leak somewhere. A recharge without finding and fixing the leak is a temporary fix. We'll locate the source and repair it properly.",
          },
          {
            question: "Is it worth repairing a system that's 15 years old?",
            answer:
              "It depends on the repair. A capacitor or contactor swap on a 15-year-old unit is often worth doing. A compressor replacement usually isn't. We'll give you the honest math and let you decide.",
          },
          {
            question: "Can you work on window units or just central systems?",
            answer:
              "Our focus is central HVAC — split systems and package units. For window units we'd point you elsewhere, but for any whole-home system we're the right call.",
          },
        ],
        ctaHeading: "Need Honest HVAC Help in Leon Valley?",
        ctaText: "Call or book online — no pressure, no upsells, just straight answers and good work.",
        metaTitle: "HVAC Repair & Service in Leon Valley, TX | Conquer All Mechanical",
        metaDescription:
          "Dependable HVAC repair in Leon Valley, TX. Experienced with older home systems, honest diagnostics, and upfront pricing. Call Conquer All Mechanical.",
      },
      "live-oak": {
        headline: "HVAC Service in Live Oak, TX",
        subheadline: "Reliable Heating & Cooling Near Randolph and Beyond",
        intro:
          "Live Oak sits just northeast of San Antonio with a mix of long-established neighborhoods and areas that have grown up around Randolph AFB. It's a community that values reliability — people here have schedules to keep and don't have time for a HVAC company that doesn't show up when they say they will. We do.",
        areaContext:
          "A significant portion of Live Oak's housing was built in the 1970s and 1980s, and those homes have seen multiple HVAC system changes over the years. Humidity is a consistent issue in this part of the metro — the area sits lower and tends to trap moisture, which puts extra load on AC systems and contributes to air quality problems if equipment isn't maintained. We factor that in when we diagnose.",
        commonProblems: [
          "High indoor humidity even when the AC is running, pointing to an oversized or poorly maintained system",
          "Older homes where the ductwork runs through unconditioned attic space, losing efficiency in summer",
          "Systems that have been repaired multiple times and are losing reliability",
          "Air quality issues — musty smells, visible mold at vents — tied to humidity and poor filtration",
        ],
        serviceHighlights: [
          "AC repair and full system replacement",
          "Humidity control solutions including dehumidifiers and ventilation improvements",
          "Ductwork evaluation for homes with attic-run duct systems",
          "Air quality testing and filtration upgrades",
        ],
        whyChooseUs: [
          "We keep our arrival windows tight — you're not clearing your whole afternoon for us",
          "We address the root cause, not just the symptom",
          "Respectful service — we treat your home like we'd want ours treated",
          "Clear communication from booking through invoice, no surprises",
        ],
        nearbyAreas: ["Universal City", "Converse", "Selma", "Schertz", "San Antonio"],
        faqs: [
          {
            question: "My house feels clammy even when the AC keeps the temperature right. What's going on?",
            answer:
              "That's a humidity problem. AC removes moisture as a byproduct of cooling, but an oversized system short-cycles and doesn't run long enough to dehumidify properly. A standalone dehumidifier or a properly sized system can fix it.",
          },
          {
            question: "We're getting a musty smell from the vents when the AC kicks on. Is that mold?",
            answer:
              "It could be mold or mildew on the evaporator coil or inside the air handler — both are common when humidity is high and filters are infrequently changed. We can inspect, clean, and advise on prevention.",
          },
          {
            question: "We've had three different companies out in two years and nothing has fully fixed the problem. Can you help?",
            answer:
              "That's frustrating, and it usually means the root cause hasn't been identified. We'll do a full diagnostic and give you a clear explanation of what we find — not just a quick patch.",
          },
        ],
        ctaHeading: "Live Oak HVAC — We'll Be There When We Say We Will",
        ctaText: "Book your repair or tune-up online, or give us a call to talk through what you're experiencing.",
        metaTitle: "HVAC Repair & Service in Live Oak, TX | Conquer All Mechanical",
        metaDescription:
          "HVAC repair and maintenance in Live Oak, TX. Humidity control, air quality, and reliable same-day service. Call Conquer All Mechanical.",
      },
    },
  },
};
