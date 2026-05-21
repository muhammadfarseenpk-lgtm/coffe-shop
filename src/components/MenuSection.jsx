import axios from "axios";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import MenuCard from "./MenuCard";

export default function MenuSection() {

  const [menu, setMenu] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/api/menu/")
      .then((res) => {

        setMenu(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, []);

  const categories = [
    "All",
    "Hot Coffee",
    "Cold Coffee",
    "Desserts",
    "Snacks",
    "Special Drinks",
  ];

  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter(
          (item) =>
            item.category === selectedCategory
        );

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
        className="text-center"
      >

        <p
          className="
          text-orange-400
          uppercase
          tracking-[5px]
          mb-4
        "
        >
          Our Special Menu
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
          Popular Coffee
        </h2>

      </motion.div>

      {/* Category Buttons */}
      <div
        className="
        flex flex-wrap
        justify-center
        gap-4
        mt-14 mb-16
      "
      >

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`
              px-7 py-3
              rounded-full
              font-medium
              transition-all
              duration-300

              ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : `
                    bg-white
                    dark:bg-[#2c1d14]
                    text-black
                    dark:text-white
                  `
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>

      {/* Menu Grid */}
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

        {filteredMenu.map((item) => (

          <MenuCard
            key={item.id}
            item={item}
          />

        ))}

      </div>

    </section>
  );
}