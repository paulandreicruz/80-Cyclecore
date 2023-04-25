import React, { useState } from "react";
import { Box, Typography, Drawer, Button, Grid } from "@mui/material";

import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TbShoppingCartX } from "react-icons/tb";

const CartContents = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

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

  return (
    <>
      <div className="mx-auto">
        <Box className="flex justify-between mx-2 mb-4 border-b-2 border-gray-100">
          <h5 className=" font-varela pt-3">
            {totalQuantity() === 0 ? (
              <div className="font-bebas font-bold flex items-center gap-1 text-xl">
                <h1 className="mx-auto tracking-wide">Your Cart Is Empty</h1>
                <TbShoppingCartX className="animate-bounce" />
              </div>
            ) : (
              <h1 className="font-bebas text-sm">
                Cart total Items:
                <span className="font-bold font-bebas text-[17px]">
                  {" "}
                  {totalQuantity()}
                </span>
              </h1>
            )}
          </h5>
        </Box>

        {cart?.map((p, index) => (
          <Grid container key={index} gap={5} className="mb-8">
            <Grid item>
              <img
                src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${
                  p._id
                }`}
                className="w-32 rounded-md"
              />
            </Grid>

            <Grid item>
              <div className="font-bebas text-2xl tracking-wider">{p.name}</div>
              <div className="flex items-center gap-28 font-bebas text-sm mt-5">
                <div className="flex items-center gap-1 font-bold tracking-wide">
                  <h1 className="font-normal">Quantity:</h1>
                  {p.quantity}
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <h1 className="font-normal">PHP</h1>
                  {p.price}
                </div>
              </div>
            </Grid>
          </Grid>
        ))}

        <div className="space-y-3">
          <Box className="border-b-2 border-gray-100">
            <span className="font-bebas flex justify-center">
              <marquee
                direction="right"
                className="font-bold tracking-widest text-xl"
              >
                YOUR CART SUMMARY
              </marquee>
            </span>
          </Box>
          <Box>
            <span className="font-bebas flex items-center justify-between text-[17px]">
              Total :
              <span className="font-bold ml-2 text-[20px] tracking-wider">
                {cartTotal()}
              </span>
            </span>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              startIcon={<AiOutlineShoppingCart />}
            >
              <NavLink
                to="/cart"
                className="font-bebas tracking-widest text-lg"
              >
                View Cart Page
              </NavLink>
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default CartContents;
