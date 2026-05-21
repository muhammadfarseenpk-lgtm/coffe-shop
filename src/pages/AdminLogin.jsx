import { useState } from "react";

import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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

      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        {
            username: formData.username,
            password: formData.password
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      toast.success("Admin Login Success");

      navigate("/admin-dashboard");

    } catch (error) {

      toast.error("Invalid Credentials");

      console.log(error);
    }
  };

  return (

    <section
      className="
      min-h-screen
      flex items-center
      justify-center
      bg-[#f5f5f5]
      dark:bg-[#1a120b]
      px-6
    "
    >

      <Toaster />

      <div
        className="
        bg-white
        dark:bg-[#2c1d14]
        p-10
        rounded-3xl
        shadow-2xl
        w-full
        max-w-md
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
          Admin Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
            w-full
            p-4
            rounded-xl
            bg-gray-100
            dark:bg-[#3c2a21]
            text-black
            dark:text-white
            outline-none
          "
          />

          <button
            type="submit"
            className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            p-4
            rounded-xl
            text-white
            font-semibold
            transition
          "
          >
            Login
          </button>

        </form>

      </div>

    </section>
  );
}