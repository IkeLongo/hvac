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

export type CompanyStat = {
  label: string;
  value: string;
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
  logo: string;

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
    logo: "/riverside-hvac-logo.png",

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
  },

  "cool-breeze": {
    // Core
    name: "Cool Breeze HVAC",
    phone: "(210) 730-6232",
    city: "San Antonio",
    services: ["Emergency Repair", "AC Tune-Ups", "Duct Cleaning"],
    primaryColor: "#0d55c2",
    accentColor: "#f8a7a7",
    logo: "/cool-breeze.png",

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
  },

  "allstarairconditioning": {
    // Core
    name: "All Star Air Conditioning",
    phone: "(210) 361-4020",
    city: "San Antonio",
    services: ["Emergency Repair", "AC Tune-Ups", "Duct Cleaning"],
    primaryColor: "#0F1D36",
    accentColor: "#e7632b",
    logo: "/allstar-heating-and-air-conditioning.png",

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
  },
};
