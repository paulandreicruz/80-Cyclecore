import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { useNavigate, } from "react-router-dom";
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

export const PaymentPage = () => {
  //state
  const [shippingAddress, setShippingAddress] = useState({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [proceedToPayment, setProceedToPayment] = useState(false);

  const selectedDeliveryOption =
    selectedOptionIndex !== null
      ? paymentData[selectedOptionIndex].deliveryOption
      : "";
  const selectedDeliveryTime =
    selectedOptionIndex !== null
      ? paymentData[selectedOptionIndex].estimatedDelivery
      : "";

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleAccordionChange = (index) => {
    if (index === selectedOptionIndex) {
      setSelectedOptionIndex(null);
    } else {
      setSelectedOptionIndex(index);
    }
  };

  //hookjs
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //   expanded
  const [expanded, setExpanded] = useState(
    new Array(paymentData.length).fill(false)
  );
  const [expandedIndex, setExpandedIndex] = useState(-1);

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

  const handleNavigate = () => {
    navigate("/dashboard/user/deliveryoption");
  };

  const handleNavigate2 = () => {
    navigate("/dashboard/user/checkout");
  };

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

  const totalQuantity = () => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <Navbar />
      <div className="pt-10 h-screen bg-gray-200">
        <Grid container gap={4} className="justify-center">
          {/* payment side */}
          <Grid item>
            <Paper className="font-bebas flex items-center justify-between gap-2 p-3 mb-5">
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
            </Paper>

            {proceedToPayment === false ? (
              <Paper className="p-3">
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
              </Paper>
            ) : (
              <>
                <Paper className="p-3 w-[35rem] font-bebas mb-4 flex justify-between">
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
                </Paper>
                <Paper className="p-3 font-bebas">
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
                      <div
                        key={i}
                        onClick={() => setSelectedOption(i)}
                        className="flex items-center hover:cursor-pointer"
                      >
                        <div>
                          {p.chkbx && (
                            <Checkbox
                              size="small"
                              checked={selectedOption === i}
                            />
                          )}
                        </div>
                        <div>{p.paymentOption}</div>
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <button className="flex items-center gap-1 bg-yellow-300 p-3 rounded-md tracking-wide hover:scale-105 duration-200 ease-in-out">
                        <MdPayment />
                        Check - Out
                      </button>
                    </div>
                  </div>
                </Paper>
              </>
            )}
          </Grid>

          {/* cart side */}
          <Grid item>
            <div>
              <Paper className="px-8 py-4 font-bebas w-[27rem]">
                <div className="font-bold text-lg tracking-wider mb-2">
                  Order Summary
                </div>

                {cart?.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-5">
                      <div>
                        <img
                          src={`${
                            import.meta.env.VITE_APP_REACT_APP_API
                          }/product/photo/${c._id}`}
                          className="w-32 rounded-lg"
                        />
                      </div>
                      <div className="tracking-widest">
                        <h1 className="text-xl font-bold">{c.name}</h1>
                        <div className="flex justify-between">
                          <h1 className="text-xs tracking-wide">
                            Quantity:{" "}
                            <span className="text-sm font-bold">
                              {c.quantity}
                            </span>
                          </h1>
                          <h1 className="text-xs tracking-wide">
                            PHP:{" "}
                            <span className="font-bold text-sm ">
                              {c.price}
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
              </Paper>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
