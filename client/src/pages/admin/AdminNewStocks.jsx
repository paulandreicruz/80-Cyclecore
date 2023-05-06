import React, { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <div>
      <h2>Select month and year to view data</h2>
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
      {monthlyData && Object.keys(monthlyData).length ? (
        <div>
          <h2>
            Newly added stocks for {selectedMonth}/{selectedYear}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Number of stocks added</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyData).map(([productName, productData]) => (
                <tr key={productName}>
                  <td>{productName}</td>
                  <td>{productData.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Stocks Added For this Month and Year</p>
      )}
    </div>
  );
};

export default MonthlyData;
