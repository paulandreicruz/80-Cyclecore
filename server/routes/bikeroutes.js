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
  createsaddle,
  createtire,
  createwheelset,
  frameimg,
  framephoto,
  groupsetimg,
  groupsetphoto,
  handlebarimg,
  handlebarphoto,
  listframe,
  listgroupset,
  listhandlebar,
  listsaddle,
  listtire,
  listwheelset,
  saddleimg,
  saddlephoto,
  tireimg,
  tirephoto,
  wheelsetimg,
  wheelsetphoto,
} from "../controllers/bike.js";

router.post(
  "/frame",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createframe
);
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
router.get("/wheelsets", listwheelset);
router.get("/wheelset/photo/:wheelsetId", wheelsetphoto);
router.get("/wheelset/img/:wheelsetId", wheelsetimg);
router.post(
  "/wheelset",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createwheelset
);
router.post("/tire", requireSignin, isAdmin, formidable(), createtire);
router.get("/tires", listtire);
router.get("/tire/photo/:frameId", tirephoto);
router.get("/tire/img/:tireId", tireimg);
router.post(
  "/wheelset",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createwheelset
);

router.get("/saddles", listsaddle);
router.get("/saddle/photo/:saddleId", saddlephoto);
router.get("/saddle/img/:saddleId", saddleimg);
router.post(
  "/saddle",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createsaddle
);

export default router;
