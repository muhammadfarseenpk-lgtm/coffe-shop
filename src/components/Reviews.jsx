import { motion } from "framer-motion";

import { FaStar } from "react-icons/fa";

export default function Reviews() {

  const reviews = [
    {
      name: "Alex",
      review:
        "Amazing ambience and the best cappuccino in town!",
    },
    {
      name: "Sarah",
      review:
        "Perfect place for evening relaxation and coffee dates.",
    },
    {
      name: "John",
      review:
        "Loved the desserts, coffee, and cozy atmosphere!",
    },
  ];

  return (

    <section
      className="
      bg-[#f5f5f5]
      dark:bg-[#1a120b]
      py-24 px-6
      transition-colors
      duration-300
    "
    >

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >

        <p
          className="
          text-orange-400
          uppercase
          tracking-[5px]
          mb-4
        "
        >
          Testimonials
        </p>

        <h2
          className="
          text-5xl md:text-6xl
          font-bold
          text-black
          dark:text-white
          mb-5
        "
        >
          Customer Reviews
        </h2>

        <p
          className="
          text-gray-600
          dark:text-gray-300
          max-w-2xl
          mx-auto
          leading-8
        "
        >
          Hear what our happy customers say about
          their evening coffee experience.
        </p>

      </motion.div>

      {/* Review Cards */}
      <div
        className="
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        gap-10
        max-w-7xl
        mx-auto
      "
      >

        {reviews.map((item, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="
            bg-white
            dark:bg-[#2c1d14]
            p-8
            rounded-3xl
            shadow-lg
          "
          >

            {/* Stars */}
            <div className="flex gap-1 text-orange-400 mb-5">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            {/* Review */}
            <p
              className="
              text-gray-700
              dark:text-gray-300
              leading-8
              text-lg
            "
            >
              “{item.review}”
            </p>

            {/* Name */}
            <h3
              className="
              text-orange-400
              mt-6
              font-bold
              text-xl
            "
            >
              — {item.name}
            </h3>

          </motion.div>

        ))}

      </div>

    </section>
  );
}