interface Props {
  image: string;
  title: string;
  category: string;
}

export default function GalleryCard({
  image,
  title,
  category,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-[30px]">
      <img
        src={image}
        alt={title}
        className="w-full object-cover transition duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-8 left-8 translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-xs uppercase tracking-[0.3em] text-[#C58A5C]">
          {category}
        </p>

        <h3 className="mt-2 font-serif text-3xl text-white">
          {title}
        </h3>
      </div>
    </div>
  );
}