import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-[#111111] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#C58A5C]/40 hover:bg-[#181818]">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C58A5C]/10 text-[#C58A5C] transition group-hover:scale-110">
        <Icon size={28} />
      </div>

      <h3 className="font-serif text-3xl text-white">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-white/65">
        {description}
      </p>
    </div>
  );
}