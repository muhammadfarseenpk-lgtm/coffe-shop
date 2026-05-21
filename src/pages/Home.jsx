import Hero from "../components/Hero";
import MenuSection from "../components/MenuSection";
import About from "../components/About";
import Offers from "../components/Offers";
import Reviews from "../components/Reviews";

export default function Home() {
  return (
    <>
      <Hero />
      <MenuSection />
      <About />
      <Offers />
      <Reviews />
    </>
  );
}