import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { useNavigate,} from "react-router-dom";
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
import { MdPayment } from "react-icons/md";
import { BiCycling } from "react-icons/bi";

export const Dummy = () => {
  const [shipping, setShipping] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  //hookjs
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const history = useHistory();


  const handleNavigate = () => {
    // Add the selected shipping option to the cart
    const selectedOption = shipping[selectedOptionIndex];
    const updatedCart = [...cart, selectedOption];
    setCart(updatedCart);

    // Navigate to the payment page
    history.push("/payment");
  };

  useEffect(() => {
    if (auth?.token) loadShippingAddress();
  }, [auth?.token]);

  const loadShippingAddress = async () => {
    try {
      const response = await axios.get("/shipping-address");
      setShippingAddress(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.token) loadShippingOption();
  }, [auth?.token]);

  const loadShippingOption = async () => {
    try {
      const response = await axios.get("/shipping-option");
      setShipping(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckboxClick = (event, index) => {
    setSelectedOptionIndex(index);
    setIsChecked(true); // Toggle the value of the isChecked state variable
  };

  const cartTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    if (isChecked && selectedOptionIndex !== null) {
      total += shipping[selectedOptionIndex].deliveryFee; // Add the delivery fee to the cart total if the checkbox is checked and a shipping option is selected
    }
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  return (
    <>
      <Navbar />
      <div className="pt-10 h-screen bg-gray-50">
        <Grid container gap={4} className="justify-center">
          {/* payment side */}
          <Grid item>
            <Paper className="font-bebas flex items-center justify-between gap-2 p-3 mb-5">
              <div className="flex gap-2 font-bold tracking-wider">
                <div className="font-normal">Delivering to</div>
                {shippingAddress.street},{shippingAddress.barangay},
                {shippingAddress.city},{shippingAddress.region},
                {shippingAddress.postalCode},
              </div>
              <div>
                <Button
                  onClick={() => navigate("/dashboard/user/checkout")}
                  variant="contained"
                  color="inherit"
                  size="small"
                  sx={{ boxShadow: "none" }}
                >
                  <span className="font-bebas tracking-wider">CHANGE</span>
                </Button>
              </div>
            </Paper>

            <Paper className="p-3">
              {shipping?.map((s, i) => (
                <Accordion
                  key={s._id}
                  //   expanded={expandedIndex === i}
                  //   onChange={() => {
                  //     const newIndex = expandedIndex === i ? -1 : i; // toggle accordion
                  //     setExpandedIndex(newIndex); // update currently expanded accordion
                  //     const newExpanded = [...expanded];
                  //     newExpanded[i] = !newExpanded[i];
                  //     setExpanded(newExpanded);
                  //     handleAccordionChange(i);
                  //   }}
                  className="m-3"
                >
                  <AccordionSummary style={{ backgroundColor: "#f0f0f0" }}>
                    <div className="flex gap-2 justify-between w-[100%]">
                      <div className="flex items-center font-bebas">
                        <div>
                          <div>
                            <Checkbox
                              size="small"
                              checked={selectedOptionIndex === i}
                              onClick={(event) => handleCheckboxClick(event, i)}
                            />
                          </div>
                        </div>
                        <div>{s.deliveryOption}</div>
                      </div>
                      <div className="flex items-center gap-14">
                        <div className="p-1 px-2 bg-[#ffffffc0] rounded-md font-bebas">
                          {s.estimatedDelivery}
                        </div>
                        <div className="p-2 bg-sky-300 rounded-md font-bebas">
                          {s.deliveryFee}
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
                              {shippingAddress.barangay},{shippingAddress.city},
                              {shippingAddress.region},
                              {shippingAddress.postalCode}
                            </div>
                          </div>
                        </Grid>
                        <Grid item>
                          <div className="mx-auto flex justify-center mt-5 font-bebas">
                            <button
                              onClick={handleNavigate}
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
          </Grid>
          <Grid item>
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
                            <span className="text-sm font-bold">
                              {c.quantity}
                            </span>
                          </h1>
                          <h1 className="text-xs">
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
                    <h1 className="font-bold">{cartTotal()}</h1>
                    {/* show if the user selects an accordion */}
                  </div>
                </div>

                {selectedOptionIndex !== null && (
                  <div>
                    <div className="flex justify-between">
                      <div>Delivery Fee:</div>
                      <div className="font-bold">
                        +{" "}
                        {shipping[
                          selectedOptionIndex
                        ].deliveryFee.toLocaleString("en-US", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </div>
                    </div>
                    <div className="h-[1px] bg-gray-200" />
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
