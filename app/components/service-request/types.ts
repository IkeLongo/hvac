export type ServiceRequestFormData = {
  // Step 1 – Service Category
  serviceCategory: string;
  serviceCategoryOther: string;
  // Step 2 – Urgency
  urgency: string;
  // Step 3 – Property Type
  propertyType: string;
  // Step 4 – Issue Details
  issueType: string;
  issueOther: string;
  // Step 5 – Scheduling
  schedulingPreference: string;
  someoneHome: "" | "yes" | "no";
  petsAtProperty: "" | "yes" | "no";
  hasGateCode: "" | "yes" | "no";
  // Step 6 – Contact Info
  firstName: string;
  lastName: string;
  phone: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  email: string;
};

export const INITIAL_FORM_DATA: ServiceRequestFormData = {
  serviceCategory: "",
  serviceCategoryOther: "",
  urgency: "",
  propertyType: "",
  issueType: "",
  issueOther: "",
  schedulingPreference: "",
  someoneHome: "",
  petsAtProperty: "",
  hasGateCode: "",
  firstName: "",
  lastName: "",
  phone: "",
  addressStreet: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
  email: "",
};

/** Passed to every step component */
export interface StepProps {
  data: ServiceRequestFormData;
  onChange: (fields: Partial<ServiceRequestFormData>) => void;
  /** Validation errors for the fields on this step. */
  errors: Partial<Record<keyof ServiceRequestFormData, string>>;
  /** Call when a text input loses focus so it can be validated immediately. */
  onBlur: (field: keyof ServiceRequestFormData) => void;
  primaryColor: string;
  accentColor: string;
}
