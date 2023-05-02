import React from "react";
import { useSearch } from "../../context/Search";
import OrdersCard from "../../components/cards/OrdersCard";

export const AdminOrdersSearch = () => {
  //context
  const [values, setValues] = useSearch();
  return (
    <div>
      <div>
        {values?.results?.map((o) => (
          <div key={o._id}>
            <OrdersCard o={o} />
          </div>
        ))}
      </div>
    </div>
  );
};  
