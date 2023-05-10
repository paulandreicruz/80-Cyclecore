import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// CART
import { useCart } from "../../context/Cart";

// NAVBAR
import Navbar from "../../global/nav/Navbar";

// MUI COMPONENTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Button,
  DialogContentText,
} from "@mui/material";

// ICONS
import { TbCameraPlus } from "react-icons/tb";
import { BiReset } from "react-icons/bi";
import { FaRegHandPointRight } from "react-icons/fa";
import { CgClose, CgCloseR } from "react-icons/cg";
import { IoWarning } from "react-icons/io5";

// BIKE LOGO
import bcl from "../../assets/bcl.png";
import load from "../../assets/load.gif";

// FRAME COMBINATION
import f2 from "../../assets/frame2Combinations//frame/f2.png";

// HANDLEBAR COMBINATIONS
import f2b2 from "../../assets/frame2Combinations/handlebar/f2b2.png";
import f2b3 from "../../assets/frame2Combinations/handlebar/f2b3.png";

// GROUPSET COMBINATIONS
import f2b3g5 from "../../assets/frame2Combinations/groupset/f2b3g5.png";
import f2b2g5 from "../../assets/frame2Combinations/groupset/f2b2g5.png";
import f2b2g4 from "../../assets/frame2Combinations/groupset/f2b2g4.png";
import f2b3g4 from "../../assets/frame2Combinations/groupset/f2b3g4.png";

// WHEELSET COMBINATIONS
import f2b3g5w7 from "../../assets/frame2Combinations/wheelset/f2b3g5w7.png";
import f2b3g4w7 from "../../assets/frame2Combinations/wheelset/f2b3g4w7.png";
import f2b2g5w7 from "../../assets/frame2Combinations/wheelset/f2b2g5w7.png";
import f2b2g4w7 from "../../assets/frame2Combinations/wheelset/f2b2g4w7.png";
import f2b2g4w6 from "../../assets/frame2Combinations/wheelset/f2b2g4w6.png";
import f2b2g5w6 from "../../assets/frame2Combinations/wheelset/f2b2g5w6.png";
import f2b3g4w6 from "../../assets/frame2Combinations/wheelset/f2b3g4w6.png";
import f2b3g5w6 from "../../assets/frame2Combinations/wheelset/f2b3g5w6.png";

// TIRE COMBINATIONS
import f2b3g5w7t9 from "../../assets/frame2Combinations/tire/f2b3g5w7t9.png";
import f2b3g5w6t9 from "../../assets/frame2Combinations/tire/f2b3g5w6t9.png";
import f2b3g4w7t9 from "../../assets/frame2Combinations/tire/f2b3g4w7t9.png";
import f2b3g4w6t9 from "../../assets/frame2Combinations/tire/f2b3g4w6t9.png";
import f2b2g5w7t9 from "../../assets/frame2Combinations/tire/f2b2g5w7t9.png";
import f2b2g5w6t9 from "../../assets/frame2Combinations/tire/f2b2g5w6t9.png";
import f2b2g4w7t9 from "../../assets/frame2Combinations/tire/f2b2g4w7t9.png";
import f2b2g4w6t9 from "../../assets/frame2Combinations/tire/f2b2g4w6t9.png";
import f2b2g4w6t8 from "../../assets/frame2Combinations/tire/f2b2g4w6t8.png";
import f2b2g4w7t8 from "../../assets/frame2Combinations/tire/f2b2g4w7t8.png";
import f2b2g5w6t8 from "../../assets/frame2Combinations/tire/f2b2g5w6t8.png";
import f2b2g5w7t8 from "../../assets/frame2Combinations/tire/f2b2g5w7t8.png";
import f2b3g4w6t8 from "../../assets/frame2Combinations/tire/f2b3g4w6t8.png";
import f2b3g4w7t8 from "../../assets/frame2Combinations/tire/f2b3g4w7t8.png";
import f2b3g5w6t8 from "../../assets/frame2Combinations/tire/f2b3g5w6t8.png";
import f2b3g5w7t8 from "../../assets/frame2Combinations/tire/f2b3g5w7t8.png";

// SADDLE COMBINATION
import f2b3g5w7t9s11 from "../../assets/frame2Combinations/saddle/f2b3g5w7t9s11.png";
import f2b3g5w7t8s11 from "../../assets/frame2Combinations/saddle/f2b3g5w7t8s11.png";
import f2b3g5w6t9s11 from "../../assets/frame2Combinations/saddle/f2b3g5w6t9s11.png";
import f2b3g5w6t8s11 from "../../assets/frame2Combinations/saddle/f2b3g5w6t8s11.png";
import f2b3g4w7t9s11 from "../../assets/frame2Combinations/saddle/f2b3g4w7t9s11.png";
import f2b3g4w7t8s11 from "../../assets/frame2Combinations/saddle/f2b3g4w7t8s11.png";
import f2b3g4w6t9s11 from "../../assets/frame2Combinations/saddle/f2b3g4w6t9s11.png";
import f2b3g4w6t8s11 from "../../assets/frame2Combinations/saddle/f2b3g4w6t8s11.png";
import f2b2g5w7t9s11 from "../../assets/frame2Combinations/saddle/f2b2g5w7t9s11.png";
import f2b2g5w7t8s11 from "../../assets/frame2Combinations/saddle/f2b2g5w7t8s11.png";
import f2b2g5w6t9s11 from "../../assets/frame2Combinations/saddle/f2b2g5w6t9s11.png";
import f2b2g5w6t8s11 from "../../assets/frame2Combinations/saddle/f2b2g5w6t8s11.png";
import f2b2g4w7t9s11 from "../../assets/frame2Combinations/saddle/f2b2g4w7t9s11.png";
import f2b2g4w7t8s11 from "../../assets/frame2Combinations/saddle/f2b2g4w7t8s11.png";
import f2b2g4w6t9s11 from "../../assets/frame2Combinations/saddle/f2b2g4w6t9s11.png";
import f2b2g4w6t8s11 from "../../assets/frame2Combinations/saddle/f2b2g4w6t8s11.png";
import f2b3g5w7t9s10 from "../../assets/frame2Combinations/saddle/f2b3g5w7t9s10.png";
import f2b3g5w7t8s10 from "../../assets/frame2Combinations/saddle/f2b3g5w7t8s10.png";
import f2b3g5w6t9s10 from "../../assets/frame2Combinations/saddle/f2b3g5w6t9s10.png";
import f2b3g5w6t8s10 from "../../assets/frame2Combinations/saddle/f2b3g5w6t8s10.png";
import f2b3g4w7t9s10 from "../../assets/frame2Combinations/saddle/f2b3g4w7t9s10.png";
import f2b3g4w7t8s10 from "../../assets/frame2Combinations/saddle/f2b3g4w7t8s10.png";
import f2b3g4w6t9s10 from "../../assets/frame2Combinations/saddle/f2b3g4w6t9s10.png";
import f2b3g4w6t8s10 from "../../assets/frame2Combinations/saddle/f2b3g4w6t8s10.png";
import f2b2g5w7t9s10 from "../../assets/frame2Combinations/saddle/f2b2g5w7t9s10.png";
import f2b2g5w7t8s10 from "../../assets/frame2Combinations/saddle/f2b2g5w7t8s10.png";
import f2b2g5w6t9s10 from "../../assets/frame2Combinations/saddle/f2b2g5w6t9s10.png";
import f2b2g5w6t8s10 from "../../assets/frame2Combinations/saddle/f2b2g5w6t8s10.png";
import f2b2g4w7t9s10 from "../../assets/frame2Combinations/saddle/f2b2g4w7t9s10.png";
import f2b2g4w7t8s10 from "../../assets/frame2Combinations/saddle/f2b2g4w7t8s10.png";
import f2b2g4w6t9s10 from "../../assets/frame2Combinations/saddle/f2b2g4w6t9s10.png";
import f2b2g4w6t8s10 from "../../assets/frame2Combinations/saddle/f2b2g4w6t8s10.png";

export const Customize2 = () => {
  // FRAME STATES
  const [frame, setFrame] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // LOAD FRAME
  const loadFrame = async () => {
    const response = await axios.get("/frames2");
    setFrame(response.data);
  };

  // RENDER FRAME IMAGE
  const renderFImage = () => {
    if (selectedFrame && frame.length > 0) {
      if (
        selectedFrame._id === frame[0]._id ||
        frame.indexOf(selectedFrame) === 0
      ) {
        return <img src={f2} alt="" />;
      }
    }

    return null;
  };

  // HANDLEBAR STATES
  const [handlebar, setHandlebar] = useState([]);
  const [selectedHandleBar, setSelectedHandleBar] = useState(null);

  // LOAD HANDLEBAR
  const loadHandleBar = async () => {
    const response = await axios.get("/handlebars");
    setHandlebar(response.data);
  };

  // RENDER HANDLEBAR IMAGE
  const renderHImage = () => {
    if (
      selectedFrame &&
      selectedHandleBar &&
      frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 0
    ) {
      return <img src={f2b3} alt="" />;
    }
    if (
      selectedFrame &&
      selectedHandleBar &&
      frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 1
    ) {
      return <img src={f2b2} alt="" />;
    }
    return null;
  };

  // GROUPSET STATES
  const [groupset, setGroupSet] = useState([]);
  const [selectedGroupSet, setSelectedGroupSet] = useState(null);

  // LOAD GROUPSET
  const loadGroupSet = async () => {
    const response = await axios.get("/groupsets");
    setGroupSet(response.data);
  };

  // RENDER GROUPSET IMAGE
  const renderGImage = () => {
    return (
      selectedFrame &&
      selectedHandleBar &&
      selectedGroupSet &&
      (frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 0 &&
      groupset.indexOf(selectedGroupSet) === 0 ? (
        <img src={f2b3g5} alt="" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 ? (
        <img src={f2b2g5} alt="" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 ? (
        <img src={f2b2g4} alt="" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 ? (
        <img src={f2b3g4} alt="" />
      ) : null)
    );
  };

  // WHEELSET STATES
  const [wheelset, setWheelSet] = useState([]);
  const [selectedWheelSet, setSelectedWheelSet] = useState("");

  // LOAD WHEELSET
  const loadWheelSet = async () => {
    const response = await axios.get("/wheelsets");
    setWheelSet(response.data);
  };

  // RENDER WHEELSET IMAGE
  const renderWImage = () => {
    return (
      selectedFrame &&
      selectedHandleBar &&
      selectedGroupSet &&
      selectedWheelSet &&
      (frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 0 &&
      groupset.indexOf(selectedGroupSet) === 0 &&
      wheelset.indexOf(selectedWheelSet) === 0 ? (
        <img src={f2b3g5w7} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 ? (
        <img src={f2b3g4w7} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 ? (
        <img src={f2b2g5w7} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 ? (
        <img src={f2b2g4w7} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 ? (
        <img src={f2b3g5w6} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 ? (
        <img src={f2b3g4w6} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 ? (
        <img src={f2b2g5w6} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 ? (
        <img src={f2b2g4w6} alt="img" />
      ) : null)
    );
  };

  // TIRE STATES
  const [tire, setTire] = useState([]);
  const [selectedTire, setSelectedTire] = useState("");

  // LOAD TIRE
  const loadTire = async () => {
    const response = await axios.get("/tires");
    setTire(response.data);
  };

  // RENDER TIRE IMAGE
  const renderTImage = () => {
    return (
      selectedFrame &&
      selectedHandleBar &&
      selectedGroupSet &&
      selectedWheelSet &&
      selectedTire &&
      (frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 0 &&
      groupset.indexOf(selectedGroupSet) === 0 &&
      wheelset.indexOf(selectedWheelSet) === 0 &&
      tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b3g5w7t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b3g5w6t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b3g4w7t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b3g4w6t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b2g5w7t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b2g5w6t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b2g4w7t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 ? (
        <img src={f2b2g4w6t9} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b2g4w6t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b2g4w7t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b2g5w6t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b2g5w7t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b3g4w6t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b3g4w7t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b3g5w6t8} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 ? (
        <img src={f2b3g5w7t8} alt="img" />
      ) : null)
    );
  };

  // SADDLE STATES
  const [saddle, setSaddle] = useState([]);
  const [selectedSaddle, setSelectedSaddle] = useState("");

  // LOAD SADDLE
  const loadSaddle = async () => {
    const response = await axios.get("/saddles");
    setSaddle(response.data);
  };

  // RENDER SADDLE IMAGE
  const renderSImage = () => {
    return (
      selectedFrame &&
      selectedHandleBar &&
      selectedGroupSet &&
      selectedWheelSet &&
      selectedTire &&
      selectedSaddle &&
      (frame.indexOf(selectedFrame) === 0 &&
      handlebar.indexOf(selectedHandleBar) === 0 &&
      groupset.indexOf(selectedGroupSet) === 0 &&
      wheelset.indexOf(selectedWheelSet) === 0 &&
      tire.indexOf(selectedTire) === 0 &&
      saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g5w7t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g5w7t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g5w6t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g5w6t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g4w7t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g4w7t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g4w6t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b3g4w6t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g5w7t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g5w7t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g5w6t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g5w6t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g4w7t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g4w7t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g4w6t9s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0 ? (
        <img src={f2b2g4w6t8s11} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g5w7t9s10} alt="0mg" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g5w7t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g5w6t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g5w6t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g4w7t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g4w7t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g4w6t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b3g4w6t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g5w7t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g5w7t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g5w6t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g5w6t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g4w7t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g4w7t8s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g4w6t9s10} alt="img" />
      ) : frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1 ? (
        <img src={f2b2g4w6t8s10} alt="img" />
      ) : null)
    );
  };

  //useEffect
  useEffect(() => {
    loadFrame();
    loadHandleBar();
    loadGroupSet();
    loadWheelSet();
    loadTire();
    loadSaddle();
  }, []);

  // BUTTON STATES
  const [buttonIndex, setButtonIndex] = useState(0);

  // CART CONTEXT
  const [cart, setCart] = useCart();

  // ADD TO CART
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t9s11}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t9s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w7t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w7t9s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g5w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            s`${f2b2g5w6t9s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g5w7t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g5w7t9s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b3g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 0
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 0 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 0 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 0 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 0 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
      if (
        selectedFrame &&
        selectedHandleBar &&
        selectedGroupSet &&
        selectedWheelSet &&
        selectedTire &&
        selectedSaddle &&
        frame.indexOf(selectedFrame) === 0 &&
        handlebar.indexOf(selectedHandleBar) === 1 &&
        groupset.indexOf(selectedGroupSet) === 1 &&
        wheelset.indexOf(selectedWheelSet) === 1 &&
        tire.indexOf(selectedTire) === 1 &&
        saddle.indexOf(selectedSaddle) === 1
      ) {
        const p = {
          customframename: selectedFrame.name,
          customframeprice: selectedFrame.price,
          customhandlebarname: selectedHandleBar.name,
          customhandlebarprice: selectedHandleBar.price,
          customgroupsetname: selectedGroupSet.name,
          customgroupsetprice: selectedGroupSet.price,
          customwheelsetname: selectedWheelSet.name,
          customwheelsetprice: selectedWheelSet.price,
          customtirename: selectedTire.name,
          customtireprice: selectedTire.price,
          customtsaddlename: selectedSaddle.name,
          customsaddleprice: selectedSaddle.price,
          name: "Exploro Frame Custom Build",
          price:
            selectedFrame.price +
            selectedHandleBar.price +
            selectedGroupSet.price +
            selectedWheelSet.price +
            selectedTire.price +
            selectedSaddle.price,
          image: `${f2b2g4w6t8s10}`,
          quantity: 1,
        };
        setCart([...cart, p]);
        localStorage.setItem("cart", JSON.stringify([...cart, { ...p }]));
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectedItemsTotal = () => {
    // Add the prices of all selected items
    let total = 0;
    if (selectedFrame && selectedFrame.price) {
      total += selectedFrame.price;
    }
    if (selectedHandleBar && selectedHandleBar.price) {
      total += selectedHandleBar.price;
    }
    if (selectedGroupSet && selectedGroupSet.price) {
      total += selectedGroupSet.price;
    }
    if (selectedWheelSet && selectedWheelSet.price) {
      total += selectedWheelSet.price;
    }
    if (selectedTire && selectedTire.price) {
      total += selectedTire.price;
    }
    if (selectedSaddle && selectedSaddle.price) {
      total += selectedSaddle.price;
    }

    // Return the total price
    return total;
  };

  // SET DIALOG STATES
  const [dialog, setDialog] = useState(false);

  //   hover handle bar

  // const [showSpecs, setShowSpecs] = useState(false);

  // const [specs, setSpecs] = useState(null);

  // useEffect(() => {
  //     if (selectedHandleBar) {
  //         setSpecs({
  //             brand: '3t exploro',
  //             description: selectedHandleBar.description,
  //             price: selectedHandleBar.price,
  //             // add more specs data here
  //         });
  //     }
  // }, [selectedHandleBar]);

  return (
    <>
      <Navbar />
      <div className="font-bebas bg-gray-200 h-screen px-10 py-5">
        <style>
          {`
                    .box {
                        position: relative;
                        display: flex;
                        background: rgba(0,0,0,0,5)
                    }

                    .box::before {
                        content: '';
                        position: absolute;
                        width: 300px;
                        height: 72%;
                        background-color: #FF8C00;
                        animation: animate 5s linear infinite;
                    }

                    .box::after{
                        content: ''
                        position: absolute;
                        background: #0e1538;
                        inset: 4px;
                        border-radius: 16px;
                    }
                    
                    @keyframes animate
                    {
                        0%
                        {
                            transform: rotate(180deg);
                        }
                        100%
                        {
                            transform:rotate(360deg)
                        } 
                    }

                `}
        </style>
        <Grid container gap={2} justifyContent="center">
          {/* CUSTOMIZE */}
          <Grid item md={8}>
            <Paper
              className="p-3 w-full justify-center mx-auto"
              sx={{ borderRadius: "0", boxShadow: "none" }}
            >
              <div className=" flex justify-center mx-auto w-[70%]">
                {renderFImage() ? null : (
                  <div>
                    <img src={bcl} alt="" className="mx-auto w-[30%]" />
                    <img src={load} alt="" className="mx-auto w-[30%]" />
                  </div>
                )}
                {renderHImage() ? null : renderFImage()}
                {renderGImage() ? null : renderHImage()}
                {renderWImage() ? null : renderGImage()}
                {renderTImage() ? null : renderWImage()}
                {renderSImage() ? null : renderTImage()}
                {renderSImage()}
              </div>
            </Paper>

            <Paper className="px-2 py-2 my-2 font-bold flex items-center justify-between">
              <div className="text-white">
                <button
                  type="button"
                  value={1}
                  onClick={() => setButtonIndex(1)}
                  className={`${
                    buttonIndex === 1 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-md rounded-r-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 active:scale-90 rounded-sm rounded-r-none tracking-widest`}
                >
                  FRAME
                </button>
                <button
                  type="button"
                  value={2}
                  onClick={() => setButtonIndex(2)}
                  className={`${
                    buttonIndex === 2 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 active:scale-90 tracking-widest`}
                >
                  HANDLEBARS
                </button>
                <button
                  type="button"
                  value={3}
                  onClick={() => setButtonIndex(3)}
                  className={`${
                    buttonIndex === 3 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 active:scale-90 tracking-widest`}
                >
                  GROUPSETS
                </button>
                <button
                  type="button"
                  value={4}
                  onClick={() => setButtonIndex(4)}
                  className={`${
                    buttonIndex === 4 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 active:scale-90 tracking-widest`}
                >
                  WHEELSETS
                </button>
                <button
                  type="button"
                  value={5}
                  onClick={() => setButtonIndex(5)}
                  className={`${
                    buttonIndex === 5 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 active:scale-90 tracking-widest`}
                >
                  TIRES
                </button>
                <button
                  type="button"
                  value={6}
                  onClick={() => setButtonIndex(6)}
                  className={`${
                    buttonIndex === 6 &&
                    "bg-yellow-500 text-gray-800 scale-105 rounded-sm rounded-l-sm transform transition-transform duration-200"
                  } bg-orange-500 p-2 rounded-sm rounded-l-none active:scale-90 tracking-widest`}
                >
                  SADDLES
                </button>
              </div>

              <div className="group relative border rounded-sm">
                <button
                  type="button"
                  className="w-full text-black rounded-sm flex items-center gap-1 font-bold tracking-widest hover:bg-[#FFA500] transition-all duration-500 ease-out p-2"
                  onClick={() => window.location.reload()}
                >
                  <BiReset className="z-10" />
                  <span className="transform transition-transform z-10">
                    restart build
                  </span>
                </button>
                <span className="absolute inset-0 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform transform origin-left" />
              </div>
            </Paper>

            <Paper className="p-3 w-[full]">
              {buttonIndex === 1 ? (
                <>
                  {/* frame */}
                  <Paper
                    className="p-1 w-[30%]"
                    sx={{ backgroundColor: "lightgray" }}
                  >
                    {frame?.map((f, i) => (
                      <>
                        <div className="flex rounded-sm" key={f._id}>
                          <div className="w-[50%] items-center flex">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/frame2/photo/${f._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[50%] space-y-2 p-1.5 group">
                            <div>
                              <span className="text-xl font-bold tracking-wider flex items-center justify-between">
                                {f.name}

                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(true)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </span>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{f.price}
                            </div>

                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedFrame(f)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* DIALOG */}
                        <Dialog open={dialog} onClose={() => setDialog(false)}>
                          <DialogTitle>
                            <span className="tracking-wider text-xl font-bold font-bebas">
                              {f.name} full specifications
                            </span>
                          </DialogTitle>

                          <DialogContent>
                            <div className="font-bebas space-y-3">
                              <div>
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/frame2/photo/${f._id}`}
                                  alt=""
                                  className="w-[70%] mx-auto"
                                />
                              </div>
                              <span className="flex justify-between">
                                Price:{" "}
                                <span className="text-red-600">
                                  php {f.price}
                                </span>
                              </span>
                              <div className="text-sm tracking-wide flex justify-between">
                                <span>Brand:</span>
                                <span>3t exploro</span>
                              </div>
                              <div className="text-sm tracking-wide flex justify-between">
                                <span>Brand ID</span>
                                <span>{f.brand}</span>
                              </div>
                              <div className="text-xs tracking-wider px">
                                <p className="mb-2 text-sm">Description</p>
                                {f.description} Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Odit
                                necessitatibus obcaecati eligendi atque adipisci
                                repellendus ex harum dolor velit! Asperiores
                                facere voluptatum adipisci perspiciatis
                                repellendus praesentium dolorem ex natus
                                dolores.
                              </div>
                              <div className="text-sm tracking-wide">
                                <span>Color</span>
                                <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                  Brown/ Dirt{" "}
                                  <div className="p-3 bg-[#b4b490] rounded-sm" />{" "}
                                  <div className="p-3 bg-[#b08c72] rounded-sm" />
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                          <DialogActions>
                            <button
                              className="p-1 w-full bg-orange-500 rounded-sm"
                              onClick={() => setDialog(false)}
                            >
                              <span className="font-bebas flex items-center gap-1 justify-center text-lg font-bold text-white tracking-widest">
                                <CgCloseR />
                                Close
                              </span>
                            </button>
                          </DialogActions>
                        </Dialog>
                      </>
                    ))}
                  </Paper>
                </>
              ) : null}

              {buttonIndex === 2 ? (
                <>
                  {/* handlebar */}
                  <div className="w-[55%] flex gap-10">
                    {handlebar?.map((h, i) => (
                      <>
                        <Paper
                          className="flex items-center rounded-sm"
                          key={h._id}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          <div className="w-[50%] items-center flex p-2">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/handlebar/photo/${h._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[100%] space-y-2 p-2 group">
                            <div>
                              <div className="flex justify-between">
                                {h.name}
                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(h)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </div>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{h.price}
                            </div>

                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedHandleBar(h)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </Paper>
                        {dialog === h && (
                          <>
                            <Dialog
                              open={dialog}
                              onClose={() => setDialog(false)}
                            >
                              <DialogTitle>
                                <span className="text-lg font-bebas font-bold tracking-wider">
                                  {h.name} full specifications
                                </span>
                              </DialogTitle>
                              <DialogContent>
                                <div className="font-bebas space-y-3">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/handlebar/photo/${h._id}`}
                                      alt=""
                                      className="w-[70%] mx-auto"
                                    />
                                  </div>
                                  <span className="flex justify-between">
                                    Price:{" "}
                                    <span className="text-red-600">
                                      php {h.price}
                                    </span>
                                  </span>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Category:</span>
                                    <span>{h?.category?.name}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brand ID:</span>
                                    <span>{h?.brand?.name}</span>
                                  </div>
                                  <div className="text-xs tracking-wider px">
                                    <p className="mb-2 text-sm">Description</p>
                                    {h.description}
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Material:</span>
                                    <span>{h.material}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>D12 Compatible:</span>
                                    <span>{h.compatible}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Type:</span>
                                    <span>{h.type}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Width C to C in Hoods:</span>
                                    <span>{h.widthhood}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Width C to C in Drops:</span>
                                    <span>{h.widthdrops}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Material:</span>
                                    <span>{h.material}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Reach:</span>
                                    <span>{h.reaches}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Drop/Rise:</span>
                                    <span>{h.drops}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Clamp Diameter:</span>
                                    <span>{h.clampdiameter}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Torque Spec: Face Plate:</span>
                                    <span>{h.faceplate}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Torque Spec: Controls:</span>
                                    <span>{h.controls}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weight:</span>
                                    <span>{h.weigth}</span>
                                  </div>

                                  <div className="text-sm tracking-wide">
                                    <span>Color</span>
                                    <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                      Black{" "}
                                      <div className="p-3 bg-black rounded-sm" />
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDialog(false)}
                                  className="font-bebas p-2 bg-orange-500 rounded-sm w-[25%] text-white font-bold text-lg tracking-wider flex items-center gap-1 justify-center"
                                >
                                  <CgCloseR />
                                  close
                                </button>
                              </DialogActions>
                            </Dialog>

                            {/* add more specs data here */}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </>
              ) : null}

              {buttonIndex === 3 ? (
                <>
                  {/* groupsets */}
                  <div className="w-[65%] flex gap-10">
                    {groupset?.map((g, i) => (
                      <>
                        <Paper
                          className="flex items-center rounded-sm"
                          key={g._id}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          <div className="w-[50%] items-center flex p-6">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/groupset/photo/${g._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[50%] space-y-2 p-2 group">
                            <div>
                              <span className="text-xl font-bold tracking-wider flex items-center justify-between">
                                {g.name}

                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(g)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </span>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{g.price}
                            </div>
                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedGroupSet(g)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </Paper>
                        {/* DIALOG */}
                        {dialog === g && (
                          <>
                            <Dialog
                              open={dialog}
                              onClose={() => setDialog(false)}
                            >
                              <DialogTitle>
                                <span className="text-lg font-bebas font-bold tracking-wider">
                                  {g.name} full specifications
                                </span>
                              </DialogTitle>
                              <DialogContent>
                                <div className="font-bebas space-y-3">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/groupset/photo/${g._id}`}
                                      alt=""
                                      className="w-[70%] mx-auto"
                                    />
                                  </div>
                                  <span className="flex justify-between">
                                    Price:{" "}
                                    <span className="text-red-600">
                                      php {g.price}
                                    </span>
                                  </span>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Category:</span>
                                    <span>{g?.category?.name}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brand:</span>
                                    <span>{g?.brand?.name}</span>
                                  </div>

                                  <div className="text-xs tracking-wider px">
                                    <p className="mb-2 text-sm">Description</p>
                                    {g.description}
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Type:</span>
                                    <span>{g.type}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weight:</span>
                                    <span>{g.weigth}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Chainring combination:</span>
                                    <span>{g.chain}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Crank arm length:</span>
                                    <span>{g.armlength}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Connectors:</span>
                                    <span>{g.connectors}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Battery Charging cable:</span>
                                    <span>{g.charging}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>
                                      Force measurement Number of strain sensor:
                                    </span>
                                    <span>{g.sensor}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Casette:</span>
                                    <span>{g.cassette}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brakes:</span>
                                    <span>{g.weigth}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Functionality:</span>
                                    <span>{g.functionality}</span>
                                  </div>
                                  <div className="text-sm tracking-wide">
                                    <span>Color</span>
                                    <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                      gray/dark gray{" "}
                                      <div className="p-3 bg-[#62676b] rounded-sm" />{" "}
                                      <div className="p-3 bg-[#33363b] rounded-sm" />{" "}
                                      <div className="p-3 bg-[black] rounded-sm" />{" "}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDialog(false)}
                                  className="font-bebas p-2 bg-orange-500 rounded-sm w-[25%] text-white font-bold text-lg tracking-wider flex items-center gap-1 justify-center"
                                >
                                  <CgCloseR />
                                  close
                                </button>
                              </DialogActions>
                            </Dialog>

                            {/* add more specs data here */}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </>
              ) : null}

              {buttonIndex === 4 ? (
                <>
                  {/* wheelsets */}
                  <div className="w-[55%] flex gap-10">
                    {wheelset?.map((w, i) => (
                      <>
                        <Paper
                          className="flex items-center rounded-sm"
                          key={w._id}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          <div className="w-[100%] items-center flex p-2">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/wheelset/photo/${w._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[150%] space-y-2 p-2 group">
                            <div>
                              <span className="text-xl flex items-center justify-between font-bold tracking-wider">
                                {w.name}
                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(w)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </span>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{w.price}
                            </div>

                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedWheelSet(w)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </Paper>

                        {/* DIALOG */}
                        {dialog === w && (
                          <>
                            <Dialog
                              open={dialog}
                              onClose={() => setDialog(false)}
                            >
                              <DialogTitle>
                                <span className="text-lg font-bebas font-bold tracking-wider">
                                  {w.name} full specifications
                                </span>
                              </DialogTitle>
                              <DialogContent>
                                <div className="font-bebas space-y-3">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/wheelset/photo/${w._id}`}
                                      alt=""
                                      className="w-[70%] mx-auto"
                                    />
                                  </div>
                                  <span className="flex justify-between">
                                    Price:{" "}
                                    <span className="text-red-600">
                                      php {w.price}
                                    </span>
                                  </span>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Category:</span>
                                    <span>{w?.category?.name}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brand:</span>
                                    <span>{w?.brand?.name}</span>
                                  </div>
                                  <div className="text-xs tracking-wider px">
                                    <p className="mb-2 text-sm">Description</p>
                                    {w.description}
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Type:</span>
                                    <span>{w.type}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Diameter:</span>
                                    <span>{w.diamter}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Cassette compatibility:</span>
                                    <span>{w.compatibilty}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Hub width:</span>
                                    <span>{w.width}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Holes:</span>
                                    <span>{w.holes}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Valve:</span>
                                    <span>{w.valve}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Cross section:</span>
                                    <span>{w.dual}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Material:</span>
                                    <span>{w.material}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weigth:</span>
                                    <span>{w.weight}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brake type:</span>
                                    <span>{w.brake}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Tube Type:</span>
                                    <span>{w.tube}</span>
                                  </div>
                                  <div className="text-sm tracking-wide">
                                    <span>Color</span>
                                    <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                      gray/dark gray{" "}
                                      <div className="p-3 bg-[#62676b] rounded-sm" />{" "}
                                      <div className="p-3 bg-[#33363b] rounded-sm" />{" "}
                                      <div className="p-3 bg-[black] rounded-sm" />{" "}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDialog(false)}
                                  className="font-bebas p-2 bg-orange-500 rounded-sm w-[25%] text-white font-bold text-lg tracking-wider flex items-center gap-1 justify-center"
                                >
                                  <CgCloseR />
                                  close
                                </button>
                              </DialogActions>
                            </Dialog>
                            {/* add more specs data here */}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </>
              ) : null}

              {buttonIndex === 5 ? (
                <>
                  {/* tire */}
                  <div className="w-[55%] flex gap-10">
                    {tire?.map((t, i) => (
                      <>
                        <Paper
                          className="flex items-center rounded-sm"
                          key={t._id}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          <div className="w-[50%] items-center flex p-6">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/tire/photo/${t._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[50%] space-y-2 p-2 group">
                            <div>
                              <span className="text-xl flex items-center justify-between font-bold tracking-wider">
                                {t.name}
                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(t)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </span>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{t.price}
                            </div>

                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedTire(t)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </Paper>

                        {dialog === t && (
                          <>
                            <Dialog
                              open={dialog}
                              onClose={() => setDialog(false)}
                            >
                              <DialogTitle>
                                <span className="text-lg font-bebas font-bold tracking-wider">
                                  {t.name} full specifications
                                </span>
                              </DialogTitle>
                              <DialogContent>
                                <div className="font-bebas space-y-3">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="w-[70%] mx-auto"
                                    />
                                  </div>
                                  <span className="flex justify-between">
                                    Price:{" "}
                                    <span className="text-red-600">
                                      php {t.price}
                                    </span>
                                  </span>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Category:</span>
                                    <span>{t?.category?.name}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brand:</span>
                                    <span>{t?.brand?.name}</span>
                                  </div>
                                  <div className="text-xs tracking-wider px">
                                    <p className="mb-2 text-sm">Description</p>
                                    {t.description}
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Type:</span>
                                    <span>{t.type}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Casing:</span>
                                    <span>{t.casing}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Bead:</span>
                                    <span>{t.bead}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Compound:</span>
                                    <span>{t.compound}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Flat Protection:</span>
                                    <span>{t.flat}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weight:</span>
                                    <span>{t.weight}</span>
                                  </div>

                                  <div className="text-sm tracking-wide">
                                    <span>Color</span>
                                    <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                      Black/brown/yellow{" "}
                                      <div className="p-3 bg-black rounded-sm" />{" "}
                                      <div className="p-3 bg-[#926744] rounded-sm" />{" "}
                                      <div className="p-3 bg-[#e2ad4b] rounded-sm" />
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDialog(false)}
                                  className="font-bebas p-2 bg-orange-500 rounded-sm w-[25%] text-white font-bold text-lg tracking-wider flex items-center gap-1 justify-center"
                                >
                                  <CgCloseR />
                                  close
                                </button>
                              </DialogActions>
                            </Dialog>
                            {/* add more specs data here */}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </>
              ) : null}

              {buttonIndex === 6 ? (
                <>
                  {/* saddle */}
                  <div className="w-[65%] flex gap-10">
                    {saddle?.map((s, i) => (
                      <>
                        <Paper
                          className="flex items-center rounded-sm"
                          key={s._id}
                          sx={{ backgroundColor: "lightgray" }}
                        >
                          <div className="w-[50%] items-center flex p-6">
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/saddle/photo/${s._id}`}
                              alt=""
                            />
                          </div>

                          <div className="w-[50%] space-y-2 p-2 group">
                            <div>
                              <span className="text-xl flex items-center justify-between font-bold tracking-wider">
                                {s.name}
                                <span
                                  className="text-[11px] font-normal hover:underline hover:cursor-pointer flex items-center gap-1"
                                  onClick={() => setDialog(s)}
                                >
                                  <FaRegHandPointRight className="text-blue-500" />
                                  view specs
                                </span>
                              </span>
                            </div>

                            <div className="text-sm tracking-wide flex justify-between">
                              <span>price</span>
                              php{s.price}
                            </div>

                            <div className="box box2 flex justify-center overflow-hidden p-0.5 rounded-sm">
                              <button className="p-2 font-bold w-full tracking-widest rounded-sm flex items-center gap-1.5 justify-center relative overflow-hidden bg-gray-50 z-10">
                                <TbCameraPlus className="z-10" />
                                <span
                                  className="z-10 transform transition-transform duration-500"
                                  onClick={() => setSelectedSaddle(s)}
                                >
                                  Add To Build
                                </span>
                              </button>
                            </div>
                          </div>
                        </Paper>

                        {dialog === s && (
                          <>
                            <Dialog
                              open={dialog}
                              onClose={() => setDialog(false)}
                            >
                              <DialogTitle>
                                <span className="text-lg font-bebas font-bold tracking-wider">
                                  {s.name} full specifications
                                </span>
                              </DialogTitle>
                              <DialogContent>
                                <div className="font-bebas space-y-3">
                                  <div>
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/saddle/photo/${s._id}`}
                                      alt=""
                                      className="w-[70%] mx-auto"
                                    />
                                  </div>
                                  <span className="flex justify-between">
                                    Price:{" "}
                                    <span className="text-red-600">
                                      php {s.price}
                                    </span>
                                  </span>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Category:</span>
                                    <span>{s?.category?.name}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Brand:</span>
                                    <span>{s?.brand?.name}</span>
                                  </div>
                                  <div className="text-xs tracking-wider px">
                                    <p className="mb-2 text-sm">Description</p>
                                    {s.description}
                                  </div>

                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Size:</span>
                                    <span>{s.size}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Body:</span>
                                    <span>{s.body}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weigth Description:</span>
                                    <span>{s.weightdesc}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Concave:</span>
                                    <span>{s.concave}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Weight:</span>
                                    <span>{s.weight}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Compatibility:</span>
                                    <span>{s.compatible}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Technology:</span>
                                    <span>{s.technology}</span>
                                  </div>
                                  <div className="text-sm tracking-wide flex justify-between">
                                    <span>Note:</span>
                                    <span>{s.note}</span>
                                  </div>

                                  <div className="text-sm tracking-wide">
                                    <span>Color</span>
                                    <div className="p-2 border-2 flex items-center gap-2 border-orange-400 rounded-sm">
                                      Black/brown/yellow{" "}
                                      <div className="p-3 bg-black rounded-sm" />{" "}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                              <DialogActions>
                                <button
                                  onClick={() => setDialog(false)}
                                  className="font-bebas p-2 bg-orange-500 rounded-sm w-[25%] text-white font-bold text-lg tracking-wider flex items-center gap-1 justify-center"
                                >
                                  <CgCloseR />
                                  close
                                </button>
                              </DialogActions>
                            </Dialog>

                            {/* add more specs data here */}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                </>
              ) : null}
            </Paper>
          </Grid>

          {/* BUILD SUMMARY */}
          <Grid item md={3}>
            <Paper className="p-3 space-y-4">
              <div>BUILD SUMMARY</div>

              <div className="px-10 space-y-3 text-sm">
                {selectedFrame && (
                  <div className="flex justify-between">
                    Selected frame:{" "}
                    <span className="font-bold">{selectedFrame.name}</span>
                    <span>
                      {selectedFrame.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedHandleBar && (
                  <div className="flex justify-between">
                    Selected Handlebar:{" "}
                    <span className="font-bold">{selectedHandleBar.name}</span>{" "}
                    <span>
                      {selectedHandleBar.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedGroupSet && (
                  <div className="flex justify-between">
                    Selected groupset:{" "}
                    <span className="font-bold">{selectedGroupSet.name}</span>{" "}
                    <span>
                      {selectedGroupSet.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedWheelSet && (
                  <div className="flex justify-between">
                    Selected wheelset:{" "}
                    <span className="font-bold">{selectedWheelSet.name}</span>
                    <span>
                      {selectedWheelSet.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedTire && (
                  <div className="flex justify-between">
                    Selected tire:{" "}
                    <span className="font-bold">{selectedTire.name}</span>
                    <span>
                      {selectedTire.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedSaddle && (
                  <div className="flex justify-between">
                    Selected saddle:{" "}
                    <span className="font-bold">{selectedSaddle.name}</span>
                    <span>
                      {selectedSaddle.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </div>
                )}
                {selectedSaddle && selectedSaddle.name ? (
                  <div className="h-[1px] bg-gray-200 my-4" />
                ) : null}
                {selectedSaddle.name ? (
                  <div className="flex items-center justify-between text-lg font-bold tracking-wide">
                    <span className="text-sm">Total</span>
                    {selectedItemsTotal().toLocaleString("en-US", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </div>
                ) : null}
              </div>
              <div>
                <button
                  className="p-3 w-full bg-orange-500 rounded-sm"
                  onClick={() => setIsDialogOpen(true)}
                  disabled={
                    !selectedFrame ||
                    !selectedHandleBar ||
                    !selectedWheelSet ||
                    !selectedGroupSet ||
                    !selectedTire ||
                    !selectedSaddle
                  }
                >
                  Add To Cart
                </button>
              </div>
            </Paper>
          </Grid>
        </Grid>
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
                Are you sure you want to add this custom build to your cart?
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              onClick={handleAddToCart}
            >
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
    </>
  );
};
