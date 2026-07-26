import {
  BadgeCheck,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary insured delivery across India.",
  },
  {
    icon: PackageCheck,
    title: "Secure Packaging",
    description: "Professionally packed for maximum protection.",
  },
  {
    icon: BadgeCheck,
    title: "Certificate Included",
    description: "Authenticity certificate with every artwork.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description: "Museum-grade archival materials used.",
  },
];

export default function ProductFeatures() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-3xl border border-white/10 bg-[#111111] p-6 transition hover:border-[#C58A5C]/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C]">
              <Icon size={22} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm leading-7 text-white/60">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}