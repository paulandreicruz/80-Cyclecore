import Navbar from "../../global/nav/Navbar";
import { useCart } from "../../context/Cart";
import Footer from "../../global/footer/Footer";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../context/Auth";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// impor icons
import empty from "../../assets/empty.png";

// import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { BsHouseDoor, BsBag } from "react-icons/bs";
import { RxColorWheel } from "react-icons/rx";
import { FcPlus, FcMinus } from "react-icons/fc";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineShopping } from "react-icons/ai";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";

export default function Cart() {
  //context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // load Products

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      setAvailableStock(data.quantity); // set the available stock value
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   if (params?.slug) loadProduct();
  // }, [params?.slug]);

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

  const totalQuantity = () => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity;
    });
    return total;
  };

  const updateCart = (productId, newQuantity) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex((item) => item._id === productId);
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-200">
        <div className="px-64 py-10 font-bebas">
          <div>
            <Grid container justifyContent="center" gap={2}>
              <Grid item className="flex-1">
                <div className="flex p-2 items-center justify-between border-b bg-white rounded-t-sm">
                  <h5 className="text-sm tracking-wide">
                    Cart Total Items:
                    <span className="ml-1 text-lg">{cart.length}</span>
                  </h5>
                  <div>
                    <Button
                      onClick={() => navigate("/shop")}
                      variant="contained"
                      color="inherit"
                      size="small"
                      startIcon={<AiOutlineShopping />}
                    >
                      <span className="font-bebas">Continue Shopping</span>
                    </Button>
                  </div>
                </div>
                {cart.length === 0 ? (
                  <div className="bg-white p-4 shadow-lg space-y-6">
                    <div className="justify-center flex">
                      <img src={empty} alt="" />
                    </div>

                    <div className="font-bold text-4xl tracking-wider text-center">
                      Your cart is Empty!
                    </div>

                    <InputLabel className="text-center">
                      <div className="font-bebas">
                        You Have No Items In Your Cart.
                      </div>
                      <div className="font-bebas"> Let's go buy something!</div>
                    </InputLabel>

                    <div className="text-center">
                      <NavLink to="/shop">
                        <button className="p-1.5 px-4 text-white bg-red-500 hover:bg-red-600 rounded-full font-bold tracking-widest text-lg">
                          Shop Now
                        </button>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 rounded-b-sm tracking-wide bg-white shadow-xl">
                    {cart?.map((p, index) => (
                      <Grid
                        container
                        key={index}
                        alignItems="center"
                        mb="5px"
                        justifyContent="space-between"
                        sx={{
                          flexDirection: { xs: "column", sm: "row" }, // set direction to column on small screens and row on larger screens
                          gap: 2, // add gap between items
                          "& .MuiTextField-root": {
                            width: { xs: "100%", sm: "200px" },
                          }, // set width to 100% on small screens and 200px on larger screens
                        }}
                      >
                        <Grid item sx={{ width: "18%" }}>
                          <h1 className="text-sm">Product Name</h1>
                          <div className=" text-xl">{p.name}</div>
                        </Grid>
                        <Grid item>
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
                        </Grid>
                        <Grid item className="text-center">
                          <h1 className="text-sm">Quantity</h1>
                          <div>
                            <TextField
                              label="Quantity"
                              size="small"
                              type="number"
                              InputLabelProps={{ shrink: true }}
                              variant="outlined"
                              value={p.quantity}
                              onChange={(e) =>
                                updateCart(p._id, parseInt(e.target.value))
                              }
                              InputProps={{
                                inputProps: {
                                  min: 1,
                                  max: p.stocks,
                                },
                                endAdornment: (
                                  <ButtonGroup variant="outlined" size="small">
                                    <Button
                                      color="inherit"
                                      onClick={() =>
                                        updateCart(
                                          p._id,
                                          p.quantity > 1
                                            ? p.quantity - 1
                                            : p.quantity
                                        )
                                      }
                                      disabled={p.quantity <= 1}
                                    >
                                      <TiMinusOutline />
                                    </Button>
                                    <Button
                                      color="inherit"
                                      onClick={() =>
                                        updateCart(
                                          p._id,
                                          p.quantity < p?.stocks
                                            ? p.quantity + 1
                                            : p.quantity
                                        )
                                      }
                                      disabled={p.quantity >= p.stocks}
                                    >
                                      <TiPlusOutline />
                                    </Button>
                                  </ButtonGroup>
                                ),
                              }}
                              sx={{ width: "200px" }}
                            />
                            {p.quantity >= p.stocks ? (
                              <div>
                                <h1 className="text-red-600">
                                  Cannot exceed maximum stocks!
                                </h1>
                              </div>
                            ) : null}
                          </div>
                        </Grid>
                        <Grid item>
                          <h1 className="text-sm">Price</h1>
                          <div className="flex items-center gap-2">
                            <div className="">
                              <span className="text-lg">
                                {p?.price?.toLocaleString("en-Us", {
                                  style: "currency",
                                  currency: "PHP",
                                })}
                              </span>
                            </div>
                            <button onClick={() => removeFromCart(p._id)}>
                              <FiTrash2 className="text-red-500" />
                            </button>
                          </div>
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                )}
              </Grid>

              <Grid justifyContent="center">
                <Paper className="p-3 space-y-5 w-[20rem] rounded-md justify-center mx-auto">
                  <div>
                    <h1 className="text-lg">Order Summary</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black text-sm flex items-center">
                      <RxColorWheel className="mr-1 animate-spin" />
                      Total Products
                    </span>
                    <div className="bg-gray-100 h-0.5 rounded-full"></div>
                    <h1 className="text-sm">{cartTotal()}</h1>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <div>
                      <span className="text-black flex items-center text-sm">
                        <BsBag className="mr-1 animate-bounce" /> Total Items{" "}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-sm">{totalQuantity()}</h1>
                    </div>
                  </div>
                  <div className="bg-gray-200 h-[1px] rounded-full"></div>

                  <div className="flex justify-between">
                    <div>
                      <h1 className="text-lg">Total</h1>
                    </div>
                    <div className="text-lg">{cartTotal()}</div>
                  </div>

                  {auth?.token ? (
                    <Button
                      variant="contained"
                      color="inherit"
                      startIcon={<BsCartCheck />}
                      fullWidth
                      onClick={() => navigate("/dashboard/user/checkout")}
                      disabled={cart.length === 0} // Disable button if cart is empty
                      className="shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded cursor-pointer"
                    >
                      <span className="font-bebas tracking-widest text-lg font-bold">
                        Check-out
                      </span>
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="inherit"
                      fullWidth
                      onClick={() => navigate("/login", { state: "/checkout" })}
                      className="shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded cursor-pointer"
                    >
                      <span className="font-bebas tracking-widest text-lg font-bold">
                        Login to Checkout
                      </span>
                    </Button>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}
