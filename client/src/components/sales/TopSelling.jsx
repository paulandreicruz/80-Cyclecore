import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import moment from "moment";

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
      <div className="w-full shadow-md">
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
            <thead className="border-b bg-gray-100 tracking-wide text-xl">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Sold</th>
              </tr>
            </thead>
            {topSelling.map((t) => (
              <>
                <tbody key={t._id} className="border-b font-bold tracking-wide">
                  <tr>
                    <td className="p-2 w-[33%]">
                      <div className="flex items-center gap-1">
                        <img
                          src={`${
                            import.meta.env.VITE_APP_REACT_APP_API
                          }/product/photo/${t._id}`}
                          alt=""
                          className="rounded-md w-[15%]"
                        />
                        {t.name}
                      </div>
                    </td>
                    <td className="p-2 w-[33%]">
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

        {/* {topSelling.map((t) => (
                <div key={t._id} className='bg-white px-4 py-2'>
                    <table>
                        <thead>
                            <tr>
                                <th>PRODUCT</th>
                                <th>SOLD</th>
                            </tr>
                        </thead>
                    {t?.products?.map((p) => (
                        <>
                            <tbody>
                                <tr>
                                    <td><img src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${p._id}`} alt="" /></td>
                                    <td>{p.name}</td>
                                    <td>asdasd</td>
                                </tr>
                            </tbody>
                        </>
                    ))}              
                    </table>
                </div>
            ))} */}
      </div>
    </>
  );
};
