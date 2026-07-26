import { motion } from "framer-motion";

import studio1 from "@/assets/images/artist/studio-1.jpg";
import studio2 from "@/assets/images/artist/studio-2.jpg";
import studio3 from "@/assets/images/artist/studio-3.jpg";
import studio4 from "@/assets/images/artist/studio-4.jpg";

const gallery = [
  {
    image: studio1,
    title: "Creative Studio",
    span: "row-span-2",
  },
  {
    image: studio2,
    title: "Painting Process",
  },
  {
    image: studio3,
    title: "Fine Details",
  },
  {
    image: studio4,
    title: "Finished Artwork",
    span: "col-span-2",
  },
];

export default function StudioGallery() {
  return (
    <section className="py-28">

      <div className="text-center">

        <p className="uppercase tracking-[0.45em] text-[#C58A5C]">
          Inside Our Studio
        </p>

        <h2 className="mt-5 font-serif text-5xl text-white">
          Where Every Artwork
          <br />
          Comes To Life
        </h2>

        <p className="mx-auto mt-6 max-w-3xl leading-8 text-white/60">
          Every brushstroke, texture and detail is created
          inside our studio with patience, craftsmanship and
          attention to perfection.
        </p>

      </div>

      <div className="mt-16 grid auto-rows-[260px] gap-6 md:grid-cols-2 lg:grid-cols-3">

        {gallery.map((item, index) => (

          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .6,
              delay: index * .12,
            }}
            className={`group relative overflow-hidden rounded-[32px] border border-white/10 ${item.span ?? ""}`}
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 right-0 p-7">

              <h3 className="font-serif text-3xl text-white">
                {item.title}
              </h3>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}