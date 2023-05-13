import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useAuth } from "../../context/Auth";

// icons
import { IoBalloonSharp, IoCaretBackCircleSharp } from "react-icons/io5";
import { MdOutlineCategory, MdPedalBike } from "react-icons/md";
import {
  BsController,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
// import { TbBrandLoom } from 'react-icons/tb';
import {
  BiCategory,
  BiChevronRight,
  BiCircle,
  BiShapePolygon,
} from "react-icons/bi";
import { GiBasketballBall, GiStoneBlock } from "react-icons/gi";
import { FaHome, FaMailchimp, FaPiggyBank, FaUserSecret } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

import logo from "../../assets/logo3.png";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { RiShapeLine } from "react-icons/ri";
import { SiDgraph } from "react-icons/si";
import { AiFillCaretRight, AiFillControl, AiOutlineApi } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboardSideBar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [openOrders, setOpenOrders] = useState(false);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login-loader");
    toast.success("logged-out successfully!");

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  // states
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [dialog, setDialog] = useState(false);
  const { pathname } = useLocation();

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="flex flex-col h-screen font-bebas"
    >
      <div
        className={`${
          !open ? "w-72" : "w-20"
        } flex flex-col h-[70rem] bg-[#455160] relative transition-all duration-1000 ease-in-out`}
      >
        {/* container of the upper part */}
        <div className="flex-1">
          <div>
            <AiFillCaretRight
              fontSize={50}
              className={`${
                !open && "rotate-180 top-[1.3rem]"
              } transition-all ease-in-out duration-500 absolute -right-[1.5rem] top-[0rem] hover:cursor-pointer text-gray-200`}
            />

            <div
              className={`py-1 px-4 text-white text-2xl tracking-widest bg-[#3f4a59] flex justify-between items-center`}
            >
              <div
                className={`${
                  open && "scale-x-0 absolute translate-x-28 duration-1000"
                } transition-all duration-500 ease-in-out origin-right`}
              >
                cyclecore<span className="font-bold">admin.</span>
              </div>

              <NavLink to="/">
                <img src={logo} alt="" className={`w-12 mr-2`} />
              </NavLink>
            </div>
          </div>

          {/* container of home */}
          <div className={`space-y-5 mt-7`}>
            {!open ? (
              <div className="flex items-center ml-6 text-slate-300">
                <h1 className="flex-1 tracking-wider text-[10.5px]">Home</h1>
                <h1 className="tracking-[3px] text-[10.5px]">
                  -----------------------------------
                </h1>
              </div>
            ) : null}

            <NavLink
              to="/dashboard/admin"
              className={`${
                ["/dashboard/admin"].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:bg-[#3f4a59]"
              } flex items-center text-white  hover:cursor-pointer py-1`}
            >
              {!open ? (
                <h1 className="flex-1 ml-6 text-xl font-bold tracking-widest">
                  Dashboard
                </h1>
              ) : null}

              <div
                className={`${
                  open ? "mx-auto" : "mr-3"
                } p-2.5 bg-[#00000017] rounded-md `}
              >
                <FaHome />
              </div>
            </NavLink>
          </div>

          {open ? <div className="h-[1px] bg-[#747d8a] mt-5" /> : null}

          {/* Container Of Admin Products */}
          <div className="mt-5 transition-all ease-in-out duration-1000 ">
            {!open ? (
              <div className="flex items-center ml-6 text-slate-300 mb-3">
                <h1 className="flex-1 tracking-wider text-[10.5px]">
                  Products
                </h1>
                <h1 className="tracking-[3px] text-[10.5px]">
                  -----------------------------------
                </h1>
              </div>
            ) : null}

            <div
              className={`${
                [
                  "/dashboard/admin/category",
                  "/dashboard/admin/subcategory",
                  "/dashboard/admin/brand",
                  "/dashboard/admin/stocks",
                  "/dashboard/admin/products",
                ].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:bg-[#3f4a59]"
              } ${
                openProduct && "bg-[#455160]"
              } py-1 flex items-center  hover:cursor-pointer text-white`}
              onClick={() => setOpenProduct(!openProduct)}
            >
              <h1 className="ml-6 flex-1 text-xl font-bold tracking-widest">
                Product Management
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    openProduct && "rotate-90"
                  } transition-all duration-700 ease-in-out`}
                >
                  <BiChevronRight />
                </div>
                <div className="p-2.5 bg-[#00000017] rounded-md mr-3">
                  <AiFillControl />
                </div>
              </div>
            </div>

            {/* bg-[#455160] */}

            <ul
              className={`${
                !openProduct && "scale-y-0 my-0 py-0 h-0"
              } overflow-hidden transition-all duration-700 ease-in-out origin-top bg-[#505b6996]`}
            >
              <li>
                <NavLink
                  to="/dashboard/admin/category"
                  className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Category
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/category" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin/subcategory"
                  className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Sub-Category
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/subcategory" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin/brand"
                  className={` flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Brands
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/brand" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin/products"
                  className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Product Lists
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/products" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Container Of Admin Orders */}
          <div className="transition-all duration-1000 ease-in-out z-10 overflow-hidden">
            <div className="flex items-center ml-6 text-slate-300">
              <h1 className="flex-1 tracking-wider text-[10.5px]">Orders</h1>
              <h1 className="tracking-[3px] text-[10.5px]">
                -----------------------------------
              </h1>
            </div>

            <div
              className={`${
                ["/dashboard/admin/orders"].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:hover:bg-[#3f4a59]"
              } ${
                openProduct && "bg-[#455160]"
              } py-1 flex items-center hover:cursor-pointer text-white`}
              onClick={() => setOpenOrder(!openOrder)}
            >
              <h1 className="ml-6 flex-1 text-xl font-bold tracking-widest">
                Order Management
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    openOrder && "rotate-90"
                  } transition-all duration-700 ease-in-out`}
                >
                  <BiChevronRight />
                </div>
                <div className="p-2.5 bg-[#00000017] rounded-md mr-3">
                  <MdPedalBike />
                </div>
              </div>
            </div>

            <ul
              className={`${
                !openOrder && "max-h-0 scale-y-0"
              } duration-700 ease-in-out origin-top bg-[#505b6996]`}
            >
              <li>
                <NavLink
                  to="/dashboard/admin/orders"
                  className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 text-base font-bold tracking-widest">
                      Order Lists
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/orders" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* container of User Management */}
          <div className="transition-all duration-500 ease-in-out overflow-hidden z-20">
            <div className="flex items-center ml-6 text-slate-300">
              <h1 className="flex-1 tracking-wider text-[10.5px]">Users</h1>
              <h1 className="tracking-[3px] text-[10.5px]">
                -----------------------------------
              </h1>
            </div>

            <div
              className={`${
                ["/dashboard/admin/users/list"].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:hover:bg-[#3f4a59]"
              } ${
                openUser && "bg-[#455160]"
              } py-1 flex items-center hover:cursor-pointer text-white`}
              onClick={() => setOpenUser(!openUser)}
            >
              <h1 className="ml-6 flex-1 text-xl font-bold tracking-widest">
                User Management
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className={`${
                    openUser && "rotate-90"
                  } transition-all duration-700 ease-in-out`}
                >
                  <BiChevronRight />
                </div>
                <div className="p-2.5 bg-[#00000017] rounded-md mr-3">
                  <FaUserSecret />
                </div>
              </div>
            </div>

            <ul
              className={`${
                !openUser && "scale-y-0 max-h-0"
              } transition-all duration-700 ease-in-out origin-top bg-[#505b6996]`}
            >
              <li>
                <NavLink
                  to="/dashboard/admin/users/list"
                  className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 text-base font-bold tracking-widest">
                      User Lists
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/users/list" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* container of  stock management */}
          <div className="transition-all duration-500 ease-in-out overflow-hidden z-20">
            <div className="flex items-center ml-6 text-slate-300">
              <h1 className="flex-1 tracking-wider text-[10.5px]">Stocks</h1>
              <h1 className="tracking-[3px] text-[10.5px]">
                -----------------------------------
              </h1>
            </div>

            <div
              className={`${
                [
                  "/dashboard/admin/stocks/new",
                  "/dashboard/admin/stocks/add",
                ].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:bg-[#3f4a59]"
              } ${
                openStock && "bg-[#455160]"
              } py-1 flex items-center hover:cursor-pointer text-white`}
              onClick={() => setOpenStock(!openStock)}
            >
              <h1 className="ml-6 flex-1 text-lg font-bold tracking-widest">
                Inventory Management
              </h1>

              <div className="flex items-center gap-2">
                <div
                  className={`${
                    openStock && "rotate-90"
                  } transition-all duration-700 ease-in-out`}
                >
                  <BiChevronRight />
                </div>
                <div className="p-2.5 bg-[#00000017] rounded-md mr-3">
                  <GiStoneBlock />
                </div>
              </div>
            </div>

            <ul
              className={`${
                !openStock && "scale-y-0 max-h-0"
              } transition-all duration-500 ease-in-out origin-top bg-[#505b6996]`}
            >
              <li>
                <NavLink
                  to="/dashboard/admin/stocks/add"
                  className={` flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Add Stocks
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/stocks/add" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin/stocks/new"
                  className={` flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Stock History
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/stocks/new" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* container of sales management */}
          <div className="transition-all duration-500 ease-in-out overflow-hidden z-20">
            <div className="flex items-center ml-6 text-slate-300">
              <h1 className="flex-1 tracking-wider text-[10.5px]">Sales</h1>
              <h1 className="tracking-[3px] text-[10.5px]">
                -----------------------------------
              </h1>
            </div>

            <div
              className={`${
                ["/dashboard/admin/sales/management"].includes(pathname)
                  ? "bg-[#33cabb] hover:bg-[#33cabb]"
                  : "hover:bg-[#3f4a59]"
              } ${
                openSale && "bg-[#455160]"
              } py-1 flex items-center hover:cursor-pointer text-white`}
              onClick={() => setOpenSale(!openSale)}
            >
              <h1 className="ml-6 flex-1 text-xl font-bold tracking-widest">
                Sales Management
              </h1>

              <div className="flex items-center gap-2">
                <div
                  className={`${
                    openSale && "rotate-90"
                  } transition-all duration-700 ease-in-out`}
                >
                  <BiChevronRight />
                </div>
                <div className="p-2.5 bg-[#00000017] rounded-md mr-3">
                  <FaPiggyBank />
                </div>
              </div>
            </div>

            <ul
              className={`${
                !openSale && "scale-y-0"
              } transition-all duration-700 ease-in-out origin-top bg-[#505b6996]`}
            >
              <li>
                <NavLink
                  to="/dashboard/admin/sales/management"
                  className={` flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
                >
                  {!open ? (
                    <h1 className="flex-1 ml-6 font-bold tracking-widest">
                      Sales History
                    </h1>
                  ) : null}

                  <div className={`${open ? "mx-auto" : "mr-5"}`}>
                    <BiCircle
                      fontSize={10}
                      className={`${
                        pathname === "/dashboard/admin/sales/management" &&
                        "text-[#33cabb] bg-[#33cabb]"
                      } rounded-full`}
                    />
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-[1px] bg-[#747d8a] my-5" />
        {/* container of lower part */}
        <div className="mb-5">
          <div
            to="/login"
            onClick={() => setDialog(true)}
            className={`flex items-center text-white hover:bg-[#3f4a59] hover:cursor-pointer py-1`}
          >
            {!open ? (
              <h1 className="flex-1 ml-8 text-xl font-bold tracking-widest">
                Logout
              </h1>
            ) : null}

            <div
              className={`${
                open ? "mx-auto" : "mr-3"
              } p-2.5 bg-[#00000017] rounded-md `}
            >
              <AiOutlineApi />
            </div>
          </div>
        </div>

        {/* dialog */}
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>
            <span className="font-bebas tracking-wider font-bold">
              CYCLECORE
            </span>
          </DialogTitle>
          <DialogContent>
            <span className="font-bebas font-bold text-2xl tracking-wider">
              Are You Sure You Want To Logout?
            </span>
          </DialogContent>
          <DialogActions className="gap-2">
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={logout}
            >
              <span className="font-bebas text-xl font-bold">Yes</span>
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => setDialog(false)}
            >
              <span className="font-bebas text-xl font-bold">No</span>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboardSideBar;
