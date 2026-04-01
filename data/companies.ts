export type Company = {
  name: string;
  phone: string;
  city: string;
  services: string[];
  primaryColor: string;
  accentColor: string;
  logo: string;
};

export const companies: Record<string, Company> = {
  "alamo-air": {
    name: "RiverSide HVAC Solutions",
    phone: "(210) 730-6232",
    city: "San Antonio",
    services: ["AC Repair", "Installation", "Maintenance", "System Inspection"],
    primaryColor: "#0c2244",
    accentColor: "#bfee3c",
    logo: "/riverside-hvac-logo.png",
  },
  "cool-breeze": {
    name: "Cool Breeze HVAC",
    phone: "(210) 730-6232",
    city: "San Antonio",
    services: ["Emergency Repair", "AC Tune-Ups", "Duct Cleaning"],
    primaryColor: "#0c2244",
    accentColor: "#bfee3c",
    logo: "/logos/cool-breeze.png",
  },
};
