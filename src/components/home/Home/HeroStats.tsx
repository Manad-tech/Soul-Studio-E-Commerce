import { heroStats } from "@/constants/hero";

export default function HeroStats() {
  return (
    <div className="mt-16 grid grid-cols-3 gap-12 border-t border-white/10 pt-10">
      {heroStats.map((item) => (
        <div key={item.label}>
          <h3 className="font-serif text-5xl text-white">
            {item.value}
          </h3>

          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-white/60">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}