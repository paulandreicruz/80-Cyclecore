
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

//components
import { Card,Space } from "antd";
import { Grid } from "@mui/material"

//icons
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { IoArrowBackCircleOutline, IoCreateOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { Button, Paper } from "@mui/material";
import { TiEdit } from "react-icons/ti";

export default function AdminProducts() {
  const { Meta } = Card;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {}
  };

  return (
    <div className="font-bebas bg-gray-200 h-screen py-5">
      <div className="mx-auto max-w-[90rem]">
        <Paper className="p-3 mb-5">
          <NavLink to="/dashboard/admin">
              <Button variant="contained" color="inherit" className="items-center flex text-white gap-1" size="small">
                <IoArrowBackCircleOutline className="text-lg"/>
                <span className="font-bebas tracking-widest text-lg">Back</span>
              </Button>
            </NavLink>
        </Paper>

        <Paper className="px-5 pt-5">
          <div className="flex justify-between mb-5">
            <div className="flex items-center text-2xl gap-1">
              <h1>Product List</h1> 
              <TbListDetails/>
            </div>
            <div>
              <NavLink to="/dashboard/admin/products/create">
                <Button variant="contained" color="inherit" startIcon={<IoCreateOutline/>}><span className="font-bebas">Create Product</span></Button>
              </NavLink>
            </div>
          </div>

          <div>
            {products?.map((p) => (
              <div key={p._id} to={`/dashboard/admin/product/update/${p.slug}`}>
                  <Grid container justifyContent="space-between">
                    {/* left side */}
                      <Grid item>

                          <Paper elevation={5} className="p-2">
                          <Card
                            style={{
                              width: 300,
                              border: "none"
                            }}
                            cover={
                              <img
                                alt={p.name}
                                src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${p._id}`}
                                style={{
                                  height: 200,
                                  width: 300,
                                }}
                              />
                            }
                          >
                            <Meta title={p.name} className="font-bebas text-center tracking-wider"/>
                          </Card>
                          </Paper>
                        
                      </Grid>               
                    {/* right side */}
                      <Grid item>
                        <div className="w-[60rem] pb-5">
                          <Paper elevation={5} className="p-3 space-y-5 h-[280px]">
                            <div className="flex items-center text-2xl justify-between mb-5">
                              <div>{p.name}</div>
                              <div>
                              <NavLink className="text-lg" to={`/dashboard/admin/product/update/${p.slug}`}>
                                <Button variant="contained" color="inherit" startIcon={<TiEdit/>}><span className="font-bebas tracking-wider">Edit</span></Button>
                              </NavLink></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>Price: <span className="tracking-wide text-xl">{p.price}</span></div>
                              <div>Category: <span className="tracking-wide text-xl">{p.category.name}</span></div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>Stocks: <span className="tracking-wide text-xl">{p.stocks}</span></div>
                              <div>Sub-Category: <span className="tracking-wide text-xl">{p.subcategory.name}</span></div>
                            </div>

                            <div>Brand: <span className="tracking-wide text-xl">{p.brand.name}</span></div>
                            <div>
                              Create:   
                              <span className="tracking-wide text-xl ml-1">
                                {moment(p.createdAt).format(
                                    "MMMM Do YYYY, h:mm:ss"
                                  )}
                              </span>
                            </div>
                          </Paper>
                        </div>
                        
                      </Grid>
                  </Grid>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  );
}
