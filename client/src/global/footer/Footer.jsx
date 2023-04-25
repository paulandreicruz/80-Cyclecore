import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

import { ImLocation } from "react-icons/im";
import { AiTwotonePhone } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import logo from "../../assets/logo1.png";

const Footer = () => {
  return (
    <>
      <div className="mx-auto w-full bg-gray-600 h-0.5 opacity-10 shadow-bottom shadow-lg shadow-gray-800"></div>

      <div className="font-bebas px-44 mx-auto bg-gray-200 grid lg:grid-cols-3 gap-8 text-gray-700 delay-500">
        <div>
          <a href="#">
            <img
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="100"
              src={logo}
              alt="/"
              className="w-36 mx-2 mt-2 border-b border-white mb-2"
            />
          </a>

          <ul
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
            className=""
          >
            <li className="flex max-w-sm mb-2">
              <ImLocation size={26} className="text-gray-500" />
              390 Col. Bonny Serrano Ave Libis 1110 Quezon City, Philippines
            </li>
            <li className="flex max-w-xs mb-2">
              <AiTwotonePhone className="text-gray-500" size={22} />
              +639274974670
            </li>
            <li className="flex max-w-xs mb-2">
              <MdAlternateEmail className="text-gray-500" size={22} />
              cyclecorebikeshop@gmail.com
            </li>
          </ul>

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="500"
            className="flex justify-between md:w-[75%] my-6"
          >
            <FaFacebookSquare
              size={30}
              className="hover:text-gray-500 hover:scale-110 cursor-pointer"
            />
            <FaInstagramSquare
              size={30}
              className="hover:text-gray-500 hover:scale-110 cursor-pointer"
            />
            <FaTwitterSquare
              size={30}
              className="hover:text-gray-500 hover:scale-110 cursor-pointer"
            />
            <FaGithubSquare
              size={30}
              className="hover:text-gray-500 hover:scale-110 cursor-pointer"
            />
            <FaDribbbleSquare
              size={30}
              className="hover:text-gray-500 hover:scale-110 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex justify-between mt-7">
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <h6 className="font-bebas tracking-wider font-bold text-gray-700">
              Solutions
            </h6>
            <ul>
              <li className="py-2 text-sm">Analytics</li>
              <li className="py-2 text-sm">Marketing</li>
              <li className="py-2 text-sm">Commerce</li>
              <li className="py-2 text-sm">Insights</li>
            </ul>
          </div>

          <div
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <h6 className="font-bebas tracking-wider font-bold text-gray-700">
              Products
            </h6>
            <ul>
              <li className="py-2 text-sm">Road Bike</li>
              <li className="py-2 text-sm">Mountain Bike</li>
              <li className="py-2 text-sm">Touring Bike</li>
              <li className="py-2 text-sm">Folding Bike</li>
              <li className="py-2 text-sm">Fixed Gear</li>
              <li className="py-2 text-sm">BMX</li>
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            <h6 className="font-bebas tracking-wider font-bold text-gray-700">
              Quick Links
            </h6>
            <ul>
              <li className="py-2 text-sm">
                <a href="/">Home</a>
              </li>
              <li className="py-2 text-sm">
                <a href="/shop">Shop</a>
              </li>
              <li className="py-2 text-sm">
                <a href="/customize">Customize</a>
              </li>
              <li className="py-2 text-sm">
                <a href="/faqs ">Faqs</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
