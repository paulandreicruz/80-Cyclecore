import React, { useEffect, useState } from 'react'
import bicycle from "../../assets/bicycle.png"
import day7 from "../../assets/7-days.png"
import daily from "../../assets/daily-calendar.png"
import axios from 'axios';
import SalesChart from './SalesChart';
import {TopSelling} from "../sales/TopSelling"

export const Widgets = () => {

    // states
    const [salesCount, setSalesCount] = useState(0);
    const [dailySalesCount, setDailySalesCount] = useState(0);
    const [weeklySales, setWeeklySales] = useState(0);

    // useEffect
    useEffect(() => {
        getSalesCount();
      }, []);

    
    useEffect(() => {
    const getDailySalesCount = async () => {
        try {
        const response = await axios.get("/daysales");
        const data = response.data.totalSales;
        const currentDaySales = data.length > 0 ? data[0].total : 0
        setDailySalesCount(currentDaySales);
        } catch (error) {
        console.error(error);
        }
    };

    getDailySalesCount();
    }, []);
    
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
            const response = await axios.get("/weeklysales");
            const data = response.data.salesByDay;
            const currentWeekSales = Object.values(data)[0];
            setWeeklySales(currentWeekSales);
            } catch (error) {
            console.error(error);
            }
        };
    
        fetchSalesData();
        }, []);

    // controller
    const getSalesCount = async () => {
        try {
          const response = await axios.get("/orders/count/sales");
          setSalesCount(response.data.totalSales);
        } catch (err) {
          console.log(err);
        }
      };

    // const getDailySalesCount = async () => {
    // try {
    //     const response = await axios.get("/daysales");
    //     const data = response.data.salesByDay;
    //     const currentDaySales = data.length > 0 ? data[0].total : 0;
    //     setDailySalesCount(currentDaySales);
    // } catch (err) {
    //     console.log(err);
    // }
    // };

    

  return (
    <>
        <div className='font-bebas py-5 px-10 bg-gray-200 h-full space-y-10'>

            <div className='flex gap-5'>
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
                    {weeklySales.toLocaleString("en-US", {
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
                        <div className="text-xs tracking-wide">Total Sales</div>
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
                <SalesChart/>
            </div>

            <div>
                <TopSelling/>
            </div>
            
        </div>
    </>
  )
}



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Widgets() {
//   const [totalSales, setTotalSales] = useState(0);

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         const response = await axios.get("/daysales");
//         const data = response.data.totalSales;
//         const currentDaySales = data.length > 0 ? data[0].total : 0;
//         setTotalSales(currentDaySales);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSalesData();
//   }, []);

//   return (
//     <div>
//       <h2>Total Sales By Week</h2>
//       <p>Current week's sales: {totalSales}</p>
//     </div>
//   );
// }

// export default Widgets;