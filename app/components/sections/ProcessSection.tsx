import type { Company } from "@/data/companies";

interface ProcessSectionProps {
  company: Company;
}

export function ProcessSection({ company }: ProcessSectionProps) {
  return (
    <section className="bg-gray-100 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-black">Simple, Stress-Free Service</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {company.process.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded border border-gray-200 p-7 shadow-sm flex flex-col gap-3"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-base font-black shrink-0"
                style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
              >
                {step.step}
              </div>
              <h3 className="font-black text-lg leading-snug">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
