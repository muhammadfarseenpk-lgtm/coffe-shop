import { useState } from "react";

import axios from "axios";

import { motion } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";

export default function BookingForm() {

  const [formData, setFormData] = useState({
    customer_name: "",
    booking_date: "",
    booking_time: "",
    guests: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/bookings/",
        formData
      );

      toast.success("Booking Confirmed ☕");

      setFormData({
        customer_name: "",
        booking_date: "",
        booking_time: "",
        guests: "",
      });

    } catch (error) {

      toast.error("Booking Failed");

      console.log(error);
    }
  };

  return (

    <section
      className="
      min-h-screen
      bg-[#f5f5f5]
      dark:bg-[#1a120b]
      flex items-center justify-center
      px-6 py-20
    "
    >

      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        bg-white
        dark:bg-[#2c1d14]
        p-10
        rounded-3xl
        shadow-xl
        w-full
        max-w-xl
      "
      >

        <h2
          className="
          text-4xl
          font-bold
          text-center
          text-black
          dark:text-white
          mb-8
        "
        >
          Book a Table
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <input
            type="text"
            name="customer_name"
            placeholder="Your Name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            className="
            w-full p-4 rounded-2xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          {/* Date */}
          <input
            type="date"
            name="booking_date"
            value={formData.booking_date}
            onChange={handleChange}
            required
            className="
            w-full p-4 rounded-2xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          {/* Time */}
          <input
            type="time"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
            className="
            w-full p-4 rounded-2xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          {/* Guests */}
          <input
            type="number"
            name="guests"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="
            w-full p-4 rounded-2xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          {/* Button */}
          <button
            type="submit"
            className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            p-4 rounded-2xl
            text-white
            font-semibold
          "
          >
            Confirm Booking
          </button>

        </form>

      </motion.div>

    </section>
  );
}