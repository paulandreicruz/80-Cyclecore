import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function SalesChart() {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    axios.get("/sales").then((response) => {
      setMonthlySales(response.data.monthlySales);
    });
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = {
    series: [
      {
        name: "Sales for this Month",
        data: monthlySales.map((sale) => sale.totalSales),
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 300,
      },
      xaxis: {
        categories: monthlySales.map((sale) => months[sale._id - 1]),
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return "₱" + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="area"
      height={280}
    />
  );
}

export default SalesChart;