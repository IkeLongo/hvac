// ─────────────────────────────────────────────────────────────────────────────
// Global service area data — shared across all companies.
// Companies reference areas by slug via company.serviceAreas: string[]
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceAreaFaq = {
  question: string;
  answer: string;
};

export type ServiceArea = {
  /** Display name (e.g. "San Antonio") */
  name: string;
  /** URL slug (e.g. "san-antonio") */
  slug: string;
  headline: string;
  subheadline: string;
  intro: string;
  areaContext: string;
  commonProblems: string;
  serviceHighlights: string;
  whyChooseUs: string[];
  nearbyAreas: string[];
  faqs: ServiceAreaFaq[];
  ctaHeading: string;
  ctaText: string;
  /** Override meta title. Omit to use the auto-generated fallback: "HVAC Service in {name} | {company.name}" */
  metaTitle?: string;
  /** Override meta description. Omit to use the auto-generated fallback. */
  metaDescription?: string;
  /** Hero image displayed near the top of the editorial layout. */
  heroImage?: { src: string; alt: string };
  /** One-sentence blurb displayed on the hub card. */
  blurb?: string;
};

export const SERVICE_AREAS: Record<string, ServiceArea> = {
  "san-antonio": {
    name: "San Antonio",
    slug: "san-antonio",
    headline: "HVAC Service Across San Antonio, TX",
    subheadline: "Your AC Shouldn't Quit When You Need It Most",
    intro:
      "When temperatures push past 100°F, a broken AC isn't an inconvenience — it's a health concern. We're based here in San Antonio and we keep our schedule open for same-day calls because we know how fast things can go sideways in a Texas summer.",
    areaContext:
      "San Antonio is a big city with a huge range of housing stock — 1950s bungalows on the South Side, 1980s brick homes in the northwest, new construction off 1604. We've worked in all of them. That variety means we don't assume anything when we show up. We diagnose what's actually wrong and explain it before we touch a thing.",
    commonProblems:
      "San Antonio summers push systems hard — and the ones that handled spring fine are often the same ones that quit in July once temperatures crest 100°F. Two-story homes are a recurring challenge; the upstairs can run 5–8 degrees warmer than the thermostat setting even when the system is working as designed. We also frequently see units that run constantly without ever reaching the set temperature, which almost always points to a refrigerant or airflow issue rather than a thermostat problem. Older R-22 systems are becoming increasingly difficult and expensive to service as the refrigerant grows harder to source — for those, we have honest conversations about whether continued repair still makes financial sense.",
    serviceHighlights:
      "For most repair calls across San Antonio, we have same-day availability — we deliberately keep open slots for urgent service rather than booking the schedule solid. Full system replacements typically move same-week from signed quote to completed installation. Our maintenance visits are built to actually extend equipment life: inspecting refrigerant levels, electrical connections, and coil condition rather than just swapping a filter and leaving. For homes where allergies or asthma are a concern, we also offer indoor air quality assessments and can recommend filtration upgrades that make a measurable difference.",
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
    blurb: "Same-day HVAC service across the Alamo City, rain or shine.",
    heroImage: {
      src: "/city/san-antonio-iconic.jpeg",
      alt: "Iconic view of San Antonio, Texas",
    },
  },

  boerne: {
    name: "Boerne",
    slug: "boerne",
    headline: "HVAC Repair & Maintenance in Boerne, TX",
    subheadline: "Hill Country Summers Are Beautiful — Until Your AC Goes Out",
    intro:
      "Boerne gets hot, but it also gets genuinely cold in winter — something newer residents sometimes underestimate. We service both sides of the equation: AC tune-ups before the heat arrives and heating checks before the first cold front rolls through in November.",
    areaContext:
      "Boerne's housing stock is diverse. There are limestone homes built in the 1970s along the older streets near Main Plaza, newer subdivisions off Herff Road and IH-10, and large properties on acreage outside of town. Each comes with different HVAC challenges — older homes with original ductwork, new builds with variable-speed equipment, and rural properties where the nearest tech might be 45 minutes away otherwise.",
    commonProblems:
      "One of the most consistent patterns we see in Boerne: systems that sat idle all winter and then struggled when first turned on in spring — usually because minor issues went unaddressed during the off season. Heating systems here also tend to short-cycle on cold nights, turning on and off every few minutes instead of running full cycles, which typically points to a calibration or airflow problem. Cedar and oak pollen season is harder on HVAC systems in this area than most homeowners realize; filters that last a month in summer can clog in two weeks during heavy pollen. And in many older Boerne homes, ductwork was sized for a smaller or different system and was never updated when the equipment was replaced, leading to pressure imbalances and uneven temperatures throughout the house.",
    serviceHighlights:
      "We service all major HVAC brands for both cooling and heating repairs in Boerne, with same-day or scheduled availability depending on urgency. Pre-season tune-ups are something we emphasize strongly here — getting the AC checked in late March and the heating system checked in October is consistently less expensive than emergency service after the season has already arrived. For additions, sunrooms, and detached structures, ductless mini-splits are typically the right fit, and we install and service them regularly throughout the Hill Country. When a system is approaching the end of its service life, we give you honest repair-versus-replace guidance with real numbers — no default toward either option.",
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
    blurb: "Trusted Hill Country heating and cooling for homes and ranches.",
    heroImage: {
      src: "/city/boerne-iconic.jpeg",
      alt: "Water tower in Boerne, Texas",
    },
  },

  helotes: {
    name: "Helotes",
    slug: "helotes",
    headline: "HVAC Service in Helotes, TX",
    subheadline: "Ranch Homes, New Builds, and Everything In Between",
    intro:
      "Helotes has a split personality when it comes to housing — there are established ranch-style homes that have been here for decades and newer subdivisions that have gone up in the last several years. The HVAC needs are completely different between them, and we're comfortable with both.",
    areaContext:
      "The older homes in Helotes often have ductwork that was sized for smaller systems, and over the decades that mismatch causes airflow problems and uneven cooling. The newer homes tend to have more efficient equipment but can run into setup and calibration issues, especially with smart thermostats and zoned systems. We diagnose before we recommend — we don't assume.",
    commonProblems:
      "Helotes homes present two distinct categories of HVAC problems that reflect the divide in its housing stock. In older homes, the most common issue is restrictive or leaking ductwork — ducts sized for an older era of equipment — causing weak airflow in back bedrooms and rooms at the far end of the duct run. Short-cycling is the other recurring complaint: systems turning on and off every few minutes instead of running full cycles, which usually indicates a refrigerant, airflow, or oversizing issue. Cedar pollen season amplifies filter clogging faster than most homeowners anticipate, compounding problems in systems that are already strained. In newer construction, heat pump systems sometimes aren't properly calibrated for the area's temperature range, which shows up as underperformance on the coldest or hottest days.",
    serviceHighlights:
      "Ductwork inspection, sealing, and rebalancing is among our most common services in Helotes — fixing airflow at the duct level often resolves comfort complaints that initially appear to be equipment problems. We handle AC and heating repair for all equipment types, from older single-stage units to newer variable-speed systems and heat pumps. Smart thermostat installation and troubleshooting is something we do regularly, particularly for homeowners integrating HVAC into broader smart home setups. For homes where air quality is a concern — allergens, dust, or stale air — we can assess the full system and recommend filtration upgrades that address the source.",
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
    blurb: "Fast AC and heating repair on San Antonio's west side.",
    heroImage: {
      src: "/city/helotes-iconic.webp",
      alt: "Iconic welcome sign to Old Town Helotes, Texas",
    },
  },

  "stone-oak": {
    name: "Stone Oak",
    slug: "stone-oak",
    headline: "HVAC Service in Stone Oak, TX",
    subheadline: "Modern Homes Need Equipment That Keeps Up",
    intro:
      "Stone Oak homes are newer, nicer, and often more complex from an HVAC standpoint. Variable-speed equipment, multi-zone systems, and smart home integrations are common here — and when something goes wrong, it takes a tech who actually knows those systems, not someone who's going to guess.",
    areaContext:
      "Most Stone Oak homes were built in the 2000s and 2010s during rapid growth along US-281. They're larger, often two stories, and frequently have zoned HVAC setups to manage the temperature difference between floors. That complexity means standard repairs aren't always straightforward. We've worked on these systems enough to diagnose them efficiently — including the quirks that come with two-stage and variable-speed equipment.",
    commonProblems:
      "Stone Oak homes tend to have more complex HVAC setups than average, and the problems they present reflect that complexity. Zoned systems are common here, and when one zone fails while others continue working, the issue usually traces back to a damper, zone controller, or zone board failure rather than the main equipment. Variable-speed systems throw fault codes that require manufacturer-specific diagnostic tools — a tech who isn't familiar with the platform will spend your time and money guessing. Two-story homes frequently develop an overworked upper zone in summer, often because the system was sized to average the load across both floors without accounting for the additional heat at the upper level. And with much of Stone Oak's housing stock approaching the 12–15 year mark, repair-versus-replace decisions are becoming an increasingly common part of the conversation.",
    serviceHighlights:
      "We diagnose and repair multi-zone and variable-speed systems regularly, including the fault codes and calibration issues specific to each manufacturer's platform. For full system replacements, we start with a proper load calculation to size equipment correctly for the actual square footage and layout — not just whatever's cheapest or fastest to install. Smart thermostat and app integration is part of our standard installation process, not an afterthought. For equipment still under manufacturer warranty, our seasonal tune-ups keep systems in specification so the coverage stays valid through the full warranty period.",
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
    blurb: "Modern multi-zone systems and premium HVAC service in north SA.",
    heroImage: {
      src: "/city/stone-oak-iconic.jpeg",
      alt: "Iconic view of Stone Oak, Texas",
    },
  },

  "leon-springs": {
    name: "Leon Springs",
    slug: "leon-springs",
    headline: "HVAC Service in Leon Springs, TX",
    subheadline: "Where the Hill Country Starts — We're Already Out There",
    intro:
      "Leon Springs sits at the edge of the Hill Country, and the homes out here range from established neighborhoods along the I-10 corridor to rural properties on acreage. We cover both. Our technicians run this area regularly and know what to expect from the equipment and the housing stock.",
    areaContext:
      "The Leon Springs area has seen significant growth over the past decade, with newer subdivisions going up alongside homes that have been here for thirty or forty years. That mix means we encounter everything from aging systems with original ductwork to high-efficiency equipment installed just a few years ago. The terrain also plays a role — properties with larger footprints and detached structures have different HVAC demands than a typical neighborhood home.",
    commonProblems:
      "Older properties along the Leon Springs corridor often have systems that have been through multiple repairs over many years — and at some point, the reliability issue outweighs any individual failing component. Detached garages, workshops, and outbuildings are common on larger properties out here, and most have no climate control at all, becoming effectively unusable from June through September. Refrigerant loss from fittings that have loosened over years of temperature cycling is a recurring finding, particularly on systems installed before tighter connection standards became standard practice. Newer high-efficiency systems installed by builders who prioritized upfront cost over proper commissioning occasionally underperform from the start — the equipment is fine, but the setup never matched what the system needed.",
    serviceHighlights:
      "For most repair calls in the Leon Springs corridor, we have same-day availability — we run this area regularly and don't treat it as an outlying route. Ductless mini-split installation for detached structures is something we do frequently out here; it's the cleanest solution for garages and outbuildings where new ductwork isn't practical. Refrigerant leak detection and proper repair means locating and fixing the source rather than just recharging — a consistent part of our work on this side of the city. For systems approaching end of life, we give you straight repair-versus-replace guidance with clear cost numbers so the decision is yours to make with full information.",
    whyChooseUs: [
      "We run Leon Springs on a regular schedule — it's not a long haul for us",
      "Comfortable with rural property setups including detached structures and larger homes",
      "25 years of experience with the equipment and housing types common in this corridor",
      "No pressure repair-vs-replace guidance — we give you the numbers and let you decide",
    ],
    nearbyAreas: ["Boerne", "Helotes", "Fair Oaks Ranch", "San Antonio", "Dominion area"],
    faqs: [
      {
        question: "We have a shop building on our property — can you add AC to that?",
        answer:
          "Yes. Ductless mini-splits are the most common solution for detached structures. We can size and install a system that handles the heat load without requiring any new ductwork.",
      },
      {
        question: "We're on a larger property — does that affect scheduling or pricing?",
        answer:
          "Not scheduling. Pricing depends on the work, not the property size. We'll give you an upfront quote based on what we find.",
      },
      {
        question: "A different tech recharged our system last summer but it's low again this year. What's going on?",
        answer:
          "Refrigerant doesn't disappear on its own — if it needs recharging again, there's a leak. A recharge without finding the leak is a temporary fix. We'll locate the source and repair it.",
      },
    ],
    ctaHeading: "Need HVAC Service in Leon Springs?",
    ctaText: "We cover this area regularly — call or book online to get on our schedule.",
    blurb: "Reliable HVAC for homes along the I-10 Hill Country corridor.",
  },

  "leon-valley": {
    name: "Leon Valley",
    slug: "leon-valley",
    headline: "HVAC Repair & Service in Leon Valley, TX",
    subheadline: "Straightforward Service for a No-Nonsense Neighborhood",
    intro:
      "Leon Valley homeowners don't need a sales pitch — they need a tech who shows up, figures out what's wrong, and fixes it without running up the bill. That's exactly how we work. We've been in plenty of the homes out here and we know what to look for.",
    areaContext:
      "Leon Valley's housing stock is largely from the 1960s through the 1980s — solid homes, but with HVAC systems that have been updated piecemeal over the decades. It's common to find a newer air handler paired with an older condenser, or a system that was replaced without addressing the ductwork. Those mismatches cause efficiency losses and comfort problems that are easy to overlook until something breaks.",
    commonProblems:
      "Leon Valley homes frequently have HVAC systems that were updated piecemeal over the decades — a newer air handler paired with an older condenser, or a replacement system installed without touching the ductwork. Those mismatches drive efficiency losses and comfort issues that are easy to overlook until something fails. Refrigerant loss from fittings that have loosened through years of thermal cycling is common in this era of housing stock, as are capacitor and contactor failures on condensers that have been running for 10–15 years — inexpensive repairs when caught early, costly failures when they happen on a hot July afternoon. Ductwork that was never properly sized or sealed after a system replacement is a consistent underlying issue, contributing to uneven temperatures and utility bills that don't match what the equipment should be producing.",
    serviceHighlights:
      "AC and heating repair with same-day availability covers most calls in Leon Valley — we know the housing stock and keep parts for the equipment we see most regularly. Refrigerant leak detection and proper repair means we find the source and fix it, not just recharge and return in twelve months. Ductwork evaluation and targeted repairs address the efficiency losses that frequently go unnoticed in homes where the system was swapped but the ducts were left unchanged. And when a system has reached the point where another repair doesn't make financial sense, we give you honest replacement guidance with financing options available.",
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
    blurb: "Straight-shooting HVAC repair for a no-nonsense neighborhood.",
    heroImage: {
      src: "/city/leon-valley-iconic.webp",
      alt: "Iconic view of Leon Valley, Texas",
    },
  },

  "live-oak": {
    name: "Live Oak",
    slug: "live-oak",
    headline: "HVAC Service in Live Oak, TX",
    subheadline: "Reliable Heating & Cooling Near Randolph and Beyond",
    intro:
      "Live Oak sits just northeast of San Antonio with a mix of long-established neighborhoods and areas that have grown up around Randolph AFB. It's a community that values reliability — people here have schedules to keep and don't have time for a HVAC company that doesn't show up when they say they will. We do.",
    areaContext:
      "A significant portion of Live Oak's housing was built in the 1970s and 1980s, and those homes have seen multiple HVAC system changes over the years. Humidity is a consistent issue in this part of the metro — the area sits lower and tends to trap moisture, which puts extra load on AC systems and contributes to air quality problems if equipment isn't maintained. We factor that in when we diagnose.",
    commonProblems:
      "High indoor humidity is the defining HVAC challenge in Live Oak — the area sits lower in the metro and consistently traps more moisture than higher-elevation neighborhoods. AC systems that are even slightly oversized will short-cycle and never run long enough to dehumidify properly, leaving the house feeling clammy even when the thermostat reads correctly. Older homes here also frequently have ductwork routed through unconditioned attic space, which dramatically reduces system efficiency in summer when attic temperatures can exceed 150 degrees. Air quality issues — musty odors from vents, visible mold near registers — are closely connected to chronic humidity and tend to develop in systems that have gone without maintenance or have filtration gaps.",
    serviceHighlights:
      "AC repair and full system replacement is the core of our work in Live Oak, but humidity control is a consistent part of the conversation here. We install and service standalone dehumidifiers as well as ventilation improvements that address the root cause of moisture buildup rather than just managing the symptoms. For homes with ductwork running through attic space, we evaluate insulation and sealing to reduce the efficiency losses that compound in summer. Air quality testing and filtration upgrades are available for homeowners dealing with musty odors, allergens, or air quality concerns connected to their HVAC system.",
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
    blurb: "Dependable heating and cooling near Randolph and northeast SA.",
    heroImage: {
      src: "/city/live-oak-iconic.jpeg",
      alt: "Iconic view of Live Oak, Texas",
    },
  },

  bulverde: {
    name: "Bulverde",
    slug: "bulverde",
    headline: "HVAC Service in Bulverde, TX",
    subheadline: "More Space, More Shade — and AC Systems That Still Work Hard",
    intro:
      "Bulverde has grown significantly over the past decade and now has a real mix of established rural properties and newer neighborhood builds. The Hill Country setting means cooler nights than San Antonio proper, but summers are still brutal. We service all of it — from older homes with systems that haven't been touched in years to new construction with the latest equipment.",
    areaContext:
      "Bulverde sits in Comal County, just north of Bexar County, and many homes here are on larger lots or acreage. That affects HVAC in a few ways: more square footage to condition, detached structures that need coverage, and sometimes older systems that were sized for a smaller original footprint before additions were made. We also see a lot of homes where the previous service history is thin or undocumented.",
    commonProblems:
      "Bulverde properties often have systems sized for the original footprint that are now being asked to condition space added over the years — sunrooms, garage apartments, finished bonus rooms. That undersizing causes the system to run hard without ever catching up, shortening equipment life and producing inconsistent comfort. Detached structures are common on larger lots here, and most have no climate control despite being in regular use through the summer. Ductwork in homes that have seen multiple renovations frequently develops leaks through years of thermal expansion and contraction, quietly reducing efficiency and creating uneven temperatures across the house. Heat pumps — increasingly common in newer Bulverde builds — sometimes don't transition properly to auxiliary heat when temperatures drop significantly, leaving parts of the home undertreated.",
    serviceHighlights:
      "Full system diagnostics and repair covers all brands and system types we encounter in Bulverde — from older single-stage units to newer variable-speed equipment and heat pumps. Ductless mini-split installation for detached structures and additions is one of our most frequent projects in this area; no new ductwork is required, and we size each unit for the specific space it needs to condition. Ductwork inspection, sealing, and rebalancing addresses the efficiency losses that accumulate in homes that have grown beyond their original layout. For properties where the system was sized for a smaller footprint, we provide load calculations and written proposals for right-sized replacements.",
    whyChooseUs: [
      "We cover Bulverde and Comal County on a regular basis",
      "Experience with rural and acreage properties including multi-structure setups",
      "Written quote before work starts — no verbal estimates that balloon later",
      "NATE-certified technicians familiar with heat pump and variable-speed systems",
    ],
    nearbyAreas: ["Spring Branch", "Canyon Lake area", "Stone Oak", "Boerne", "San Antonio"],
    faqs: [
      {
        question: "Our house has had two additions over the years. Could that be why the AC struggles?",
        answer:
          "Very likely. If the system was sized for the original footprint, added square footage will push it beyond its capacity. We can do a load calculation to see whether resizing makes sense.",
      },
      {
        question: "We have a casita on our property with no AC — what are the options?",
        answer:
          "Ductless mini-splits are the standard solution. No ductwork needed, and we can install a unit that's properly sized for the space.",
      },
      {
        question: "Is there a travel charge for Bulverde service calls?",
        answer:
          "No separate travel charge. Pricing is based on the work — we'll give you a flat diagnostic fee upfront and a full quote before starting any repair.",
      },
    ],
    ctaHeading: "Schedule HVAC Service in Bulverde, TX",
    ctaText: "Call or book online — we run regular routes through Bulverde and can get you on the schedule.",
    blurb: "Rural and residential HVAC service deep in the Hill Country.",
  },

  "spring-branch": {
    name: "Spring Branch",
    slug: "spring-branch",
    headline: "HVAC Service in Spring Branch, TX",
    subheadline: "Hill Country Living — Without Sacrificing Comfort",
    intro:
      "Spring Branch sits between Boerne and Canyon Lake, drawing homeowners who want acreage, privacy, and the Hill Country lifestyle. That often means older homes, custom builds, or rural properties with unique HVAC setups. We know this area and we service it regularly.",
    areaContext:
      "Homes in the Spring Branch area vary widely — from modest older houses to larger custom builds on significant acreage. Many properties have detached structures, well water, or other rural characteristics that affect how HVAC equipment is installed and maintained. We're experienced with all of it.",
    commonProblems:
      "Many homes in the Spring Branch area have had years — sometimes decades — without professional HVAC maintenance, and deferred service tends to compound: the small issue that would have been a minor repair becomes an emergency breakdown when the system gets stressed in summer. Detached structures are common on rural properties here, and most have no climate control despite being used as workshops, guest quarters, or storage that needs to stay conditioned. Systems sized for the original home often struggle with additions or renovations that increased the footprint without a corresponding HVAC upgrade. Heat pump systems, common in the region's newer construction, occasionally aren't calibrated for the temperature extremes this part of the Hill Country can see in January.",
    serviceHighlights:
      "Residential and rural HVAC repair and installation covers the full range of what we encounter in Spring Branch — from aging systems in long-established homes to newer equipment in custom builds on acreage. Ductless mini-split solutions for detached buildings are something we install regularly out here; they're the right answer for structures where running new ductwork doesn't make sense. Preventative maintenance is especially valuable given the service history gaps that are common in this area — a thorough tune-up often surfaces issues that would otherwise become emergency calls. For aging systems, we give you honest repair-versus-replace guidance based on actual cost numbers, not a default toward either option.",
    whyChooseUs: [
      "Regular service routes in the Spring Branch corridor",
      "Experienced with rural and multi-structure property setups",
      "Upfront pricing before work begins — no surprises",
      "Licensed, insured, and NATE-certified technicians",
    ],
    nearbyAreas: ["Boerne", "Bulverde", "Canyon Lake", "Helotes", "San Antonio"],
    faqs: [
      {
        question: "Is Spring Branch too far for your team to service regularly?",
        answer:
          "Not at all. We run routes in this area and can typically schedule same-day or next-day for most service calls.",
      },
      {
        question: "We have well water — does that affect our HVAC service?",
        answer:
          "It can affect water-cooled systems or condensate drainage in rare cases, but most standard HVAC equipment is unaffected. We'll note it during the diagnostic.",
      },
    ],
    ctaHeading: "Schedule HVAC Service in Spring Branch",
    ctaText: "Call or book online — we're out in this area regularly and can get you on the schedule.",
    blurb: "Hill Country comfort for custom homes and rural properties.",
    heroImage: {
      src: "/city/spring-branch-iconic.avif",
      alt: "Iconic view of Spring Branch, Texas",
    },
  },

  "shavano-park": {
    name: "Shavano Park",
    slug: "shavano-park",
    headline: "HVAC Service in Shavano Park, TX",
    subheadline: "Premium Homes Deserve Premium HVAC Service",
    intro:
      "Shavano Park homes are large, well-built, and demand HVAC systems that perform reliably year-round. We service this area with the same precision and professionalism that homeowners here expect.",
    areaContext:
      "Shavano Park is a small municipality adjacent to San Antonio with predominantly larger homes on generous lots. The homes here are typically well-maintained and equipped with higher-end HVAC systems, including multi-zone setups and smart thermostats. When something goes wrong, the stakes are higher and the repair requires a tech who knows what they're doing.",
    commonProblems:
      "Multi-zone HVAC systems are common in Shavano Park, and when one zone fails while others continue to function normally, the issue usually traces back to a zone board, damper motor, or controller component rather than the primary equipment. Premium systems with advanced control boards throw fault codes that require brand-specific diagnostic tools; a tech without that familiarity will spend time and money guessing. Systems in this area are increasingly approaching the 12–15 year mark from when many homes were last fully updated, and replacement decisions here carry more at stake than a typical repair call. Smart home integration issues — thermostats communicating incorrectly with zoning hardware, or app connections that intermittently drop — are a surprisingly common reason for service calls on newer installs.",
    serviceHighlights:
      "Multi-zone and high-efficiency system repair is a consistent strength we bring to Shavano Park — we're familiar with the equipment brands common in this area and carry the tools to diagnose them accurately. For full system replacements, we do proper load calculations, handle permits and inspections, and present equipment options across the efficiency and feature range rather than defaulting to whatever is cheapest or fastest to install. Smart thermostat and home automation integration is part of our installation process, and we troubleshoot existing integrations when they stop working correctly. For equipment still under manufacturer warranty, our scheduled maintenance keeps systems in specification so coverage stays valid.",
    whyChooseUs: [
      "Experienced with premium HVAC brands and configurations",
      "Punctual and professional — we respect your time and your property",
      "Honest assessments — we don't recommend what you don't need",
      "Proper permitting and code compliance on every installation",
    ],
    nearbyAreas: ["Stone Oak", "Hollywood Park", "San Antonio", "Leon Springs", "Boerne"],
    faqs: [
      {
        question: "Our system is high-end — do you have experience with premium brands?",
        answer:
          "Yes. We service all major HVAC brands including Trane, Carrier, Lennox, and others common in larger homes. We carry the diagnostic tools needed for advanced systems.",
      },
      {
        question: "We're considering a full system replacement — what does that involve?",
        answer:
          "We start with a proper load calculation to size the equipment correctly, then provide a written proposal with equipment options, pricing, and timeline. All permits and inspections are handled.",
      },
    ],
    ctaHeading: "HVAC Service in Shavano Park",
    ctaText: "Call or book online for prompt, professional service.",
    blurb: "Precision HVAC service for premium homes in Shavano Park.",
  },

  "hollywood-park": {
    name: "Hollywood Park",
    slug: "hollywood-park",
    headline: "HVAC Service in Hollywood Park, TX",
    subheadline: "Dependable Heating and Cooling for Your Home",
    intro:
      "Hollywood Park is a small residential community north of San Antonio with a quiet, established feel. Homes here range from mid-century builds to more recent construction, and we're familiar with the full range of HVAC equipment you'll find across those eras.",
    areaContext:
      "The community is surrounded by San Antonio and shares many of its HVAC challenges — summer heat, occasional cold snaps, and the humidity that comes with the region. Homes built in different decades have very different ductwork and equipment characteristics, and we adapt our approach accordingly.",
    commonProblems:
      "Hollywood Park's housing spans several decades, and older homes in the community frequently have aging ductwork that was never updated when the equipment was replaced — contributing to efficiency losses and uneven cooling that residents often accept as normal. Refrigerant leaks from systems that have been through years of seasonal temperature cycling are common in this era of housing, as are component failures — capacitors, contactors, blower motors — that are inexpensive to catch early but cause complete system failures when ignored through peak season. Older equipment reaching the end of its serviceable life also accounts for a regular share of calls here, particularly for systems that have accumulated multiple repairs over the past few years.",
    serviceHighlights:
      "AC and heating repair for all equipment types and brands is the core of what we offer in Hollywood Park, with same-day availability for most calls. Ductwork evaluation and targeted repairs address the efficiency issues that are common in homes where the ducts weren't updated when the system was replaced. For systems that have reached the point where replacement is the right call, we handle the full scope — load calculations, equipment selection, permitting, and installation. Preventative maintenance visits are structured to actually surface developing issues rather than simply document the current condition.",
    whyChooseUs: [
      "Familiar with the equipment common in this area's housing stock",
      "Upfront written quotes before work begins",
      "We show up in the agreed service window",
      "Licensed, insured, and committed to doing the job right",
    ],
    nearbyAreas: ["Shavano Park", "Stone Oak", "San Antonio", "Bulverde", "Leon Springs"],
    faqs: [
      {
        question: "How quickly can you typically respond in Hollywood Park?",
        answer:
          "For most repair calls, we have same-day or next-day availability. Peak summer weeks can be busier, so calling early in the day gets you the fastest slot.",
      },
      {
        question: "My system is 20 years old but still works — should I replace it?",
        answer:
          "Not necessarily just because of age. The decision depends on repair history, repair cost vs. replacement cost, and efficiency gains. We'll give you the numbers and let you decide.",
      },
    ],
    ctaHeading: "HVAC Service in Hollywood Park",
    ctaText: "Call or book online — we serve this area regularly.",
    blurb: "Reliable HVAC for an established north San Antonio community.",
  },

  "universal-city": {
    name: "Universal City",
    slug: "universal-city",
    headline: "HVAC Service in Universal City, TX",
    subheadline: "Fast, Reliable HVAC for the Randolph Corridor",
    intro:
      "Universal City sits in the heart of the northeast San Antonio metro near Randolph AFB. It's a community that keeps busy, and homeowners here don't have patience for a HVAC company with a four-hour arrival window. We give tight windows and keep them.",
    areaContext:
      "Much of Universal City's housing was built in the 1970s through 1990s. These homes have seen multiple system replacements and are subject to the same humidity challenges that affect the broader northeast San Antonio area. We diagnose humidity and air quality issues as part of every service call.",
    commonProblems:
      "High indoor humidity is a consistent issue in Universal City — the northeast metro tends to trap moisture, and AC systems that are even slightly oversized short-cycle and don't run long enough to dehumidify the air properly. The result is a house that feels damp or clammy despite reaching the set temperature. Older homes here frequently have ductwork routed through unconditioned attic space, creating significant efficiency losses in summer when attic temperatures are extreme. Capacitors, contactors, and blower motors are the most commonly failing components on aging equipment in this area — inexpensive repairs when caught during a maintenance visit, but capable of causing a full system shutdown when they fail in August. Air quality complaints — dust accumulation, musty odors — are closely tied to the humidity and filter maintenance patterns here.",
    serviceHighlights:
      "AC and heating repair with same-day availability covers most calls in Universal City — we know the area, keep common parts stocked, and give tight arrival windows rather than a four-hour range. Humidity control is a meaningful part of our work here: we install standalone dehumidifiers and implement ventilation improvements that address the root cause of excess indoor moisture rather than just masking it. Ductwork evaluation for attic-run systems is something we include in any efficiency complaint diagnosis, since the losses from poorly insulated attic ductwork are often dramatic and fixable. Air quality assessments and filtration upgrades are available for homeowners dealing with persistent dust, allergens, or musty odors from their HVAC system.",
    whyChooseUs: [
      "Tight arrival windows — we don't ask you to clear your whole day",
      "We address root causes, not just symptoms",
      "Straightforward pricing from booking through invoice",
      "25 years in the San Antonio area means we've seen every version of this problem",
    ],
    nearbyAreas: ["Converse", "Live Oak", "Selma", "Schertz", "San Antonio"],
    faqs: [
      {
        question: "Is humidity a common problem in Universal City?",
        answer:
          "Yes. The northeast metro tends to trap moisture, and oversized AC systems short-cycle and don't run long enough to dehumidify properly. We can assess and recommend the right solution.",
      },
      {
        question: "How fast can you get out here for an emergency?",
        answer:
          "For same-day emergency calls, response times are typically 2–4 hours depending on the day. Calling early in the morning gives you the best chance at a morning arrival.",
      },
    ],
    ctaHeading: "HVAC Service in Universal City",
    ctaText: "Call or book online — we serve the Randolph corridor regularly.",
    blurb: "Tight arrival windows and same-day repairs near Randolph AFB.",
  },

  converse: {
    name: "Converse",
    slug: "converse",
    headline: "HVAC Service in Converse, TX",
    subheadline: "Honest HVAC Work for a Working-Class Community",
    intro:
      "Converse homeowners want straightforward answers and fair prices — not upsells or scare tactics. That's exactly how we operate. We've worked in plenty of homes out here and we give it to you straight every time.",
    areaContext:
      "Converse is predominantly residential with a mix of older and newer construction. Homes in the area typically have central split systems, and the most common issues involve aging capacitors, refrigerant leaks, and ductwork that was never properly sized or sealed.",
    commonProblems:
      "Converse homes are predominantly residential with central split systems, and the most common issues center on components that are wearing out — capacitors and contactors on condensers in the 10–15 year range, refrigerant leaks from fittings that have loosened after years of thermal cycling, and ductwork that was never properly sized or sealed. These aren't dramatic sudden failures; they're the kind of gradual degradation that chips away at performance until one hot afternoon the system simply stops. Systems that have been patched multiple times over the years eventually reach a point where another repair doesn't make economic sense, and we give you a direct answer when that line has been crossed rather than recommending yet another fix.",
    serviceHighlights:
      "AC and heating repair with same-day availability covers most calls in Converse — we know the housing stock and keep parts for the equipment we encounter most frequently. Refrigerant leak detection and proper repair means we locate and fix the source, not just recharge and come back next summer. Ductwork evaluation and sealing targets the efficiency losses that develop in homes where the ducts were never properly installed or have degraded over time. For systems at the end of their service life, we give honest repair-versus-replace guidance with clear cost comparisons and financing available for replacements.",
    whyChooseUs: [
      "We tell you what we find, not what generates the biggest invoice",
      "Upfront pricing before work begins — the price you approve is what you pay",
      "We show up in the agreed window",
      "Financing available for replacements",
    ],
    nearbyAreas: ["Universal City", "Live Oak", "Selma", "Schertz", "San Antonio"],
    faqs: [
      {
        question: "My AC was recharged last summer but needs it again. What's going on?",
        answer:
          "Refrigerant doesn't disappear — if it's low again, there's a leak. We'll find it and fix it properly instead of just recharging.",
      },
      {
        question: "Is a 12-year-old system worth repairing?",
        answer:
          "Usually yes, unless the repair is major (like a compressor). We'll give you the honest numbers and let you decide.",
      },
    ],
    ctaHeading: "HVAC Service in Converse",
    ctaText: "Call or book online — straight answers and fair prices.",
    blurb: "Honest pricing and fast turnaround for Converse homeowners.",
  },

  schertz: {
    name: "Schertz",
    slug: "schertz",
    headline: "HVAC Service in Schertz, TX",
    subheadline: "Reliable HVAC for One of San Antonio's Fastest-Growing Communities",
    intro:
      "Schertz has grown rapidly over the past decade, and with that growth has come a wide range of HVAC equipment — from brand-new high-efficiency systems in new construction to aging units in older established neighborhoods. We service all of it.",
    areaContext:
      "Schertz straddles Guadalupe and Comal Counties and is part of the broader northeast San Antonio metro. New construction dominates much of the city, but older neighborhoods along the I-35 corridor have equipment that's seen multiple seasons and multiple repairs. We're familiar with both ends of the spectrum.",
    commonProblems:
      "Schertz's rapid growth has produced a genuinely unusual HVAC landscape. New construction equipment is sometimes not commissioned correctly from the start — refrigerant charge, airflow settings, or thermostat calibration that was never set up properly and has underperformed since installation. On the other end, established neighborhoods along the I-35 corridor have systems that have been through multiple repairs and are approaching the end of reliable service life. Multi-story homes in both new and established construction present zoning and temperature balance challenges, with upper floors consistently warmer in summer and requiring more from the system. The rapid population growth has also created demand for same-day service that stretches local providers during peak season.",
    serviceHighlights:
      "AC and heating repair for all system types and ages covers the full range of what we encounter in Schertz, from legacy equipment in older neighborhoods to high-efficiency systems in new construction. Commissioning checks for new construction give homeowners a way to verify their system was set up correctly — refrigerant charge, airflow, and thermostat calibration included. Multi-zone system diagnostics and repair addresses the temperature balance issues common in two-story construction throughout the area. Preventative maintenance plans give homeowners a proactive structure for extending equipment life and avoiding the reactive, emergency-driven repairs that tend to happen at the worst possible times.",
    whyChooseUs: [
      "Familiar with both new construction and legacy systems in this corridor",
      "Upfront written quotes before work begins",
      "Fast response times for a growing service area",
      "Licensed, insured, and committed to quality",
    ],
    nearbyAreas: ["Selma", "Converse", "Universal City", "New Braunfels", "San Antonio"],
    faqs: [
      {
        question: "Our new home's AC doesn't seem to cool as well as it should. Is that normal?",
        answer:
          "Not necessarily. New construction systems sometimes aren't commissioned correctly — the refrigerant charge, airflow, or thermostat settings may be off. We can check and correct it.",
      },
      {
        question: "Do you service Schertz on a regular basis?",
        answer:
          "Yes. We run regular routes in this area and offer same-day or next-day availability for most service calls.",
      },
    ],
    ctaHeading: "HVAC Service in Schertz",
    ctaText: "Call or book online — serving Schertz and the Guadalupe corridor.",
    blurb: "Full HVAC coverage across one of San Antonio's fastest-growing cities.",
  },

  "new-braunfels": {
    name: "New Braunfels",
    slug: "new-braunfels",
    headline: "HVAC Service in New Braunfels, TX",
    subheadline: "Hill Country Charm — Year-Round Comfort",
    intro:
      "New Braunfels is one of the fastest-growing cities in Texas, and its HVAC needs reflect that diversity — from historic homes near Gruene to massive new subdivisions along I-35. We cover the full range.",
    areaContext:
      "New Braunfels has a unique mix of older homes near the Comal and Guadalupe rivers, established mid-century neighborhoods, and sprawling new construction corridors. The Hill Country climate means warm summers and genuinely cold winter nights, requiring systems that handle both extremes well.",
    commonProblems:
      "New Braunfels has a genuine diversity of HVAC challenges driven by its housing stock. Older homes near the Comal and Guadalupe rivers often have aging ductwork and equipment that has accumulated multiple repairs and is approaching end of serviceable life. Newer construction along the I-35 growth corridor presents the opposite challenge: high-efficiency equipment that sometimes wasn't commissioned correctly and has underperformed since the day it was installed. Heat pumps, which are common throughout the region, occasionally aren't properly calibrated for the cold snaps Central Texas sees in January, leaving homes undertreated when it matters most. And during peak summer, demand for same-day service routinely exceeds what providers in the area can absorb — making an established relationship with a reliable team worth having before you need it urgently.",
    serviceHighlights:
      "AC and heating repair for residential and light commercial properties covers the core of what we do in New Braunfels. Heat pump service and calibration is a specific area of focus given how common heat pump installations have become in newer construction throughout the region. New construction commissioning checks give homeowners a way to verify that their system was set up correctly after installation — refrigerant charge, airflow, and thermostat calibration included. Pre-season preventative maintenance before summer and winter keeps equipment performing at its designed capacity during the periods when the demands on it are highest.",
    whyChooseUs: [
      "Experience across both historic homes and new construction in the area",
      "Upfront pricing — the price you're given is the price you pay",
      "Available for same-day calls during peak season",
      "Licensed, insured, and NATE-certified",
    ],
    nearbyAreas: ["Schertz", "Boerne", "San Marcos", "Kyle", "San Antonio"],
    faqs: [
      {
        question: "Do you service both older homes and new construction in New Braunfels?",
        answer:
          "Yes. We work across the full spectrum — from older homes with original ductwork to brand-new builds with variable-speed systems.",
      },
      {
        question: "Can you service our heat pump?",
        answer:
          "Absolutely. Heat pumps are common in this region and we service all major brands for both heating and cooling modes.",
      },
    ],
    ctaHeading: "HVAC Service in New Braunfels",
    ctaText: "Call or book online — serving New Braunfels and the Comal corridor.",
    blurb: "Expert heating and cooling from the Comal River to I-35.",
  },

  seguin: {
    name: "Seguin",
    slug: "seguin",
    headline: "HVAC Service in Seguin, TX",
    subheadline: "Dependable HVAC for Guadalupe County",
    intro:
      "Seguin is a growing community in Guadalupe County, and homeowners here expect dependable service at fair prices. We service this area regularly and know what to expect from the housing stock and equipment you'll find here.",
    areaContext:
      "Seguin has a mix of older established homes and newer growth corridors. The climate mirrors the rest of Central Texas — hot summers, unpredictable winters, and the seasonal pollen that affects filters and air quality throughout the year.",
    commonProblems:
      "Seguin's HVAC challenges reflect the familiar Central Texas pattern: equipment aging in established neighborhoods after years of hard seasonal use, compounded by maintenance that was deferred longer than it should have been. Refrigerant issues are common in systems that have gone through many seasonal cycles without a professional service visit — slow leaks that weren't caught early become more significant problems over time. Cedar and oak pollen season accelerates filter clogging throughout the region, and in Seguin that means systems already working hard in late spring can be choked by airflow restriction before summer even fully arrives. Systems undersized for the Texas heat load are a consistent finding on older properties, where equipment was specified conservatively and the demands of the climate have only increased over time.",
    serviceHighlights:
      "AC and heating repair with same-day availability covers most calls in Seguin — we run regular routes in this area and don't treat it as an outlying stop on a long day. Refrigerant leak detection and proper repair is a consistent part of our work here: we find the source and fix it rather than recharging and waiting for the problem to return. Preventative maintenance before peak seasons is especially valuable for homeowners in Seguin who want to avoid the pattern of deferred service leading to emergency breakdowns in the hottest part of summer. For systems that have reached the decision point, we give straight repair-versus-replace guidance backed by clear cost comparisons.",
    whyChooseUs: [
      "Regular service routes in Seguin and Guadalupe County",
      "Upfront written pricing before work begins",
      "Experience with the full range of residential HVAC equipment",
      "Licensed, insured, and focused on doing the job right",
    ],
    nearbyAreas: ["New Braunfels", "Schertz", "Luling", "Gonzales", "San Antonio"],
    faqs: [
      {
        question: "Do you service Seguin on a regular basis or is it a stretch?",
        answer:
          "We run regular routes in this area and typically offer same-day or next-day availability.",
      },
      {
        question: "My system is older — is it worth repairing or should I replace?",
        answer:
          "It depends on the specific repair and the system's history. We'll give you the honest cost comparison and let you make the call.",
      },
    ],
    ctaHeading: "HVAC Service in Seguin",
    ctaText: "Call or book online — serving Seguin and Guadalupe County.",
    blurb: "Dependable HVAC service for Seguin and Guadalupe County.",
  },
};
