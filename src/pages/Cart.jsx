import { useState } from "react";

import { useCart } from "../context/CartContext";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

export default function Cart() {

  const {

    cartItems,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    clearCart,

    totalPrice,

  } = useCart();

  // Table Number
  const [tableNumber, setTableNumber] =
    useState("");

  // Place Order
  const placeOrder = async () => {

    // Validation
    if (!tableNumber) {

      toast.error(
        "Enter Table Number"
      );

      return;
    }

    try {

      // Create Order Items
      const orderItems = cartItems.map(

        (item) => ({

          item_name: item.name,

          quantity: item.quantity,

          price: item.price,
        })
      );

      // Send ONE Order
      await axios.post(

        "http://127.0.0.1:8000/api/orders/",

        {

          table_number: tableNumber,

          total_price: totalPrice,

          items: orderItems,
        }
      );

      toast.success(
        "Order Placed Successfully ☕"
      );

      // Clear Cart
      clearCart();

      // Reset Table Number
      setTableNumber("");

    } catch (error) {

      toast.error(
        "Order Failed"
      );

      console.log(error);
    }
  };

  return (

    <section
      className="
      min-h-screen
      bg-[#f5f5f5]
      dark:bg-[#1a120b]
      pt-32
      px-8
      pb-10
      transition-colors
      duration-300
    "
    >

      {/* Toast */}
      <Toaster />

      {/* Heading */}
      <h2
        className="
        text-5xl
        font-bold
        text-black
        dark:text-white
        mb-10
      "
      >
        Your Cart
      </h2>

      {/* Empty Cart */}
      {cartItems.length === 0 && (

        <div
          className="
          text-center
          text-gray-500
          dark:text-gray-300
          text-2xl
          mt-20
        "
        >
          Your cart is empty ☕

        </div>

      )}

      {/* Cart Items */}
      <div className="space-y-6">

        {cartItems.map((item) => (

          <div
            key={item.id}
            className="
            bg-white
            dark:bg-[#2c1d14]
            p-6
            rounded-2xl
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
            shadow-lg
          "
          >

            {/* Product Info */}
            <div>

              <h3
                className="
                text-2xl
                font-semibold
                text-black
                dark:text-white
              "
              >
                {item.name}
              </h3>

              <p className="text-orange-400 mt-2">

                ₹{item.price}

              </p>

            </div>

            {/* Quantity Controls */}
            <div
              className="
              flex
              items-center
              gap-4
            "
            >

              {/* Decrease */}
              <button
                onClick={() =>

                  decreaseQuantity(item.id)
                }
                className="
                bg-gray-300
                hover:bg-gray-400
                px-4
                py-2
                rounded-lg
                transition
              "
              >
                -
              </button>

              {/* Quantity */}
              <span
                className="
                text-xl
                text-black
                dark:text-white
                w-6
                text-center
              "
              >
                {item.quantity}
              </span>

              {/* Increase */}
              <button
                onClick={() =>

                  increaseQuantity(item.id)
                }
                className="
                bg-gray-300
                hover:bg-gray-400
                px-4
                py-2
                rounded-lg
                transition
              "
              >
                +
              </button>

              {/* Remove */}
              <button
                onClick={() =>

                  removeFromCart(item.id)
                }
                className="
                bg-red-500
                hover:bg-red-600
                text-white
                px-5
                py-2
                rounded-xl
                transition
              "
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Total + Order */}
      {cartItems.length > 0 && (

        <div className="mt-14">

          {/* Table Number */}
          <input
            type="number"
            placeholder="Enter Table Number"
            value={tableNumber}
            onChange={(e) =>

              setTableNumber(
                e.target.value
              )
            }
            className="
            w-full
            p-4
            rounded-xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
            mb-6
          "
          />

          {/* Total */}
          <h3
            className="
            text-4xl
            font-bold
            text-black
            dark:text-white
          "
          >
            Total:
            ₹{totalPrice.toFixed(2)}
          </h3>

          {/* Place Order */}
          <button
            onClick={placeOrder}
            className="
            mt-6
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-8
            py-4
            rounded-2xl
            text-lg
            font-semibold
            transition
            shadow-lg
          "
          >
            Place Order
          </button>

        </div>

      )}

    </section>
  );
}