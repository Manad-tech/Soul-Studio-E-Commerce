interface Props {
  images: string[];

  selected: string;

  onSelect: (
    image: string
  ) => void;
}

export default function ThumbnailGallery({
  images,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">

      {images.map((image, index) => (

        <button
          key={`${image}-${index}`}
          onClick={() => onSelect(image)}
          className={`group overflow-hidden rounded-2xl border bg-[#111111] transition-all duration-300 ${
            selected === image
              ? "scale-105 border-[#C58A5C] shadow-[0_0_25px_rgba(197,138,92,.35)]"
              : "border-white/10 hover:scale-105 hover:border-[#C58A5C]/70"
          }`}
        >

          <img
            src={image}
            alt=""
            className={`aspect-square w-full object-cover transition duration-500 ${
              selected === image
                ? "opacity-100"
                : "opacity-70 group-hover:opacity-100"
            }`}
          />

        </button>

      ))}

    </div>
  );
}