import type { PackageSelection } from "@/pages/home";
import { Droplets, Calendar } from "lucide-react";

interface Props {
  selectedPackage: PackageSelection | null;
  vacuumSealBags: boolean;
  setVacuumSealBags: (v: boolean) => void;
  extendedRental: boolean;
  setExtendedRental: (v: boolean) => void;
}

export default function AddOnsSection({
  selectedPackage,
  vacuumSealBags,
  setVacuumSealBags,
  extendedRental,
  setExtendedRental,
}: Props) {
  const extendedPrice = selectedPackage
    ? Math.round(selectedPackage.price * 1.50 - selectedPackage.price)
    : 0;

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  // Calculate total
  let total = selectedPackage?.price ?? 0;
  if (vacuumSealBags) total += 39;
  if (extendedRental && selectedPackage) total = Math.round(selectedPackage.price * 1.50) + (vacuumSealBags ? 39 : 0);

  return (
    <section id="add-ons" className="py-20 sm:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Customize
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight" data-testid="addons-title">
            Add-Ons
          </h2>
        </div>

        {!selectedPackage && (
          <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-xl">
            <p className="text-lg">Select a package above to see add-ons</p>
          </div>
        )}

        {selectedPackage && (
          <div className="space-y-4">
            {/* Vacuum Seal Bags */}
            <label
              className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                vacuumSealBags ? "border-[#DAA520] bg-[#DAA520]/5" : "border-border hover:border-muted-foreground/30"
              }`}
              data-testid="addon-vacuum-bags"
            >
              <input
                type="checkbox"
                checked={vacuumSealBags}
                onChange={(e) => setVacuumSealBags(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                vacuumSealBags ? "bg-[#DAA520]/20" : "bg-muted"
              }`}>
                <Droplets className={`w-6 h-6 ${vacuumSealBags ? "text-[#DAA520]" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Vacuum-Seal Bag Pack</h3>
                  <span className="font-display text-lg text-[#DAA520]">+$39</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  6 jumbo bags + pump — Protect from Hawaii's humidity
                </p>
              </div>
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                vacuumSealBags ? "border-[#DAA520] bg-[#DAA520]" : "border-muted-foreground/30"
              }`}>
                {vacuumSealBags && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            </label>

            {/* Extended Rental */}
            <label
              className={`flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                extendedRental ? "border-[#DAA520] bg-[#DAA520]/5" : "border-border hover:border-muted-foreground/30"
              }`}
              data-testid="addon-extended-rental"
            >
              <input
                type="checkbox"
                checked={extendedRental}
                onChange={(e) => setExtendedRental(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                extendedRental ? "bg-[#DAA520]/20" : "bg-muted"
              }`}>
                <Calendar className={`w-6 h-6 ${extendedRental ? "text-[#DAA520]" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Extended Rental (4 weeks)</h3>
                  <span className="font-display text-lg text-[#DAA520]">+${extendedPrice}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Double your rental time for just 50% more
                </p>
              </div>
              <div className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                extendedRental ? "border-[#DAA520] bg-[#DAA520]" : "border-muted-foreground/30"
              }`}>
                {extendedRental && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-4 h-4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
            </label>

            {/* Order summary */}
            <div className="mt-8 p-6 rounded-xl bg-card border border-border">
              <h3 className="font-display text-lg mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{selectedPackage.name} Package</span>
                  <span>${selectedPackage.price}</span>
                </div>
                {vacuumSealBags && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Vacuum-Seal Bag Pack</span>
                    <span>$39</span>
                  </div>
                )}
                {extendedRental && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Extended Rental (+2 weeks)</span>
                    <span>+${extendedPrice}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-[#C62828] font-display text-xl">${total}</span>
                </div>
              </div>
              <button
                onClick={scrollToBooking}
                className="w-full mt-6 bg-[#C62828] hover:bg-[#A51C1C] text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
                data-testid="proceed-to-booking"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
