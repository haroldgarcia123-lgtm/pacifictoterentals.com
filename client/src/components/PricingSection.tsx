import type { PackageSelection } from "@/pages/home";
import { Check } from "lucide-react";

interface Package {
  name: string;
  price: number;
  totes: number;
  description: string;
  popular?: boolean;
  priceRange?: string;
}

const packages: Package[] = [
  {
    name: "Studio / 1BR",
    price: 149,
    totes: 20,
    description: "15 standard + 5 heavy-duty totes, dolly, 2-week rental",
  },
  {
    name: "2 Bedroom",
    price: 229,
    totes: 40,
    description: "30 standard + 10 heavy-duty totes, dolly, 2-week rental",
    popular: true,
  },
  {
    name: "3 Bedroom",
    price: 299,
    totes: 55,
    description: "40 standard + 15 heavy-duty totes, dolly, 2-week rental",
  },
  {
    name: "4-5 Bedroom",
    price: 399,
    totes: 75,
    description: "55-75 standard + 20-25 heavy-duty totes, dolly, 2-week rental",
    priceRange: "$399–$499",
  },
];

interface Props {
  selectedPackage: PackageSelection | null;
  onSelectPackage: (pkg: PackageSelection) => void;
}

export default function PricingSection({ selectedPackage, onSelectPackage }: Props) {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Transparent Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4" data-testid="pricing-title">
            Choose Your Package
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Every package includes a dolly and free delivery & pickup across Oahu. Extra totes available at $8 each.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.name === pkg.name;
            return (
              <div
                key={pkg.name}
                className={`relative rounded-xl border-2 p-6 transition-all duration-200 cursor-pointer group
                  ${isSelected
                    ? "border-[#C62828] bg-[#C62828]/5"
                    : pkg.popular
                    ? "border-[#DAA520]/50 hover:border-[#DAA520]"
                    : "border-border hover:border-muted-foreground/30"
                  }`}
                onClick={() => onSelectPackage({ name: pkg.name, price: pkg.price, totes: pkg.totes })}
                data-testid={`package-${pkg.name.toLowerCase().replace(/[\s\/]/g, "-")}`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DAA520] text-black text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-[#C62828] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-display text-lg" data-testid={`package-name-${pkg.name}`}>
                    {pkg.name}
                  </h3>
                </div>

                <div className="mb-4">
                  {pkg.priceRange ? (
                    <span className="font-display text-3xl">{pkg.priceRange}</span>
                  ) : (
                    <>
                      <span className="font-display text-3xl">${pkg.price}</span>
                    </>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  {pkg.description}
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#C62828] flex-shrink-0" />
                    <span>Standard totes for light items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#DAA520] flex-shrink-0" />
                    <span>Heavy-duty totes for books & heavy items</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                    <span>Dolly + free delivery & pickup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4CAF50] flex-shrink-0" />
                    <span>2-week rental period</span>
                  </li>
                </ul>

                <button
                  className={`w-full mt-6 py-3 rounded-lg font-semibold text-sm transition-all
                    ${isSelected
                      ? "bg-[#C62828] text-white"
                      : "bg-muted hover:bg-[#C62828] hover:text-white text-foreground"
                    }`}
                  data-testid={`select-${pkg.name.toLowerCase().replace(/[\s\/]/g, "-")}`}
                >
                  {isSelected ? "Selected" : "Select Package"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8 space-y-1">
          <p>
            Need more totes? Add extras at <span className="text-[#DAA520] font-semibold">$8/tote</span>.
          </p>
          <p>
            Need more time? Extend to 4 weeks: <span className="text-foreground font-medium">Studio $224</span> · <span className="text-foreground font-medium">2BR $344</span> · <span className="text-foreground font-medium">3BR $449</span> · <span className="text-foreground font-medium">4-5BR $599–$749</span>
          </p>
        </div>
      </div>
    </section>
  );
}
