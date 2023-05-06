import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import {
  Box,
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
import { Select } from "antd";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";
import Search from "../../components/forms/AdminSearchForm";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function AdminOrders() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { Option } = Select;

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef(null);

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  // handleOrderDetailsClick
  const handleOrderDetailsClick = (orders) => {
    setDialogOpen(true);
    setSelectedOrder(orders);
    setSelectedOrderProducts(orders.products);
  };

  console.log(typeof orders.createdAt);

  return (
    <>
      <div className="px-10 py-5 font-bebas bg-gray-200 h-screen">
        <div className="flex justify-between mb-3">
          <Search />
          <ReactToPrint
            trigger={() => {
              return (
                <button className="flex items-center gap-1 hover:text-orange-500">
                  <BiPrinter fontSize={25} />
                  print order
                </button>
              );
            }}
            content={() => componentRef.current}
            documentTitle="Print Order History"
            pageStyle="print"
          />
        </div>

        <div>
          <Paper>
            <div className="py-2 px-4 border-b bg-white">
              <strong className="text-3xl tracking-wider flex items-center gap-1">
                ORDER HISTORY{" "}
                <MdOutlineHistoryEdu className="text-yellow-500" />
              </strong>
            </div>

            <div className="p-4 bg-white">
              <table
                className="w-[100%] justify-evenly border"
                ref={componentRef}
              >
                <thead className="border-b">
                  <tr className="text-left text-xl tracking-wide bg-gray-100">
                    <th className="p-2">Order Id</th>
                    <th className="p-2">User</th>
                    <th className="p-2">product</th>
                    <th className="p-2">price</th>
                    <th className="p-2">email</th>
                    <th className="p-2">order date</th>
                    <th className="p-2">view</th>
                  </tr>
                </thead>

                <tbody>
                  {orders?.map((o, i) => (
                    <>
                      {o?.products?.map((p, i) => (
                        <>
                          <tr key={i} className="border-b">
                            <td className="p-2">{o?.ordernumber}</td>

                            <td className="p-2">
                              {o?.buyer?.lastname},{o?.buyer?.firstname}
                            </td>

                            <td className="p-2">{p.name}</td>

                            <td className="p-2">
                              {p.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "PHP",
                              })}
                            </td>

                            <td className="p-2">{o?.buyer?.email}</td>

                            <td className="p-2">
                              {moment(o.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss"
                              )}
                            </td>

                            <td className="p-2">
                              <button
                                className="p-1"
                                onClick={handleOrderDetailsClick}
                              >
                                <BsThreeDotsVertical />
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
