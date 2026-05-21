import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function MenuTable() {

  const [menuItems, setMenuItems] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      name: "",

      category: "Hot Coffee",

      price: "",

      image: null,
    });

  // Categories
  const categories = [

    "Hot Coffee",

    "Cold Coffee",

    "Desserts",

    "Snacks",

    "Special Drinks",
  ];

  // Fetch Menu
  const fetchMenu = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/api/menu/"
      );

      setMenuItems(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchMenu();

  }, []);

  // Handle Input
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // Handle Image
  const handleImageChange = (e) => {

    setFormData({

      ...formData,

      image: e.target.files[0],
    });
  };

  // Add or Update Item
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append(
      "name",
      formData.name
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "price",
      formData.price
    );

    if (formData.image) {

      data.append(
        "image",
        formData.image
      );
    }

    try {

      // UPDATE
      if (editingId) {

        await axios.put(

          `http://127.0.0.1:8000/api/menu/${editingId}/`,

          data,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Menu Item Updated"
        );

      } else {

        // CREATE
        await axios.post(

          "http://127.0.0.1:8000/api/menu/",

          data,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Menu Item Added"
        );
      }

      // Reset Form
      setFormData({

        name: "",

        category: "Hot Coffee",

        price: "",

        image: null,
      });

      setEditingId(null);

      fetchMenu();

    } catch (error) {

      toast.error(
        "Action Failed"
      );

      console.log(error);
    }
  };

  // Delete Item
  const deleteItem = async (id) => {

    try {

      await axios.delete(

        `http://127.0.0.1:8000/api/menu/${id}/`
      );

      toast.success(
        "Menu Item Deleted"
      );

      fetchMenu();

    } catch (error) {

      toast.error(
        "Delete Failed"
      );

      console.log(error);
    }
  };

  // Edit Item
  const editItem = (item) => {

    setEditingId(item.id);

    setFormData({

      name: item.name,

      category: item.category,

      price: item.price,

      image: null,
    });
  };

  return (

    <div
      className="
      bg-white
      dark:bg-[#2c1d14]
      p-8
      rounded-3xl
      shadow-lg
    "
    >

      {/* Title */}
      <h2
        className="
        text-3xl
        font-bold
        text-black
        dark:text-white
        mb-8
      "
      >
        Menu Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
        grid
        md:grid-cols-4
        gap-4
        mb-10
      "
      >

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="
          p-4
          rounded-xl
          bg-gray-100
          dark:bg-[#3c2a21]
          text-black
          dark:text-white
          outline-none
        "
        />

        {/* Category */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="
          p-4
          rounded-xl
          bg-gray-100
          dark:bg-[#3c2a21]
          text-black
          dark:text-white
          outline-none
        "
        >

          {categories.map((category) => (

            <option
              key={category}
              value={category}
            >
              {category}
            </option>

          ))}

        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="
          p-4
          rounded-xl
          bg-gray-100
          dark:bg-[#3c2a21]
          text-black
          dark:text-white
          outline-none
        "
        />

        {/* Image */}
        <input
          type="file"
          onChange={handleImageChange}
          className="
          p-4
          rounded-xl
          bg-gray-100
          dark:bg-[#3c2a21]
          text-black
          dark:text-white
        "
        />

        {/* Submit */}
        <button
          type="submit"
          className="
          md:col-span-4
          bg-orange-500
          hover:bg-orange-600
          text-white
          py-4
          rounded-xl
          transition
          font-semibold
        "
        >
          {editingId

            ? "Update Item"

            : "Add Item"}
        </button>

      </form>

      {/* Table */}
      <div className="space-y-4">

        {menuItems.map((item) => (

          <div
            key={item.id}
            className="
            flex
            justify-between
            items-center
            bg-gray-100
            dark:bg-[#3c2a21]
            p-4
            rounded-2xl
          "
          >

            {/* Item Info */}
            <div className="flex items-center gap-4">

              {/* Image */}
              <img
                src={
                  item.image.startsWith("http")

                    ? item.image

                    : `http://127.0.0.1:8000${item.image}`
                }
                alt={item.name}
                className="
                w-20
                h-20
                object-cover
                rounded-xl
              "
              />

              <div>

                <h3
                  className="
                  text-xl
                  font-semibold
                  text-black
                  dark:text-white
                "
                >
                  {item.name}
                </h3>

                <p className="text-orange-500">
                  {item.category}
                </p>

                <p
                  className="
                  text-black
                  dark:text-white
                "
                >
                  ₹{item.price}
                </p>

              </div>

            </div>

            {/* Actions */}
            <div className="flex gap-3">

              {/* Edit */}
              <button
                onClick={() =>
                  editItem(item)
                }
                className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                px-5
                py-2
                rounded-xl
                transition
              "
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() =>
                  deleteItem(item.id)
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
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}