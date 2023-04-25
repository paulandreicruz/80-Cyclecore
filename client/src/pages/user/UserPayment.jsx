import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { Button, Paper } from "@mui/material";
import Navbar from "../../global/nav/Navbar";

export const UserPayment = () => {
  //context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  //navigate

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  const handleCheckout = async () => {
    try {
      const { nonce, details } = await instance.requestPaymentMethod();
      console.log(details);
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
        paymentMethod: details.type,
        cardType: details.cardType,
      });

      localStorage.removeItem("cart");
      setCart([]);
      // navigate("/dashboard/user/ordersuccess");
      toast.success("Payment Successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <Paper elevation={5} className="px-10 py-4 font-bebas w-[27rem]">
          <div className="font-bold text-lg tracking-wider mb-2">
            Order Summary
          </div>

          {cart?.map((c, i) => (
            <div key={i}>
              <div className="flex gap-8 mb-5">
                <div>
                  <img
                    src={`${
                      import.meta.env.VITE_APP_REACT_APP_API
                    }/product/photo/${c._id}`}
                    className="w-32 rounded-lg"
                  />
                </div>
                <div className="tracking-wider">
                  <h1 className="text-xl font-bold">{c.name}</h1>
                  <div className="flex gap-4">
                    <h1 className="text-xs">
                      Quantity:{" "}
                      <span className="text-sm font-bold">{c.quantity}</span>
                    </h1>
                    <h1 className="text-xs">
                      PHP: <span className="font-bold text-sm ">{c.price}</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between tracking-wide">
            <h1>initial</h1>

            <div>
              <h1 className="font-bold">{cartTotal()}</h1>
              {/* show if the user selects an accordion */}
            </div>
          </div>
        </Paper>
        <div className="mt-10">
          {!clientToken || !cart?.length ? (
            ""
          ) : (
            <DropIn
              options={{
                authorization: clientToken,
                paypal: {
                  now: "vault",
                },
                currency: "PHP",
              }}
              onInstance={(instance) => setInstance(instance)}
            />
          )}
          <Button
            variant="contained"
            color="inherit"
            fullWidth
            onClick={handleCheckout}
            className="shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded cursor-pointer"
          >
            <span className="font-varela">Checkout</span>
          </Button>
        </div>
      </div>
    </>
  );
};
