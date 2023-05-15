import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

export const TopSelling = () => {
  const [topSelling, setTopSelling] = useState([]);

  useEffect(() => {
    getTopSelling();
  }, []);

  const getTopSelling = async () => {
    try {
      const response = await axios.get("/hottestproducts");
      setTopSelling(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-[30rem] shadow-md">
        <div className="border-b bg-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1 font-bold text-lg tracking-wide">
            Recent Sold
            <BsFillPiggyBankFill className="text-yellow-500" />
          </div>
          <NavLink to="/dashboard/admin/products">
            <button className="px-1.5 border-2 border-gray-400 hover:border-gray-500 rounded-full font-bold tracking-wide">
              View Products
            </button>
          </NavLink>
        </div>
        <div className="p-4 bg-white">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-100 tracking-wide">
              <tr>
                <td>Product</td>
                <td>Sold</td>
              </tr>
            </thead>
            {topSelling.map((t) => (
              <>
                <tbody key={t._id} className="border-b font-bold tracking-wide">
                  <tr>
                    <td className="flex items-center gap-2">
                      <img
                        src={`${
                          import.meta.env.VITE_APP_REACT_APP_API
                        }/product/photo/${t._id}`}
                        alt=""
                        className="rounded-md w-[17%]"
                      />
                      {t.name}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        {t.sold} <span>sold</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};
