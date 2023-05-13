import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../global/nav/Navbar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Grid,
  Paper,
} from "@mui/material";
import { paymentData } from "../../Data/payment";
import { paymentOptions } from "../../Data/paymentOptions";
import { MdPayment } from "react-icons/md";
import { BiCycling } from "react-icons/bi";
import { TiArrowBackOutline } from "react-icons/ti";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";

export const DeliveryOption = () => {
  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [approvalUrl, setApprovalUrl] = useState("");
  const [shippingAddress, setShippingAddress] = useState({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  const [selectedDeliveryOptionIndex, setSelectedDeliveryOptionIndex] =
    useState(null);
  const [selectedPaymentOptionIndex, setSelectedPaymentOptionIndex] =
    useState(null);

  //hookjs
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //   expanded
  const [expanded, setExpanded] = useState(
    new Array(paymentData.length).fill(false)
  );
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const selectedDeliveryOption =
    selectedOptionIndex !== null
      ? paymentData[selectedOptionIndex].deliveryOption
      : "";
  const selectedDeliveryTime =
    selectedOptionIndex !== null
      ? paymentData[selectedOptionIndex].estimatedDelivery
      : "";

  const [selectedOption, setSelectedOption] = useState(null);

  // accordion change
  const handleAccordionChange = (index) => {
    if (index === selectedOptionIndex) {
      setSelectedOptionIndex(null);
      setSelectedDeliveryOptionIndex(null);
      setSelectedPaymentOptionIndex(null); // added line
    } else {
      setSelectedOptionIndex(index);
      setSelectedDeliveryOptionIndex(index);
      setSelectedPaymentOptionIndex(index); // added line
    }
  };

  useEffect(() => {
    if (selectedDeliveryOptionIndex !== null) {
      const selectedOption = paymentData[selectedDeliveryOptionIndex];
      axios
        .put("/add-delivery-option", {
          deliveryOption: selectedOption.deliveryOption,
          deliveryFee: selectedOption.deliveryFee,
          estimatedDelivery: selectedOption.estimatedDelivery,
        })
        .then((response) => {
          // handle response
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedDeliveryOptionIndex]);

  useEffect(() => {
    if (selectedPaymentOptionIndex !== null) {
      const selectedOption = paymentOptions[selectedPaymentOptionIndex];
      axios
        .put("/add-payment-option", {
          paymentOption: selectedOption.paymentOption,
        })
        .then((response) => {
          // handle response
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedPaymentOptionIndex]);

  useEffect(() => {
    if (auth?.token) loadShippingAddress();
  }, [auth?.token]);

  const loadShippingAddress = async () => {
    try {
      const response = await axios.get("shipping-address");
      setShippingAddress(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  //cart
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    if (selectedOptionIndex !== null) {
      total += paymentData[selectedOptionIndex].deliveryFee;
    }
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };
  const cartInitalTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  //braintree
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
      navigate("/dashboard/user/ordersuccess");
      toast.success("Payment Successful, Order has been placed", {
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

  const handleCheckoutPickup = async () => {
    try {
      // Perform any necessary validation or data processing here

      // Create a new axios post request to a different endpoint, e.g. "/pickup"
      const { data } = await axios.post("/payment/pickup", {
        cart,
      });

      // Clear the cart and display a success message
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/ordersuccess");
      toast.success("Order has been placed", {
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
  const options = {
    authorization: clientToken,
    card: {
      overrides: {
        fields: {
          cvv: {
            type: "password",
          },
        },
      },
    },
  };

  const handlePaypalClick = async () => {
    try {
      const res = await axios.post("/paypal", { cart });
      const { approvalUrl } = res.data;
      window.location.replace(approvalUrl); // redirect to PayPal approval URL
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-10 h-screen bg-gray-200">
        <Grid container gap={4} className="justify-center">
          {/* payment side */}
          <Grid item>
            <div className="font-bebas flex items-center justify-between gap-2 p-3 bg-white rounded-t-sm border-b">
              <div className="flex items-center gap-2 font-bold tracking-wider">
                <div className="text-xs font-normal tracking-wide">
                  Delivering to:
                </div>
                <span className="text-[16px]">
                  {shippingAddress.street},{shippingAddress.barangay},
                  {shippingAddress.city},{shippingAddress.region},
                  {shippingAddress.postalCode}
                </span>
              </div>
              <div>
                <Button
                  onClick={() => navigate("/dashboard/user/checkout")}
                  variant="contained"
                  color="inherit"
                  size="small"
                  sx={{ boxShadow: "none" }}
                  startIcon={<CgArrowsExchangeAlt />}
                >
                  <span className="font-bebas tracking-wider pt-1">CHANGE</span>
                </Button>
              </div>
            </div>

            {proceedToPayment === false ? (
              <div className="p-3 bg-white shadow-xl rounded-b-sm">
                {paymentData.map((p, i) => (
                  <Accordion
                    key={i}
                    expanded={expandedIndex === i}
                    onChange={() => {
                      const newIndex = expandedIndex === i ? -1 : i; // toggle accordion
                      setExpandedIndex(newIndex); // update currently expanded accordion
                      const newExpanded = [...expanded];
                      newExpanded[i] = !newExpanded[i];
                      setExpanded(newExpanded);
                      handleAccordionChange(i);
                    }}
                    sx={{ boxShadow: "revert-layer" }}
                    className="m-2"
                  >
                    <AccordionSummary style={{ backgroundColor: "#f0f0f0" }}>
                      <div className="flex gap-2 justify-between w-[35rem]">
                        <div className="flex items-center font-bebas">
                          <div>
                            <div>
                              {p.chckBox && (
                                <Checkbox
                                  size="small"
                                  checked={expandedIndex === i}
                                />
                              )}
                            </div>
                          </div>
                          <div>{p.deliveryOption}</div>
                        </div>
                        <div className="flex items-center gap-[25px]">
                          <div className="p-1 bg-[#ffffffc0] w-[19.5rem] text-center rounded-md font-bebas">
                            <div className="flex items-center pt-1 justify-center">
                              {p.estimatedDelivery}
                            </div>
                          </div>
                          <div className="p-1 bg-[#FFA500] w-8 text-center rounded-md font-bebas">
                            {p.deliveryFee}
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: "#f0f0f0" }}>
                      <Paper className="p-5">
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <div className="p-5 bg-sky-200 rounded-md font-bebas">
                              <div className="flex space-x-2">
                                <div className="mt-0.5">
                                  <BiCycling />
                                </div>
                                <div>Home Delivery</div>
                              </div>
                              <div className="flex gap-2 text-sm">
                                <h1 className="font-bold tracking-wider">
                                  Delivering to:
                                </h1>
                                {shippingAddress.street},
                                {shippingAddress.barangay},
                                {shippingAddress.city},{shippingAddress.region},
                                {shippingAddress.postalCode}
                              </div>
                            </div>
                          </Grid>
                          <Grid item>
                            <div className="mx-auto flex justify-center mt-5 font-bebas">
                              <button
                                onClick={() => setProceedToPayment(true)}
                                className="flex items-center gap-1 justify-center mx-auto text-center bg-yellow-300 p-3 w-full rounded-md tracking-tight"
                              >
                                <MdPayment />
                                PROCEED TO PAYMENT
                              </button>
                            </div>
                          </Grid>
                        </Grid>
                      </Paper>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            ) : (
              <>
                <div className="p-3 w-[35rem] font-bebas flex justify-between bg-white border-b">
                  {/* selected Type of Delivery Option */}
                  {/* estimated delivery */}
                  <div>
                    <div className="text-xs tracking-wide">
                      Type Of Delivery:{" "}
                      <span className="font-bold text-sm tracking-wider">
                        {selectedDeliveryOption}
                      </span>
                    </div>
                    <div className="text-xs tracking-wide">
                      Estimated Delivery Time:{" "}
                      <span className="font-bold text-sm tracking-wider">
                        {selectedDeliveryTime}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => setProceedToPayment(false)}
                      size="small"
                      startIcon={<TiArrowBackOutline />}
                    >
                      <span className="font-bebas tracking-wider mt-1">
                        Go Back
                      </span>
                    </Button>
                  </div>
                </div>
                <div className="p-3 font-bebas bg-white shadow-xl rounded-b-sm">
                  <div>
                    <div className="font-bold tracking-widest">
                      Payment Options Available
                    </div>
                    <div className="text-xs tracking-wide">
                      Please Select Your Payment Option
                    </div>
                  </div>

                  <div className="border rounded-md px-2 py-3">
                    {paymentOptions.map((p, i) => (
                      <>
                        <div
                          key={i}
                          className="flex items-center hover:cursor-pointer"
                        >
                          <div>
                            {p.chkbx && (
                              <Checkbox
                                size="small"
                                checked={selectedOption === i}
                                disabled={
                                  selectedDeliveryOptionIndex === 1 && i === 0
                                }
                                onClick={() => {
                                  setSelectedOption(i);
                                  setSelectedPaymentOptionIndex(i);
                                }}
                              />
                            )}
                          </div>
                          <div>{p.paymentOption}</div>
                        </div>
                      </>
                    ))}

                    {selectedOption === 1 ? (
                      <div className="max-w-md mx-auto">
                        {!clientToken || !cart?.length ? (
                          ""
                        ) : (
                          <DropIn
                            options={options}
                            onInstance={(instance) => setInstance(instance)}
                          />
                        )}
                      </div>
                    ) : null}
                    {selectedOption === 1 ? (
                      <>
                        <div className="flex justify-end">
                          <button
                            onClick={handleCheckout}
                            className="flex items-center gap-1 bg-yellow-300 p-3 rounded-md tracking-wide hover:scale-105 duration-200 ease-in-out"
                          >
                            <MdPayment />
                            Check - Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          onClick={handleCheckoutPickup}
                          className="flex items-center gap-1 bg-yellow-300 p-3 rounded-md tracking-wide hover:scale-105 duration-200 ease-in-out"
                        >
                          <MdPayment />
                          Check - Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </Grid>
          <Grid item>
            <div>
              <div className="font-bold text-lg tracking-wider bg-white border-b font-bebas p-3 rounded-t-sm">
                Order Summary
              </div>

              <div className="px-8 py-4 font-bebas w-[27rem] bg-white shadow-xl rounded-b-sm">
                {cart?.map((p, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-5">
                      <div>
                        <img
                          src={`${
                            import.meta.env.VITE_APP_REACT_APP_API
                          }/product/photo/${p._id}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = p.image;
                          }}
                          className="w-24 rounded-sm"
                        />
                      </div>
                      <div className="tracking-widest">
                        <h1 className="text-xl font-bold">{p.name}</h1>
                        <div className="flex justify-between">
                          <h1 className="text-xs tracking-wide mr-2">
                            Quantity:{" "}
                            <span className="text-sm font-bold">
                              {p.quantity}
                            </span>
                          </h1>
                          <h1 className="text-xs tracking-wide">
                            Price: {""}
                            <span className="font-bold text-sm ">
                              {p.price.toLocaleString("en-PH", {
                                style: "currency",
                                currency: "PHP",
                              })}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between text-xs tracking-wide mt-5">
                  <h1>Shipping</h1>
                  <h1>Shipping Cost Will Be Calculated Later</h1>
                </div>

                <div className="h-[0.5px] bg-gray-200 my-3" />

                <div className="flex justify-between tracking-wide">
                  <h1>initial</h1>

                  <div>
                    <h1 className="font-bold">{cartInitalTotal()}</h1>
                    {/* show if the user selects an accordion */}
                  </div>
                </div>

                {selectedOptionIndex !== null && (
                  <div>
                    <div className="flex justify-between">
                      <div>Delivery Fee:</div>
                      <div className="font-bold">
                        +{" "}
                        {paymentData[
                          selectedOptionIndex
                        ].deliveryFee.toLocaleString("en-US", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </div>
                    </div>
                    <div className="h-[1px] my-3 bg-gray-200" />
                    <div className="flex justify-between font-bebas font-bold">
                      <h1>TOTAL</h1>
                      {cartTotal()}
                    </div>
                  </div>
                )}
                {selectedOptionIndex === null && null}
              </div>
              <button onClick={handlePaypalClick}>Pay with PayPal</button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
