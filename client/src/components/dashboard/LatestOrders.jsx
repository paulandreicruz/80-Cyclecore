import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoBalloonSharp } from "react-icons/io5"

export const LatestOrders = () => {
  const [latestOrder, setLatestOrder] = useState([]);

  useEffect(() => {
    getFiveLatest();
  }, []);

  const getFiveLatest = async () => {
    try {
      const response = await axios.get("/latestorder");
      setLatestOrder(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-white p-4 border-b tracking-wide font-bold text-lg flex items-center gap-1">
        Recent Orders
        <IoBalloonSharp className="text-sky-600"/>
      </div>

      <div className="bg-white py-4 px-4 text-sm font-bold tracking-wider shadow-md">
        <table className="w-full h-[21rem]">
            <thead className="border-b border-gray-300">
              <tr className="border-b border-gray-300">
                <td>Order #</td>
                <td>Product</td>
                <td>user</td>
                <td>price</td>
                <td>email</td>
              </tr>
            </thead>
            {latestOrder?.map((o) => (
              <tbody key={o._id}>
                {o?.products?.map((p, i) => (
                  <tr key={i} className="border-b border-gray-300">
                    <td>{o?.ordernumber}</td>

                    <td key={i}>{p.name}</td>

                    <td>
                      {o?.buyer?.firstname} {o?.buyer?.lastname}
                    </td>

                    <td>
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>

                    <td>{o?.buyer?.email}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
      </div>
    </>
  );
};


// OLD
{/* <h1 className="text-3xl font-bold tracking-wider">
            LATEST ORDERS
        </h1>
      <div>
        <table className="w-[40rem] h-[21rem]">
          <thead className="border-b-2 border-gray-600">
            <tr className="border-b-2 border-gray-600">
              <td>Order #</td>
              <td>Product</td>
              <td>user</td>
              <td>price</td>
              <td>email</td>
            </tr>
          </thead>
          {latestOrder?.map((o) => (
            <tbody key={o._id}>
              {o?.products?.map((p, i) => (
                <tr key={i} className="border-b-2 border-gray-600">
                  <td>{o?.ordernumber}</td>

                  <td key={i}>{p.name}</td>

                  <td>
                    {o?.buyer?.firstname} {o?.buyer?.lastname}
                  </td>

                  <td>
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </td>

                  <td>{o?.buyer?.email}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div> */}