import { useState } from "react";
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  return (

    <nav
      className="
      fixed top-0 w-full z-50
      bg-white/80
      dark:bg-[#1a120bcc]
      backdrop-blur-md
      transition-colors
      duration-300
    "
    >

      <div
        className="
        max-w-7xl mx-auto
        px-6 py-4
        flex justify-between items-center
      "
      >

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-orange-400"
        >
          Evening Coffee
        </Link>

        {/* Desktop Menu */}
        <ul
          className="
          hidden md:flex
          gap-8
          text-black
          dark:text-white
          items-center
        "
        >
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/booking">Booking</Link>
          <Link to="/cart">Cart</Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Theme Toggle Mobile */}
          <div className="md:hidden">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="
            md:hidden
            text-black
            dark:text-white
            text-2xl
          "
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (

        <div
          className="
          md:hidden
          bg-white
          dark:bg-[#2c1d14]
          text-black
          dark:text-white
          flex flex-col
          p-6 gap-5
          transition-all
        "
        >

          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/booking">Booking</Link>
          <Link to="/cart">Cart</Link>

        </div>

      )}

    </nav>
  );
}