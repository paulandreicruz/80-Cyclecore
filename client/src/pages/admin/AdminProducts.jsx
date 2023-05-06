import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

//components
import { Card, Space } from "antd";
import { DialogActions, DialogTitle, Grid, InputLabel } from "@mui/material";

//icons
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import {
  IoArrowBackCircleOutline,
  IoCreateOutline,
  IoFish,
} from "react-icons/io5";
import { TbDotsVertical, TbListDetails } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { Button, Paper } from "@mui/material";
import { TiArrowBack, TiEdit, TiPrinter } from "react-icons/ti";
import { GiNewShoot } from "react-icons/gi";
import { BiListPlus } from "react-icons/bi";
import { BsPlus } from "react-icons/bs";

export default function AdminProducts() {
  const { Meta } = Card;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {}
  };

  return (
    <div className="font-bebas bg-gray-200 h-screen px-10 py-5">
      <div className="mx-auto">
        <div className="py-2 px-4 bg-white border-b flex items-center justify-between">
          <div className="flex gap-1 items-center text-3xl">
            <h1 className="font-bold tracking-wider">Product Management</h1>
            <IoFish className="text-sky-500" />
          </div>

          <div>
            <NavLink to="/dashboard/admin">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                startIcon={<TiArrowBack />}
              >
                <span className="tracking-wider text-lg font-bebas font-bold">
                  Back
                </span>
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="bg-white p-4 shadow-lg">
          <table className="border w-full">
            <thead className="text-xl tracking-wide border-b">
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Product</th>
                <th className="p-2">Category</th>
                <th className="p-2">Sub-Category</th>
                <th className="p-2">Brand</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Price</th>
                <th className="p-2">
                  <div className="hover:cursor-pointer hover:text-yellow-500 w-[25px] flex text-[#088178] underline">
                    <NavLink
                      to="/dashboard/admin/products/create"
                      className="flex"
                    >
                      <span>Add</span> <BsPlus />
                    </NavLink>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {products?.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-2">
                    <div className="flex gap-1">
                      <div>
                        <img
                          src={`${
                            import.meta.env.VITE_APP_REACT_APP_API
                          }/product/photo/${p._id}`}
                          alt=""
                          className="w-16"
                        />
                      </div>

                      <div>
                        <div className="tracking-wide">{p.name}</div>
                        <div className="flex items-center gap-1">
                          <InputLabel>
                            <div className="text-[11px] font-bebas">
                              {p._id}
                            </div>
                          </InputLabel>
                          <div className="w-[1px] h-2.5 mb-1 bg-gray-400" />
                          <InputLabel>
                            <div className="text-[11px] font-bebas">
                              {moment(p.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss"
                              )}
                            </div>
                          </InputLabel>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-2">{p.category.name}</td>

                  <td className="p-2">{p.subcategory.name}</td>

                  <td className="p-2">{p.brand.name}</td>

                  <td className="p-2">
                    <div>
                      {p.stocks === 0 ? (
                        <div className="p-0.5 rounded-sm bg-[#ffdcdc] text-[#900] w-[82px] text-center">
                          Out Of Stock
                        </div>
                      ) : (
                        <div className="p-0.5 rounded-sm bg-[#def2d0] text-[#245900] w-[82px] text-center">
                          {p.stocks} In Stocks
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="p-2">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>

                  <td className="p-2">
                    <div className="p-1 w-[27px] rounded-sm hover:bg-gray-100 hover:cursor-pointer">
                      <NavLink
                        className="text-lg"
                        to={`/dashboard/admin/product/update/${p.slug}`}
                      >
                        <TbDotsVertical />
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
