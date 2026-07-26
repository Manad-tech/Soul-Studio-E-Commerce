import { useState } from "react";
import { Expand } from "lucide-react";

import type { Product } from "@/types/product";

import ProductLightbox from "./ProductLightbox";
import ThumbnailGallery from "./ThumbnailGallery";

interface Props {
  product: Product;
}

export default function ProductGallery({
  product,
}: Props) {
  const images =
    product.images.length
      ? product.images
      : [product.image];

  const [selected, setSelected] =
    useState(0);

  const [open, setOpen] =
    useState(false);

  const image = images[selected];

  return (
    <div className="space-y-6">

      <div className="group relative overflow-hidden rounded-[36px] border border-white/10">

        <button
          onClick={() => setOpen(true)}
          className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100"
        >
          <Expand />
        </button>

        <img
          src={image}
          alt=""
          className="aspect-[4/5] w-full cursor-zoom-in object-cover transition duration-700 group-hover:scale-105"
        />

      </div>

      <ThumbnailGallery
        images={images}
        selected={image}
        onSelect={(img) =>
          setSelected(
            images.indexOf(img)
          )
        }
      />

      <ProductLightbox
        images={images}
        selected={selected}
        open={open}
        onClose={() => setOpen(false)}
        onPrevious={() =>
          setSelected(
            (selected - 1 + images.length) %
              images.length
          )
        }
        onNext={() =>
          setSelected(
            (selected + 1) %
              images.length
          )
        }
      />

    </div>
  );
}