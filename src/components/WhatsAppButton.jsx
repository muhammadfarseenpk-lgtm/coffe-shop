import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919037308196"
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full text-white text-3xl shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp />
    </a>
  );
}