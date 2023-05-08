import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import RB from "../../assets/ROADBIKE.png";
import { NavLink } from "react-router-dom";
import { FcEngineering } from "react-icons/fc";
import { BsFillGearFill } from "react-icons/bs";

const HeroSection = () => {
  return (
    <div className="text-black bg-gray-200">
      <div className="md:flex justify-between px-20 py-20 max-w-screen-2xl mx-auto">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="max-w-2xl"
        >
          <span className="flex items-center px-1 text-xl text-[#FFA500] font-bebas tracking-widest font-bold">
            <span className="md:text-lg sm:text-md text-sm duration-700">
              100% Quality Made Products
            </span>
            <span></span>
          </span>

          <h1 className="pt-4 pb-1 md:text-8xl sm:text-5xl font-bold tracking-widest leading-tight duration-700 font-bebas text-black">
            Healthy Lifestyle With Biking Will
          </h1>

          <TypeAnimation
            className="md:text-8xl sm:text-5xl text-3xl font-bold tracking-widest leading-tight text-[#FFA500] duration-700 font-bebas"
            sequence={[
              "Build Muscles",
              1000,
              "Burn Calories",
              1000,
              "Help You Sleep",
              1000,
              "Relieve Stress",
              1000,
              "Be Fun!",
              1000,
            ]}
            repeat={Infinity}
          />
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-anchor-placement="bottom-bottom"
            className=" pt-4 md:text-lg sm:text-md text-sm font-lg font-bebas tracking-wider leading-relaxed"
          >
            Cycling is easy to fit into your daily routine by riding to the
            shops, park, school or work.
          </p>
        </div>

        <div className="max-w-2xl ease-in-out duration-700">
          <img
            src={RB}
            alt="/"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="100"
          />

          <div
            className="flex items-center justify-center "
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-bebas tracking-normal text-center font-bold">
              START{" "}
              <span className="text-[#FFA500] animate-pulse">CUSTOMIZING</span>{" "}
              YOUR BIKES WITH US!
            </h1>
          </div>
          <div
            className="flex items-center justify-center mt-4"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <p className="font-bebas tracking-wider">
              To get started click the button below
            </p>
          </div>

          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <button
              type="button"
              className="flex gap-2 items-center justify-center bg-[#FFA500] hover:scale-105 font-bebas tracking-widest duration-300 rounded my-5 py-2 w-full cursor-pointer active:scale-90"
            >
              <NavLink to="/select-brand">CUSTOMIZE NOW </NavLink>
              <BsFillGearFill fontSize={20} className="animate-spin" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
