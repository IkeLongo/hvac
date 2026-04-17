/**
 * Centralized validation logic for the Service Request form.
 * Pure TypeScript — no UI or React dependencies.
 * Safe to import from both client components and API route handlers.
 */
import type { ServiceRequestFormData } from "@/app/components/service-request/types";
import { isValidPhoneNumber, isValidEmail } from "@/lib/utils/validation";

export type ValidationErrors = Partial<Record<keyof ServiceRequestFormData, string>>;

/** Which form fields are validated on each step (0-indexed). */
export const STEP_FIELDS: Record<number, (keyof ServiceRequestFormData)[]> = {
  0: ["serviceCategory", "serviceCategoryOther"],
  1: ["urgency"],
  2: ["propertyType"],
  3: ["issueType", "issueOther"],
  4: ["schedulingPreference"],
  5: ["firstName", "lastName", "phone", "addressStreet", "addressCity", "email"],
  6: [],
};

/**
 * Validate a single field in the context of the full form data.
 * Returns an error string, or `undefined` if valid.
 */
export function validateField(
  field: keyof ServiceRequestFormData,
  data: ServiceRequestFormData,
): string | undefined {
  const val = String(data[field] ?? "").trim();

  switch (field) {
    case "serviceCategory":
      return val ? undefined : "Please select a service type.";

    case "serviceCategoryOther":
      return data.serviceCategory === "other" && !val
        ? "Please describe the service you need."
        : undefined;

    case "urgency":
      return val ? undefined : "Please select how soon you need service.";

    case "propertyType":
      return val ? undefined : "Please select a property type.";

    case "issueType":
      return val ? undefined : "Please select the issue you're experiencing.";

    case "issueOther":
      return data.issueType === "other" && !val
        ? "Please describe the issue."
        : undefined;

    case "schedulingPreference":
      return val ? undefined : "Please choose a scheduling preference.";

    case "firstName":
      return val ? undefined : "First name is required.";

    case "lastName":
      return val ? undefined : "Last name is required.";

    case "phone":
      if (!val) return "Phone number is required.";
      if (!isValidPhoneNumber(val)) return "Enter a valid 10-digit phone number.";
      return undefined;

    case "addressStreet":
      return val ? undefined : "Street address is required.";

    case "addressCity":
      return val ? undefined : "City is required.";

    case "email":
      // Optional — only validate format if a value was entered.
      if (!val) return undefined;
      return isValidEmail(val) ? undefined : "Enter a valid email address.";

    default:
      return undefined;
  }
}

/**
 * Validate all fields that belong to a given step.
 * Returns an object mapping field names to error strings.
 * An empty object means the step is valid.
 */
export function validateStep(
  step: number,
  data: ServiceRequestFormData,
): ValidationErrors {
  const fields = STEP_FIELDS[step] ?? [];
  const errors: ValidationErrors = {};
  for (const field of fields) {
    const err = validateField(field, data);
    if (err) errors[field] = err;
  }
  return errors;
}

/** Convenience: true if the errors object contains any messages. */
export function stepHasErrors(errors: ValidationErrors): boolean {
  return Object.values(errors).some(Boolean);
}
