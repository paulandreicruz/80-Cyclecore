import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";

const PayPalPayment = () => {
  const location = useLocation();

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const executePayment = async () => {
      const params = new URLSearchParams(location.search);
      const paymentId = params.get("paymentId");
      const payerId = params.get("PayerID");

      try {
        const response = await axios.get(
          `execute-payment?paymentId=${paymentId}&PayerID=${payerId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setPaymentStatus("Payment successful");
        localStorage.removeItem("cart");
      } catch (error) {
        console.error(error);
        setPaymentStatus("Payment failed");
      }
    };

    executePayment();
  }, []);

  return (
    <div>
      <h1>{paymentStatus}</h1>
    </div>
  );
};

export default PayPalPayment;
