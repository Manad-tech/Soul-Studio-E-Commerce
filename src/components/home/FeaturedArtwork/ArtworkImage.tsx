import artwork from "@/assets/images/featured/featured-artwork.jpg";

export default function ArtworkImage() {
  return (
    <div className="overflow-hidden rounded-[40px]">
      <img
        src={artwork}
        alt="Featured Artwork"
        className="h-187.5 w-full object-cover transition duration-700 hover:scale-105"
      />
    </div>
  );
}