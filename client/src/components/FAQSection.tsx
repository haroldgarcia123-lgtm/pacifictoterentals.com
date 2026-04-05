import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of totes do you provide?",
    answer:
      "Every package includes two types: Standard totes (collapsible, 16.5 gallon, 50 lb capacity) for clothes, linens, kitchen items, and decor. Plus Heavy-Duty totes (27 gallon, 75 lb capacity) for books, tools, and heavier items. Both are stackable with attached lids.",
  },
  {
    question: "How many totes do I need?",
    answer:
      "It depends on your home size. Studio/1BR: 20 totes (15 standard + 5 heavy-duty). 2 Bedroom: 40 totes (30 standard + 10 heavy-duty). 3 Bedroom: 55 totes (40 standard + 15 heavy-duty). 4-5 Bedroom: 75-100 totes. If you're unsure, we recommend going one size up.",
  },
  {
    question: "Do I need to clean the totes?",
    answer:
      "No — we sanitize every single tote between rentals. Just pack, move, and leave the rest to us.",
  },
  {
    question: "What if I need more time?",
    answer:
      "You can extend to a 4-week rental for just 50% more — Studio $224, 2BR $344, 3BR $449, 4-5BR $599-$749. Select the extended rental add-on when booking, or contact us during your rental period.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We deliver to all of Oahu — Honolulu, Kapolei, Ewa Beach, Mililani, Kaneohe, Kailua, North Shore, Pearl City, Aiea, Waikiki, and everywhere in between.",
  },
  {
    question: "How do I return them?",
    answer:
      "Just stack them up at your door. We'll come pick them up on your scheduled pickup date — no need to be home. It's that simple.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#DAA520] mb-3 block">
            Questions?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight" data-testid="faq-title">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border rounded-xl px-6 data-[state=open]:border-[#C62828]/30 transition-colors"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-semibold text-sm sm:text-base hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
