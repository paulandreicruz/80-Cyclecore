import React, { useState } from "react";
import {
  AiOutlineCaretDown,
  AiOutlineCaretUp,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { Drawer } from "@mui/material";
import { useCart } from "../../context/Cart";
import Logo from "../../assets/logo1.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import Search from "../../components/forms/SearchForm";
import { Badge } from "antd";
import CartContents from "../../pages/user/CartContents";
import { RiShieldUserLine } from "react-icons/ri";

const Navbar = () => {
  //context
  const [cart, setCart] = useCart();

  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //dropdown
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/loading");
    toast.success("Logged-Out Successfuly");
  };

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const [showCart, setShowCart] = useState(false);

  const totalQuantity = () => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <div className="text-black bg-gray-200">
      <nav className="flex justify-between items-center h-16 max-w-screen-2xl mx-auto px-4 bg-gray-200">
        {/* <h1 className='w-full text-3xl font-bold hidden md:flex text-[#00df9a]'>
        CYCLECORE
      </h1> */}

        <NavLink to="/" data-aos="fade-right" data-aos-duration="1000">
          <img src={Logo} alt="/" className="w-20" />
        </NavLink>

        <ul
          data-aos="fade-left"
          data-aos-duration="1000"
          className="hidden md:flex font-bebas items-center"
        >
          <Search />

          <NavLink to="/" className="px-4  group border-r border-[#77830b] ">
            HOME
            <div className="h-0.5 bg-[#FFA500] scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
          </NavLink>
          <NavLink
            to="/shop"
            className="px-4 py-0.5 group border-r border-[#77830b]"
          >
            SHOP
            <div className="h-0.5 bg-[#FFA500] scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
          </NavLink>
          <NavLink
            to="/select-brand"
            className="px-4 py-0.5 group border-r border-[#77830b]"
          >
            CUSTOMIZE
            <div className="font-varela h-0.5 bg-[#FFA500] scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
          </NavLink>
          <NavLink
            to="/faqs"
            className="px-4 py-0.5 group border-r border-[#77830b]"
          >
            FAQS
            <div className="h-0.5 bg-[#FFA500] scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
          </NavLink>
          <Badge
            count={totalQuantity()}
            offset={[-2, 10]}
            showZero={true}
            onClick={() => setShowCart(!showCart)}
            className="mx-3 font-bebas text-center"
            style={{
              transform: "translate(11px, -5px)",
              backgroundColor: "black",
              padding: "1.5px",
              paddingLeft: "2px",
            }}
          >
            <span className="px-2 py-1.5 group font-bebas text-sm">
              <AiOutlineShoppingCart
                fontSize={25}
                className="cursor-pointer hover:text-[#FFA500] hover:drop-shadow-lg"
              />
            </span>
          </Badge>

          {!auth?.user ? (
            <>
              <NavLink
                to="/login"
                type="button"
                className="bg-[#FFA500] tracking-wider font-bebas duration-300 px-6 py-1.5 active:scale-90 rounded-lg ml-2  hover:scale-105"
              >
                GET STARTED
              </NavLink>
            </>
          ) : (
            <div className="relative flex flex-col items-center w-[170px] rounded-lg">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                type="button"
                className="justify-between tracking-wider flex gap-1 bg-[#FFA500] font-bebas duration-300 px-6 py-1.5 active:scale-90 rounded-sm  hover:scale-105 items-center"
              >
                <RiShieldUserLine />
                {auth?.user?.firstname}
                <AiOutlineCaretDown
                  className={`${
                    !isOpen ? "duration-300" : "-rotate-180 duration-300"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="bg-white border border-gray-500 absolute flex top-12 flex-col gap-3 p-2 w-[9.5rem] items-start rounded-sm z-10">
                  <div className="flex w-full justify-between hover:bg-gray-300 flex-col p-2 gap-3 cursor-pointer rounded-lg">
                    <NavLink
                      to="/dashboard/user/profile"
                      className=" border-b border-gray-500"
                    >
                      Profile
                    </NavLink>
                  </div>
                  {auth?.user?.role === 1 ? (
                    <div className="flex w-full justify-between hover:bg-gray-300 flex-col p-2 gap-3 cursor-pointer rounded-lg">
                      <NavLink
                        to="/dashboard/admin"
                        className=" border-b border-gray-500"
                      >
                        Admin
                      </NavLink>
                    </div>
                  ) : null}
                  <div className=" flex w-full justify-between hover:bg-gray-300 flex-col p-2 gap-3 cursor-pointer rounded-lg ">
                    <NavLink to="/cart" className=" border-b border-gray-500">
                      My Cart
                    </NavLink>
                  </div>
                  {auth?.user?.role === 0 ? (
                    <div className="flex w-full justify-between hover:bg-gray-300 flex-col p-2 gap-3 cursor-pointer rounded-lg">
                      <NavLink
                        to="/dashboard/user/orders"
                        className=" border-b border-gray-500"
                      >
                        Orders
                      </NavLink>
                    </div>
                  ) : null}
                  <div className="flex w-full justify-between hover:bg-gray-300 flex-col p-2 gap-3 cursor-pointer rounded-lg border-l-white">
                    <NavLink
                      to="/"
                      onClick={logout}
                      className=" border-b border-gray-500"
                    >
                      Logout
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          )}
        </ul>

        <div onClick={handleNav} className="flex items-center gap-4 md:hidden">
          <form action="" className="relative w-max md:hidden block">
            <input
              type="search"
              name="search"
              id="search"
              className="relative peer z-10 bg-transparent w-6 rounded-lg border cursor-pointer outline-none focus:w-52 focus:border-white focus:cursor-text focus:pl-10 uppercase focus:pr-4 pl-8 duration-700 p-1"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke=""
              className="h-6 w-8 absolute left-1 inset-y-0 my-auto stroke-[#d4e253] border-r border-transparent text-white peer-focus:border-[#d4e253] peer-focus:stroke-[#d4e253]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </form>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] z-10 border-r border-r-slate-900 h-full bg-white ease-in-out duration-500 block md:hidden"
              : "block md:hidden fixed left-[-100%]"
          }
        >
          <NavLink to="/">
            <img src={Logo} alt="/" className="w-36 mx-2 mt-2" />
          </NavLink>
          <ul className="uppercase p-4 font-semibold font-pop rounded space-y-4 ">
            <li
              to="/"
              className="p-4 group border-b-[1.5px] border-b-slate-600 hover:bg-gray-300 hover:rounded-md "
            >
              <NavLink to="/">home</NavLink>
              <div className=" h-0.5 bg-black scale-x-0 w-12 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
            </li>
            <li
              to="/shop"
              className="p-4 group border-b-[1.5px] border-b-slate-600 hover:bg-gray-300 hover:rounded-md"
            >
              <NavLink to="/shop">shop</NavLink>
              <div className="h-0.5 bg-black scale-x-0 w-12 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
            </li>
            <li
              to="/select-brand"
              className="p-4 group border-b-[1.5px] border-b-slate-600 hover:bg-gray-300 hover:rounded-md"
            >
              <NavLink to="/select-brand">customize</NavLink>
              <div className="h-0.5 bg-black scale-x-0 w-[92px] group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
            </li>
            <li
              to="/faqs"
              className="p-4 group hover:bg-gray-300 hover:rounded-md"
            >
              <NavLink to="/faqs">faqs</NavLink>
              <div className="h-0.5 bg-black scale-x-0 w-12 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
            </li>

            {!auth?.user ? (
              <>
                <li
                  to="/login"
                  className="bg-cyan-400 text-white font-bebas duration-500 mt-7 px-6 py-2 hover:bg-cyan-500 rounded hover:scale-110"
                >
                  <NavLink to="/login" className="font-bebas">
                    GET STARTED
                  </NavLink>
                </li>
              </>
            ) : (
              <div className="relative flex flex-col items-center w-[200px] rounded-lg">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  type="button"
                  className=" justify-between tracking-wider flex bg-cyan-400 text-white font-bebas duration-500 px-6 py-1.5 hover:bg-cyan-500 active:scale-90 rounded-lg  hover:scale-110 items-center"
                >
                  {auth?.user?.firstname}
                  {!isOpen ? (
                    <AiOutlineCaretDown className="h-8" />
                  ) : (
                    <AiOutlineCaretUp className="h-8" />
                  )}
                </button>

                {isOpen && (
                  <div className="bg-[#fff] absolute flex top-20 flex-col p-2 w-full items-start rounded-lg border-2 border-white">
                    <div className="flex w-full justify-between hover:bg-blue-300 flex-col gap-3 cursor-pointer rounded-r-lg border-l-white">
                      <NavLink to="/user/profile">Profile</NavLink>
                    </div>
                    <div className="flex w-full justify-between hover:bg-blue-300 flex-col gap-3 cursor-pointer rounded-r-lg border-l-white">
                      <NavLink to="/user/cart">My Cart</NavLink>
                    </div>
                    <div className="flex w-full justify-between hover:bg-blue-300 flex-col gap-3 cursor-pointer rounded-r-lg border-l-white">
                      <NavLink to="/" onClick={logout}>
                        Logout
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            )}
          </ul>
        </div>
      </nav>
      <div className="mx-auto w-full bg-gray-600 h-0.5 opacity-10 shadow-bottom shadow-lg shadow-gray-800"></div>
      <Drawer
        open={showCart}
        onClose={() => setShowCart(!showCart)}
        anchor="right"
        PaperProps={{
          sx: { width: 550, background: "white", borderRadius: 0 },
        }}
      >
        <CartContents />
      </Drawer>
    </div>
  );
};

export default Navbar;
