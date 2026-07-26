import type { Product } from "@/types/product";

interface Props {
  tab:
    | "Description"
    | "Specifications"
    | "Shipping";
  product?: Product;
}

export default function ProductContent({
  tab,
  product,
}: Props) {
  if (tab === "Description") {
    return (
      <div className="space-y-5 leading-8 text-white/70">
        <p>
          {product?.description || "Original handcrafted artwork inspired by modern interiors and warm natural landscapes."}
        </p>

        <p>
          Every artwork is carefully finished using
          premium archival materials to ensure
          durability and museum-quality presentation.
        </p>
      </div>
    );
  }

  if (tab === "Specifications") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {product?.specifications?.map((spec, index) => (
          <Spec key={index} title={spec.label} value={spec.value} />
        )) || (
          <>
            <Spec title="Medium" value="Acrylic on Canvas" />
            <Spec title="Size" value='36" × 48"' />
            <Spec title="Frame" value="Included" />
            <Spec title="Finish" value="Matte" />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5 leading-8 text-white/70">
      <p>
        Every order is securely packed and fully insured
        during transit.
      </p>

      <p>
        Delivery generally takes 5–10 business days
        depending on location.
      </p>
    </div>
  );
}

function Spec({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111] p-6">
      <p className="text-white/40">
        {title}
      </p>

      <h4 className="mt-2 font-semibold text-white">
        {value}
      </h4>
    </div>
  );
}