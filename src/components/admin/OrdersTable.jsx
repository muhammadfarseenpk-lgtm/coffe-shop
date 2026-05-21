import { useEffect, useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function OrdersTable() {

  const [orders, setOrders] =
    useState([]);

  // Fetch Orders
  const fetchOrders = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/api/orders/"
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchOrders();

    // Auto refresh every 3 sec
    const interval = setInterval(() => {

      fetchOrders();

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  // Update Status
  const updateStatus = async (

    id,
    newStatus
  ) => {

    try {

      await axios.patch(

        `http://127.0.0.1:8000/api/orders/${id}/`,

        {

          status: newStatus,
        }
      );

      toast.success(
        "Order Status Updated"
      );

      fetchOrders();

    } catch (error) {

      toast.error(
        "Update Failed"
      );

      console.log(error);
    }
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

      {/* Heading */}
      <div
        className="
        flex
        justify-between
        items-center
        mb-8
      "
      >

        <h2
          className="
          text-3xl
          font-bold
          text-black
          dark:text-white
        "
        >
          Orders Management
        </h2>

        <div
          className="
          bg-orange-500
          text-white
          px-4
          py-2
          rounded-xl
          font-semibold
        "
        >
          Total Orders: {orders.length}
        </div>

      </div>

      {/* Empty */}
      {orders.length === 0 && (

        <div
          className="
          text-center
          text-gray-500
          dark:text-gray-300
          py-10
        "
        >
          No Orders Yet ☕
        </div>

      )}

      {/* Orders */}
      <div className="space-y-5">

        {orders.map((order) => (

          <div
            key={order.id}
            className="
            bg-gray-100
            dark:bg-[#3c2a21]
            p-6
            rounded-2xl
            flex
            flex-col
            lg:flex-row
            justify-between
            gap-6
          "
          >

            {/* Left */}
            <div className="space-y-2">

              <h3
                className="
                text-2xl
                font-bold
                text-black
                dark:text-white
              "
              >
                {order.item_name}
              </h3>

              <p
                className="
                text-gray-600
                dark:text-gray-300
              "
              >
                Order ID:
                #{order.id}
              </p>

              <p className="text-orange-500">

                ₹{order.total_price}

              </p>

              {/* Table Number */}
              <div
                className="
                inline-block
                bg-orange-500
                text-white
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
              "
              >
                Table:
                {order.table_number}
              </div>

            </div>

            {/* Right */}
            <div
              className="
              flex
              flex-col
              gap-4
              justify-center
            "
            >

              {/* Status Badge */}
              <div
                className={`
                px-5
                py-3
                rounded-xl
                text-white
                font-semibold
                text-center

                ${
                  order.status ===
                  "Pending"

                    ? "bg-yellow-500"

                    : order.status ===
                      "Preparing"

                    ? "bg-blue-500"

                    : "bg-green-500"
                }
              `}
              >
                {order.status}
              </div>

              {/* Status Selector */}
              <select
                value={order.status}
                onChange={(e) =>

                  updateStatus(

                    order.id,

                    e.target.value
                  )
                }
                className="
                p-3
                rounded-xl
                bg-white
                dark:bg-[#2c1d14]
                text-black
                dark:text-white
                outline-none
              "
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Preparing">
                  Preparing
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}