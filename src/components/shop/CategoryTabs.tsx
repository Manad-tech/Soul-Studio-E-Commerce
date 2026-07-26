import { Palette } from "lucide-react";

import { shopCategories } from "@/constants/shop-categories";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryTabs({
  value,
  onChange,
}: Props) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex w-max items-center gap-3 pb-2">

        {shopCategories.map((category) => {
          const active = value === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={`group flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "border-[#C58A5C] bg-[#C58A5C] text-black shadow-[0_10px_30px_rgba(197,138,92,0.35)]"
                  : "border-white/10 bg-[#111111] text-white hover:border-[#C58A5C] hover:bg-[#181818]"
              }`}
            >
              <Palette
                size={15}
                className={`transition ${
                  active
                    ? "text-black"
                    : "text-[#C58A5C]"
                }`}
              />

              <span>{category.label}</span>

              {category.id !== "all" && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    active
                      ? "bg-black/15 text-black"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {
                    {
                      painting: 12,
                      sculpture: 8,
                      ceramic: 15,
                      "resin-art": 6,
                    }[
                      category.id as
                        | "painting"
                        | "sculpture"
                        | "ceramic"
                        | "resin-art"
                    ]
                  }
                </span>
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}