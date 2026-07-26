import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[32px] border border-dashed border-white/10 bg-[#111111]">
      <SearchX
        size={70}
        className="text-[#C58A5C]"
      />

      <h2 className="mt-8 font-serif text-4xl text-white">
        No Artwork Found
      </h2>

      <p className="mt-4 max-w-md text-center text-white/60">
        We couldn't find any artwork matching your
        search or filters.
      </p>
    </div>
  );
}