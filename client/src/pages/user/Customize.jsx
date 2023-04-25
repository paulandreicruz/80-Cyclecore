import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";
import { FaRegHandPointLeft } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import IM from "../../assets/initialImage.gif";
import Navbar from "../../global/nav/Navbar";

export const NewCustomize = () => {
  const [dialog, setDialog] = useState(false);
  const [frames, setFrames] = useState([]);
  const [handlebar, setHandlebar] = useState([]);
  const [groupset, setgroupset] = useState([]);
  const [selectedImg, setSelectedImg] = useState(IM);

  useEffect(() => {
    loadFrames();
    loadHandlebar();
    loadGroupSet();
  }, []);

  const loadFrames = async () => {
    const response = await axios.get("/frames");
    setFrames(response.data);
  };

  const loadHandlebar = async () => {
    const response = await axios.get("/handlebars");
    setHandlebar(response.data);
  };

  const loadGroupSet = async () => {
    const response = await axios.get("/groupsets");
    setgroupset(response.data);
  };

  const handleBarSelect = (bar) => {
    setSelectedImg(
      `${import.meta.env.VITE_APP_REACT_APP_API}/handlebar/img/${bar._id}`
    );
    setDialog(false); // close the dialog after selecting an image
  };

  // Initialize the confirmation state to false
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Function to handle the confirmation logic
  const handleConfirmation = (img) => {
    if (window.confirm("Are you sure you want to add this part?")) {
      setSelectedImg(img);
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  };

  return (
    <>
    <Navbar />
      <div className="font-bebas p-20 bg-gray-200 h-screen">
        <form>
          <Grid container gap={4}>
            {/* left side customize */}

            <Grid item className="flex-1 space-y-5">
              <Paper className="p-3">
                <div>
                  {/* build Image */}
                  <div className="justify-center flex w-[55rem] mx-auto">
                    <img src={selectedImg} alt="" />
                  </div>
                </div>
              </Paper>

              <Paper className="p-3">
                <div>
                  <div className="flex items-center justify-between">
                    {selectedImg === IM ? (
                      <h1 className="text-lg tracking-wider">Frameset</h1>
                    ) : (
                      <h1 className="text-lg tracking-wider">Bars & Stems</h1>
                    )}
                    <Button
                      variant="contained"
                      color="inherit"
                      startIcon={<FaRegHandPointLeft />}
                      size="small"
                    >
                      {" "}
                      <span className="font-bebas text-lg">
                        Previous Step
                      </span>{" "}
                    </Button>
                  </div>
                  <div className="h-[1px] bg-gray-200 my-1.5" />
                  {/* Product Cards */}
                  <div className="group">
                    {selectedImg === IM ? (
                      <div className="w-[20rem] flex items-center gap-4">
                        {frames?.map((f) => (
                          <div
                            className="border hover:cursor-pointer"
                            onClick={() =>
                              handleConfirmation(
                                `${
                                  import.meta.env.VITE_APP_REACT_APP_API
                                }/frame/photo/${f._id}`
                              )
                            }
                            key={f._id}
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/frame/photo/${f._id}`}
                              alt=""
                            />
                            <div className="flex items-center justify-between">
                              <h1>{f.name}</h1>
                              <h1>PHP {f.price}</h1>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {selectedImg === IM ||
                    selectedImg !==
                      "http://localhost:3000/api/frame/photo/6443db470ba2e891b557315a" ? null : (
                      <div className="w-1/3 flex items-center gap-4">
                        {handlebar?.map((bar) => (
                          <div
                            className="border hover:cursor-pointer"
                            onClick={() =>
                              handleConfirmation(
                                `${
                                  import.meta.env.VITE_APP_REACT_APP_API
                                }/handlebar/img/${bar._id}`
                              )
                            }
                            key={bar._id}
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/handlebar/photo/${bar._id}`}
                              alt=""
                            />
                            <div className="flex items-center justify-between">
                              <h1>{bar.name}</h1>
                              <h1>PHP {bar.price}</h1>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {selectedImg === IM ||
                    selectedImg ===
                      "http://localhost:3000/api/frame/photo/6443db470ba2e891b557315a" ||
                    selectedImg.includes("groupset/img/") ? null : (
                      <div>
                        {selectedImg ===
                        "http://localhost:3000/api/handlebar/img/6443e1260ba2e891b55731a3" ? (
                          <div className="flex items-center gap-4">
                            {groupset.slice(2, 4).map((g) => (
                              <div
                                className="border hover:cursor-pointer w-56"
                                onClick={() =>
                                  handleConfirmation(
                                    `${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/groupset/img/${g._id}`
                                  )
                                }
                                key={g._id}
                              >
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/groupset/photo/${g._id}`}
                                  alt=""
                                  className="w-32"
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{g.name}</h1>
                                  <h1>PHP{g.price}</h1>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          selectedImg && (
                            <div className="flex items-center gap-4">
                              {groupset.slice(0, 2).map((g) => (
                                <div
                                  className="border hover:cursor-pointer w-56"
                                  onClick={() =>
                                    handleConfirmation(
                                      `${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/groupset/img/${g._id}`
                                    )
                                  }
                                  key={g._id}
                                >
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/groupset/photo/${g._id}`}
                                    alt=""
                                    className="w-36 mx-auto"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{g.name}</h1>
                                    <h1>PHP{g.price}</h1>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className=" group-hover:block ease-in-out duration-500 mt-2">
                  <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<FiPlusSquare />}
                    size="small"
                    fullWidth
                  >
                    <span className="font-bebas tracking-wider">
                      Add To Build
                    </span>
                  </Button>
                </div>
              </Paper>
            </Grid>
            {/* right side summary */}
            <Grid item className="w-[28rem]">
              Build Summary
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};
