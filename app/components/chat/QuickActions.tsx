"use client";

type QuickActionsProps = {
  onActionSelect: (text: string) => void;
  disabled?: boolean;
};

const ACTIONS = [
  "How do I book a service appointment?",
  "What does AC repair cost?",
  "Do you offer emergency HVAC repair?",
  "Can I get a free estimate for a new system?",
];

export function QuickActions({
  onActionSelect,
  disabled = false,
}: QuickActionsProps) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {ACTIONS.map((action) => (
        <button
          key={action}
          type="button"
          disabled={disabled}
          onClick={() => onActionSelect(action)}
          className="rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {action}
        </button>
      ))}
    </div>
  );
}