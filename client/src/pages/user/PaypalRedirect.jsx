import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import paypal from "../../assets/paypal.png";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineDoNotDisturbOnTotalSilence } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";

const PayPalPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        setTimeout(() => {
          navigate("/dashboard/user/ordersuccess");
        }, 3000);
      } catch (error) {
        console.error(error);
        setPaymentStatus("Payment failed");
      }
    };

    executePayment();
  }, []);

  return (
    <>
      <div className="py-36 bg-gray-200 h-screen font-bebas">
        {paymentStatus && paymentStatus.includes("Payment successful") ? (
          <>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-3 border-b border-gray-300">
                <img src={paypal} alt="" className="w-[6rem]" />
              </div>
              <div className="bg-[#2bcd94] text-center text-7xl font-bebas text-white space-y-4 p-3">
                <div>
                  <h1>{paymentStatus}</h1>
                </div>
                <div className="flex justify-center">
                  <FaRegCheckCircle fontSize={200} />
                </div>
              </div>
              <div className=" bg-white p-2">
                <h1 className="flex items-center gap-1 tracking-wider font-bold text-xl justify-center">
                  Redirecting to cyclecore bikeshop{" "}
                  <TbFidgetSpinner fontSize={30} className="animate-spin" />
                </h1>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-3 border-b border-gray-300">
                <img src={paypal} alt="" className="w-[6rem]" />
              </div>
              <div className="bg-red-500 text-center font-bebas text-white space-y-4 p-3">
                <div>
                  <h1 className="text-7xl">{paymentStatus}</h1>
                </div>
                <div className="flex justify-center hover:cursor-not-allowed">
                  <MdOutlineDoNotDisturbOnTotalSilence fontSize={200} />
                </div>
              </div>

              <button
                className="font-bold text-xl tracking-wider p-2 bg-white w-full"
                onClick={() => navigate("/dashboard/user/checkout")}
              >
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PayPalPayment;
