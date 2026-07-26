import { Heart, ShoppingBag } from "lucide-react";

export default function ProductActions() {
  return (
    <>
      <button className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition hover:scale-110">
        <Heart size={18} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-black/75 p-5 backdrop-blur transition-all duration-500 group-hover:translate-y-0">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C58A5C] py-3 font-medium text-black transition hover:bg-[#d29b70]">
          <ShoppingBag size={18} />

          Add To Cart
        </button>
      </div>
    </>
  );
}