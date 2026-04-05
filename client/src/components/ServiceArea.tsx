import { MapPin, Clock } from "lucide-react";

const areas = [
  "Honolulu", "Kapolei", "Ewa Beach", "Mililani", "Kaneohe",
  "Kailua", "North Shore", "Pearl City", "Aiea", "Waikiki",
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="py-20 sm:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Coverage
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4" data-testid="service-area-title">
            We Deliver Across All of Oahu
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Areas grid */}
          <div>
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-[#C62828]/30 transition-colors"
                  data-testid={`area-${area.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <MapPin className="w-4 h-4 text-[#C62828] flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery info */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#C62828]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#C62828]" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Delivery Windows</h3>
                  <p className="text-muted-foreground text-sm">
                    <strong className="text-foreground">Monday – Saturday</strong>
                    <br />
                    8:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#DAA520]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#DAA520]" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Free Delivery & Pickup</h3>
                  <p className="text-muted-foreground text-sm">
                    Delivery and pickup are included in every package — no hidden fees, anywhere on Oahu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
