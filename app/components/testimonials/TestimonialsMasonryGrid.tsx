"use client";

import { cn } from "@/lib/utils";
import { FaQuoteLeft } from "react-icons/fa";

export function TestimonialsMasonryGrid() {
  const first = testimonials.slice(0, 3);
  const second = testimonials.slice(3, 6);
  const third = testimonials.slice(6, 9);
  const fourth = testimonials.slice(9, 12);

  const grid = [first, second, third, fourth];
  return (
    <div className="">
      {/* <h2
        id="reviews-title"
        className={cn(
          "text-3xl font-medium tracking-tight text-neutral-900 sm:text-center dark:text-white",
        )}
      >
        Loved by thousands of people
      </h2>
      <p
        className={cn(
          "mt-2 text-lg text-neutral-600 sm:text-center dark:text-neutral-200",
        )}
      >
        Here&apos;s what some of our users have to say about Aceternity UI.
      </p> */}

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-start gap-4 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {grid.map((testimonialsCol, index) => (
          <div
            key={`testimonials-col-${index}`}
            className="grid items-start gap-4"
          >
            {testimonialsCol.map((testimonial) => (
              <Card key={`testimonial-${testimonial.src}-${index}`}>
                <Quote>{testimonial.quote}</Quote>
                <div className="mt-8 flex items-center gap-2">
                  <img
                    src={testimonial.src}
                    alt="Manu Arora"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <QuoteDescription>{testimonial.name}</QuoteDescription>
                    <QuoteDescription className="text-[10px]">
                      {testimonial.designation}
                    </QuoteDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/20 bg-white/10 p-8",
        className,
      )}
    >
      <FaQuoteLeft className="absolute top-2 left-2 text-white/30" />
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "relative py-2 text-base font-normal text-white/80 italic",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "max-w-sm text-xs font-normal text-white/60",
        className,
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Martin G.",
    quote:
      "My AC went out on the hottest day of the year and they had a tech at my door within two hours. Fixed it fast and the price was completely fair. Will never call anyone else.",
    src: "https://i.pravatar.cc/150?img=1",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "James R.",
    quote:
      "I've used them twice now — once for a furnace repair and once for a full AC replacement. Both times the technicians were on time, professional, and honest about what I actually needed.",
    src: "https://i.pravatar.cc/150?img=2",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "John L.",
    quote:
      "Booked a maintenance visit online, got a confirmation call within minutes, and the tech showed up right on schedule. My system is running better than it has in years.",
    src: "https://i.pravatar.cc/150?img=3",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Carlos M.",
    quote:
      "These guys are the real deal. No upselling, no scare tactics — just honest diagnostics and solid work. They found a refrigerant leak two other companies missed.",
    src: "https://i.pravatar.cc/150?img=4",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Patricia H.",
    quote:
      "I called at 11pm when my heat stopped working in January. Someone answered immediately and a tech was at my house by midnight. Incredible service.",
    src: "https://i.pravatar.cc/150?img=5",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "David W.",
    quote:
      "Had a new system installed last spring. The crew was in and out in one day, cleaned up completely, and walked me through the thermostat settings before they left. Five stars.",
    src: "https://i.pravatar.cc/150?img=6",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Lance T.",
    quote:
      "Our annual maintenance plan has been worth every penny. They catch small issues before they become expensive problems. Haven't had an emergency breakdown in three years.",
    src: "https://i.pravatar.cc/150?img=7",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Robert K.",
    quote:
      "The tech explained everything clearly before starting any work and gave me a written quote upfront. No surprises on the bill. That kind of transparency is rare.",
    src: "https://i.pravatar.cc/150?img=8",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Angela F.",
    quote:
      "Fast, friendly, and reasonably priced. My upstairs bedrooms are finally staying cool after they recalibrated my ductwork. Should have called sooner.",
    src: "https://i.pravatar.cc/150?img=9",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Maria D.",
    quote:
      "I was quoted double by another company. These guys came out, diagnosed the problem accurately, and had it running for a fraction of the cost. Extremely trustworthy.",
    src: "https://i.pravatar.cc/150?img=10",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Steven B.",
    quote:
      "They replaced my 20-year-old unit and handled the financing paperwork without any hassle. Low monthly payments and my energy bill dropped significantly the first month.",
    src: "https://i.pravatar.cc/150?img=11",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Kevin O.",
    quote:
      "Great communication from start to finish. I got a text when the tech was on the way, the job was done quickly, and a follow-up call made sure I was satisfied. Top-notch.",
    src: "https://i.pravatar.cc/150?img=12",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Nancy C.",
    quote:
      "Been a customer for over eight years. They always remember my system's history and never try to sell me something I don't need. Old-school service you just don't find anymore.",
    src: "https://i.pravatar.cc/150?img=13",
    designation: "Homeowner, San Antonio TX",
  },
  {
    name: "Tony V.",
    quote:
      "Called them for a second opinion after a competitor said I needed a full replacement. Turns out it was just a capacitor. Saved me thousands. Honest and skilled — highly recommend.",
    src: "https://i.pravatar.cc/150?img=14",
    designation: "Homeowner, San Antonio TX",
  },
];
