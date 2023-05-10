import express from "express";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  allOrders,
  verifyEmail,
  resendVerificationEmail,
  addAddress,
  getAddress,
  deleteAddress,
  addShippingAddress,
  getShippingAddress,
  send,
  orderSearch,
  addDeliveryOption,
  getUsers,
  getOrderCount,
  getTotalSales,
  getAllUsers,
  getfiveOrders,
  deleteUserById,
  getSalesInMay,
  getSalesByWeek,
  getHottestProducts,
  getTotalStocks,
  getNewlyAddedStocks,
  getNewlyAddedStocksForToday,
  getAverageOrders,
  getTotalSold,
  getSalesByDay,
  deleteOrder,
  addPaymentOption,
} from "../controllers/auth.js";

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignin, updateProfile);
router.put("/address", requireSignin, addAddress);
router.get("/useraddress", requireSignin, getAddress);
router.delete("/useraddress/:addressId", requireSignin, deleteAddress);
router.put("/add-shipping-address", requireSignin, addShippingAddress);
router.get("/shipping-address", requireSignin, getShippingAddress);
router.put("/add-delivery-option", requireSignin, addDeliveryOption);
router.put("/add-payment-option", requireSignin, addPaymentOption);

router.get("/orders/search/:keyword", requireSignin, isAdmin, orderSearch);

//test
router.get("/secret", requireSignin, isAdmin, secret);

//contactus
router.post("/send-email", send);

//orders
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);
router.delete("/deleteorders/:id", requireSignin, isAdmin, deleteOrder);
router.get("/orders/count", requireSignin, isAdmin, getOrderCount);
router.get("/orders/count/sales", requireSignin, isAdmin, getTotalSales);
router.get("/latestorder", requireSignin, isAdmin, getfiveOrders);
router.get("/sales", requireSignin, isAdmin, getSalesInMay);
router.get("/weeklysales", requireSignin, isAdmin, getSalesByWeek);
router.get("/daysales", requireSignin, isAdmin, getSalesByDay);
router.get("/hottestproducts", requireSignin, isAdmin, getHottestProducts);
router.get("/totalstocks", requireSignin, isAdmin, getTotalStocks);
router.get(
  "/products/total-stocks",
  requireSignin,
  isAdmin,
  getNewlyAddedStocks
);
router.get(
  "/products/total-stocks/today",
  requireSignin,
  isAdmin,
  getNewlyAddedStocksForToday
);
router.get("/orders/averageorders", requireSignin, isAdmin, getAverageOrders);
router.get("/totalsold", requireSignin, isAdmin, getTotalSold),
  //users
  router.get("/users/count", requireSignin, isAdmin, getUsers);
router.get("/allusers", requireSignin, isAdmin, getAllUsers);
router.delete("/users/:id", requireSignin, isAdmin, deleteUserById);

export default router;
