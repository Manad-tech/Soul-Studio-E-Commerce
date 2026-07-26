// import { Heart, ShoppingBag } from "lucide-react";

// interface Props {
//   name: string;
//   category: string;
//   image: string;
//   price: number;
// }

// export default function ProductCard({
//   name,
//   category,
//   image,
//   price,
// }: Props) {
//   return (
//     <div className="group overflow-hidden rounded-3xl bg-[#121212] transition duration-500 hover:-translate-y-2">
//       <div className="relative overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
//         />

//         <button className="absolute right-5 top-5 rounded-full bg-black/70 p-3 backdrop-blur">
//           <Heart size={18} className="text-white" />
//         </button>
//       </div>

//       <div className="space-y-4 p-6">
//         <p className="text-xs uppercase tracking-[0.3em] text-[#C58A5C]">
//           {category}
//         </p>

//         <h3 className="font-serif text-3xl text-white">
//           {name}
//         </h3>

//         <div className="flex items-center justify-between">
//           <span className="text-xl font-semibold text-white">
//             ₹ {price.toLocaleString("en-IN")}
//           </span>

//           <button className="rounded-full bg-[#C58A5C] p-3 transition hover:scale-110">
//             <ShoppingBag
//               size={18}
//               className="text-black"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }