import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative group">

      <Search
        size={18}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-[#C58A5C] transition"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search artworks..."
        className="h-16 w-full rounded-full border border-white/10 bg-[#111111] pl-14 pr-14 text-[15px] text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-[#C58A5C] focus:bg-[#151515] focus:shadow-[0_0_0_4px_rgba(197,138,92,0.08)]"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-white/60 transition-all duration-300 hover:bg-[#C58A5C] hover:text-black"
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}