import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import AppRoutes from "./routes/AppRoutes";

export default function App() {

  return (

    <div
      className="
      bg-[#f5f5f5]
      dark:bg-[#1a120b]
      min-h-screen
      transition-colors
      duration-300
    "
    >

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <AppRoutes />

      {/* Footer */}
      <Footer />

    </div>
  );
}