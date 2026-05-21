import DashboardCards from "../components/admin/DashboardCards";

import SalesChart from "../components/admin/SalesChart";

import MenuTable from "../components/admin/MenuTable";

import OrdersTable from "../components/admin/OrdersTable";

import BookingsTable from "../components/admin/BookingsTable";

export default function AdminDashboard() {

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("access_token");

    localStorage.removeItem("refresh_token");

    window.location.href = "/admin-login";
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

      {/* Top Header */}
      <div
        className="
        flex flex-col md:flex-row
        justify-between
        items-start md:items-center
        gap-5
        mb-10
      "
      >

        {/* Heading */}
        <h1
          className="
          text-5xl
          font-bold
          text-black
          dark:text-white
        "
        >
          Admin Dashboard
        </h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-6 py-3
          rounded-2xl
          font-semibold
          transition
          shadow-lg
        "
        >
          Logout
        </button>

      </div>

      {/* Analytics Cards */}
      <DashboardCards />

      {/* Sales Chart */}
      <div className="mt-10">

        <SalesChart />

      </div>

      {/* Management Tables */}
      <div className="mt-14 space-y-14">

        <MenuTable />

        <OrdersTable />

        <BookingsTable />

      </div>

    </section>
  );
}