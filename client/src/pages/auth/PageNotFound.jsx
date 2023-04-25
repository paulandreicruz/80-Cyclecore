import React from "react";
import bike from "../../assets/biking.gif"
import { TypeAnimation } from "react-type-animation";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-[#000300] text-white">
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-12 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <TypeAnimation sequence={["4",1000,"40",1000,"404",1000,"404!",1000]} speed={50} repeat={Infinity} className="font-bol text-9xl text-[#d4e253]"/>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> <span className="text-white">Page not found</span>
              </p>
              <p className="mb-8 text-center text-gray-50 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <span
                
                className='bg-cyan-400 hover:bg-cyan-500 hover:scale-105 text-white font-pop font-semibold duration-500 rounded my-5 py-2 text-center w-full cursor-pointer active:scale-90'
              >
                <NavLink to="/">GO HOME</NavLink>
              </span>
            </div>
            <div className="mt-4">
              <img
                src={bike}
                alt="img"
                className="object-cover bg-cover w-[40rem] h-[24rem] rounded-sm mt-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;