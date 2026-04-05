import Logo from "./Logo";
import { PerplexityAttribution } from "./PerplexityAttribution";

export default function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Logo className="h-8 w-auto text-foreground mb-4" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Reusable Moving Solutions for Hawaii. The island's first and only tote rental service.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <a
                  href="mailto:info@pacifictoterentals.com"
                  className="hover:text-foreground transition-colors"
                  data-testid="footer-email"
                >
                  info@pacifictoterentals.com
                </a>
              </p>
              <p>
                <a href="tel:+18085550000" className="hover:text-foreground transition-colors" data-testid="footer-phone">
                  (808) 555-0000
                </a>
              </p>
              <p>Oahu, Hawaii</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              {[
                { label: "How It Works", id: "how-it-works" },
                { label: "Pricing", id: "pricing" },
                { label: "Book Now", id: "booking" },
                { label: "FAQ", id: "faq" },
                { label: "Service Area", id: "service-area" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`footer-link-${link.id}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pacific Tote Co. All rights reserved.
          </p>
          <PerplexityAttribution />
        </div>
      </div>
    </footer>
  );
}
