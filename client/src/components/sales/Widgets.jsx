import React, { useEffect, useState } from "react";
import bicycle from "../../assets/bicycle.png";
import day7 from "../../assets/7-days.png";
import daily from "../../assets/daily-calendar.png";
import axios from "axios";
import SalesChart from "./SalesChart";
import { TopSelling } from "../sales/TopSelling";
import { useAuth } from "../../context/Auth";
import moment from "moment";

export const Widgets = () => {
  // states
  const [salesCount, setSalesCount] = useState(0);
  const [dailySalesCount, setDailySalesCount] = useState(0);
  const [thisWeekSales, setThisWeekSales] = useState(0);
  const [accumulatedOrders, setAccumulatedOrders] = useState([]);

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) getSalesCount();
  }, [auth?.token]);

  useEffect(() => {
    const getDailySalesCount = async () => {
      try {
        const response = await axios.get("/daysales");
        const data = response.data.totalSales;
        const currentDaySales = data.length > 0 ? data[0].total : 0;
        const orders = data.length > 0 ? data[0].orders : [];
        setDailySalesCount(currentDaySales);
        setAccumulatedOrders(orders);
      } catch (error) {
        console.error(error);
      }
    };

    getDailySalesCount();
  }, []);

  useEffect(() => {
    const fetchWeeklydata = async () => {
      try {
        const response = await axios.get("/weeklysales");
        setThisWeekSales(response.data.thisWeekSales);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeeklydata();
  }, []);

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
      <div className="font-bebas py-5 px-10 bg-gray-200 h-full space-y-10">
        <div className="flex gap-5">
          {/* Total */}
          <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
            <div className="w-20">
              <img src={bicycle} alt="" />
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

          {/* Weekly */}
          <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
            <div className="w-20">
              <img src={day7} alt="" />
            </div>

            <div className="mt-3 space-y-3">
              <div className="text-xs tracking-wide">Weekly Sales</div>
              <div className="text-xl font-bold tracking-wide">
                {thisWeekSales.toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
              </div>
            </div>
          </div>

          <div className="bg-white flex items-center justify-between w-[40%] p-2.5 shadow-md rounded-sm">
            <div className="w-20">
              <img src={daily} alt="" />
            </div>

            <div className="mt-3 space-y-3">
              <div className="text-xs tracking-wide">Daily Sales</div>
              <div className="text-xl font-bold tracking-wide">
                {dailySalesCount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "PHP",
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <SalesChart />
        </div>

        <div>
          <TopSelling />
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Total Price</th>
              <th>Total quantity</th>
            </tr>
          </thead>
          <tbody>
            {accumulatedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.ordernumber}</td>
                <td>{order.totalPrice}</td>
                <td>{order.totalQuantity}</td>
                <td>
                  {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
