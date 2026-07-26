// import Container from "@/components/common/Container";

// import { products } from "@/constants/products";

// import ProductCard from "./ProductCard";

// export default function FeaturedProducts() {
//   return (
//     <section className="py-32">
//       <Container>
//         <div className="mb-20 text-center">
//           <p className="mb-4 uppercase tracking-[0.35em] text-[#C58A5C]">
//             Collection
//           </p>

//           <h2 className="font-serif text-6xl text-white">
//             Featured Artworks
//           </h2>

//           <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
//             Curated originals handcrafted with passion.
//           </p>
//         </div>

//         <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
//           {products.map((item) => (
//             <ProductCard
//               key={item.id}
//               {...item}
//             />
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }