import type { Company } from "@/data/companies";

interface WhyChooseUsProps {
  company: Company;
}

export function WhyChooseUs({ company }: WhyChooseUsProps) {
  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: company.primaryColor }}
          >
            Why {company.name}
          </p>
          <h2 className="text-3xl md:text-4xl font-black">Built on Trust. Driven by Results.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {company.whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="flex gap-5 p-7 border border-gray-100 rounded shadow-sm"
            >
              <div
                className="w-12 h-12 shrink-0 flex items-center justify-center rounded"
                style={{ backgroundColor: company.primaryColor, color: company.accentColor }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <h3 className="font-black text-lg mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
