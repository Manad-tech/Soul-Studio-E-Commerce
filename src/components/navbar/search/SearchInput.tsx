import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative">

      <Search
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40"
        size={20}
      />

      <input
        placeholder="Search artworks..."
        className="h-16 w-full rounded-full border border-white/10 bg-black/30 pl-14 pr-6 text-lg outline-none transition focus:border-[#C58A5C]"
      />

    </div>
  );
}