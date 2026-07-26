import {
  Grid2X2,
  Rows3,
} from "lucide-react";

interface Props {
  value: "grid" | "list";

  onChange: (
    value: "grid" | "list"
  ) => void;
}

export default function ViewToggle({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex overflow-hidden rounded-full border border-white/10">
      <button
        onClick={() => onChange("grid")}
        className={`flex h-12 w-12 items-center justify-center transition ${
          value === "grid"
            ? "bg-[#C58A5C] text-black"
            : "text-white hover:bg-white/10"
        }`}
      >
        <Grid2X2 size={18} />
      </button>

      <button
        onClick={() => onChange("list")}
        className={`flex h-12 w-12 items-center justify-center transition ${
          value === "list"
            ? "bg-[#C58A5C] text-black"
            : "text-white hover:bg-white/10"
        }`}
      >
        <Rows3 size={18} />
      </button>
    </div>
  );
}