import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import Container from "@/components/common/Container";

import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const {
    items,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <section className="py-24">
        <Container>

          <div className="mx-auto max-w-3xl rounded-[36px] border border-white/10 bg-[#111111] p-20 text-center">

            <Heart
              size={60}
              className="mx-auto text-[#C58A5C]"
            />

            <h1 className="mt-8 font-serif text-5xl text-white">
              Your Wishlist is Empty
            </h1>

            <p className="mt-5 text-white/60">
              Save your favourite artwork here.
            </p>

            <Link
              to="/shop"
              className="mt-10 inline-flex items-center rounded-full bg-[#C58A5C] px-8 py-4 font-medium text-black transition hover:scale-105"
            >
              Continue Shopping
            </Link>

          </div>

        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>

        <h1 className="font-serif text-6xl text-white">
          Wishlist
        </h1>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {items.map(({ product }) => (

            <article
              key={product.id}
              className="overflow-hidden rounded-[30px] border border-white/10 bg-[#111111]"
            >

              <Link to={`/product/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
                />
              </Link>

              <div className="space-y-5 p-6">

                <p className="text-xs uppercase tracking-[0.35em] text-[#C58A5C]">
                  {product.category}
                </p>

                <Link to={`/product/${product.slug}`}>
                  <h2 className="font-serif text-3xl text-white">
                    {product.name}
                  </h2>
                </Link>

                <p className="text-2xl font-semibold text-white">
                  ₹ {product.price.toLocaleString("en-IN")}
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      addToCart(product);

                      toast.success("Added to Cart");

                      removeFromWishlist(product.id);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C58A5C] py-3 font-medium text-black transition hover:scale-105"
                  >
                    <ShoppingBag size={18} />
                    Add To Cart
                  </button>

                  <button
                    onClick={() => {
                      removeFromWishlist(product.id);

                      toast.success(
                        "Removed from Wishlist"
                      );
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500 text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </Container>
    </section>
  );
}