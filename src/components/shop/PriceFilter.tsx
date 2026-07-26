interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function PriceFilter({
  value,
  onChange,
}: Props) {
  const percentage = (value / 50000) * 100;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <span className="text-sm uppercase tracking-[0.25em] text-white/45">
          Max Price
        </span>

        <span className="rounded-full bg-[#C58A5C] px-4 py-1 text-sm font-semibold text-black">
          ₹ {value.toLocaleString("en-IN")}
        </span>

      </div>

      <div className="relative pt-3">

        {/* Track */}

        <div className="absolute top-[21px] h-[3px] w-full rounded-full bg-white/10" />

        {/* Active Track */}

        <div
          className="absolute top-[21px] h-[3px] rounded-full bg-[#C58A5C]"
          style={{
            width: `${percentage}%`,
          }}
        />

        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={value}
          onChange={(e) =>
            onChange(Number(e.target.value))
          }
          className="relative z-10 h-2 w-full cursor-pointer appearance-none bg-transparent accent-[#C58A5C]"
        />

      </div>

      <div className="flex items-center justify-between text-sm text-white/40">

        <span>₹ 0</span>

        <span>₹ 25,000</span>

        <span>₹ 50,000</span>

      </div>

    </div>
  );
}