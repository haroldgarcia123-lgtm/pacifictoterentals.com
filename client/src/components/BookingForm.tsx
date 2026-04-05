import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { PackageSelection } from "@/pages/home";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Order } from "@shared/schema";

interface Props {
  selectedPackage: PackageSelection | null;
  vacuumSealBags: boolean;
  extendedRental: boolean;
}

export default function BookingForm({ selectedPackage, vacuumSealBags, extendedRental }: Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    deliveryDate: "",
    pickupDate: "",
    orderNotes: "",
  });
  const [orderConfirmed, setOrderConfirmed] = useState<Order | null>(null);

  // Calculate dates
  const handleDeliveryDateChange = (date: string) => {
    setFormData((prev) => {
      const delivery = new Date(date);
      const weeks = extendedRental ? 4 : 2;
      const pickup = new Date(delivery);
      pickup.setDate(pickup.getDate() + weeks * 7);
      return {
        ...prev,
        deliveryDate: date,
        pickupDate: pickup.toISOString().split("T")[0],
      };
    });
  };

  // Calculate total
  let totalPrice = selectedPackage?.price ?? 0;
  if (extendedRental && selectedPackage) {
    totalPrice = Math.round(selectedPackage.price * 1.50);
  }
  if (vacuumSealBags) totalPrice += 39;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedPackage) throw new Error("No package selected");
      const res = await apiRequest("POST", "/api/orders", {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate,
        pickupDate: formData.pickupDate,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        toteCount: selectedPackage.totes,
        extraTotes: 0,
        rentalWeeks: extendedRental ? 4 : 2,
        vacuumSealBags: vacuumSealBags ? 1 : 0,
        orderNotes: formData.orderNotes || null,
        totalPrice,
      });
      return res.json() as Promise<Order>;
    },
    onSuccess: (data) => {
      setOrderConfirmed(data);
      toast({
        title: "Order placed successfully!",
        description: `Order #${data.id} confirmed. We'll be in touch shortly.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a package before booking.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate();
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Min delivery date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (orderConfirmed) {
    return (
      <section id="booking" className="py-20 sm:py-28 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#4CAF50]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl mb-4" data-testid="confirmation-title">
            Order Confirmed!
          </h2>
          <p className="text-muted-foreground mb-8">
            Order <span className="text-[#DAA520] font-semibold">#{orderConfirmed.id}</span> has been placed.
            We'll contact you at <span className="font-semibold">{orderConfirmed.email}</span> to confirm your delivery.
          </p>
          <div className="bg-background rounded-xl border border-border p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Package</span>
              <span className="font-semibold">{orderConfirmed.packageName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Totes</span>
              <span>{orderConfirmed.toteCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Date</span>
              <span>{new Date(orderConfirmed.deliveryDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Pickup Date</span>
              <span>{new Date(orderConfirmed.pickupDate).toLocaleDateString()}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-[#C62828]">${orderConfirmed.totalPrice}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setOrderConfirmed(null);
              setFormData({
                fullName: "",
                phone: "",
                email: "",
                deliveryAddress: "",
                deliveryDate: "",
                pickupDate: "",
                orderNotes: "",
              });
            }}
            className="mt-8 text-sm text-muted-foreground hover:text-foreground underline"
            data-testid="place-another-order"
          >
            Place Another Order
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 sm:py-28 bg-card">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Book Now
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight mb-4" data-testid="booking-title">
            Reserve Your Totes
          </h2>
          <p className="text-muted-foreground">
            Fill in your details and we'll schedule your delivery. Payment details will be sent via email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Selected package display */}
          {selectedPackage && (
            <div className="p-4 rounded-lg bg-[#C62828]/10 border border-[#C62828]/20 flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Selected Package</span>
                <p className="font-semibold">{selectedPackage.name} — {selectedPackage.totes} totes</p>
              </div>
              <span className="font-display text-xl text-[#C62828]">${totalPrice}</span>
            </div>
          )}
          {!selectedPackage && (
            <div className="p-4 rounded-lg border border-dashed border-border text-center text-muted-foreground">
              Please select a package above first
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="fullName">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
                placeholder="John Doe"
                data-testid="input-fullname"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
                placeholder="(808) 555-0123"
                data-testid="input-phone"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
              placeholder="john@example.com"
              data-testid="input-email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="address">
              Delivery Address (Oahu only) *
            </label>
            <input
              id="address"
              type="text"
              required
              value={formData.deliveryAddress}
              onChange={(e) => updateField("deliveryAddress", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
              placeholder="123 Aloha St, Honolulu, HI 96815"
              data-testid="input-address"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="deliveryDate">
                Preferred Delivery Date *
              </label>
              <input
                id="deliveryDate"
                type="date"
                required
                min={minDate}
                value={formData.deliveryDate}
                onChange={(e) => handleDeliveryDateChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
                data-testid="input-delivery-date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="pickupDate">
                Pickup Date
              </label>
              <input
                id="pickupDate"
                type="date"
                required
                min={formData.deliveryDate || minDate}
                value={formData.pickupDate}
                onChange={(e) => updateField("pickupDate", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm"
                data-testid="input-pickup-date"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-set to {extendedRental ? "4" : "2"} weeks after delivery
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="notes">
              Order Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.orderNotes}
              onChange={(e) => updateField("orderNotes", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-[#C62828] focus:ring-1 focus:ring-[#C62828] outline-none transition-colors text-sm resize-none"
              placeholder="Any special instructions..."
              data-testid="input-notes"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedPackage || mutation.isPending}
            className="w-full bg-[#C62828] hover:bg-[#A51C1C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg text-base transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            data-testid="button-place-order"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
