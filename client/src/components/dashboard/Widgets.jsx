import React from "react";
import { FcHome } from "react-icons/fc";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { BiStats } from "react-icons/bi";
import { RiHandHeartLine } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";

// icons
import growth from "../../assets/growth.png";
import booking from "../../assets/booking.png";
import working from "../../assets/working.png";

export const Widgets = () => {
  //state
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);

  //hooks
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) getUsersCount();
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) getOrderCount();
  }, [auth?.token]);

  useEffect(() => {
    if (auth?.token) getSalesCount();
  }, [auth?.token]);

  const getUsersCount = async () => {
    try {
      const response = await axios.get("/users/count");
      setUserCount(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderCount = async () => {
    try {
      const response = await axios.get("/orders/count");
      setOrderCount(response.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const getSalesCount = async () => {
    try {
      const response = await axios.get("/orders/count/sales");
      setSalesCount(response.data.totalSales);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center gap-5">
        {/* TOTAL SALES */}
        <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
          <div className="w-20">
            <img src={growth} alt="" />
          </div>

          <div className="mt-3 space-y-3">
            <div className="text-xs tracking-wide">Total Sales</div>
            <div className="text-xl font-bold tracking-wide">
              {salesCount.toLocaleString("en-US", {
                style: "currency",
                currency: "PHP",
              })}
            </div>
          </div>
        </div>

        {/* TOTAL ORDERS */}
        <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
          <div className="w-20">
            <img src={booking} alt="" />
          </div>

          <div className="mt-3 space-y-3">
            <div className="text-xs tracking-wide">Total Orders</div>
            <div className="text-xl font-bold tracking-wide">
              {orderCount} orders
            </div>
          </div>
        </div>

        {/* TOTAL USERS */}
        <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
          <div className="w-20">
            <img src={working} alt="" />
          </div>

          <div className="mt-3 space-y-3">
            <div className="text-xs tracking-wide">Total Users</div>
            <div className="text-xl font-bold tracking-wide">
              {userCount} users
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// OLD

{
  /* <div className='flex tracking-wider font-bold gap-1 text-3xl mb-5'>
            <FcHome/> DASHBOARD
          </div>

          <div>

            <div className='text-white flex justify-between'>
              <div className='p-2 text-2xl bg-gradient-to-r from-[#ff9966] to-[#ff5e62] space-y-5 rounded-md shadow-2xl'>
                <h1 className='flex justify-between items-center tracking-wide '>Total Sales <BiStats fontSize={70}/></h1>
                <h1 className='text-5xl'>{salesCount.toLocaleString("en-US", {style: "currency", currency: "PHP",})}</h1>
              </div>

              <div className='p-6 text-2xl bg-gradient-to-r from-[#ff9966] to-[#ff5e62] w-[30%] space-y-5 rounded-md shadow-2xl'>
                <h1 className='flex justify-between items-center tracking-wide '>total Orders <RiHandHeartLine fontSize={70}/></h1>
                <h1 className='text-5xl'>{orderCount} total orders</h1>
                <NavLink to="/dashboard/admin/orders">
                    <span className='text-sm tracking-wider hover:underline text-yellow-200'>See All Orders</span>
                </NavLink>
              </div>

              <div className='p-6 text-2xl bg-gradient-to-r from-[#ff9966] to-[#ff5e62] w-[30%] space-y-5 rounded-md shadow-2xl'>
                <h1 className='flex justify-between items-center tracking-wide '>Total Users <FaUserSecret fontSize={70}/></h1>
                <h1 className='text-5xl'>{userCount} users</h1>
                <NavLink to="/dashboard/admin/user/list">
                    <span className='text-sm tracking-wider hover:underline text-yellow-200'>See All Users</span>
                </NavLink>
              </div>
            </div> */
}
