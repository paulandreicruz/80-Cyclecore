import { useState } from "react";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

import { Badge } from "antd";
import {
  Grid,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function CustomShopCard({ p }) {
  //hooks
  const [cart, setCart] = useCart();
  console.log(cart);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Check if item already exists in cart
    const existingCartItem = cart.find((item) => item._id === p._id);
    if (existingCartItem) {
      // If item exists, update quantity
      const updatedCart = cart.map((item) => {
        if (item._id === p._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If item does not exist, add to cart
      setCart([...cart, { ...p, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...p, quantity: 1 }])
      );
    }
    setIsDialogOpen(false);
    toast.success("Added to Cart", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="md:ml-32 font-bebas">
      <Grid
        container
        display="flex"
        spacing={5}
        rowGap={5}
        className="mb-14 mx-auto"
      >
        <Grid item md={4}>
          <Box>
            <Badge.Ribbon
              text={`${p?.sold} sold`}
              color="red"
              className="font-bebas tracking-wider"
            >
              <Badge.Ribbon
                className="font-bebas tracking-wider"
                text={`${
                  p?.stocks > 0 ? `${p?.stocks} in stock` : "Out of stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  src={`${
                    import.meta.env.VITE_APP_REACT_APP_API
                  }/product/photo/${p._id}`}
                  alt=""
                  className="rounded-md"
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
          </Box>
        </Grid>

        <Grid item md={8} alignContent="center" justifyItems="center">
          <Box className="text-left space-y-5">
            <Box>
              <h1 className="text-3xl font-semibold tracking-wider">
                {p.name}
              </h1>
            </Box>
            <Box>
              <Typography>
                <span className="font-bebas tracking-wide">
                  {p.description}
                </span>
              </Typography>
            </Box>

            <Box>
              <span className="text-sm">Price:</span>
              <span className="text-lg">
                {" "}
                {p.price.toLocaleString("en-PH", {
                  style: "currency",
                  currency: "PHP",
                })}
              </span>
            </Box>
            <Box className="space-x-5">
              <Button
                variant="contained"
                color="inherit"
                startIcon={<FiShoppingCart />}
                onClick={() => setIsDialogOpen(true)}
                disabled={p.stocks === 0}
              >
                <span className="font-bebas tracking-wide">
                  {p.stocks === 0 ? "Out of stock" : "Add To Cart"}
                </span>
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IoWarning />}
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <span className="font-bebas tracking-wide">View Product</span>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Dialog */}

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>
          <span className="flex items-center justify-between font-bebas tracking-wide">
            Add To Cart?
            <IoWarning className="text-yellow-300 mr-1" fontSize={32} />
          </span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="font-bebas tracking-wide">
              Are you sure you want to add this item to your cart?
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="inherit" onClick={handleAddToCart}>
            <span className="font-bebas tracking-wide">Add to cart</span>
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setIsDialogOpen(false)}
          >
            <span className="font-bebas tracking-wide">NO</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomShopCard;
