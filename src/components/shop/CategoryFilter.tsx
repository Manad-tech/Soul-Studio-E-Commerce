const categories = [
  "Painting",
  "Sculpture",
  "Ceramic",
  "Resin Art",
  "Workshops",
  "Art Kits",
  "Art Materials",
  "Monthly Snail Mail Club",
];

export default function CategoryFilter() {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-2xl">
        Categories
      </h3>

      <div className="space-y-3">
        {categories.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>{item}</span>

            <input
              type="checkbox"
              className="accent-[#C58A5C]"
            />
          </label>
        ))}
      </div>
    </div>
  );
}