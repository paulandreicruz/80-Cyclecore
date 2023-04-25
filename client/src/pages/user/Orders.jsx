import Navbar from "../../global/nav/Navbar";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { TiArrowBack, TiArrowBackOutline, TiPrinter } from "react-icons/ti";
import { TbFileInvoice, TbTruckOff, TbTruckReturn } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import logo from "../../assets/logo1.png";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";

export default function UserOrders() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  const handleOrderDetailsClick = (orders) => {
    setSelectedOrder(orders);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef(null);

  return (
    <div className="bg-gray-200 h-full">
      <Navbar />

      <Paper className="p-3 mx-24 mt-5 mb-0 font-bebas">
        <div className="flex items-center justify-between">
          <span className="tracking-wide flex hover:text-[#00BFFF] hover:cursor-default">
            Orders & Returns{" "}
            <TbTruckReturn fontSize={21} className="pt-[1px] ml-0.5" />
          </span>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<TiArrowBackOutline />}
            size="small"
            onClick={() => navigate("/")}
          >
            <span className="font-bebas tracking-wide pt-0.5 text-sm">
              Go Back
            </span>
          </Button>
        </div>
      </Paper>
      {orders?.map((o, i) => (
        <Paper
          sx={{ backgroundColor: "#f2f2f2" }}
          className="px-4 pb-4 mx-24 mt-5 font-bebas"
          key={o._id}
        >
          <div className="flex items-center gap-32 py-5">
            <div className="tracking-wide text-sm">
              {" "}
              Order ID :{" "}
              <span className="font-semibold text-base">{o._id}</span>
            </div>
            <div className="text-sm">
              Order Date{" "}
              <span className="text-base font-bold">
                {moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss")}
              </span>
            </div>

            <div className="text-sm">
              Status: <span className="text-base font-bold">{o.status}</span>
            </div>
          </div>

          <Paper className="p-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="tracking-wide text-xs">Home Delivery</h1>
                <h1 className="flex gap-1 text-xl">
                  Delivering On 5-7 Working Days <BsCloudSun />
                </h1>
              </div>

              <div className="flex gap-4">
                <Button variant="text">
                  <span
                    className="font-bebas tracking-wider underline"
                    onClick={() => handleOrderDetailsClick(o)}
                  >
                    Order Details
                  </span>
                </Button>
              </div>
            </div>

            <div className="h-[1px] bg-gray-300 my-4" />

            <div className="flex justify-between">
              <div className="space-y-4">
                {o?.products?.map((p, i) => (
                  <>
                    <div className="flex justify-between" key={i}>
                      <div className="flex items-center gap-4">
                        <div>
                          <img
                            src={`${
                              import.meta.env.VITE_APP_REACT_APP_API
                            }/product/photo/${p._id}`}
                            alt=""
                            className="w-32"
                          />
                        </div>

                        <div>
                          <div className="text-sm">
                            Name:<span>{p.name}</span>
                          </div>
                          <div className="text-sm">
                            Qty: <span className="text-lg">{p.quantity}</span>
                          </div>
                          <div className="text-sm">
                            PHP <span className="text-lg"> {p.price}</span>
                          </div>
                        </div>
                      </div>
                      {selectedOrder && (
                        <Dialog
                          open={dialogOpen}
                          onClose={() => setDialogOpen(false)}
                          sx={{
                            backgroundColor: "lightgray",
                          }}
                          maxWidth="xl"
                          ref={componentRef}
                        >
                          <DialogTitle
                            sx={{
                              backgroundColor: "lightgray",
                            }}
                          >
                            <div className="flex justify-between">
                              <span className="font-bebas">INVOICE</span>
                              <div>
                                <ReactToPrint
                                  trigger={() => {
                                    return (
                                      <button>
                                        <TiPrinter fontSize={25} className="" />
                                      </button>
                                    );
                                  }}
                                  content={() => componentRef.current}
                                  documentTitle="Print Invoice"
                                  pageStyle="print"
                                />
                              </div>
                            </div>
                          </DialogTitle>
                          <DialogContent
                            sx={{
                              backgroundColor: "lightgray",
                              maxWidth: "100rem",
                              // or 'lg' or any other width value you prefer
                            }}
                          >
                            <div className="font-bebas flex items-center justify-between gap-8 mb-5">
                              <Paper
                                className="p-3 h-[14.5rem] w-[20rem]"
                                sx={{
                                  backgroundColor: "transparent",
                                  boxShadow: "none",
                                }}
                              >
                                {/* <div>Home Delivery</div> */}
                                <img src={logo} alt="" />
                              </Paper>

                              <Paper className="p-3  w-[20rem] h-[14.5rem]">
                                <div className="font-bold mb-3">
                                  Shipping Address
                                </div>
                                <div>
                                  {selectedOrder?.buyer?.firstname}
                                  {selectedOrder?.buyer?.lastname}
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.addressname},
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.street}, ,
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.barangay}
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.city},
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.postalCode}
                                </div>
                              </Paper>

                              <Paper className="p-3  w-[20rem] h-[14.5rem]">
                                <div className="font-bold mb-3">
                                  Billing Address
                                </div>
                                <div>
                                  {selectedOrder?.buyer?.firstname}
                                  {selectedOrder?.buyer?.lastname}
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.addressname},
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.street}, ,
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.barangay}
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.city},
                                </div>
                                <div>
                                  {selectedOrder?.shippingAddress?.postalCode}
                                </div>
                              </Paper>
                            </div>

                            <Paper className="font-bebas p-4">
                              <div className="font-bold mb-4 text-lg tracking-wider">
                                Home Delivery Items
                              </div>

                              <div className="flex justify-between">
                                <div className="space-y-2">
                                  {o?.products?.map((p, i) => (
                                    <>
                                      <div key={i}>
                                        <img
                                          src={`${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/product/photo/${p._id}`}
                                          alt=""
                                          className="w-32"
                                        />
                                        <div>{p.name}</div>
                                      </div>
                                    </>
                                  ))}
                                </div>

                                <div>Order-Id: {selectedOrder._id}</div>

                                <div>Status: {o.status} </div>

                                <div>
                                  Order-Date :{" "}
                                  {moment(o.createdAt).format(
                                    "MMMM Do YYYY, h:mm:ss"
                                  )}
                                </div>

                                <div>{selectedOrder.name}</div>

                                <div>
                                  Total-quantity: {selectedOrder.totalQuantity}
                                </div>

                                <div>
                                  Total-Price PHP {selectedOrder.totalPrice}
                                </div>
                              </div>
                            </Paper>
                          </DialogContent>
                          {/* <DialogActions>
                            <Button onClick={() => setDialogOpen(false)}>
                              Close
                            </Button>
                          </DialogActions> */}
                        </Dialog>
                      )}
                    </div>
                  </>
                ))}
              </div>

              {/* right-side */}
              <div className="space-y-3">
                {/* <div>
                <Button variant="contained" color="inherit" fullWidth>
                  <span className="font-bebas tracking-wider">
                    Return Product
                  </span>
                </Button>
              </div> */}
                <div>
                  <NavLink to="/shop">
                    <Button
                      variant="contained"
                      color="inherit"
                      startIcon={<TiArrowBack />}
                      size="small"
                      fullWidth
                    >
                      <span className="font-bebas tracking-widest font-bold text-lg">
                        Buy Again
                      </span>
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </Paper>
          {/* dialog */}
        </Paper>
      ))}
    </div>
  );
}
