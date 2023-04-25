import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import {
  Box,
  Grid,
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

  return (
    <>
      <div className="m-10">
        <div>
          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  <BiPrinter
                    fontSize={25}
                    className="hover:text-sky-300 rounded-sm"
                  />
                </button>
              );
            }}
            content={() => componentRef.current}
            documentTitle="Print Order History"
            pageStyle="print"
          />
        </div>
        <strong>ORDER HISTORY</strong>
        <div ref={componentRef}>
          <TableContainer style={{ maxHeight: "unset" }}>
            <Table style={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow style={{ height: "20px" }}>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "5px",
                    }}
                  >
                    <span>Order#</span>
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    PRODUCT
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    PRODUCT NAME
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "5px",
                    }}
                  >
                    PRICE
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    STATUS
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    BUYER
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    ORDERED
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "10px",
                    }}
                  >
                    PAYMENT
                  </TableCell>
                  <TableCell
                    sx={{
                      border: 1,
                      textAlign: "center",
                      fontSize: "10px",
                      width: "5px",
                    }}
                  >
                    QUANTITY
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((o, i) => (
                  <TableRow key={o._id} style={{ height: "20px" }}>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        width: "10px",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "10px",
                      }}
                    >
                      {o?.products?.map((o, i) => (
                        <div key={i}>
                          <img
                            src={`${
                              import.meta.env.VITE_APP_REACT_APP_API
                            }/product/photo/${o._id}`}
                            alt=""
                            className="w-32 mx-auto"
                          />
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        width: "10px",
                      }}
                    >
                      {o?.products?.map((p, i) => (
                        <div key={i}>
                          <h1 className="w-20 text-center mb-2 mx-auto">
                            {p.name}
                          </h1>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "5px",
                      }}
                    >
                      {o?.products?.map((o, i) => (
                        <div key={i} className="mb-2">
                          ₱{o.price}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "2px",
                        maxWidth: "5px",
                      }}
                    >
                      <Select
                        style={{ width: "20%" }}
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status?.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "10px",
                      }}
                    >
                      {o?.buyer?.lastname},{o?.buyer?.firstname}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "10px",
                      }}
                    >
                      {moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss")}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "10px",
                      }}
                    >
                      {o?.payment?.success ? "Success" : "Failed"}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: 1,
                        textAlign: "center",
                        fontSize: "10px",
                        maxWidth: "10px",
                      }}
                    >
                      {o?.products?.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
