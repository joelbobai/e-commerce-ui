import React from "react";
import Categories from "../components/home/Categories";
import Footer from "../components/home/Footer";
import Newsletter from "../components/home/Newsletter";
import Products from "../components/home/Products";
import Slider from "../components/home/Slider";
function HomePage() {
  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </>
  );
}

export default HomePage;
