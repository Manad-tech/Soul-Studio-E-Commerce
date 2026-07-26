import { Minus, Plus } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="flex items-center gap-5">

      <span className="font-medium text-white">
        Quantity
      </span>

      <div className="flex items-center overflow-hidden rounded-full border border-white/10">

        <button
          onClick={() =>
            onChange(Math.max(1, value - 1))
          }
          className="flex h-12 w-12 items-center justify-center transition hover:bg-white/10"
        >
          <Minus size={16} />
        </button>

        <span className="w-14 text-center font-semibold">
          {value}
        </span>

        <button
          onClick={() =>
            onChange(value + 1)
          }
          className="flex h-12 w-12 items-center justify-center transition hover:bg-white/10"
        >
          <Plus size={16} />
        </button>

      </div>

    </div>
  );
}