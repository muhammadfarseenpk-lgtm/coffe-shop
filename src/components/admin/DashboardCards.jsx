import { useEffect, useState } from "react";

import axios from "axios";

export default function DashboardCards() {

  const [stats, setStats] = useState({
    total_orders: 0,
    total_bookings: 0,
    total_menu_items: 0,
    revenue: 0,
  });

  // Fetch Stats
  const fetchStats = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/orders/dashboard-stats/"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchStats();

    // Auto Refresh Every 5 Seconds
    const interval = setInterval(() => {

      fetchStats();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const cards = [

    {
      title: "Total Orders",
      value: stats.total_orders,
    },

    {
      title: "Bookings",
      value: stats.total_bookings,
    },

    {
      title: "Menu Items",
      value: stats.total_menu_items,
    },

    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
    },
  ];

  return (

    <div
      className="
      grid
      sm:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
    >

      {cards.map((card, index) => (

        <div
          key={index}
          className="
          bg-white
          dark:bg-[#2c1d14]
          p-8
          rounded-3xl
          shadow-lg
          transition
          hover:scale-105
        "
        >

          <h3
            className="
            text-gray-500
            dark:text-gray-300
            text-lg
          "
          >
            {card.title}
          </h3>

          <p
            className="
            text-4xl
            font-bold
            text-orange-400
            mt-4
          "
          >
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
}