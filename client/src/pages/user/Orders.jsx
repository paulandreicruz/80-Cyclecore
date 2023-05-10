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
  Paper,
} from "@mui/material";
import moment from "moment";
import { TiArrowBackOutline, TiPrinter } from "react-icons/ti";
import { TbCopyright, TbTruckReturn } from "react-icons/tb";
import { BsCloudSun } from "react-icons/bs";
import logo from "../../assets/logo1.png";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";

export default function UserOrders() {
  const printButton = "@media print { .print-button { hidden: true}}";
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);

  const handlePrint = () => {
    window.print();
    document.title = "order#: " + orderId;
  };

  const navigate = useNavigate();

  const handleOrderDetailsClick = (orders) => {
    setDialogOpen(true);
    setSelectedOrder(orders);
    setSelectedOrderProducts(orders.products);
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

      <style>
        {`
          @media print {
            .print-button {
              display: none;
            }
          }
        `}
      </style>

      <Paper className="p-3 mx-24 mt-5 mb-0 font-bebas">
        <div className="flex items-center justify-between">
          <span className="tracking-wide flex hover:text-[#00BFFF] hover:cursor-default">
            Orders <TbTruckReturn fontSize={21} className="pt-[1px] ml-0.5" />
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
      {orders?.map((o) => (
        <Paper
          sx={{ backgroundColor: "#f2f2f2" }}
          className="px-4 pb-4 mx-24 mt-5 font-bebas"
          key={o._id}
        >
          <div className="flex items-center gap-32 py-5">
            <div className="tracking-wide text-sm">
              {" "}
              Order ID :{" "}
              <span className="font-semibold text-base">{o.ordernumber}</span>
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
                <h1 className="tracking-wide text-xs">{o.deliveryOption}</h1>
                <h1 className="flex gap-1 text-xl">
                  {o.estimatedDelivery}
                  <BsCloudSun />
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
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
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

                      <div>
                        <div className="text-sm">
                          Name: <span className="text-lg">{p.name}</span>
                        </div>
                        <div className="text-sm">
                          Qty: <span className="text-lg">{p.quantity}</span>
                        </div>
                        <div className="text-sm">
                     
                          <span className="text-lg">
                            {" "}
                            {p.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Paper>
          {/* dialog */}
        </Paper>
      ))}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        ref={componentRef}
      >
        <DialogTitle sx={{ backgroundColor: "gray" }}>
          <div className="flex justify-between w-[35rem] text-white">
            <div className="font-bebas">
              <img src={logo} alt="" className="w-44" />
              <h1 className="tracking-wider text-6xl font-bold">Invoice</h1>
            </div>

            <div className="space-y-2 font-bebas mt-8">
              <h1 className="text-xl font-bold tracking-wider">
                Cyclecore Bikeshop
              </h1>
              <h1 className="tracking-wide text-xs">
                390 Col. Bonny Serrano Ave, Project 4
              </h1>
              <h1 className="tracking-wide text-xs">
                Quezon City, Metro Manila
              </h1>
              <h1 className="tracking-wide text-xs">Manila, Philippines</h1>
              <h1 className="tracking-wide text-xs">1192</h1>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          {selectedOrder && (
            <>
              <div className="font-bebas flex justify-between mt-4">
                <div>
                  <h1 className="text-sm">
                    bill to:{" "}
                    <span className="text-base font-bold tracking-wider">
                      {selectedOrder.buyer.firstname}{" "}
                      {selectedOrder.buyer.lastname}
                    </span>
                  </h1>
                  <h1 className="text-sm">
                    {selectedOrder.shippingAddress.street}
                  </h1>
                  <h1 className="text-sm">
                    {selectedOrder.shippingAddress.city}
                  </h1>
                  <h1 className="text-sm">
                    {selectedOrder.shippingAddress.region}
                  </h1>
                  <h1 className="text-sm">
                    {selectedOrder.shippingAddress.postalCode}
                  </h1>
                </div>

                <div className="space-y-1">
                  <div className="text-sm">
                    Delivery Type:{" "}
                    <span className="font-bold tracking-wider">
                      {selectedOrder.deliveryOption}
                    </span>
                  </div>

                  <div className="text-sm">
                    Payment Type:{" "}
                    <span className="font-bold tracking-wider">
                      {selectedOrder.payment?.transaction?.creditCard?.cardType
                        ? selectedOrder.payment?.transaction?.creditCard
                            ?.cardType
                        : selectedOrder.paymentOption}
                    </span>
                  </div>
                  <div className="text-sm">
                    Card Type:{" "}
                    <span className="font-bold tracking-wider">
                      {selectedOrder.payment?.transaction?.paymentInstrumentType
                        ? selectedOrder.payment?.transaction
                            ?.paymentInstrumentType
                        : " None "}
                    </span>
                  </div>
                  <div className="text-sm">
                    Transaction ID:{" "}
                    <span className="font-bold tracking-wider">
                      {selectedOrder.payment?.transaction.id
                        ? selectedOrder.payment.transaction.id
                        : " None "}
                    </span>
                  </div>
                  <h1 className="text-xs">
                    order id#:{" "}
                    <span className="font-bold tracking-wider text-base">
                      {selectedOrder.ordernumber}
                    </span>
                  </h1>
                  <h1 className="text-xs">
                    Payment Status:{" "}
                    <span className="font-bold tracking-wider text-base">
                      {selectedOrder.payment?.success ? "Success" : "Failed"}
                    </span>
                  </h1>
                  <h1 className="text-xs">
                    Date:{" "}
                    <span className="font-bold tracking-wider">
                      {moment(selectedOrder.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss"
                      )}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200 my-3" />

              <div className="flex justify-between font-bebas">
                <div>
                  <h1 className="font-bold text-lg tracking-wide">Item</h1>
                </div>
                <div className="flex gap-16 text-lg font-bebas">
                  <h1 className="font-bold">Quantity</h1>
                  <h1 className="font-bold">Price</h1>
                  <h1 className="font-bold">Amount</h1>
                </div>
              </div>
              {selectedOrder.products.map((p, i) => (
                <>
                  <div key={i} className="font-bebas flex justify-between">
                    <div>
                      <div className="mt-2">{p.name}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customframename}</div>
                      <div className="mt-2">{p.customframeprice}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customhandlebarname}</div>
                      <div className="mt-2">{p.customhandlebarprice}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customgroupsetname}</div>
                      <div className="mt-2">{p.customgroupsetprice}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customwheelsetname}</div>
                      <div className="mt-2">{p.customwheelsetprice}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customtirename}</div>
                      <div className="mt-2">{p.customtireprice}</div>
                    </div>
                    <div>
                      <div className="mt-2">{p.customtsaddlename}</div>
                      <div className="mt-2">{p.customsaddleprice}</div>
                    </div>
                    

                    <div className="font-bebas flex space-x-[3rem]">
                      <div className="text-lg">
                        <div className="mt-2">
                          <div className="text-center text-base">
                            {p.quantity}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg">
                        <div className="mt-2">
                          <div className="text-center text-base">
                            {p.price.toLocaleString("en-PH", {
                              style: "currency",
                              currency: "PHP",
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg">
                        <div className="mt-2">
                          <div className="text-base">php {p.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </>
          )}
        </DialogContent>

        <div className="flex justify-between">
          <DialogTitle
            sx={{ height: "100px", backgroundColor: "gray", width: "75%" }}
          >
            <div className="font-bebas">
              <img src={logo} alt="" className="w-12" />
              <div className="text-xs text-white w-[21rem]">
                We're preparing your order with care and attention to detail. If
                you have any special requests, please let us know and we'll do
                our best to accommodate them.
              </div>
            </div>
          </DialogTitle>

          <DialogTitle sx={{ backgroundColor: "orangered", height: "100px" }}>
            {selectedOrder && (
              <>
                <div>
                  <h1 className="font-bebas text-sm justify-end flex">
                    Delivery Fee +{selectedOrder.deliveryFee}
                  </h1>
                  <h1 className="font-bebas text-sm justify-end flex">total</h1>
                  <h1 className="font-bebas text-3xl justify-end flex text-white">
                    {selectedOrder.totalPrice.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </h1>
                </div>
              </>
            )}
          </DialogTitle>
        </div>

        <DialogContent>
          <div className="flex items-center gap-1 font-bebas text-center mx-auto justify-center text-xs mt-4">
            <TbCopyright /> Cyclecore est 2020
          </div>
        </DialogContent>

        <DialogActions>
          {selectedOrder && (
            <ReactToPrint
              trigger={() => {
                return (
                  <div
                    className={`hover:underline hover:text-orange-500 cursor-pointer font-bebas flex items-center print-button`}
                  >
                    <TiPrinter /> print invoice
                  </div>
                );
              }}
              content={() => componentRef.current}
              pageStyle="@media print {.MuiDialogTitle-root {-webkit-print-color-adjust: exact; print-color-adjust: exact;}}"
              style={{ display: "none" }}
              documentTitle={`order#: ${selectedOrder._id}`}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
