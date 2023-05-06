import { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [averageOrdersPerDay, setAverageOrdersPerDay] = useState(null);

  useEffect(() => {
    axios
      .get("/orders/averageorders")
      .then((response) => {
        const data = response.data;
        setAverageOrdersPerDay(data.data.averageOrdersPerDay);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
    {averageOrdersPerDay === null ? (
      <p>Loading...</p>
    ) : (
      <p>Average Orders per Day: {Math.floor(averageOrdersPerDay)} Orders</p>
    )}
  </div>
  );
};

export default OrdersPage;
