import type { ServicePageContent } from "@/lib/types/service-page";

const servicePages: Record<string, ServicePageContent> = {
  "ac-repair": {
    slug: "ac-repair",
    pageTitle: "AC Repair",
    pageEyebrow: "Fast, Reliable Service",
    pageIntro:
      "When your air conditioner stops keeping up, you need a technician who can diagnose the real problem — not just reset the unit and hope for the best.",
    introParagraphs: [
      "Most AC problems have a root cause: a failing capacitor, a refrigerant leak, a dirty coil, or an electrical fault. Our technicians run a full diagnostic on every visit so you know exactly what went wrong and what it will cost to fix before any work begins.",
      "We service all makes and models — from older window units to modern variable-speed systems — and we stock the most common parts on our trucks so most repairs wrap up in a single visit.",
    ],
    sectionOneTitle: "What We Check on Every Repair Call",
    sectionOneBody:
      "A proper AC repair starts with a methodical inspection. We measure refrigerant pressure, check all electrical connections, test the capacitor and contactor, inspect the evaporator and condenser coils, and verify thermostat calibration. You get a written summary of findings before we touch anything.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Skipping a repair often turns a $150 fix into a $1,500 compressor replacement. If your system is struggling — short-cycling, blowing warm air, or tripping the breaker — catching it early is almost always the cheaper option.",
    bulletListTitle: "Every AC Repair Includes",
    bulletItems: [
      "Full system diagnostic with written findings",
      "Upfront pricing before work begins",
      "All makes and models serviced",
      "90-day labor warranty on every repair",
      "NATE-certified technicians",
      "Same-day appointments available",
    ],
    sectionThreeTitle: "When Repair Makes More Sense Than Replacement",
    sectionThreeBody:
      "If your system is under 10 years old and the repair cost is less than half what a new unit would run, repair is almost always the right call. We'll give you an honest read on your system's condition and never push a replacement you don't need.",
    faqItems: [
      {
        question: "How long does an AC repair visit take?",
        answer:
          "Most repairs are completed within 1–2 hours. If a part needs to be ordered, we'll get your system stabilized and return as soon as the part arrives — usually within 1–2 business days.",
      },
      {
        question: "Do you charge for the diagnostic?",
        answer:
          "Yes — our diagnostic fee starts at $89 and covers a full system inspection. That fee is applied toward the repair cost if you proceed.",
      },
      {
        question: "My AC is blowing warm air. What is likely wrong?",
        answer:
          "The most common causes are low refrigerant, a failed capacitor, a dirty condenser coil, or a faulty thermostat. A technician can pinpoint the issue in under 30 minutes.",
      },
      {
        question: "Can you repair my system the same day I call?",
        answer:
          "In most cases, yes. We keep common parts stocked on our trucks and offer same-day service for most repair calls.",
      },
      {
        question: "Is a repair still worth it if my system is older?",
        answer:
          "It depends on the repair cost, the system age, and efficiency. We'll walk you through the numbers honestly — including what a new system would save you monthly — so you can decide.",
      },
    ],
    sidebarTitle: "Need AC Repair Today?",
    sidebarDescription:
      "Same-day appointments are available. Call or schedule online and we'll have a technician on the way.",
    ctaTitle: "AC Not Cooling?",
    ctaBody: "Don't wait for a small problem to become an expensive one. Schedule a diagnostic today.",
    ctaButtonLabel: "Book a Repair",
    ctaHref: "/request-service",
  },

  "heater-furnace-repair": {
    slug: "heater-furnace-repair",
    pageTitle: "Heater & Furnace Repair",
    pageEyebrow: "Gas, Electric & Heat Pump Systems",
    pageIntro:
      "A heater that isn't working right isn't just uncomfortable — in some cases it's a safety risk. We take heating calls seriously and respond fast.",
    introParagraphs: [
      "Whether your furnace won't ignite, your heat pump is stuck in the wrong mode, or your system is cycling on and off every few minutes, the cause is almost always diagnosable in a single visit.",
      "Every heating repair includes a safety inspection. We check heat exchangers for cracks, test gas valve operation, verify flue venting, and confirm carbon monoxide levels before we close up the unit.",
    ],
    sectionOneTitle: "How We Approach Heating Repairs",
    sectionOneBody:
      "Heating systems fail in predictable ways. We start with the igniter and flame sensor on gas systems, the capacitor and reversing valve on heat pumps, and the heating element and sequencer on electric furnaces. Our technicians carry the most common failure parts on their trucks.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "A cracked heat exchanger is one of the most serious HVAC issues a homeowner can face — it can allow combustion gases to enter your living space. We inspect every heat exchanger on every heating call, and we'll never leave a system running that has a confirmed crack.",
    bulletListTitle: "What's Included in Every Heating Repair",
    bulletItems: [
      "Full safety inspection with CO check",
      "Heat exchanger visual inspection",
      "Gas and electric systems serviced",
      "Upfront pricing before any work",
      "90-day labor warranty",
      "Licensed and insured technicians",
    ],
    sectionThreeTitle: "Emergency Heating Service",
    sectionThreeBody:
      "If your heat goes out overnight or over a weekend, we're still available. Emergency calls are dispatched with priority, and we'll give you a clear ETA when you call.",
    faqItems: [
      {
        question: "My furnace turns on but doesn't produce heat. What's wrong?",
        answer:
          "The most common causes are a failed igniter, a dirty flame sensor, or a problem with the gas valve. All three are quick repairs once diagnosed.",
      },
      {
        question: "Is it safe to run my furnace if it's making a banging noise?",
        answer:
          "A loud bang on startup often means delayed ignition, which can stress the heat exchanger over time. Have it looked at before running it through another season.",
      },
      {
        question: "Do you service heat pumps as well as gas furnaces?",
        answer:
          "Yes — we service gas furnaces, electric furnaces, heat pumps, and boilers. Just let us know your system type when you call.",
      },
      {
        question: "How much does a furnace repair typically cost?",
        answer:
          "Most furnace repairs run between $150 and $450 depending on the part. The diagnostic starts at $99 and is applied to the repair cost if you proceed.",
      },
    ],
    sidebarTitle: "Heating Not Working?",
    sidebarDescription: "We offer emergency heating service. Call now and we'll get someone out today.",
    ctaTitle: "Don't Tough Out a Cold Night",
    ctaBody: "Emergency and same-day heating service available. Call now or book online.",
    ctaButtonLabel: "Book Heating Repair",
    ctaHref: "/request-service",
  },

  "seasonal-maintenance": {
    slug: "seasonal-maintenance",
    pageTitle: "HVAC Seasonal Maintenance",
    pageEyebrow: "Annual Tune-Up & Inspection",
    pageIntro:
      "A yearly maintenance visit is the single best thing you can do to protect your HVAC investment, lower your energy bill, and avoid emergency breakdowns.",
    introParagraphs: [
      "Most HVAC failures don't come out of nowhere — they build up over time through worn components, dirty coils, and ignored warning signs. A seasonal tune-up catches these issues when they're still cheap to address.",
      "Many manufacturer warranties also require documented annual maintenance to remain valid. Our maintenance visits include a written performance report you can keep on file.",
    ],
    sectionOneTitle: "What a Maintenance Visit Covers",
    sectionOneBody:
      "Our technicians follow a comprehensive checklist: filter replacement, evaporator and condenser coil cleaning, refrigerant level verification, electrical connection tightening, blower motor inspection, thermostat calibration, and a full system performance test. Nothing is skipped.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "A system running on a dirty coil can use 15–30% more energy than a clean one. Over a full cooling season, that adds up fast. A $79 tune-up typically pays for itself in energy savings alone — and that's before counting the repairs it prevents.",
    bulletListTitle: "Every Tune-Up Includes",
    bulletItems: [
      "Filter replacement (standard 1-inch filter)",
      "Evaporator and condenser coil cleaning",
      "Refrigerant level check",
      "Electrical connection inspection and tightening",
      "Thermostat calibration and test",
      "Written system performance report",
    ],
    sectionThreeTitle: "Maintenance Plans for Year-Round Coverage",
    sectionThreeBody:
      "Our maintenance plan members get priority scheduling, discounts on repairs, and automatic reminders before each season. It's the easiest way to stay ahead of your system without having to remember to call.",
    faqItems: [
      {
        question: "When should I schedule a tune-up?",
        answer:
          "Spring before cooling season and fall before heating season are the ideal times. Scheduling a few weeks early gives you more appointment flexibility.",
      },
      {
        question: "How long does a maintenance visit take?",
        answer:
          "Most visits take 60–90 minutes. We'll walk you through the findings at the end and answer any questions.",
      },
      {
        question: "Do I need maintenance if my system seems to be working fine?",
        answer:
          "Yes. Most problems that cause mid-season failures were detectable months earlier. Maintenance is about catching small issues before they become expensive ones.",
      },
      {
        question: "Will skipping maintenance void my warranty?",
        answer:
          "It can. Most manufacturers require documented annual maintenance to keep the warranty valid. Our service reports give you the documentation you need.",
      },
      {
        question: "What's included in a maintenance plan?",
        answer:
          "Plan members receive two visits per year, priority scheduling, and a discount on any repairs needed. Plans are billed annually.",
      },
    ],
    sidebarTitle: "Book a Tune-Up",
    sidebarDescription:
      "Starting at $79. Protect your system before the season starts.",
    ctaTitle: "Schedule Your Seasonal Tune-Up",
    ctaBody: "A small investment now prevents expensive repairs later. Book your maintenance visit today.",
    ctaButtonLabel: "Schedule Maintenance",
    ctaHref: "/request-service",
  },

  "system-installation": {
    slug: "system-installation",
    pageTitle: "New HVAC System Installation",
    pageEyebrow: "Free In-Home Estimates",
    pageIntro:
      "Replacing your HVAC system is a major decision. Getting the sizing right — and the installation right — determines how well it performs for the next 15 years.",
    introParagraphs: [
      "An oversized system short-cycles and leaves your home feeling humid. An undersized one runs constantly and drives up your energy bill. Proper sizing requires a Manual J load calculation, not a guess based on your old system.",
      "We walk you through your options at every price point, pull all required permits, and handle city inspections. You get a clean, fully tested installation — not a rushed job.",
    ],
    sectionOneTitle: "How We Size and Spec Your New System",
    sectionOneBody:
      "Before recommending a system, we calculate your home's heating and cooling load based on square footage, insulation, window placement, and local climate data. This takes the guesswork out of sizing and ensures you're not paying for capacity you don't need.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "We install central air conditioning systems, heat pumps, ductless mini-splits, and smart thermostats. Financing is available for qualified buyers, and we'll help you understand what rebates you may qualify for through your utility provider.",
    bulletListTitle: "Every Installation Includes",
    bulletItems: [
      "Free in-home estimate with Manual J load calculation",
      "Equipment options across all efficiency tiers",
      "Permit pulling and city inspection coordination",
      "Full system test before we leave",
      "Manufacturer warranty registration",
      "Financing available for qualified buyers",
    ],
    sectionThreeTitle: "What to Expect on Installation Day",
    sectionThreeBody:
      "Most residential installations are completed in a single day. Our crew protects your floors, removes the old equipment, installs the new system, and walks you through thermostat operation before packing up. You'll have heat or cool air before we leave.",
    faqItems: [
      {
        question: "How do I know what size system I need?",
        answer:
          "Size is based on a Manual J load calculation — not your old system's capacity. We run this on every estimate at no charge.",
      },
      {
        question: "How long does installation take?",
        answer:
          "Most residential installs are completed in one day. Larger homes or complex ductwork situations may require two.",
      },
      {
        question: "What brands do you install?",
        answer:
          "We work with several major manufacturers and will recommend the best fit for your home and budget. We don't push one brand over another.",
      },
      {
        question: "Is financing available?",
        answer:
          "Yes. We offer financing options for qualified buyers. Ask about current rates and terms when you schedule your estimate.",
      },
      {
        question: "Does the installation come with a warranty?",
        answer:
          "Yes — equipment comes with a manufacturer warranty, and our labor is separately warranted. We'll walk you through both coverages at the time of install.",
      },
    ],
    sidebarTitle: "Get a Free Estimate",
    sidebarDescription:
      "No obligation. We'll measure your home, run the numbers, and give you options.",
    ctaTitle: "Ready to Replace Your System?",
    ctaBody:
      "Start with a free in-home estimate. We'll size it right and give you honest options.",
    ctaButtonLabel: "Schedule Free Estimate",
    ctaHref: "/request-service",
  },

  "duct-cleaning-air-quality": {
    slug: "duct-cleaning-air-quality",
    pageTitle: "Duct Cleaning & Indoor Air Quality",
    pageEyebrow: "Breathe Cleaner Air at Home",
    pageIntro:
      "Your ductwork circulates air through every room in your home multiple times a day. What's living inside those ducts circulates too.",
    introParagraphs: [
      "Dust, pet dander, mold spores, and allergens accumulate in ductwork over time — especially in homes with older systems or previous water damage. A professional duct cleaning removes the buildup, not just redistributes it.",
      "We use commercial-grade vacuum equipment and EPA-registered cleaning agents. Every cleaning includes before-and-after photos so you can see what was removed.",
    ],
    sectionOneTitle: "When Duct Cleaning Actually Helps",
    sectionOneBody:
      "Duct cleaning is most beneficial after a renovation, following a pest infestation, if you've noticed visible mold near your vents, or if allergy symptoms in your home have gotten noticeably worse. We'll do an honest assessment before recommending a full cleaning.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Beyond duct cleaning, we install UV air purifiers, whole-home HEPA filtration systems, and humidity controls. These aren't upsells for every house — but for homes with allergy sufferers, pets, or high humidity issues, they make a measurable difference.",
    bulletListTitle: "Our Air Quality Services Include",
    bulletItems: [
      "Full duct system cleaning with commercial equipment",
      "Before-and-after photo documentation",
      "EPA-registered cleaning agents",
      "UV air purifier installation",
      "Whole-home HEPA filtration",
      "Humidity control and whole-home dehumidifiers",
    ],
    sectionThreeTitle: "How Often Should Ducts Be Cleaned?",
    sectionThreeBody:
      "For most homes, every 3–5 years is sufficient — or sooner after a renovation, pest problem, or confirmed mold growth. We'll tell you honestly whether your ducts need cleaning based on what we find during inspection.",
    faqItems: [
      {
        question: "How do I know if my ducts need cleaning?",
        answer:
          "Signs include visible dust blowing from vents, worsening allergy symptoms, visible mold near registers, or recent home renovation work. We can inspect and give you an honest assessment.",
      },
      {
        question: "How long does duct cleaning take?",
        answer:
          "Most homes take 3–5 hours depending on the number of vents and the condition of the ductwork.",
      },
      {
        question: "Will duct cleaning improve my air quality?",
        answer:
          "In homes with significant buildup, yes. For homes with recently cleaned or well-maintained ducts, the impact is more modest. We'll tell you which situation yours is.",
      },
      {
        question: "What is a UV air purifier and do I need one?",
        answer:
          "A UV air purifier uses ultraviolet light to neutralize airborne bacteria, mold spores, and viruses inside your air handler. It's worth considering for homes with allergy sufferers or anyone with respiratory conditions.",
      },
      {
        question: "Can you clean flex duct as well as metal ductwork?",
        answer:
          "Yes. We clean both metal and flexible duct systems. Flex duct requires different technique to avoid damage, and our technicians are trained on both.",
      },
    ],
    sidebarTitle: "Schedule a Duct Inspection",
    sidebarDescription:
      "We'll assess your ductwork and give you an honest recommendation — no pressure.",
    ctaTitle: "Improve the Air in Your Home",
    ctaBody:
      "Duct cleaning, air purification, and humidity control — we handle it all. Book a visit today.",
    ctaButtonLabel: "Schedule Air Quality Service",
    ctaHref: "/request-service",
  },

  "thermostat-airflow": {
    slug: "thermostat-airflow",
    pageTitle: "Thermostat & Airflow Issues",
    pageEyebrow: "Comfort Problems Solved",
    pageIntro:
      "Hot spots, cold rooms, or a system that runs constantly without reaching the set temperature are almost always a solvable problem — and often a cheaper fix than homeowners expect.",
    introParagraphs: [
      "Uneven temperatures are one of the most common HVAC complaints we hear. The cause is usually airflow related — blocked returns, leaky ducts, an undersized system, or a thermostat that isn't calibrated correctly.",
      "Before recommending any major work, we do a room-by-room airflow assessment and check your thermostat's calibration and placement. A lot of 'system problems' turn out to be thermostat problems.",
    ],
    sectionOneTitle: "Common Airflow Issues We Fix",
    sectionOneBody:
      "Restricted return air is the most overlooked cause of comfort problems. If your system can't draw enough air back through the returns, it starves the blower and reduces airflow to every room. We check return sizing, filter restriction, and duct leakage as the first step in any airflow diagnosis.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Smart thermostats can solve some comfort issues on their own — better scheduling, remote access, and more precise temperature sensing. We install and configure smart thermostats and can integrate them with your existing system in most cases.",
    bulletListTitle: "Airflow & Thermostat Services",
    bulletItems: [
      "Room-by-room airflow assessment",
      "Thermostat calibration and replacement",
      "Smart thermostat installation and setup",
      "Return air sizing evaluation",
      "Duct leakage testing and sealing",
      "Zoning system installation",
    ],
    sectionThreeTitle: "When Zoning Is the Answer",
    sectionThreeBody:
      "If your home has floors or wings that consistently run a different temperature from the rest, a zoning system may be the right long-term fix. Zoning splits your home into independently controlled areas, each with its own thermostat. We can design and install these systems for most existing duct configurations.",
    faqItems: [
      {
        question: "Why is one room always hotter or cooler than the rest?",
        answer:
          "This is almost always an airflow issue — either too much or too little air reaching that room. Causes include undersized ducts, closed dampers, or poor return placement. We can identify and fix it.",
      },
      {
        question: "Can a bad thermostat make my whole system underperform?",
        answer:
          "Yes. A thermostat that's in a poor location (near a window or an exterior wall) or miscalibrated can cause the system to run longer or shorter than it should, making the whole house feel off.",
      },
      {
        question: "How do I know if a smart thermostat is compatible with my system?",
        answer:
          "Most modern systems are compatible with popular smart thermostats, but two-stage systems and heat pumps have specific wiring requirements. We'll verify compatibility before recommending one.",
      },
      {
        question: "What is duct sealing and do I need it?",
        answer:
          "Duct leakage can waste 20–30% of your conditioned air before it reaches the rooms it's meant to heat or cool. If your system runs longer than expected or you have hot/cold spots, leaky ducts may be the cause.",
      },
    ],
    sidebarTitle: "Uneven Temperatures?",
    sidebarDescription:
      "We'll find the cause and give you a clear answer. Most issues are diagnosable in one visit.",
    ctaTitle: "Stop Living With Comfort Problems",
    ctaBody:
      "Airflow issues and thermostat problems are almost always fixable. Book a diagnostic today.",
    ctaButtonLabel: "Book a Diagnostic",
    ctaHref: "/request-service",
  },

  "indoor-air-quality": {
    slug: "indoor-air-quality",
    pageTitle: "Indoor Air Quality Assessment",
    pageEyebrow: "Know What's in Your Home's Air",
    pageIntro:
      "Before investing in air quality equipment, it helps to understand what's actually in your home's air. An assessment gives you that baseline — and a prioritized list of improvements worth making.",
    introParagraphs: [
      "Many homeowners spend money on air purifiers or filtration upgrades without knowing which contaminants are actually present. An assessment tells you whether the issue is particulate matter, biological growth, humidity, VOCs, or a combination — so the solution matches the problem.",
      "We measure humidity throughout the home, inspect the air handler, filter, and ductwork for contamination sources, review ventilation and fresh air exchange, and evaluate the current filtration system's performance.",
    ],
    sectionOneTitle: "What an Assessment Covers",
    sectionOneBody:
      "We check whole-home humidity levels, inspect the air handler and coil for mold or debris, review ductwork for contamination indicators, assess filtration effectiveness relative to your system's airflow, and evaluate ventilation adequacy. You get written findings and specific recommendations — not a list of products.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "After the assessment we'll walk through the findings and explain what each one means for your health and comfort. Recommendations are ranked by impact — the most effective improvements first, with honest guidance on what won't make a meaningful difference for your home's specific situation.",
    bulletListTitle: "Assessment Covers",
    bulletItems: [
      "Whole-home humidity measurement and analysis",
      "Air handler and evaporator coil inspection",
      "Ductwork contamination indicators review",
      "Filtration system effectiveness evaluation",
      "Ventilation and fresh air exchange check",
      "Written findings and ranked improvement recommendations",
    ],
    sectionThreeTitle: "From Assessment to Action",
    sectionThreeBody:
      "Based on findings, we can recommend specific upgrades — UV purifier, upgraded filtration, duct cleaning, dehumidification, or a combination. Every recommendation is backed by what we actually observed, not a standard package. The assessment fee applies toward any recommended services you proceed with.",
    faqItems: [
      {
        question: "Do I need a formal assessment, or can I just install upgrades?",
        answer:
          "An assessment prevents you from buying equipment that doesn't address your actual problem. Many homeowners install air purifiers for issues that are actually caused by humidity or duct contamination.",
      },
      {
        question: "How long does an indoor air quality assessment take?",
        answer:
          "Most assessments take 60–90 minutes. We'll walk through the home with you and review findings before leaving.",
      },
      {
        question: "What are the most common problems you find?",
        answer:
          "High humidity, dirty or undersized filtration, contaminated ductwork, inadequate ventilation, and coil mold growth are the most frequent findings. Most are correctable without major equipment changes.",
      },
      {
        question: "Do you test for radon or specific chemical compounds?",
        answer:
          "Our assessment focuses on HVAC-related air quality factors. For specialized testing like radon or specific VOC analysis, we can refer you to a certified industrial hygienist.",
      },
      {
        question: "Is the assessment fee applied toward recommended work?",
        answer:
          "Yes. The assessment fee is credited toward any services you proceed with as a result of the findings.",
      },
    ],
    sidebarTitle: "Find Out What's in Your Air",
    sidebarDescription:
      "A 90-minute assessment gives you a clear picture before you spend money on upgrades.",
    ctaTitle: "Start With an Assessment",
    ctaBody:
      "Know what's actually in your home's air before investing in improvements. Book an indoor air quality assessment today.",
    ctaButtonLabel: "Book an Assessment",
    ctaHref: "/request-service",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Commercial Services
// ─────────────────────────────────────────────────────────────────────────────

const commercialPages: Record<string, ServicePageContent> = {
  "commercial-maintenance": {
    slug: "commercial-maintenance",
    pageTitle: "Commercial Preventative Maintenance",
    pageEyebrow: "Planned Service for Business & Facilities",
    pageIntro:
      "HVAC downtime in a commercial building costs more than the repair — in lost productivity, tenant dissatisfaction, and emergency service premiums. Preventative maintenance keeps that from happening.",
    introParagraphs: [
      "Commercial systems run longer hours and manage larger loads than residential equipment. A maintenance program built for commercial use is structured differently — it's a scheduled service agreement that matches your equipment inventory and your operational calendar.",
      "We work with building owners, property managers, and facility directors to build plans that fit the equipment on-site, the building's occupancy schedule, and the budget cycle.",
    ],
    sectionOneTitle: "What Commercial Maintenance Covers",
    sectionOneBody:
      "A full commercial maintenance visit covers filter replacement, coil cleaning, refrigerant level verification, belt and bearing inspection, economizer function check, thermostat and controls calibration, electrical connection tightening, and a documented system performance report for each unit.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Documented maintenance intervals also protect your equipment warranty, satisfy insurance requirements, and give you a performance baseline that makes deterioration visible before it becomes a failure. That documentation matters when you're managing a budget or reporting to ownership.",
    bulletListTitle: "Commercial Maintenance Plans Include",
    bulletItems: [
      "Scheduled visits on your preferred interval",
      "Full system inspection with written report per unit",
      "Filter replacement included on each visit",
      "Priority response for emergency repair calls",
      "Equipment history and service log maintenance",
      "Multi-unit and multi-location programs available",
    ],
    sectionThreeTitle: "Building Your Service Plan",
    sectionThreeBody:
      "We start with a site assessment — equipment inventory, age and condition, operational requirements, and service history. From there we build a maintenance schedule and scope that prevents problems instead of reacting to them. No two buildings get the same plan.",
    faqItems: [
      {
        question: "What types of commercial HVAC systems do you maintain?",
        answer:
          "We service rooftop units, split systems, air handlers, packaged units, and commercial heat pumps. Contact us with your equipment list for a specific assessment.",
      },
      {
        question: "How often should commercial HVAC equipment be serviced?",
        answer:
          "Most commercial equipment should be serviced quarterly at minimum — more frequently for high-run-time applications like restaurants, data centers, or 24-hour facilities.",
      },
      {
        question: "Can you service equipment from multiple manufacturers?",
        answer:
          "Yes. We work on all major commercial HVAC brands and can manage mixed-equipment facilities under a single service agreement.",
      },
      {
        question: "What happens if we find a problem during a maintenance visit?",
        answer:
          "We document the finding, explain the risk level, and provide a repair quote. You decide how to proceed. Emergency issues that pose an immediate operational or safety risk are flagged and escalated.",
      },
      {
        question: "Can you provide service documentation for our property manager or ownership group?",
        answer:
          "Yes. Every visit generates a written report. We can also provide annual service summaries and equipment condition assessments on request.",
      },
    ],
    sidebarTitle: "Schedule a Site Assessment",
    sidebarDescription:
      "We'll walk your facility, review your equipment, and put together a maintenance plan.",
    ctaTitle: "Protect Your Commercial Equipment",
    ctaBody:
      "A maintenance agreement is the most cost-effective line in your facilities budget. Let's talk.",
    ctaButtonLabel: "Request a Commercial Quote",
    ctaHref: "/request-service",
  },

  "commercial-hvac-installation": {
    slug: "commercial-hvac-installation",
    pageTitle: "Commercial HVAC Installation",
    pageEyebrow: "New Systems for Business & Commercial Buildings",
    pageIntro:
      "A commercial HVAC installation is a capital investment that will affect your building's operating costs, tenant comfort, and maintenance budget for 15 to 20 years. Getting the design right from the start is the only way to protect that investment.",
    introParagraphs: [
      "Improper sizing and undersized distribution are the two most common reasons commercial HVAC underperforms despite being brand new. We start with a commercial load calculation that accounts for building envelope, occupancy patterns, equipment heat loads, and local climate data — before any equipment is ordered.",
      "We handle system design, equipment selection, ductwork and distribution planning, permits, and city inspections. You get a complete installation with full commissioning documentation, not just equipment dropped on the roof.",
    ],
    sectionOneTitle: "Our Commercial Installation Process",
    sectionOneBody:
      "After the load calculation we present equipment options with efficiency ratings, expected operating costs, and manufacturer warranty terms. We coordinate with your general contractor or building management team and build a project schedule that minimizes disruption to building operations throughout the installation.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "We install rooftop units, commercial split systems, VRF and variable refrigerant flow systems, air handlers, and commercial heat pumps. For renovation and new construction projects, we can coordinate with other trades and adapt to phased project timelines.",
    bulletListTitle: "Every Commercial Installation Includes",
    bulletItems: [
      "Commercial load calculation and equipment specification",
      "Equipment options across efficiency and budget tiers",
      "Permit coordination and inspection management",
      "Ductwork and distribution planning",
      "Full system commissioning before project handoff",
      "As-built documentation and warranty registration",
    ],
    sectionThreeTitle: "Minimizing Business Disruption",
    sectionThreeBody:
      "Commercial installations require coordination with tenant occupancy, building access schedules, and operational needs. We build a realistic project timeline before starting and communicate proactively about any scope or schedule changes.",
    faqItems: [
      {
        question: "How do you determine the right system size for a commercial building?",
        answer:
          "We perform a commercial load calculation that accounts for building square footage, envelope performance, occupancy, internal heat loads, and local design conditions.",
      },
      {
        question: "Do you handle phased installations across multiple floors or zones?",
        answer:
          "Yes. We plan and execute phased installations that allow portions of a building to remain operational throughout the project.",
      },
      {
        question: "What brands do you install for commercial applications?",
        answer:
          "We work with leading commercial HVAC manufacturers and recommend based on the application and your operational priorities — not brand preference.",
      },
      {
        question: "How long does a commercial installation take?",
        answer:
          "Timeline depends on building size, system complexity, and site access. We provide a detailed project schedule during the proposal phase.",
      },
      {
        question: "Can you work alongside a general contractor on a renovation project?",
        answer:
          "Yes. We coordinate directly with GCs, electrical contractors, and building management teams. We're comfortable in both new construction and occupied renovation environments.",
      },
    ],
    sidebarTitle: "Request a Commercial Estimate",
    sidebarDescription:
      "Free site assessment and system proposal — no obligation.",
    ctaTitle: "Planning a Commercial Installation?",
    ctaBody:
      "Start with a site assessment. We'll spec the right system for your building and deliver a clear project plan.",
    ctaButtonLabel: "Schedule Site Assessment",
    ctaHref: "/request-service",
  },

  "commercial-hvac-repair": {
    slug: "commercial-hvac-repair",
    pageTitle: "Commercial HVAC Repair",
    pageEyebrow: "Fast Response for Business & Facilities",
    pageIntro:
      "When a commercial HVAC system goes down, the impact extends beyond discomfort — it affects operations, employee productivity, customer experience, and in some cases code compliance.",
    introParagraphs: [
      "We respond to commercial repair calls with the urgency the situation requires. Our technicians carry commercial-rated parts for the most common failure points on rooftop units, split systems, and packaged equipment.",
      "Every commercial repair starts with a full diagnostic. We identify the root cause, give you a written findings report and repair quote, then get the work done — in a single visit when parts allow.",
    ],
    sectionOneTitle: "Commercial Systems We Service",
    sectionOneBody:
      "We repair rooftop units, commercial split systems, packaged HVAC equipment, air handlers, and commercial heat pumps. We work on all major commercial brands and can source parts for older equipment that other contractors won't take on.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "When a critical part needs to be sourced, we work with our suppliers to expedite it and can often provide a temporary solution to keep your space functional in the interim. We'll communicate clearly about the timeline so you can plan around it.",
    bulletListTitle: "Every Commercial Repair Includes",
    bulletItems: [
      "Rapid dispatch with priority commercial response",
      "Full diagnostic with written findings",
      "Upfront pricing before any work begins",
      "All major commercial brands serviced",
      "Emergency and after-hours availability",
      "Service documentation for warranty and facility records",
    ],
    sectionThreeTitle: "Repair vs. Replacement for Commercial Equipment",
    sectionThreeBody:
      "For commercial equipment approaching the end of its useful life, a significant repair cost often makes replacement the better financial decision — particularly when factoring in energy savings from newer, more efficient equipment. We'll give you an honest comparison and let you decide.",
    faqItems: [
      {
        question: "Do you offer emergency commercial HVAC service?",
        answer:
          "Yes. We offer after-hours emergency response for commercial clients. Call the main line and let us know it's a commercial emergency.",
      },
      {
        question: "How quickly can you respond to a commercial repair call?",
        answer:
          "We prioritize commercial calls and aim for same-day response during business hours. Emergency calls are dispatched as quickly as possible.",
      },
      {
        question: "Can you service multi-unit or multi-zone commercial systems?",
        answer:
          "Yes. We work on multi-zone, multi-unit, and multi-floor commercial HVAC configurations.",
      },
      {
        question: "Do you provide written documentation after a commercial repair?",
        answer:
          "Yes. Every repair includes a written report of findings, work performed, and parts used — important for warranty records and facility management logs.",
      },
      {
        question: "What if the repair cost is close to the replacement cost?",
        answer:
          "We'll flag it and give you both options with honest guidance. For equipment nearing end of life, we won't push a repair that doesn't make financial sense.",
      },
    ],
    sidebarTitle: "Commercial System Down?",
    sidebarDescription:
      "We prioritize commercial repair calls. Call now for rapid dispatch.",
    ctaTitle: "Get Your Commercial System Back Online",
    ctaBody:
      "Fast diagnosis, honest quotes, and repairs that minimize downtime. Call now or book online.",
    ctaButtonLabel: "Request Commercial Repair",
    ctaHref: "/request-service",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Indoor Air Quality, Filtration & Humidity
// ─────────────────────────────────────────────────────────────────────────────

const iaqPages: Record<string, ServicePageContent> = {
  "duct-cleaning": {
    slug: "duct-cleaning",
    pageTitle: "Duct Cleaning & Sealing",
    pageEyebrow: "Clean Airflow, Sealed System",
    pageIntro:
      "Dirty ducts recirculate contaminants through your home. Leaky ducts waste the energy your system uses to condition the air. We address both problems in a single service visit.",
    introParagraphs: [
      "Over time, ductwork accumulates dust, debris, mold spores, and allergens that get pushed into living spaces every time the system runs. A professional cleaning removes the buildup at the source — not just filters it downstream.",
      "Duct sealing addresses a separate but equally costly problem: gaps and disconnects in the distribution system that allow conditioned air to escape into unconditioned spaces like attics, crawlspaces, and wall cavities. The average home loses 20–30% of its conditioned air this way.",
    ],
    sectionOneTitle: "How the Process Works",
    sectionOneBody:
      "We start with a duct system inspection to assess contamination levels and identify obvious leaks or damaged sections. Cleaning uses commercial-grade negative-pressure vacuum equipment to pull debris out rather than push it through. Sealing is done with mastic or professional-grade foil tape at connection points and is verified with a pressure test.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Combining cleaning and sealing in a single visit is more cost-effective than scheduling them separately and gives you a complete duct system reset — cleaner air circulating through a more efficient delivery network.",
    bulletListTitle: "Our Duct Service Includes",
    bulletItems: [
      "Full duct system inspection before work begins",
      "Commercial negative-pressure vacuum cleaning",
      "Before-and-after photo documentation",
      "Mastic or foil tape sealing at leak points",
      "Post-sealing pressure verification",
      "Written service report with findings",
    ],
    sectionThreeTitle: "When to Schedule Duct Service",
    sectionThreeBody:
      "Cleaning is most valuable after a renovation, following pest activity, or when allergy symptoms have noticeably worsened. Sealing is worth considering in any home where the HVAC runs longer than expected or where rooms are consistently harder to heat and cool than they should be.",
    faqItems: [
      {
        question: "Do I need cleaning, sealing, or both?",
        answer:
          "They address different problems. Cleaning improves air quality by removing accumulated contamination. Sealing improves efficiency by stopping conditioned air from escaping. Many homes benefit from both — we'll tell you what we find before recommending either.",
      },
      {
        question: "How long does combined cleaning and sealing take?",
        answer:
          "A combined visit typically takes 4–6 hours for an average-sized home, depending on the number of vents and extent of the sealing work.",
      },
      {
        question: "Is duct sealing a permanent fix?",
        answer:
          "Mastic sealant is durable and long-lasting — typically 15–20 years or more under normal conditions. It's not a patch; it's a structural seal.",
      },
      {
        question: "Will sealing my ducts lower my energy bill?",
        answer:
          "If your ducts have significant leakage, yes — often by 15–25% on heating and cooling costs. We can estimate your potential savings based on what we find during inspection.",
      },
      {
        question: "Can you clean flex duct as well as metal duct?",
        answer:
          "Yes. We service both rigid metal and flexible duct systems using techniques appropriate to each type to avoid damage.",
      },
    ],
    sidebarTitle: "Schedule a Duct Inspection",
    sidebarDescription:
      "We'll assess your ductwork and tell you what it needs before recommending any work.",
    ctaTitle: "Cleaner Air, More Efficient System",
    ctaBody:
      "A single visit can address both air quality and energy waste. Book your duct service today.",
    ctaButtonLabel: "Book Duct Service",
    ctaHref: "/request-service",
  },

  "humidity-control": {
    slug: "humidity-control",
    pageTitle: "Humidity Control",
    pageEyebrow: "Balanced Indoor Humidity Year-Round",
    pageIntro:
      "Too much moisture promotes mold growth and dust mites. Too little dries out the air, causes static electricity, and irritates sinuses. Getting indoor humidity right makes your home measurably more comfortable.",
    introParagraphs: [
      "Most HVAC systems manage temperature but not humidity independently. In humid climates, an oversized air conditioner is one of the most common causes of high indoor humidity — it cools the air quickly but doesn't run long enough to remove adequate moisture. The result is a home that feels clammy even when the AC is on.",
      "Whole-home dehumidifiers and humidifiers integrate directly with your existing HVAC system to maintain consistent humidity levels automatically — no emptying tanks, no room-by-room management.",
    ],
    sectionOneTitle: "Why Standard AC Isn't Always Enough",
    sectionOneBody:
      "Short-cycling caused by an oversized system is the most overlooked source of high indoor humidity. When the AC satisfies the thermostat before it can run a full dehumidification cycle, moisture stays in the air. A dedicated whole-home dehumidifier solves this regardless of how the AC is sized.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "For dry climates or winter conditions, whole-home humidifiers add moisture back into the air to protect wood floors and cabinetry, reduce static electricity, and prevent the dry-air respiratory irritation that portable humidifiers only partially address. Both systems maintain a target range automatically once set.",
    bulletListTitle: "Humidity Control Services",
    bulletItems: [
      "Whole-home dehumidifier installation",
      "Whole-home humidifier installation",
      "Humidity sensor calibration and control setup",
      "Integration with existing HVAC controls",
      "Inspection and service of existing units",
      "Indoor humidity assessment and recommendations",
    ],
    sectionThreeTitle: "Matching the Solution to Your Home",
    sectionThreeBody:
      "The right approach depends on your climate, your current system's behavior, and your symptoms. We'll measure your indoor humidity levels, assess how well your existing system is managing moisture, and recommend the most effective fix — which isn't always a new appliance.",
    faqItems: [
      {
        question: "What is the ideal indoor humidity range?",
        answer:
          "40–55% relative humidity is the healthy and comfortable range for most homes. Above 60% promotes mold and dust mite growth. Below 30% causes respiratory irritation and can damage wood flooring and furniture.",
      },
      {
        question: "Will a whole-home dehumidifier eliminate musty odors?",
        answer:
          "In most cases, yes. Musty odors are caused by elevated moisture that allows mold and mildew to grow. Lowering humidity removes the conditions that create the smell.",
      },
      {
        question: "How much does a whole-home dehumidifier cost to run?",
        answer:
          "Most units cost $30–$60 per month to operate depending on usage and local rates. They often reduce AC runtime enough to partially offset that cost.",
      },
      {
        question: "Can a humidifier be added to my existing forced-air system?",
        answer:
          "Most forced-air systems can accommodate a bypass or fan-powered humidifier. We'll verify compatibility with your air handler before recommending a unit.",
      },
      {
        question: "Do humidity control units require regular maintenance?",
        answer:
          "Yes. Dehumidifiers need annual cleaning and filter replacement. Humidifiers need seasonal cleaning and water panel replacement. We can include both in a maintenance plan.",
      },
    ],
    sidebarTitle: "Humidity Problems?",
    sidebarDescription:
      "We'll measure your indoor levels and identify the root cause before recommending any equipment.",
    ctaTitle: "Get Your Indoor Humidity Under Control",
    ctaBody:
      "Balanced humidity makes your home more comfortable and healthier. Book an assessment and let's fix it.",
    ctaButtonLabel: "Schedule Humidity Assessment",
    ctaHref: "/request-service",
  },

  "air-filtration": {
    slug: "air-filtration",
    pageTitle: "Filtration & Air Purification",
    pageEyebrow: "Whole-Home Air Quality Solutions",
    pageIntro:
      "Standard HVAC filters catch large dust particles but do almost nothing for fine particulate matter, bacteria, mold spores, or VOCs. Whole-home upgrades work at the system level — treating all the air, in every room, every time it circulates.",
    introParagraphs: [
      "Every cubic foot of air in your home passes through your HVAC system multiple times per day. That makes the air handler the most logical place to improve air quality — rather than relying on portable room purifiers that only treat one space at a time.",
      "We install and service HEPA-grade media filters, UV air purifiers, electronic air cleaners, and activated carbon systems. Each targets different contaminants, and we match the solution to what your home actually needs.",
    ],
    sectionOneTitle: "Comparing Filtration Options",
    sectionOneBody:
      "High-MERV media filters capture fine particles — pollen, pet dander, and fine dust — without the pressure restrictions of thinner pleated filters. UV air purifiers neutralize biological contaminants using ultraviolet light inside the air handler. Electronic air cleaners use an electric charge to attract and trap particles. Most homes benefit most from a media filter paired with UV purification.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "For homes with chemical sensitivities, recent renovation off-gassing, or persistent odors, activated carbon filtration adds a layer of protection that particle filters alone can't provide. We'll tell you honestly whether it applies to your situation.",
    bulletListTitle: "Filtration & Purification Services",
    bulletItems: [
      "High-MERV media filter installation",
      "UV air purifier installation and lamp replacement",
      "Electronic air cleaner installation",
      "Activated carbon filtration for odors and VOCs",
      "Filter sizing and airflow compatibility check",
      "Ongoing filter replacement and service",
    ],
    sectionThreeTitle: "What to Expect After Installation",
    sectionThreeBody:
      "Most homeowners notice a reduction in surface dust within a few weeks of installing upgraded filtration. For allergy sufferers, the difference tends to be most noticeable during high-pollen periods. UV purifiers work immediately — the benefits show up over time as biological contamination on the coil and in the ductwork is reduced.",
    faqItems: [
      {
        question: "What MERV rating is right for my home?",
        answer:
          "MERV 11–13 is appropriate for most residential systems. Higher ratings improve filtration but increase air resistance. We verify your system's fan capacity before recommending any upgrade.",
      },
      {
        question: "How is a UV purifier different from a regular air filter?",
        answer:
          "Filters capture particles. UV purifiers neutralize biological contaminants — bacteria, viruses, mold — using ultraviolet light. They work on everything passing through the air handler, not just what a filter can trap.",
      },
      {
        question: "Will a better filter make my HVAC work harder?",
        answer:
          "A filter that's too restrictive can reduce airflow and system efficiency. We size every upgrade against your system's static pressure capacity to make sure it's compatible.",
      },
      {
        question: "How often do upgraded filters need to be replaced?",
        answer:
          "High-capacity media filters typically last 6–12 months. UV lamps should be replaced every 12–24 months. We'll give you a specific schedule at installation.",
      },
      {
        question: "Is a whole-home solution worth it compared to portable air purifiers?",
        answer:
          "For most homes, yes. A whole-home system treats every room simultaneously, requires less day-to-day attention, and is less expensive per square foot of coverage than running multiple portable units.",
      },
    ],
    sidebarTitle: "Upgrade Your Home's Filtration",
    sidebarDescription:
      "We'll recommend the right combination of filtration for your home and budget.",
    ctaTitle: "Better Air Starts With Better Filtration",
    ctaBody:
      "Whole-home filtration and purification — installed once, working every day. Book a consultation today.",
    ctaButtonLabel: "Schedule a Consultation",
    ctaHref: "/request-service",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Heating Services
// ─────────────────────────────────────────────────────────────────────────────

const heatingPages: Record<string, ServicePageContent> = {
  "heating-maintenance": {
    slug: "heating-maintenance",
    pageTitle: "Heating Maintenance",
    pageEyebrow: "Pre-Season Tune-Up & Safety Check",
    pageIntro:
      "A heating system that hasn't been serviced since last season is more likely to fail mid-winter — and more likely to have a developing safety issue that nobody has looked at.",
    introParagraphs: [
      "Annual heating maintenance covers both performance and safety. We clean the system, check wear components before they reach failure, and inspect for any safety concerns — particularly on gas furnaces, where a cracked heat exchanger can allow combustion gases into living spaces.",
      "The best time to schedule is fall, before you actually need the heat. Catching a problem in October costs a fraction of what an emergency call costs in January when every technician is fully booked.",
    ],
    sectionOneTitle: "What the Visit Covers",
    sectionOneBody:
      "Our heating maintenance checklist covers burner cleaning, heat exchanger inspection, igniter and flame sensor testing, gas valve and pressure verification, blower motor and belt inspection, thermostat calibration, and a full system performance measurement against manufacturer specs. Every visit ends with a written report.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "For heat pump owners, fall maintenance focuses on the reversing valve, defrost controls, and refrigerant charge — the components most likely to cause comfort problems when outdoor temperatures drop and the system needs to switch modes reliably.",
    bulletListTitle: "Heating Maintenance Includes",
    bulletItems: [
      "Burner cleaning and combustion analysis",
      "Heat exchanger visual inspection",
      "Igniter and flame sensor test",
      "Blower motor and belt inspection",
      "Thermostat calibration and system test",
      "Written performance report",
    ],
    sectionThreeTitle: "If We Find a Problem",
    sectionThreeBody:
      "When a maintenance visit turns up an issue — a worn igniter, a failing capacitor, or a cracked heat exchanger — we'll explain what it means and provide a repair quote before doing any additional work. You're never obligated to proceed. Safety issues are clearly flagged so you can make an informed decision.",
    faqItems: [
      {
        question: "When is the best time to schedule heating maintenance?",
        answer:
          "Fall — ideally September or October before the heating season starts. Scheduling early gives you more appointment availability and time to address any issues found.",
      },
      {
        question: "Does maintenance apply to heat pumps, or just gas furnaces?",
        answer:
          "Both. Gas furnaces, heat pumps, and electric furnaces all benefit from annual maintenance. The checklist items differ by system type.",
      },
      {
        question: "Is a CO check included?",
        answer:
          "Yes. We test combustion gas levels at the supply registers on every gas furnace maintenance visit.",
      },
      {
        question: "How long does a heating tune-up take?",
        answer:
          "Most visits take 60–90 minutes. We'll walk through the findings with you at the end.",
      },
      {
        question: "Do I need maintenance if my system is new?",
        answer:
          "Yes. Most manufacturer warranties require documented annual maintenance to remain valid. New systems can still develop issues — catching them early is always the better option.",
      },
    ],
    sidebarTitle: "Book a Heating Tune-Up",
    sidebarDescription:
      "Pre-season maintenance starts at $79. Book before the fall appointment rush.",
    ctaTitle: "Don't Wait for Winter to Find Out",
    ctaBody:
      "Pre-season heating maintenance keeps your system ready when you need it most. Book your tune-up today.",
    ctaButtonLabel: "Schedule Heating Tune-Up",
    ctaHref: "/request-service",
  },

  "heating-installation": {
    slug: "heating-installation",
    pageTitle: "Heating Installation & Replacement",
    pageEyebrow: "New Heating Systems for Your Home",
    pageIntro:
      "A new heating system is a 15–20 year investment. Getting the sizing, equipment selection, and installation right from the start determines how efficiently and reliably it performs for that entire period.",
    introParagraphs: [
      "The single most common installation mistake is carrying over the same equipment capacity as the old system without running a proper load calculation. Heating loads change over the life of a home — improved insulation, added rooms, or replaced windows all affect what your home actually needs.",
      "We start every replacement with a heating load calculation, walk you through equipment options at multiple efficiency and price tiers, and manage permits and inspections from start to finish.",
    ],
    sectionOneTitle: "System Types We Install",
    sectionOneBody:
      "We install gas furnaces, electric furnaces, heat pumps, dual-fuel systems, and ductless mini-splits. The best choice depends on your existing infrastructure, local utility costs, and your home's heating load. We'll lay out the trade-offs honestly so you can make a decision you'll be satisfied with for the next two decades.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Modern cold-climate heat pumps perform efficiently at outdoor temperatures well below freezing — a significant improvement over earlier generations. If your utility costs favor electric over gas, or if you're already planning to electrify, a heat pump or dual-fuel system is worth a serious look.",
    bulletListTitle: "Every Installation Includes",
    bulletItems: [
      "Heating load calculation before equipment selection",
      "Equipment options across multiple efficiency tiers",
      "Permit coordination and city inspection management",
      "Full system commissioning and performance verification",
      "Manufacturer warranty registration",
      "Thermostat setup and homeowner walkthrough",
    ],
    sectionThreeTitle: "When Replacement Beats Repair",
    sectionThreeBody:
      "If your furnace is over 15 years old and facing a significant repair, replacement usually wins financially — especially when you factor in efficiency gains. A modern high-efficiency gas furnace runs at 95–98% AFUE versus the 70–80% of older equipment. The energy savings often recover the replacement cost faster than expected.",
    faqItems: [
      {
        question: "How do I know if I need a new system or just a repair?",
        answer:
          "If the system is over 15 years old and facing a major repair, replacement usually makes more financial sense. We'll give you both options with honest numbers so you can compare.",
      },
      {
        question: "How long does a heating system replacement take?",
        answer:
          "Most residential replacements are completed in one day. We'll confirm the specific timeline during the estimate.",
      },
      {
        question: "What is AFUE and why does it matter?",
        answer:
          "AFUE (Annual Fuel Utilization Efficiency) measures how efficiently a furnace converts fuel to heat. A 96 AFUE system wastes only 4% of the fuel it consumes. Higher AFUE means lower monthly operating costs.",
      },
      {
        question: "Is financing available?",
        answer:
          "Yes. We offer financing for qualified buyers. Ask about current terms when you schedule your estimate.",
      },
      {
        question: "Can I keep my existing ductwork?",
        answer:
          "In most cases, yes — if the ductwork is in acceptable condition and sized for the new system's airflow. We'll inspect it as part of the installation assessment.",
      },
    ],
    sidebarTitle: "Get a Free Estimate",
    sidebarDescription:
      "No obligation. We'll calculate the right size and walk you through your options.",
    ctaTitle: "Ready for a New Heating System?",
    ctaBody:
      "Start with a free in-home estimate. We'll size it right, give you honest options, and install it properly.",
    ctaButtonLabel: "Schedule a Free Estimate",
    ctaHref: "/request-service",
  },

  "heating-repair": {
    slug: "heating-repair",
    pageTitle: "Heating Repair",
    pageEyebrow: "Gas, Electric & Heat Pump Systems",
    pageIntro:
      "A heater that won't ignite, runs constantly without reaching temperature, or shuts off unexpectedly is rarely a mystery. Most heating failures follow predictable patterns — and most are diagnosable and fixable in a single visit.",
    introParagraphs: [
      "We diagnose and repair gas furnaces, electric furnaces, heat pumps, and boilers. Our technicians carry the most common failure parts on their trucks and follow a systematic diagnostic process that identifies the root cause rather than replacing components until something works.",
      "Every heating repair includes a safety inspection. We verify heat exchanger integrity on gas systems, test combustion gas levels, and confirm gas valve operation before leaving — not as an upsell, but as standard practice.",
    ],
    sectionOneTitle: "How We Diagnose Heating Problems",
    sectionOneBody:
      "Gas furnace failures most often trace to the igniter, flame sensor, gas valve, or inducer motor. Heat pump failures typically involve the capacitor, contactor, reversing valve, or defrost controls. Electric furnace issues usually point to a heating element or sequencer. We follow a logical diagnostic sequence to isolate the component quickly.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "A banging noise on startup, a furnace that runs but doesn't heat, or a system that trips the breaker repeatedly are all symptoms worth addressing promptly. Delayed ignition in particular can stress the heat exchanger over time and lead to a much more serious and expensive repair.",
    bulletListTitle: "Every Heating Repair Includes",
    bulletItems: [
      "Systematic diagnostic with written findings",
      "Safety inspection including CO check",
      "Heat exchanger visual inspection on gas systems",
      "Upfront repair quote before any work begins",
      "90-day labor warranty on all repairs",
      "Same-day and emergency service available",
    ],
    sectionThreeTitle: "After Hours and Emergency Heating Service",
    sectionThreeBody:
      "Heating failures don't keep business hours. If your heat goes out overnight or on a weekend, we're still available. Emergency calls are dispatched with priority, and we'll give you a clear ETA when you call.",
    faqItems: [
      {
        question: "My furnace runs but doesn't produce heat. What's wrong?",
        answer:
          "This usually points to an ignition problem — a failed igniter, a dirty flame sensor, or a gas supply issue. All three are straightforward repairs once the root cause is identified.",
      },
      {
        question: "Is it safe to run a furnace that's making an unusual noise?",
        answer:
          "It depends on the noise. Squealing often indicates a belt or bearing. Banging on startup typically means delayed ignition. Both warrant a service call — don't continue running the system until it's been checked.",
      },
      {
        question: "How much does a heating repair typically cost?",
        answer:
          "Most repairs run between $150 and $500 depending on the component and labor involved. The diagnostic fee starts at $99 and is applied toward the repair if you proceed.",
      },
      {
        question: "Do you service heat pumps as well as gas furnaces?",
        answer:
          "Yes. We service gas furnaces, electric furnaces, heat pumps, and boilers.",
      },
      {
        question: "What if the repair cost doesn't make sense for the system's age?",
        answer:
          "We'll tell you. If we believe a repair is throwing good money after bad, we'll say so and provide a replacement estimate to compare against — not to push a sale, but to help you make a sound decision.",
      },
    ],
    sidebarTitle: "Heating Not Working?",
    sidebarDescription:
      "Emergency and same-day service available. Call now for fast dispatch.",
    ctaTitle: "Get Your Heat Back On",
    ctaBody:
      "Fast diagnostics, honest quotes, and repairs that last. Call now or schedule online.",
    ctaButtonLabel: "Book Heating Repair",
    ctaHref: "/request-service",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Cooling Services
// ─────────────────────────────────────────────────────────────────────────────

const coolingPages: Record<string, ServicePageContent> = {
  "ac-maintenance": {
    slug: "ac-maintenance",
    pageTitle: "AC Maintenance & Tune-Up",
    pageEyebrow: "Spring Cooling Season Prep",
    pageIntro:
      "An air conditioner that hasn't been serviced since last summer is not ready for peak season. A spring tune-up gets it there — before you need it most.",
    introParagraphs: [
      "The evaporator and condenser coils are the two most critical components in your cooling system. When they're dirty, the system has to work harder to move heat — and that extra effort drives up your energy bill while accelerating wear on the compressor and other components.",
      "Our AC tune-up cleans the coils, verifies refrigerant charge, checks all electrical components, and tests the system's actual cooling performance. You'll know exactly where your system stands before summer arrives.",
    ],
    sectionOneTitle: "What Our AC Tune-Up Covers",
    sectionOneBody:
      "We clean the condenser coil, evaporator coil, and drain pan; check refrigerant pressure and temperature split; test the capacitor, contactor, and fan motors; inspect all electrical connections; replace the standard air filter; and verify thermostat calibration. Every visit ends with a written performance report you can keep on file.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "A dirty condenser coil can increase energy consumption by 15–30%. A low refrigerant charge forces the system to run longer to reach the setpoint. Both are caught and corrected during a tune-up — making the cost of the visit easy to recover in the first month of cooling season.",
    bulletListTitle: "AC Tune-Up Includes",
    bulletItems: [
      "Condenser and evaporator coil cleaning",
      "Refrigerant pressure and temperature split check",
      "Capacitor and contactor test",
      "Drain line flush and drain pan inspection",
      "Filter replacement (standard 1-inch filter)",
      "Written system performance report",
    ],
    sectionThreeTitle: "The Right Time to Schedule",
    sectionThreeBody:
      "Spring — March through May — is the ideal window for AC maintenance. Scheduling before peak cooling demand means more appointment availability, shorter lead times, and room to address any issues found before the hottest weather arrives.",
    faqItems: [
      {
        question: "How is a tune-up different from a maintenance plan?",
        answer:
          "A tune-up is a single visit focused on your cooling system. A maintenance plan typically covers both heating and cooling visits annually and includes priority service benefits year-round.",
      },
      {
        question: "How often should my AC be tuned up?",
        answer:
          "Once per year in the spring before cooling season is the standard recommendation for most systems.",
      },
      {
        question: "Will the tune-up add refrigerant if my system is low?",
        answer:
          "We check refrigerant levels during the tune-up. If the system is low, we'll identify the likely cause and quote the recharge as a separate line item.",
      },
      {
        question: "My system seems to be working fine. Do I still need a tune-up?",
        answer:
          "Yes. Most efficiency losses and developing component problems aren't noticeable until they're serious. A tune-up catches minor issues before they become expensive ones.",
      },
      {
        question: "Does the tune-up include a drain line flush?",
        answer:
          "Yes. We flush the condensate drain line and inspect the drain pan on every tune-up to prevent moisture backup and water damage.",
      },
    ],
    sidebarTitle: "Book Your Spring AC Tune-Up",
    sidebarDescription:
      "Starting at $79. Lock in your appointment before the season rush.",
    ctaTitle: "Get Your AC Ready for Summer",
    ctaBody:
      "A spring tune-up is the easiest way to lower your energy bill and avoid a mid-summer breakdown. Book today.",
    ctaButtonLabel: "Schedule AC Tune-Up",
    ctaHref: "/request-service",
  },

  "ac-installation": {
    slug: "ac-installation",
    pageTitle: "AC Installation & Replacement",
    pageEyebrow: "New Cooling Systems for Your Home",
    pageIntro:
      "A properly sized and installed air conditioner cools more effectively, runs more efficiently, and lasts significantly longer than one that's oversized, undersized, or cut-corner installed.",
    introParagraphs: [
      "The most common AC installation mistake is selecting a system based on the old unit's capacity rather than the home's actual cooling load. An oversized system short-cycles, fails to remove humidity, and wears out faster than it should. An undersized one runs constantly and can't keep up on the hottest days.",
      "We run a Manual J load calculation on every job — it's the only reliable way to determine what size your home actually needs. That calculation also uncovers whether your ductwork is up to the task.",
    ],
    sectionOneTitle: "What the Installation Process Looks Like",
    sectionOneBody:
      "After the load calculation, we walk you through equipment options at multiple efficiency tiers — with honest guidance on where higher SEER ratings pay off and where they don't for your specific usage patterns. We pull all required permits, coordinate inspections, and fully commission the system before leaving.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "We install central air conditioning systems, heat pumps (which provide both heating and cooling), and ductless mini-split systems. If your existing ductwork is undersized, leaky, or in poor condition, we can assess it and include repairs or replacement as part of the project scope.",
    bulletListTitle: "Every AC Installation Includes",
    bulletItems: [
      "Manual J load calculation at no additional charge",
      "Equipment options at multiple SEER efficiency tiers",
      "Permit coordination and inspection management",
      "Existing ductwork inspection and condition assessment",
      "Full system commissioning and cooling performance test",
      "Manufacturer warranty registration and documentation",
    ],
    sectionThreeTitle: "Repair vs. Replacement: Making the Right Call",
    sectionThreeBody:
      "If your AC is over 12–15 years old and facing a significant repair, replacement often wins financially — especially when you factor in the efficiency gains from modern equipment. We'll walk you through the honest comparison and let you decide without pressure.",
    faqItems: [
      {
        question: "What SEER rating should I choose?",
        answer:
          "Standard efficiency systems (14–16 SEER) offer reliable performance at lower upfront cost. High-efficiency systems (18 SEER and above) make financial sense if you run your AC heavily or plan to stay in the home for many years. We'll show you the payback math.",
      },
      {
        question: "How long does an AC installation take?",
        answer:
          "Most residential installations are completed in one day. We'll confirm the specific timeline during the estimate.",
      },
      {
        question: "Can I keep my existing air handler?",
        answer:
          "It depends on the air handler's age and condition, and whether it's matched to the new outdoor unit. We'll assess it during the site visit.",
      },
      {
        question: "Is financing available?",
        answer:
          "Yes. We offer financing for qualified buyers. Ask about current rates and terms when you schedule your estimate.",
      },
      {
        question: "Do you install AC in older homes without existing ductwork?",
        answer:
          "Yes. We can design and install ductwork as part of the project, or recommend ductless mini-split systems as an alternative if running ductwork isn't practical.",
      },
    ],
    sidebarTitle: "Get a Free Estimate",
    sidebarDescription:
      "No obligation. We'll size the system and walk you through your options.",
    ctaTitle: "Time for a New AC System?",
    ctaBody:
      "Start with a free in-home estimate. We'll size it right, give you real options, and install it the right way.",
    ctaButtonLabel: "Schedule Free AC Estimate",
    ctaHref: "/request-service",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Specialty Systems
// ─────────────────────────────────────────────────────────────────────────────

const specialtyPages: Record<string, ServicePageContent> = {
  "mini-split-service": {
    slug: "mini-split-service",
    pageTitle: "Ductless Mini-Split Service",
    pageEyebrow: "Installation, Repair & Maintenance",
    pageIntro:
      "Mini-split systems deliver zoned comfort, high efficiency, and no ductwork — making them the best available solution for additions, garages, offices, and homes without existing duct systems.",
    introParagraphs: [
      "A ductless mini-split consists of an outdoor compressor unit connected to one or more indoor air handlers. Each indoor handler serves a defined zone and can be controlled independently — which means you're only conditioning the spaces that are actually occupied.",
      "We install, repair, and maintain single-zone and multi-zone mini-split systems from leading manufacturers. Whether you need a single unit for a finished attic or a whole-home ductless system with multiple zones, we design and install the right configuration.",
    ],
    sectionOneTitle: "Where Mini-Splits Work Best",
    sectionOneBody:
      "Mini-splits are the best available solution for any space that can't or shouldn't have ductwork: garage conversions, home offices, sunrooms, bonus rooms, and detached structures. For whole-home applications, multi-zone mini-split systems eliminate duct losses entirely and deliver precise room-by-room control that a central system can't match.",
    inlineImages: [
      {
        src: "/repairman-in-uniform-installing-the-outside-unit.jpg",
        alt: "Technician inspecting an outdoor AC condenser unit",
      },
      {
        src: "/indian-male-worker-inspecting-the-air-conditioner.jpg",
        alt: "HVAC technician checking air conditioner components",
      },
    ],
    sectionTwoBody:
      "Modern mini-splits are inverter-driven, which means they vary output continuously rather than cycling on and off. This makes them more efficient than conventional systems at maintaining a consistent temperature — they don't overshoot the setpoint and then shut off the way a single-stage system does.",
    bulletListTitle: "Mini-Split Services We Offer",
    bulletItems: [
      "Single-zone and multi-zone system installation",
      "Mini-split repair and component diagnostics",
      "Annual maintenance and coil cleaning",
      "Refrigerant recharge and leak detection",
      "Smart control and integration setup",
      "System sizing and zone design consultation",
    ],
    sectionThreeTitle: "Annual Mini-Split Maintenance",
    sectionThreeBody:
      "Mini-splits need annual cleaning of the indoor unit's washable filter and coil. The filter is owner-accessible, but the coil, blower wheel, and drain pan still need professional attention to prevent mold growth and airflow restriction. We recommend a full service visit once a year.",
    faqItems: [
      {
        question: "Can a mini-split heat as well as cool?",
        answer:
          "Yes. Most mini-splits are heat pumps and provide efficient heating and cooling. Cold-climate models maintain useful output at outdoor temperatures well below freezing.",
      },
      {
        question: "How many indoor units can one outdoor unit support?",
        answer:
          "Depending on the outdoor unit's capacity, it can support 2–8 indoor zones. We'll design the right configuration for your space and usage patterns.",
      },
      {
        question: "How disruptive is the installation process?",
        answer:
          "Installation is minimally invasive — it requires a small penetration through the wall for refrigerant lines and electrical. Most single-zone installs are completed in a single day.",
      },
      {
        question: "Are mini-splits more expensive to run than central systems?",
        answer:
          "Generally no. Mini-splits are highly efficient, and because they're zoned, you're only conditioning occupied spaces — which reduces total energy use compared to conditioning a whole house for one room.",
      },
      {
        question: "Can I add a mini-split to a home that already has central HVAC?",
        answer:
          "Yes. Mini-splits are frequently added to supplement central systems — covering additions, bonus rooms, or spaces the central system doesn't serve well.",
      },
    ],
    sidebarTitle: "Interested in Mini-Splits?",
    sidebarDescription:
      "We'll size the right system for your space and give you a clear installation quote.",
    ctaTitle: "Zoned Comfort, No Ductwork Required",
    ctaBody:
      "Mini-splits are the smart solution for additions, offices, and spaces that central HVAC doesn't reach. Get a quote today.",
    ctaButtonLabel: "Get a Mini-Split Quote",
    ctaHref: "/request-service",
  },
};

// Merge all page groups into the main export
Object.assign(servicePages, commercialPages, iaqPages, heatingPages, coolingPages, specialtyPages);

export default servicePages;
