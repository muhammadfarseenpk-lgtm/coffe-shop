import { useCart } from "../context/CartContext";

import toast from "react-hot-toast";

export default function MenuCard({ item }) {

  const { addToCart } = useCart();

  // Add To Cart
  const handleAddToCart = () => {

    addToCart(item);

    toast.success(
      `${item.name} added to cart ☕`
    );
  };

  return (

    <div
      className="
      bg-white
      dark:bg-[#2c1d14]
      rounded-3xl
      overflow-hidden
      shadow-lg
      hover:scale-105
      transition
      duration-300
    "
    >

      {/* Image */}
     <img
  loading="lazy"
  src={
    item.image.startsWith("http")

      ? item.image

      : `http://127.0.0.1:8000${item.image}`
  }
  alt={item.name}
  className="
    h-64
    w-full
    object-cover
  "
/>

      {/* Content */}
      <div className="p-5">

        {/* Name */}
        <h2
          className="
          text-2xl
          font-semibold
          text-black
          dark:text-white
        "
        >
          {item.name}
        </h2>

        {/* Category */}
        <p
          className="
          text-sm
          text-gray-500
          dark:text-gray-300
          mt-1
        "
        >
          {item.category}
        </p>

        {/* Price */}
        <p
          className="
          text-orange-500
          text-xl
          mt-3
          font-bold
        "
        >
          ₹{item.price}
        </p>

        {/* Add To Cart Button */}
        <button
          onClick={handleAddToCart}
          className="
          mt-5
          w-full
          bg-orange-500
          hover:bg-orange-600
          text-white
          py-3
          rounded-xl
          transition
          font-semibold
        "
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}