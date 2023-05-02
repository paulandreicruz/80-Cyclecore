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
import {
  createframe2,
  creategroupset2,
  createhandlebar2,
  createsaddle2,
  createtire2,
  createwheelset2,
  frame2img,
  frame2photo,
  groupset2img,
  groupset2photo,
  handlebar2img,
  handlebar2photo,
  listframe2,
  listgroupset2,
  listhandlebar2,
  listsaddle2,
  listtire2,
  listwheelset2,
  saddle2img,
  saddle2photo,
  tire2img,
  tire2photo,
  wheelset2img,
  wheelset2photo,
} from "../controllers/bike2.js";
import { createframe3, creategroupset3, createsaddle3, createtire3, createwheelset3, frame3img, frame3photo, groupset3img, groupset3photo, listframe3, listgroupset3, listsaddle3, listtire3, listwheelset3, saddle3img, saddle3photo, tire3img, tire3photo, wheelset3img, wheelset3photo } from "../controllers/bike3.js";

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

// frame 2
router.post(
  "/frame2",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createframe2
);
router.get("/frames2", listframe2);
router.get("/frame2/photo/:frame2Id", frame2photo);
router.get("/frame2/img/:frame2Id", frame2img);

// handlebar2
router.post(
  "/handlebar2",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createhandlebar2
);
router.get("/handlebars2", listhandlebar2);
router.get("/handlebar2/photo/:handlebar2Id", handlebar2photo);
router.get("/handlebar2/img/:handlebar2Id", handlebar2img);

// groupset2
router.post(
  "/groupset2",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  creategroupset2
);
router.get("/groupsets2", listgroupset2);
router.get("/groupset2/photo/:groupset2Id", groupset2photo);
router.get("/groupset2/img/:groupset2Id", groupset2img);

// wheelset2
router.post(
  "/wheelset2",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createwheelset2
);
router.get("/wheelsets2", listwheelset2);
router.get("/wheelset2/photo/:wheelset2Id", wheelset2photo);
router.get("/wheelset2/img/:wheelset2Id", wheelset2img);

// tire
router.post(
  "/tire2", 
  requireSignin, 
  isAdmin, 
  formidable(), 
  createtire2
);
router.get("/tires2", listtire2);
router.get("/tire2/photo/:tire2Id", tire2photo);
router.get("/tire2/img/:tire2Id", tire2img);


router.get("/saddles2", listsaddle2);
router.get("/saddle2/photo/:saddle2Id", saddle2photo);
router.get("/saddle2/img/:saddle2Id", saddle2img);
router.post(
  "/saddle2",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createsaddle2
);



// frame 3
router.post(
  "/frame3",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createframe3
);
router.get("/frames3", listframe3);
router.get("/frame3/photo/:frame3Id", frame3photo);
router.get("/frame3/img/:frame3Id", frame3img);


// groupset3
router.post(
  "/groupset3",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  creategroupset3
);
router.get("/groupsets3", listgroupset3);
router.get("/groupset3/photo/:groupset3Id", groupset3photo);
router.get("/groupset3/img/:groupset3Id", groupset3img);

// wheelset3
router.post(
  "/wheelset3",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createwheelset3
);
router.get("/wheelsets3", listwheelset3);
router.get("/wheelset3/photo/:wheelset3Id", wheelset3photo);
router.get("/wheelset3/img/:wheelset3Id", wheelset3img);

// tire
router.post(
  "/tire3", 
  requireSignin, 
  isAdmin, 
  formidable(), 
  createtire3
);
router.get("/tires3", listtire3);
router.get("/tire3/photo/:tire3Id", tire3photo);
router.get("/tire3/img/:tire3Id", tire3img);


router.get("/saddles3", listsaddle3);
router.get("/saddle3/photo/:saddle3Id", saddle3photo);
router.get("/saddle3/img/:saddle3Id", saddle3img);
router.post(
  "/saddle3",
  requireSignin,
  isAdmin,
  formidable({
    multiples: true,
  }),
  createsaddle3
);

export default router;
