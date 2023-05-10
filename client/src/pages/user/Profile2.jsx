import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import {
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Paper,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";
import { AiOutlineClose, AiOutlineDislike } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { FcInfo, FcVlc } from "react-icons/fc";
import { BiSave } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineSave, MdSecurityUpdate } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";

export default function UserProfile() {
  const [address, setAddress] = useState({
    addressname: "",
    region: "",
    city: "",
    barangay: "",
    postalCode: "",
    street: "",
  });

  const [addresses, setAddresses] = useState([]);

  // oppen accordion
  const [expanded, setExpanded] = useState(false);

  const [expanded2, setExpanded2] = useState(false);

  //open dialog
  const [dialog, openDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  //context
  const [auth, setAuth] = useAuth();

  //state
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [password, setPassword] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(`/useraddress/${addressId}`);
      setAddresses(addresses.filter((a) => a._id !== addressId));
      setDeleteDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    if (auth?.user) {
      const { firstname, lastname } = auth.user;
      setfirstName(firstname || "");
      setlastName(lastname || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        firstname,
        lastname,
        password,
      });

      if (data?.error) {
        toast.error(data.error, {
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
        // console.log("profile updated =>", data);
        setAuth({ ...auth, user: data });
        //local storage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated", {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-32 font-bebas bg-gray-200">
        <Grid container gap={1} justifyContent="center">
          {/* left side */}
          <Grid item className="p-5 border">
            <Paper className="p-5 w-[35rem]">
              <div className="justify-center mb-2">
                <span className="font-bold tracking-wider flex items-center text-3xl gap-1">
                  Personal Information
                  <FcInfo />
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                {/* First Name & Last Name */}
                <Accordion
                  expanded={expanded}
                  onChange={() => setExpanded(!expanded)}
                  // sx={{backgroundColor: "#e6e6e6"}}
                >
                  <AccordionSummary
                    expandIcon={
                      expanded ? (
                        <AiOutlineClose fontSize={25} />
                      ) : (
                        <TbEdit fontSize={25} />
                      )
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <div>
                      <Typography>
                        <span className="font-bebas tracking-wide text-xl">
                          Full Name
                        </span>
                      </Typography>
                      <div
                        className={
                          expanded ? "hidden" : `flex items-center space-x-1`
                        }
                      >
                        <Typography>
                          <span className="font-bebas tracking-wider">
                            {firstname}
                          </span>
                        </Typography>
                        <Typography>
                          <span className="font-bebas tracking-wider">
                            {lastname}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="space-y-4">
                      <div>
                        <InputLabel>
                          <span className="font-bebas text-xs">First Name</span>
                        </InputLabel>
                        <TextField
                          variant="standard"
                          size="small"
                          value={firstname}
                          onChange={(e) => setfirstName(e.target.value)}
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: 16.5,
                            },
                          }}
                        />
                      </div>
                      <div>
                        <InputLabel>
                          <span className="font-bebas text-xs">Last Name</span>
                        </InputLabel>
                        <TextField
                          variant="standard"
                          size="small"
                          value={lastname}
                          onChange={(e) => setlastName(e.target.value)}
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: 16.5,
                              // background: "white"
                            },
                          }}
                        />
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>

                {/* Email */}

                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="inherit"
                    fullWidth
                    startIcon={<BiSave />}
                  >
                    <span className=" font-bold font-bebas tracking-wider text-lg">
                      Submit
                    </span>
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          {/* right side */}
          <Grid item className="border p-5">
            <Paper className="p-5 w-[45rem]">
              <div className="tracking-wider text-3xl font-bold flex items-center gap-1 mb-2">
                shipping addresses <FaShippingFast />
              </div>

              <div>
                {addresses?.length === 3 ? (
                  <div className="font-bebas text-orange-500 tracking-wide text-xs">
                    note:{" "}
                    <span className="tracking-wider font-bold text-sm text-black">
                      Only three shipping addresses are allowed.
                    </span>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dotted py-7 px-20 hover:cursor-pointer border-black text-black hover:border-[#FFA500] hover:text-[#FFA500]"
                    onClick={() => openDialog(true)}
                  >
                    <div>
                      {" "}
                      <HiOutlineSquaresPlus
                        fontSize={50}
                        className="mx-auto "
                      />{" "}
                    </div>
                    <div>
                      <h1 className="text-center  ">Add New Address</h1>
                    </div>
                  </div>
                )}
              </div>

              {addresses?.map((a, i) => (
                <div key={i} className="mt-5">
                  <div className="p-3 border border-[#00ac6a] bg-[#e9f9ee] rounded-sm">
                    <div className=" font-bold tracking-wide text-xl">
                      {a.addressname}
                    </div>
                    <div className="text-sm tracking-wide">
                      Street:
                      <span className="font-bold text-base ml-1">
                        {a.street}
                      </span>
                    </div>
                    <div className="text-sm tracking-wide">
                      Region:
                      <span className="font-bold text-base ml-1">
                        {a.region}
                      </span>
                    </div>
                    <div className="text-sm tracking-wide">
                      Municipality:
                      <span className="font-bold text-base ml-1">{a.city}</span>
                    </div>
                    <div className="text-sm tracking-wide">
                      Postal Code:
                      <span className="font-bold text-base ml-1">
                        {a.postalCode}
                      </span>
                    </div>
                    <div className="text-sm tracking-wide">
                      <span className="text-sm mr-1 tracking-wide">
                        Complete Address:
                      </span>
                      <span className="font-bold text-base">
                        {a.street}, {a.region}, {a.postalCode}
                      </span>
                    </div>

                    <div>
                      <Button
                        onClick={() => setDeleteDialog(true)}
                        variant="contained"
                        color="error"
                        startIcon={<RiDeleteBinLine />}
                      >
                        <span className="font-bebas tracking-wider">
                          Delete
                        </span>
                      </Button>
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
                        Are You Sure You Want To Delete This Address?{" "}
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
        </Grid>
      </div>
      {/* Dialog Box */}
      <Dialog open={dialog} onClose={() => openDialog(false)}>
        <DialogTitle>
          <span className="font-bebas tracking-wider text-lg font-bold flex items-center gap-1">
            Add Shipping Address <MdSecurityUpdate />
          </span>
        </DialogTitle>
        <DialogContent>
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
      <Footer />
    </>
  );
}
// html: `Hello! Just one more step to continue cycling Click <a href="${verificationLink}"><button>here</button></a> to verify your email address.`
