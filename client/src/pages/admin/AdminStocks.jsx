import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { AiOutlineStock } from "react-icons/ai";
import { TiCancelOutline } from "react-icons/ti";
import { SiTailwindcss } from "react-icons/si";

const AdminStocks = () => {
  //state
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stocksToAdd, setStocksToAdd] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  //hooks
  const [auth, setAuth] = useAuth();

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {}
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddStocks = async () => {
    try {
      console.log("Selected product:", selectedProduct);
      console.log("Stocks to add:", stocksToAdd);

      const formData = new FormData();
      formData.append("stocks", stocksToAdd);

      const { data } = await axios.post(
        `/products/stocks/${selectedProduct._id}/add`,
        formData
      );
      console.log("Response data:", data);

      const updatedProducts = products.map((p) =>
        p._id === data._id ? data : p
      );
      console.log("Updated products:", updatedProducts);

      setProducts(updatedProducts);
      setSelectedProduct(null);
      setStocksToAdd(0);
      setShowDialog(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-10 py-5 font-bebas bg-gray-200 h-screen">
        <div className="flex justify-between">
          {/* <ReactToPrint
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
          /> */}
        </div>

        <div className="py-2 px-4 border-b flex items-center justify-between bg-white shadow-md">
          <div className="flex items-center text-3xl">
            <h1 className="font-bold tracking-wider">Stock Management</h1>
            <MdOutlineLocalFireDepartment className="text-red-500" />
          </div>

          <div>
            <NavLink to="/dashboard/admin">
              <Button
                variant="contained"
                color="inherit"
                size="small"
                startIcon={<TiArrowBack />}
              >
                <span className="tracking-wider text-lg font-bebas font-bold">
                  Back
                </span>
              </Button>
            </NavLink>
          </div>
        </div>

        <div className="bg-white p-4 border-gray-300 shadow-md">
          <div className="">
            <table className="w-[100%] border">
              <thead className="border-b text-xl bg-gray-100 font-bold tracking-wide">
                <tr>
                  <td className="text-left py-3 px-4">Product ID</td>
                  <td className="text-left py-3 px-4">Product Name</td>
                  <td className="text-left py-3 px-4">Stocks</td>
                  <td></td>
                </tr>
              </thead>

              <tbody>
                {products?.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="text-left py-3 px-4">{p._id}</td>

                    <td className="text-left py-3 px-4">{p.name}</td>

                    <td className="text-left py-3 px-4">{p.stocks}</td>

                    <td>
                      <button
                        className="py-1 px-5 ml-5 text-white bg-yellow-500 hover:bg-yellow-600 rounded-sm font-bold tracking-widest flex items-center gap-1"
                        onClick={() => {
                          setSelectedProduct(p);
                          setShowDialog(true);
                        }}
                      >
                        <SiTailwindcss />
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="border-b p-2">
                <h2 className=" font-bold">Product Name: {selectedProduct.name}</h2>
              </div>

              <div className="p-2">
                <h2 className=" font-medium mb-2">
                  Current Stocks:{selectedProduct.stocks}
                </h2>
              </div>

              <div className="flex items-center gap-3 p-2">
                <h1 htmlFor="stocksToAdd" className="mr-2">
                  Stocks to add:
                </h1>

                <TextField
                  type="number"
                  variant="standard"
                  id="stocksToAdd"
                  className="border border-gray-300 p-1 rounded-sm w-32"
                  onChange={(e) => {
                    // added conditional statement to prevent value from going lower than 1
                    if (e.target.value < 1) {
                      setStocksToAdd(1);
                    } else {
                      setStocksToAdd(e.target.value);
                    }
                  }}
                  value={stocksToAdd}
                  InputProps={{
                    style: {
                      fontFamily: "Bebas Neue",
                      fontSize: 16,
                    },
                  }}
                />
              </div>

              <div className="flex items-center justify-between p-2">
                <button
                  className="py-1 px-2 bg-gray-500 hover:bg-gray-400 font-bold text-white rounded-sm tracking-widest flex items-center gap-1"
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowDialog(false);
                  }}
                >
                  <TiCancelOutline />
                  Cancel
                </button>
                <button
                  className="py-1 px-2 bg-green-500 hover:bg-green-400 font-bold text-white tracking-widest rounded-sm flex items-center gap-1"
                  onClick={handleAddStocks}
                >
                  <AiOutlineStock />
                  Add Stocks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStocks;
