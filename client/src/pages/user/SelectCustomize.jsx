import React from "react";
import { NavLink } from "react-router-dom";
import specialized from "../../assets/bikeBrand/Specialized.jpg";
import exploro from "../../assets/bikeBrand/3t.jpg";
import wilier from "../../assets/bikeBrand/Wilier.jpg";
import Navbar from "../../global/nav/Navbar";

export const SelectCustomize = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-200 h-screen py-10">
        <div className="font-bebas space-y-5 px-10 mb-10">
          <p className="text-2xl font-bold">
            See your dream bike come to life! From visualization to building and
            delivery, we've got you covered.
          </p>

          <p>
            Ready to kickstart the build? Choose your preferred bike brand from
            the selection below.
          </p>
        </div>

        <div class="relative">
          <div class="absolute inset-0 bg-[#2d2d2d] backdrop-blur-sm opacity-80"></div>
          <div class="relative z-10 p-8">
            <div className="flex items-center justify-center gap-10 z-10">
              <NavLink to="/specialized">
                <div className="border-4 rounded-md hover:border-orange-500 border-gray-500">
                  <img
                    src={specialized}
                    alt=""
                    className="h-48 w-48 object-contain"
                  />
                </div>
              </NavLink>
              <NavLink to="/exploro">
                <div className="border-4 rounded-md hover:border-orange-500 border-gray-500">
                  <img src={exploro} alt="" className="h-[12rem] w-48" />
                </div>
              </NavLink>
              <NavLink to="/willer">
                <div className="border-4 rounded-md hover:border-orange-500 border-gray-500">
                  <img
                    src={wilier}
                    alt=""
                    className="h-48 w-48 object-contain"
                  />
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        {/* <div className="bg-[#2d2d2d] absolute w-full">
        <div className="p-5 relative">
            
        </div>
        </div> */}
      </div>
    </>
  );
};
