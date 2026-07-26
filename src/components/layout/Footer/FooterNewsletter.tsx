import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FooterNewsletter() {
  return (
    <div>
      <h3 className="mb-6 font-semibold text-[var(--heading)]">
        Newsletter
      </h3>

      <p className="mb-4 text-sm text-[var(--body)]">
        Get updates about new collections and exhibitions.
      </p>

      <div className="space-y-3">
        <Input placeholder="Enter your email" />

        <Button className="w-full">
          Subscribe
        </Button>
      </div>
    </div>
  );
}