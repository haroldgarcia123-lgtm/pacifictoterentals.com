import { LayoutGrid, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: LayoutGrid,
    title: "Choose Your Package",
    description: "Select the right tote package for your home size. From studios to 5-bedroom homes.",
    step: "01",
  },
  {
    icon: Truck,
    title: "We Deliver to Your Door",
    description: "Heavy-duty totes + dolly delivered right to your doorstep across Oahu.",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Move & We Pick Up",
    description: "After your move, stack them up. We collect everything — zero waste, zero hassle.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Simple Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight" data-testid="how-it-works-title">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className="relative text-center group"
              data-testid={`step-${i + 1}`}
            >
              {/* Step number */}
              <div className="text-6xl font-display text-muted-foreground/20 absolute -top-4 left-1/2 -translate-x-1/2">
                {step.step}
              </div>

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-xl bg-[#C62828]/10 flex items-center justify-center border border-[#C62828]/20 group-hover:bg-[#C62828]/20 transition-colors">
                <step.icon className="w-7 h-7 text-[#C62828]" />
              </div>

              <h3 className="font-display text-xl mb-3" data-testid={`step-title-${i + 1}`}>
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#C62828]/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
