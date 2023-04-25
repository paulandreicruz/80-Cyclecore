import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import images from "../../image";
import paper from "../../assets/paper.png";
import { NavLink } from "react-router-dom";
import CustomShopCard from "../cards/CustomShopCard";
import axios from 'axios';
import { CiShoppingTag } from "react-icons/ci"

import { Grid, Box } from '@mui/material';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div className="bg-cover bg-no-repeat bg-gray-200">
      <div
        data-aos="slide-right"
        data-aos-duration="1000"
        data-aos-delay="500"
        className="px-10"
      >
        <img
          src={paper}
          alt=""
          className="w-full h-60"
        />
      </div>
      <div className="my-[5%] mx-[20%]">
        <motion.div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="flex justify-center items-center h-full mb-6"
        >
          <motion.div className="text-white text-5xl">
            <motion.p className="text-[#FFA500] font-semibold font-bebas tracking-widest">
              <span>
                <i className="fa-solid fa-fire fa-shake text-orange-600 text-6xl"></i>
              </span>
              Hottest Product This Month
              <span>
                <i className="fa-solid fa-fire fa-shake text-orange-600 text-6xl"></i>
              </span>
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="300"
          ref={carousel}
          className="carousel cursor-grab overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="inner-carousel flex space-x-4"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="item min-h-[20rem] min-w-[20rem] "
              >
                <img
                  key={image.id}
                  src={image}
                  alt=""
                  className="w-[25rem] h-[20rem] rounded-2xl pointer-events-none relative mx-auto my-4"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
       
      </div>
      <div>
          <div
            className="flex items-center justify-center mt-4"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <p className="font-bebas tracking-widest">Start shopping with us now</p>
          </div>

          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <button
              type="button"
              className="bg-[#FFA500] hover:scale-105 font-bebas tracking-widest duration-300 rounded my-5 py-2 w-40 cursor-pointer active:scale-90 flex items-center justify-center gap-1"
            >
              <NavLink to="/shop">SHOP NOW!</NavLink>
              <CiShoppingTag />
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductSlider;
