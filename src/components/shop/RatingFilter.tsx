import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-5">
      <h3 className="font-serif text-2xl">
        Rating
      </h3>

      {[5, 4, 3].map((item) => (
        <label
          key={item}
          className="flex cursor-pointer items-center gap-3"
        >
          <input
            type="radio"
            checked={value === item}
            onChange={() => onChange(item)}
          />

          <div className="flex">
            {Array.from({
              length: item,
            }).map((_, index) => (
              <Star
                key={index}
                size={15}
                className="fill-[#C58A5C] text-[#C58A5C]"
              />
            ))}
          </div>

          <span>& up</span>
        </label>
      ))}

      <button
        onClick={() => onChange(0)}
        className="text-sm text-[#C58A5C]"
      >
        Clear Rating
      </button>
    </div>
  );
}