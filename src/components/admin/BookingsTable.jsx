import { useEffect, useState } from "react";

import axios from "axios";

export default function BookingsTable() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/bookings/"
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchBookings();

    const interval = setInterval(() => {

      fetchBookings();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

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

      <h2
        className="
        text-3xl
        font-bold
        text-black
        dark:text-white
        mb-8
      "
      >
        Live Bookings
      </h2>

      <table className="w-full">

        <thead>

          <tr
            className="
            text-left
            text-black
            dark:text-white
          "
          >

            <th>Name</th>

            <th>Date</th>

            <th>Guests</th>

          </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr
              key={booking.id}
              className="
              border-t
              border-gray-300
            "
            >

              <td
                className="
                py-4
                text-black
                dark:text-white
              "
              >
                {booking.customer_name}
              </td>

              <td
                className="
                text-black
                dark:text-white
              "
              >
                {booking.booking_date}
              </td>

              <td className="text-orange-400">
                {booking.guests}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}