import React from "react";
import ContactSection from "../../components/section/ContactSection";
import HeroSection from "../../components/section/HeroSection";
import Location from "../../components/section/LocationSection";
import ProductSlider from "../../components/section/SliderSection";
import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductSlider />
      <ContactSection />
      <Location />
      <Footer />
    </>
  );
}

export default Dashboard;
