import { motion } from "framer-motion";

export default function Hero() {

  return (

    <section
      className="
      h-screen
      relative
      flex items-center justify-center
      overflow-hidden
    "
    >

      {/* Background Image */}
      <div
        className="
        absolute inset-0
        bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085')]
        bg-cover bg-center
        scale-105
      "
      ></div>

      {/* Overlay */}
      <div
        className="
        absolute inset-0
        bg-black/60
      "
      ></div>

      {/* Gradient Overlay */}
      <div
        className="
        absolute inset-0
        bg-gradient-to-b
        from-black/40
        via-black/50
        to-[#1a120b]
      "
      ></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="
        relative z-10
        text-center
        px-6
        max-w-4xl
      "
      >

        {/* Small Heading */}
        <p
          className="
          text-orange-400
          uppercase
          tracking-[6px]
          mb-5
          text-sm md:text-base
        "
        >
          Premium Evening Coffee
        </p>

        {/* Main Heading */}
        <h1
          className="
          text-5xl md:text-7xl
          font-extrabold
          text-white
          leading-tight
        "
        >
          Freshly Brewed <br />

          Happiness 
        </h1>

        {/* Description */}
        <p
          className="
          text-gray-200
          mt-8
          text-lg md:text-xl
          leading-8
          max-w-2xl
          mx-auto
        "
        >
          Experience cozy evenings with handcrafted coffee,
          premium desserts, and relaxing ambience made for
          coffee lovers.
        </p>

        {/* Buttons */}
        <div
          className="
          mt-10
          flex flex-col sm:flex-row
          justify-center
          gap-5
        "
        >

          {/* Primary Button */}
          <button
            className="
            bg-orange-500
            hover:bg-orange-600
            px-8 py-4
            rounded-full
            text-white
            font-semibold
            shadow-lg
            hover:scale-105
            transition
          "
          >
            Explore Menu
          </button>

          {/* Secondary Button */}
          <button
            className="
            border border-white/30
            bg-white/10
            backdrop-blur-md
            hover:bg-white/20
            px-8 py-4
            rounded-full
            text-white
            font-semibold
            transition
          "
          >
            Book a Table
          </button>

        </div>

      </motion.div>

    </section>
  );
}