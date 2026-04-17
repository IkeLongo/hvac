"use client";
import type { ServiceRequestFormData, StepProps } from "../types";

const SERVICE_LABELS: Record<string, string> = {
  "ac-repair": "AC Repair",
  "heating-repair": "Heating Repair",
  maintenance: "Maintenance / Tune-Up",
  "new-system": "New System Estimate",
  "thermostat-airflow": "Thermostat / Airflow Issue",
  "air-quality": "Indoor Air Quality",
  other: "Other",
};

const URGENCY_LABELS: Record<string, string> = {
  urgent: "Urgent — System Not Working",
  soon: "Soon — Not an Emergency",
  quote: "Just Getting a Quote",
  preventative: "Preventative Maintenance",
};

const PROPERTY_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
};

const SCHEDULE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  morning: "Morning (8am – 12pm)",
  afternoon: "Afternoon (12pm – 5pm)",
  evening: "Evening (5pm – 8pm)",
  flexible: "Flexible",
};

const YES_NO_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  "": "Not answered",
};

interface ReviewRowProps {
  label: string;
  value: string;
  onEdit: () => void;
  primaryColor: string;
  muted?: boolean;
}

function ReviewRow({ label, value, onEdit, primaryColor, muted }: ReviewRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-medium break-words ${
            muted ? "text-gray-400 italic" : "text-gray-800"
          }`}
        >
          {value || "—"}
        </p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-xs font-semibold hover:underline transition"
        style={{ color: primaryColor }}
      >
        Edit
      </button>
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-4">
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{title}</p>
      </div>
      <div className="px-4 divide-y divide-gray-100">{children}</div>
    </div>
  );
}

interface Step7ReviewProps extends StepProps {
  onGoToStep: (step: number) => void;
}

export function Step7Review({ data, primaryColor, onGoToStep }: Step7ReviewProps) {
  const fullAddress = [
    data.addressStreet,
    data.addressCity,
    data.addressState,
    data.addressZip,
  ]
    .filter(Boolean)
    .join(", ");

  const issueValue =
    data.issueType === "other"
      ? data.issueOther || "—"
      : data.issueType
        ? (data.issueType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
        : "—";

  const serviceSummary = SERVICE_LABELS[data.serviceCategory] ?? data.serviceCategory;
  const fullServiceSummary =
    data.serviceCategory === "other" && data.serviceCategoryOther
      ? `Other: ${data.serviceCategoryOther}`
      : serviceSummary;

  return (
    <div>
      <h2 className="text-2xl font-black text-gray-900 mb-1">Review your request</h2>
      <p className="text-gray-500 text-sm mb-6">
        Everything look right? Hit <strong>Submit Request</strong> when you&apos;re ready.
      </p>

      <ReviewSection title="Service">
        <ReviewRow label="Category" value={fullServiceSummary} onEdit={() => onGoToStep(0)} primaryColor={primaryColor} />
        <ReviewRow label="Urgency" value={URGENCY_LABELS[data.urgency] ?? data.urgency} onEdit={() => onGoToStep(1)} primaryColor={primaryColor} />
        <ReviewRow label="Property" value={PROPERTY_LABELS[data.propertyType] ?? data.propertyType} onEdit={() => onGoToStep(2)} primaryColor={primaryColor} />
      </ReviewSection>

      <ReviewSection title="Issue Details">
        <ReviewRow label="Issue" value={issueValue} onEdit={() => onGoToStep(3)} primaryColor={primaryColor} />
      </ReviewSection>

      <ReviewSection title="Scheduling">
        <ReviewRow label="Preference" value={SCHEDULE_LABELS[data.schedulingPreference] ?? data.schedulingPreference} onEdit={() => onGoToStep(4)} primaryColor={primaryColor} />
        {data.someoneHome && <ReviewRow label="Someone home" value={YES_NO_LABELS[data.someoneHome]} onEdit={() => onGoToStep(4)} primaryColor={primaryColor} muted={!data.someoneHome} />}
        {data.petsAtProperty && <ReviewRow label="Pets" value={YES_NO_LABELS[data.petsAtProperty]} onEdit={() => onGoToStep(4)} primaryColor={primaryColor} muted={!data.petsAtProperty} />}
        {data.hasGateCode && <ReviewRow label="Gate / access" value={YES_NO_LABELS[data.hasGateCode]} onEdit={() => onGoToStep(4)} primaryColor={primaryColor} muted={!data.hasGateCode} />}
      </ReviewSection>

      <ReviewSection title="Contact">
        <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`.trim()} onEdit={() => onGoToStep(5)} primaryColor={primaryColor} />
        <ReviewRow label="Phone" value={data.phone} onEdit={() => onGoToStep(5)} primaryColor={primaryColor} />
        <ReviewRow label="Address" value={fullAddress || "—"} onEdit={() => onGoToStep(5)} primaryColor={primaryColor} />
        {data.email && <ReviewRow label="Email" value={data.email} onEdit={() => onGoToStep(5)} primaryColor={primaryColor} />}
      </ReviewSection>

      <p className="text-xs text-gray-400 mt-2 text-center">
        By submitting, you agree to be contacted by our team to confirm your appointment.
      </p>
    </div>
  );
}
