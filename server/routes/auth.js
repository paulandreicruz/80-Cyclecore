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

router.get("/orders/search/:keyword", requireSignin, isAdmin, orderSearch);

//test
router.get("/secret", requireSignin, isAdmin, secret);

//contactus
router.post("/send-email", send);

//orders
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

export default router;
