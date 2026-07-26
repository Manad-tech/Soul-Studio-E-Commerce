interface Props {
  value: "all" | "stock" | "out";

  onChange: (
    value: "all" | "stock" | "out"
  ) => void;
}

export default function AvailabilityFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">

      <h3 className="font-serif text-2xl">
        Availability
      </h3>

      <label className="flex justify-between">

        <span>All</span>

        <input
          type="radio"
          checked={value === "all"}
          onChange={() =>
            onChange("all")
          }
        />

      </label>

      <label className="flex justify-between">

        <span>In Stock</span>

        <input
          type="radio"
          checked={value === "stock"}
          onChange={() =>
            onChange("stock")
          }
        />

      </label>

      <label className="flex justify-between">

        <span>Sold Out</span>

        <input
          type="radio"
          checked={value === "out"}
          onChange={() =>
            onChange("out")
          }
        />

      </label>

    </div>
  );
}