import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import AddOnsSection from "@/components/AddOnsSection";
import BookingForm from "@/components/BookingForm";
import ServiceArea from "@/components/ServiceArea";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export interface PackageSelection {
  name: string;
  price: number;
  totes: number;
}

export default function HomePage() {
  const [selectedPackage, setSelectedPackage] = useState<PackageSelection | null>(null);
  const [vacuumSealBags, setVacuumSealBags] = useState(false);
  const [extendedRental, setExtendedRental] = useState(false);

  const handleSelectPackage = useCallback((pkg: PackageSelection) => {
    setSelectedPackage(pkg);
    setTimeout(() => {
      document.getElementById("add-ons")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement banner */}
      <div className="bg-gradient-to-r from-[hsl(var(--gold))] to-[hsl(var(--primary))] text-white text-center py-2.5 px-4 text-sm font-semibold tracking-wide">
        <span className="inline-flex items-center gap-2">
          🔥 Now Taking Orders — Book Today, We Deliver Across Oahu · Military Discount Available
        </span>
      </div>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PricingSection
        selectedPackage={selectedPackage}
        onSelectPackage={handleSelectPackage}
      />
      <AddOnsSection
        selectedPackage={selectedPackage}
        vacuumSealBags={vacuumSealBags}
        setVacuumSealBags={setVacuumSealBags}
        extendedRental={extendedRental}
        setExtendedRental={setExtendedRental}
      />
      <BookingForm
        selectedPackage={selectedPackage}
        vacuumSealBags={vacuumSealBags}
        extendedRental={extendedRental}
      />
      <ServiceArea />
      <FAQSection />
      <Footer />
    </div>
  );
}
