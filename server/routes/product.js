import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
import {
  create,
  list,
  read,
  photo,
  remove,
  update,
  filteredProducts,
  listProducts,
  productsCount,
  productSearch,
  relatedProducts,
  getToken,
  processPayment,
  addShippingOption,
  getShippingOption,
  createcustomize,
  listcustomize,
  readcustomize,
  photocustomize,
  updateStocks,
  processPickup,
  orderStatus,
  paypalPayment,
  executePaypalPayment,
} from "../controllers/product.js";

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post(
  "/products/stocks/:productId/add",
  requireSignin,
  isAdmin,
  formidable(),
  updateStocks
);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);
router.post("/shipping", addShippingOption);
router.get("/shipping-option", requireSignin, getShippingOption);

//payment
router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);
router.post("/payment/pickup", requireSignin, processPickup);
router.post("/paypal", requireSignin, paypalPayment);
router.get("/execute-payment", executePaypalPayment);

router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

router.post(
  "/customize",
  requireSignin,
  isAdmin,
  formidable(),
  createcustomize
);
router.get("/customizes", listcustomize);
router.get("/customize/:slug", readcustomize);
router.get("/customize/photo/:customizeId", photocustomize);

export default router;
