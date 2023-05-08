import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import inventory from "../../assets/inventory.png";
import wallet from "../../assets/wallet.png";
import moment from "moment";
import { TotalStocks } from "../../components/stock/TotalStocks";

const MonthlyData = () => {
  const [monthlyData, setMonthlyData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    console.log("selectedMonth:", selectedMonth);
    console.log("selectedYear:", selectedYear);
    console.log("monthlyData:", monthlyData);
    const fetchMonthlyData = async () => {
      const response = await axios.get(
        `/products/total-stocks?year=${selectedYear}&month=${selectedMonth}`
      );
      setMonthlyData(response.data);
    };

    if (selectedMonth && selectedYear) {
      fetchMonthlyData();
    }
  }, [selectedMonth, selectedYear]);

  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 h-screen px-20 py-10 font-bebas">
      <TotalStocks />

      <div className="bg-white shadow-lg py-2 px-4 border-b flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-wide">Inventory</h1>
        <button
          className="p-2 hover:text-yellow-500"
          onClick={() => navigate("/dashboard/admin/stocks/add")}
        >
          <GiReturnArrow />
        </button>
      </div>

      <div className="p-4 bg-white shadow-lg space-y-4">
        <div className="flex items-center gap-5">
          <div>
            <label htmlFor="month-select">Month:</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="">Select month</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>

          <div>
            <label htmlFor="year-select">Year:</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="">Select year</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>
        </div>

        {selectedMonth === "" || selectedYear === "" ? (
          <div className="space-y-3">
            <div className="flex justify-center">
              <img src={inventory} alt="" className="w-52" />
            </div>
            <div className="font-bold text-2xl text-center">
              Select Month & Year
            </div>
            <div className="text-gray-600 max-w-xs text-center mx-auto">
              <h2>
                Please specify the desired month and year to generate a report
                containing the data for newly added stock of each product.
              </h2>
            </div>
          </div>
        ) : (
          <div>
            {monthlyData && Object.keys(monthlyData).length ? (
              // display stock history table
              <table className="border w-full">
                <thead className="text-xl tracking-wide border-b text-left">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2">Stocks Added</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(monthlyData).map(
                    ([productName, productData]) => (
                      <tr key={productName} className="border-b">
                        <td className="p-2">
                          <div className="flex gap-1">
                            <div>
                              <img
                                src={productData.photoUrl}
                                alt=""
                                className="w-20"
                              />
                            </div>
                            <div>{productName}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          {productData.value} added stocks
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              // display "no stocks added" message
              <div className="max-w-xs text-center mx-auto font-bold text-2xl tracking-wide space-y-3">
                <div>
                  <img src={wallet} alt="" />
                </div>
                <h2>
                  No stocks added on{" "}
                  <span className="text-red-500">{`${moment()
                    .month(selectedMonth)
                    .format("MMMM")} ${selectedYear}`}</span>
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyData;
