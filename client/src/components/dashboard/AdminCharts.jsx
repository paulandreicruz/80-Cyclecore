import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { FcComboChart } from "react-icons/fc";

export const AdminCharts = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [stocksCount, setStocksCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [chartData, setChartData] = useState(null);

  const [auth, setAuth] = useAuth();

  useEffect(() => {
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

    const getStocksCount = async () => {
      try {
        const response = await axios.get("/totalstocks");
        setStocksCount(response.data.totalStocks);
      } catch (err) {
        console.log(err);
      }
    };

    const getSoldCount = async () => {
      try {
        const response = await axios.get("/totalsold");
        setSoldCount(response.data.totalSold);
      } catch (err) {
        console.log(err);
      }
    };

    // const getSalesCount = async () => {
    //   try {
    //     const response = await axios.get("/orders/count/sales");
    //     setSalesCount(response.data.totalSales);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    if (auth?.token) {
      getUsersCount();
      getOrderCount();
      getStocksCount();
      getSoldCount();
      // getSalesCount();
    }
  }, [auth?.token]);

  useEffect(() => {
    const chartData = {
      series: [
        {
          name: "Total Stocks",
          data: [stocksCount],
        },
        {
          name: "Total Sold",
          data: [soldCount],
        },
        {
          name: "Total Orders",
          data: [orderCount],
        },
        {
          name: "Total Users",
          data: [userCount],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "Total Stocks",
            "Total Sold",
            "Total Orders",
            "Total Users",
          ],
        },
      },
    };

    setChartData(chartData);
  }, [userCount, orderCount, stocksCount, soldCount]);

  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div className="w-[100%]">
      <div className="bg-white p-4 border-b tracking-wide font-bold text-lg flex items-center gap-1">
        Combined Graphs
        <FcComboChart />
      </div>
      <div className="flex justify-center bg-white shadow-md">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width={700}
        />
      </div>
    </div>
  );
};
