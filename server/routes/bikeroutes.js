import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
import {
  createframe,
  creategroupset,
  createhandlebar,
  createtire,
  frameimg,
  framephoto,
  groupsetimg,
  groupsetphoto,
  handlebarimg,
  handlebarphoto,
  listframe,
  listgroupset,
  listhandlebar,
  listtire,
  tireimg,
  tirephoto,
} from "../controllers/bike.js";

router.post("/frame", requireSignin, isAdmin, formidable({
  multiples: true,
}), createframe);
router.get("/frames", listframe);
router.get("/frame/photo/:frameId", framephoto);
router.get("/frame/img/:frameId", frameimg);
router.post(
  "/handlebar",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createhandlebar
);
router.get("/handlebars", listhandlebar);
router.get("/handlebar/photo/:handlebarId", handlebarphoto);
router.get("/handlebar/img/:handlebarId", handlebarimg);
router.post(
  "/groupset",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  creategroupset
);
router.get("/groupsets", listgroupset);
router.get("/groupset/photo/:groupsetId", groupsetphoto);
router.get("/groupset/img/:groupsetId", groupsetimg);
router.post("/tire", requireSignin, isAdmin, formidable(), createtire);
router.get("/tires", listtire);
router.get("/tire/photo/:frameId", tirephoto);
router.get("/tire/img/:tireId", tireimg);

export default router;
