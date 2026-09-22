import { cn } from "@/lib/utils";
import type { CategorySeo } from "@/lib/schemas";
import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CategorySeoSectionProps = {
  title: string;
  seo: CategorySeo;
  className?: string;
};

function CategorySeoSection({ title, seo, className }: CategorySeoSectionProps) {
  return (
    <section className={cn("border-t border-border bg-background", className)}>
      <Container className="py-10 md:py-14">
        <div className="mx-auto">
          <h2 className="text-center text-2xl font-semibold text-foreground">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="mt-6">
            {seo.faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            {seo.description} Discover {title.toLowerCase()} in every style and
            budget — with free delivery on orders above ₹999, 7-day easy
            returns, and expert support whenever you need a hand.
          </p>
        </div>
      </Container>
    </section>
  );
}

export { CategorySeoSection };
export type { CategorySeoSectionProps };