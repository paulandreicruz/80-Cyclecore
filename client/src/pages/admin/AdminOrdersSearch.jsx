import React from "react";
import { useSearch } from "../../context/Search";
import OrdersCard from "../../components/cards/OrdersCard";
import noData from "../../assets/smartphone.png"
import { NavLink } from "react-router-dom";

export const AdminOrdersSearch = () => {
  //context
  const [values, setValues] = useSearch();

  // inside your component

  return (
    <div>
      {values.results && values.results.length > 0 ? (
        <div>
          {values.results.map((o) => (
            <div key={o._id}>
              <OrdersCard o={o} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-200 h-screen py-24 px-10 font-bebas space-y-8">
          <div className="place-content-center flex w-[50%] mx-auto"><img src={noData} alt="" /></div>
          <div className="font-bold text-5xl tracking-wider text-center text-red-500">Data Not Found!</div>
          <div className="text-center max-w-xl mx-auto text-gray-700"><span className="font-bebas">We apologize, but the system was unable to find any records that match your search criteria. Despite our best efforts, we were unable to retrieve any data that corresponds to your query. As a result, we regret to inform you that we are currently unable to present any results that meet your needs.</span></div>
          <div className="flex justify-center">
            <NavLink to= "/dashboard/admin/orders">
              <button className="p-2 w-40 text-white text-base tracking-[1.5px] font-medium bg-[#3b82f6] hover:bg-[#639cf7] rounded-sm">BACK</button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
