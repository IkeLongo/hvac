// ─────────────────────────────────────────────────────────────────────────────
// Global service data — shared across all companies.
// Companies reference categories by slug via company.serviceCategories: string[]
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceProcessStep = {
  step: string;
  detail: string;
};

export type ServiceItem = {
  name: string;
  slug: string;
  description: string;
  isFeatured?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  signsYouNeed: string[];
  benefits: string[];
  process: ServiceProcessStep[];
  pricingNote: string;
};

export type ServiceCategory = {
  name: string;
  slug: string;
  services: ServiceItem[];
};

export type ServiceCategorySlug = "cooling" | "heating" | "air-quality" | "commercial";

export const SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  cooling: {
    name: "Cooling",
    slug: "cooling",
    services: [
      {
        name: "AC Repair",
        slug: "ac-repair",
        imageSrc: "/services/ac-repair.avif",
        description:
          "Fast diagnosis and repair for all central AC and heat pump systems. Most repairs completed same-day.",
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
        description:
          "Proper sizing, equipment selection, and installation for new or replacement central AC systems.",
        isFeatured: true,
        imageSrc: "/services/ac-installation.webp",
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
        description:
          "Pre-season inspection and tune-up to maximize efficiency and catch issues before summer.",
        imageSrc: "/services/ac-maintenance.webp",
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
          {
            step: "Report",
            detail: "You receive a written summary of your system's condition and any recommended work.",
          },
        ],
        pricingNote: "Starting at $79 per visit. Annual maintenance plans with priority scheduling available.",
      },
      {
        name: "Ductless Mini-Split Service",
        slug: "mini-split-service",
        description:
          "Installation, repair, and maintenance for ductless mini-split systems in additions, sunrooms, and detached structures.",
        imageSrc: "/services/ductless-mini-split.webp",
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

  heating: {
    name: "Heating",
    slug: "heating",
    services: [
      {
        name: "Heating Repair",
        slug: "heating-repair",
        description:
          "Diagnosis and repair for furnaces, heat pumps, and all residential heating systems.",
        isFeatured: true,
        imageSrc: "/services/heating-repair.webp",
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
        description:
          "Full heating system installation and replacement with proper load calculations and equipment sizing.",
        imageSrc: "/services/full-heating-system-install.webp",
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
        description:
          "Fall heating check to ensure your system is ready before the first cold front of the season.",
        imageSrc: "/services/heating-maintenance.webp",
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

  "air-quality": {
    name: "Air Quality",
    slug: "air-quality",
    services: [
      {
        name: "Indoor Air Quality Assessment",
        slug: "indoor-air-quality",
        description:
          "Evaluation of filtration, ventilation, and humidity levels to improve air quality in your home.",
        isFeatured: true,
        imageSrc: "/services/indoor-air-quality.webp",
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
          {
            step: "Report",
            detail: "You receive a clear written report with findings and recommended improvements.",
          },
          {
            step: "Solutions",
            detail: "We quote only what's needed — from filter upgrades to full purification systems.",
          },
        ],
        pricingNote: "IAQ assessment starts at $89. Recommended solutions quoted separately.",
      },
      {
        name: "Filtration & Air Purification",
        slug: "air-filtration",
        description:
          "Upgrade to high-efficiency filters or whole-home air purifiers for cleaner indoor air.",
        imageSrc: "/services/filtration-and-air-purification.webp",
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
        description:
          "Whole-home dehumidifier installation and service to address humidity issues common in the San Antonio area.",
        imageSrc: "/services/humidity-control.webp",
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
        description:
          "Professional ductwork inspection, cleaning, and sealing to improve airflow and reduce energy loss.",
        imageSrc: "/services/duct-cleaning-and-sealing.webp",
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
          {
            step: "Containment",
            detail: "We seal registers and use negative pressure equipment to contain dust.",
          },
          { step: "Cleaning", detail: "High-powered vacuum and brush system cleans the full duct run." },
          { step: "Sealing", detail: "We identify and seal any leaks found during the process." },
          { step: "Report", detail: "Before-and-after documentation and a written summary provided." },
        ],
        pricingNote: "Duct cleaning starts at $299 for standard residential systems.",
      },
    ],
  },

  commercial: {
    name: "Commercial",
    slug: "commercial",
    services: [
      {
        name: "Commercial HVAC Repair",
        slug: "commercial-hvac-repair",
        description:
          "Repair and maintenance for light commercial HVAC systems in offices, retail spaces, and small facilities.",
        isFeatured: true,
        imageSrc: "/services/commercial-hvac-repair.webp",
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
          {
            step: "Contact",
            detail: "Call or request service — commercial calls prioritized for business continuity.",
          },
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
        description:
          "New system installation and replacement for commercial properties with proper load and zoning requirements.",
        imageSrc: "/services/commercial-hvac-installation.webp",
        imageAlt: "Commercial HVAC Installation",
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
          {
            step: "Site Assessment",
            detail: "We evaluate your building layout, occupancy, and climate control needs.",
          },
          { step: "System Design", detail: "Proper zoning and equipment sizing designed for your application." },
          {
            step: "Proposal",
            detail: "Detailed proposal with equipment specs, timeline, and total cost.",
          },
          {
            step: "Installation",
            detail: "Professional installation by licensed commercial HVAC technicians.",
          },
          {
            step: "Commissioning",
            detail: "Final system test and walk-through with your facilities team.",
          },
        ],
        pricingNote:
          "Commercial installation pricing depends on building size and system type. Contact us for a site assessment.",
      },
      {
        name: "Commercial Preventative Maintenance",
        slug: "commercial-maintenance",
        description:
          "Scheduled maintenance plans for commercial properties to minimize downtime and extend equipment life.",
        imageSrc: "/services/commercial-preventative-maintenance.webp",
        imageAlt: "Commercial Preventative Maintenance",
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
          {
            step: "Schedule",
            detail: "We set up a recurring visit schedule that works around your business hours.",
          },
          { step: "Inspection", detail: "Full system inspection covering all commercial equipment." },
          {
            step: "Maintenance",
            detail: "Cleaning, lubrication, calibration, and filter replacement completed.",
          },
          {
            step: "Documentation",
            detail: "Detailed service report and equipment status provided after every visit.",
          },
        ],
        pricingNote:
          "Commercial maintenance plans priced by equipment count and visit frequency. Contact us for a quote.",
      },
    ],
  },
};
