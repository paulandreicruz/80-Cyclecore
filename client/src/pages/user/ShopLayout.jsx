import React from "react";
import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import Shop from "./Shop";

function ShopLayout() {
  return (
    <>
      <Navbar />
      <Shop />
      <Footer />
    </>
  );
}

export default ShopLayout;
