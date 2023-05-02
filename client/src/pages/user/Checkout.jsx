import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useCart } from "../../context/Cart";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import DropIn from "braintree-web-drop-in-react";
import Navbar from "../../global/nav/Navbar";
import Footer from "../../global/footer/Footer";
import { BiCycling } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { TbHandLittleFinger, TbTruckDelivery } from "react-icons/tb";
import {
  MdOutlineLocalShipping,
  MdOutlineSave,
  MdSecurityUpdateGood,
} from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { AiOutlineDislike } from "react-icons/ai";
import { FcVlc } from "react-icons/fc";
export const Checkout = () => {
  // state
  const [addresses, setAddresses] = useState([]);

  const [address, setAddress] = useState({
    addressname: "",
    region: "",
    city: "",
    barangay: "",
    postalCode: "",
    street: "",
  });

  // selected address index
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);

  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  //   dialog
  const [dialog, openDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) getUserAddresses();
  }, [auth?.token]);

  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get("/useraddress");
      setAddresses(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAddress = async (index) => {
    setSelectedAddressIndex(index);
    try {
      await axios.put("/add-shipping-address", { addressIndex: index });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = () => {
    if (selectedAddressIndex < 0) {
      toast.error("Please select a delivery address first.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          width: "300px",
          height: "20px",
          fontSize: "17px",
          fontFamily: "Bebas Neue",
        },
      });
      return;
    }
    navigate("/dashboard/user/deliveryoption");
  };

  //cart

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

  //   delete address

  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(`/useraddress/${addressId}`);
      setAddresses(addresses.filter((a) => a._id !== addressId));
      setDeleteDialog(false);
      toast.success("The removal of the address was executed successfully.", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          width: "300px",
          height: "20px",
          fontSize: "17px",
          fontFamily: "Bebas Neue",
        },
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };

  // handle address submit

  const handleaddressSubmit = async () => {
    try {
      const { data } = await axios.put("/address", address);
      console.log(data);
      toast.success("Added Successfully", {
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
      console.error(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("An error occurred. Please try again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray50">
      <Navbar />
      <div className="my-10 mx-48">
        <Grid container gap={3}>
          {/* Left- Side */}
          <Grid item className="flex-1">
            <Paper elevation={5} className="px-5 py-3 mb-5">
              <div className="items-center font-bebas font-bold flex justify-between text-2xl tracking-wider">
                <div className="flex items-center gap-1">
                  Please choose/select a delivery address
                  <MdOutlineLocalShipping />
                </div>

                <NavLink to="/shop">
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    startIcon={<TbHandLittleFinger />}
                  >
                    <span className="font-bebas tracking-wider font-bold text-lg">
                      Continue Shopping
                    </span>
                  </Button>
                </NavLink>
              </div>
            </Paper>

            <Paper elevation={5} className="p-5">
              <div>
                {addresses?.length !== 3 ? (
                  <div
                    className="border-2 border-dotted py-10 px-20 mb-5 rounded-md hover:cursor-pointer hover:border-black hover:text-black text-gray-300"
                    onClick={() => openDialog(true)}
                  >
                    <div>
                      <HiOutlineSquaresPlus
                        fontSize={50}
                        className="mx-auto "
                      />
                    </div>
                    <div>
                      <h1 className="text-center  font-bebas tracking-wider">
                        Add New Address
                      </h1>
                    </div>
                  </div>
                ) : (
                  <div className="font-bebas text-orange-500 font-bold text-xs tracking-wide mb-3">
                    note:{" "}
                    <span className="text-base tracking-wider text-black">
                      You are limited to adding only three addresses.
                    </span>
                  </div>
                )}
              </div>
              {addresses?.map((a, i) => (
                <div key={i} className="font-bebas text-sm ">
                  <div
                    className={
                      selectedAddressIndex === i
                        ? "border font-bebas border-green-500 mb-5 p-3 bg-sky-700 rounded-md hover:cursor-pointer text-white"
                        : "mb-5 p-3 bg-sky-50 rounded-md hover:cursor-pointer"
                    }
                    onClick={() => handleSelectAddress(i)}
                  >
                    <div className="flex">
                      <div
                        className={
                          selectedAddressIndex === i
                            ? "flex items-center flex-1 font-bebas font-semibold tracking-wider gap-1 text-lg text-white"
                            : "flex items-center flex-1 font-bebas tracking-wider font-semibold gap-1 text-lg text-green-500"
                        }
                      >
                        <BiCycling
                          className={
                            selectedAddressIndex === i
                              ? "text-white"
                              : "text-black"
                          }
                        />
                        {a.addressname}
                      </div>
                      <div
                        className="rounded-md p-2 hover:text-orange-500 hover:cursor-pointer"
                        onClick={() => setDeleteDialog(true)}
                      >
                        <BsTrash fontSize={20} />
                      </div>
                    </div>

                    <div className="flex gap-1 text-[15px] font-bold uppercase font-bebas tracking-wider my-3">
                      <div>{auth?.user.firstname}</div>
                      <div>{auth?.user.lastname}</div>
                    </div>

                    <div
                      className={
                        selectedAddressIndex === i
                          ? "flex text-white text-sm"
                          : "flex text-gray-700 text-sm"
                      }
                    >
                      <div>{a.street},</div>
                      <div>{a.barangay},</div>
                      <div>{a.city},</div>
                      <div>{a.postalCode},</div>
                      <div>{a.region}</div>
                    </div>

                    <div
                      className={
                        selectedAddressIndex === i
                          ? "text-[white] text-sm"
                          : "text-gray-700 text-sm"
                      }
                    >
                      <div>0{auth?.user.contactnum}</div>
                    </div>
                  </div>

                  {/* delete dialog */}
                  <Dialog
                    open={deleteDialog}
                    onClose={() => setDeleteDialog(false)}
                  >
                    <DialogTitle>
                      {/* <span className="font-bebas tracking-wider text-lg text-gray-800">Delete Address</span> */}
                      <InputLabel>
                        <span className="font-bebas tracking-wider font-bold text-base flex items-center gap-1">
                          Delete Address <FcVlc />
                        </span>
                      </InputLabel>
                    </DialogTitle>

                    <DialogContent>
                      <span className="font-bebas tracking-wider font-bold text-2xl">
                        Are You Sure You Want To Remove This Address?{" "}
                      </span>
                    </DialogContent>

                    <DialogActions>
                      <Button
                        variant="contained"
                        color="info"
                        type="button"
                        size="small"
                        onClick={() => deleteAddress(a._id)}
                        startIcon={<GiConfirmed />}
                      >
                        <span className="font-bebas tracking-wider font-bold text-base">
                          Yes
                        </span>
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        type="button"
                        size="small"
                        onClick={() => setDeleteDialog(false)}
                        startIcon={<AiOutlineDislike />}
                      >
                        <span className="font-bebas tracking-wider font-bold text-base">
                          No
                        </span>
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
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

                <div className="flex justify-between font-bold tracking-wide">
                  <h1>TOTAL</h1>
                  <h1>{cartTotal()}</h1>
                </div>
              </Paper>

              <div className="mx-auto flex justify-center mt-5 font-bebas">
                <button
                  onClick={handleNavigate}
                  className="flex items-center gap-1 justify-center mx-auto text-center bg-yellow-300 p-3 w-full rounded-md tracking-tight"
                >
                  <TbTruckDelivery />
                  PROCEED TO DELIVERY OPTION
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <Footer /> */}

      {/* Dialog Box */}
      <Dialog open={dialog} onClose={() => openDialog(false)}>
        <DialogTitle>
          <span className="font-bebas tracking-wider text-lg font-bold flex items-center gap-1">
            Update Your Information <MdSecurityUpdateGood />
          </span>
        </DialogTitle>
        <DialogContent className="my-2">
          {/* content */}
          <div className="mx-auto">
            <form
              onSubmit={handleaddressSubmit}
              className="mx-auto justify-center"
            >
              <Grid container mt={2}>
                {/* left side */}
                <Grid item md={6} className="">
                  <div className="pr-2 space-y-4">
                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          Address Name
                        </span>
                      </InputLabel>
                      <TextField
                        type="text"
                        name="addressname"
                        value={address.addressname}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        fullWidth
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          barangay
                        </span>
                      </InputLabel>
                      <TextField
                        name="barangay"
                        type="text"
                        fullWidth
                        value={address.barangay}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          region
                        </span>
                      </InputLabel>
                      <TextField
                        name="region"
                        type="text"
                        fullWidth
                        value={address.region}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>
                  </div>
                </Grid>
                {/* right side */}
                <Grid item md={6} className="">
                  <div className="pl-2 space-y-4">
                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          House # & Street
                        </span>
                      </InputLabel>
                      <TextField
                        name="street"
                        type="text"
                        fullWidth
                        value={address.street}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          city
                        </span>
                      </InputLabel>
                      <TextField
                        name="city"
                        type="text"
                        fullWidth
                        value={address.city}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wide text-xs">
                          postal code
                        </span>
                      </InputLabel>
                      <TextField
                        name="postalCode"
                        type="text"
                        fullWidth
                        value={address.postalCode}
                        onChange={handleChange}
                        required
                        size="small"
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: "16.5px",
                            letterSpacing: "1px",
                          },
                        }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
              <div className="mt-4 space-y-2">
                {/* bottom side */}

                {/* submit button */}
                <Button
                  variant="outlined"
                  color="inherit"
                  type="submit"
                  fullWidth
                  startIcon={<MdOutlineSave />}
                >
                  <span className="font-bebas tracking wider font-bold text-lg">
                    Save Information
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
