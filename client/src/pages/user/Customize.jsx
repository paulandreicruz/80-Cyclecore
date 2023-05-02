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
import IM from "../../assets/initialImage.gif";
import Navbar from "../../global/nav/Navbar";

export const NewCustomize = () => {
  const [dialog, setDialog] = useState(false);
  const [frames, setFrames] = useState([]);
  const [handlebar, setHandlebar] = useState([]);
  const [groupset, setgroupset] = useState([]);
  const [wheelset, setWheelSet] = useState([]);
  const [tireset, setTireSet] = useState([]);
  const [saddle, setSaddle] = useState([]);
  const [selectedImg, setSelectedImg] = useState(IM);

  useEffect(() => {
    loadSaddle();
    loadFrames();
    loadHandlebar();
    loadGroupSet();
    loadWheelSet();
    loadTireSet();
  }, []);

  const loadSaddle = async () => {
    const response = await axios.get("/saddles");
    setSaddle(response.data);
  };

  const loadTireSet = async () => {
    const response = await axios.get("/tires");
    setTireSet(response.data);
  };

  const loadWheelSet = async () => {
    const response = await axios.get("/wheelsets");
    setWheelSet(response.data);
  };

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

  console.log(tireset);

  return (
    <>
      <Navbar />
      <div className="flex gap-2 w-3 "></div>
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
                    {selectedImg.includes(IM) ? (
                      <h1 className="text-lg tracking-wider">Frameset</h1>
                    ) : selectedImg.includes("frame/photo") ? (
                      <h1 className="text-lg tracking-wider">Bars & Stems</h1>
                    ) : selectedImg.includes("handlebar/img") ? (
                      <h1 className="text-lg tracking-wider">Groupsets</h1>
                    ) : selectedImg.includes("groupset/img") ? (
                      <h1 className="text-lg tracking-wider">Rimsets</h1>
                    ) : selectedImg.includes("wheelset/img") ? (
                      <h1 className="text-lg tracking-wider">Wheelsets</h1>
                    ) : selectedImg.includes("tire/img") ? (
                      <h1 className="text-lg tracking-wider">Saddles</h1>
                    ) : null}
                    <Button
                      variant="contained"
                      color="inherit"
                      startIcon={<FaRegHandPointLeft />}
                      size="small"
                      onClick={() => window.location.reload()}
                    >
                      <span className="font-bebas text-lg">Restart Build</span>
                    </Button>
                  </div>
                  <div className="h-[1px] bg-gray-200 my-5" />
                  {/* Product Cards */}
                  <div className="group">
                    {selectedImg === IM ? (
                      <div className="w-[20rem] flex items-center gap-4">
                        {frames?.map((f) => (
                          <div
                            className="border hover:cursor-pointer"
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

                            <div>
                              <button
                                className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                onClick={() =>
                                  handleConfirmation(
                                    `${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/frame/photo/${f._id}`
                                  )
                                }
                              >
                                Add To Build
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {/* handlebar */}
                    {selectedImg === IM ||
                    selectedImg !==
                      "http://localhost:3000/api/frame/photo/6443db470ba2e891b557315a" ? null : (
                      <div className="w-1/3 flex items-center gap-4">
                        {handlebar?.map((bar) => (
                          <div
                            className="border hover:cursor-pointer"
                            key={bar._id}
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_APP_REACT_APP_API
                              }/handlebar/photo/${bar._id}`}
                              alt=""
                              className="p-5"
                            />
                            <div className="flex items-center justify-between">
                              <h1>{bar.name}</h1>
                              <h1>PHP {bar.price}</h1>
                            </div>

                            <div>
                              <button
                                className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                onClick={() =>
                                  handleConfirmation(
                                    `${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/handlebar/img/${bar._id}`
                                  )
                                }
                              >
                                Add To Build
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* groupset */}
                    {selectedImg === IM ||
                    selectedImg.includes(
                      "frame/photo/6443db470ba2e891b557315a"
                    ) ||
                    selectedImg.includes("groupset/img/") ||
                    selectedImg.includes("wheelset/img") ||
                    selectedImg.includes("tire/img") ||
                    selectedImg.includes("saddle/img") ? null : (
                      <div>
                        {selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ? (
                          <div className="w-1/3 flex items-center gap-4">
                            {groupset.slice(2, 4).map((g) => (
                              <div
                                className="border hover:cursor-pointer"
                                key={g._id}
                              >
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/groupset/photo/${g._id}`}
                                  alt=""
                                  className="p-5"
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{g.name}</h1>
                                  <h1>PHP{g.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/groupset/img/${g._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          selectedImg && (
                            <div className="w-1/3 flex items-center gap-4">
                              {groupset.slice(0, 2).map((g) => (
                                <div
                                  className="border hover:cursor-pointer"
                                  key={g._id}
                                >
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/groupset/photo/${g._id}`}
                                    alt=""
                                    className="p-5"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{g.name}</h1>
                                    <h1>PHP{g.price}</h1>
                                  </div>
                                  <div>
                                    <button
                                      className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                      onClick={() =>
                                        handleConfirmation(
                                          `${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/groupset/img/${g._id}`
                                        )
                                      }
                                    >
                                      Add To Build
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {/* wheelset combinations */}
                    {/* condition to render  */}
                    {selectedImg === IM ||
                    selectedImg.includes(
                      "frame/photo/6443db470ba2e891b557315a"
                    ) ||
                    selectedImg.includes(
                      "handlebar/img/6443e1260ba2e891b55731a3"
                    ) ||
                    selectedImg.includes(
                      "handlebar/img/6443e14f0ba2e891b55731a9"
                    ) ||
                    selectedImg.includes("wheelset/img") ||
                    selectedImg.includes("tire/img") ? null : (
                      <>
                        <div className="flex">
                          {selectedImg.includes(
                            "frame/photo/6443db470ba2e891b557315a"
                          ) ||
                          selectedImg.includes(
                            "handlebar/img/6443e1260ba2e891b55731a3"
                          ) ||
                          selectedImg.includes(
                            "groupset/img/6446b3de953fc1bec0fe2d41"
                          ) ? (
                            <div className="w-1/3 flex gap-4">
                              {wheelset.slice(2, 4).map((w, i) => (
                                <div key={i} className="hover:cursor-pointer">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/wheelset/photo/${w._id}`}
                                    alt=""
                                    className="p-5"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{w.name}</h1>
                                    <h1>PHP{w.price}</h1>
                                  </div>
                                  <div>
                                    <button
                                      className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                      onClick={() =>
                                        handleConfirmation(
                                          `${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/wheelset/img/${w._id}`
                                        )
                                      }
                                    >
                                      Add To Build
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex">
                          {selectedImg.includes(
                            "frame/photo/6443db470ba2e891b557315a"
                          ) ||
                          selectedImg.includes(
                            "handlebar/img/6443e1260ba2e891b55731a3"
                          ) ||
                          selectedImg.includes(
                            "groupset/img/6446b379953fc1bec0fe2d23"
                          ) ? (
                            <div className="w-1/3 flex gap-4">
                              {wheelset.slice(6, 8).map((w, i) => (
                                <div key={i} className="hover:cursor-pointer">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/wheelset/photo/${w._id}`}
                                    alt=""
                                    className="p-5"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{w.name}</h1>
                                    <h1>PHP{w.price}</h1>
                                  </div>
                                  <div>
                                    <button
                                      className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                      onClick={() =>
                                        handleConfirmation(
                                          `${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/wheelset/img/${w._id}`
                                        )
                                      }
                                    >
                                      Add To Build
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex">
                          {selectedImg.includes(
                            "frame/photo/6443db470ba2e891b557315a"
                          ) ||
                          selectedImg.includes(
                            "handlebar/img/6443e14f0ba2e891b55731a9"
                          ) ||
                          selectedImg.includes(
                            "groupset/img/6446b432953fc1bec0fe2d4d"
                          ) ? (
                            <div className="w-1/3 flex gap-4">
                              {wheelset.slice(4, 6).map((w, i) => (
                                <div key={i} className="hover:cursor-pointer">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/wheelset/photo/${w._id}`}
                                    alt=""
                                    className="p-5"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{w.name}</h1>
                                    <h1>PHP{w.price}</h1>
                                  </div>
                                  <div>
                                    <button
                                      className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                      onClick={() =>
                                        handleConfirmation(
                                          `${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/wheelset/img/${w._id}`
                                        )
                                      }
                                    >
                                      Add To Build
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="flex">
                          {selectedImg.includes(
                            "frame/photo/6443db470ba2e891b557315a"
                          ) ||
                          selectedImg.includes(
                            "handlebar/img/6443e14f0ba2e891b55731a9"
                          ) ||
                          selectedImg.includes(
                            "groupset/img/6446b40f953fc1bec0fe2d47"
                          ) ? (
                            <div className="w-1/3 flex gap-4">
                              {wheelset.slice(0, 2).map((w, i) => (
                                <div key={i} className="hover:cursor-pointer">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_APP_REACT_APP_API
                                    }/wheelset/photo/${w._id}`}
                                    alt=""
                                    className="p-5"
                                  />
                                  <div className="flex items-center justify-between">
                                    <h1>{w.name}</h1>
                                    <h1>PHP{w.price}</h1>
                                  </div>
                                  <div>
                                    <button
                                      className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                      onClick={() =>
                                        handleConfirmation(
                                          `${
                                            import.meta.env
                                              .VITE_APP_REACT_APP_API
                                          }/wheelset/img/${w._id}`
                                        )
                                      }
                                    >
                                      Add To Build
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      </>
                    )}

                    {/* tireset */}
                    <div>
                      {selectedImg === IM ||
                      selectedImg.includes(
                        "frame/photo/6443db470ba2e891b557315a"
                      ) ||
                      selectedImg.includes(
                        "handlebar/img/6443e1260ba2e891b55731a3"
                      ) ||
                      selectedImg.includes(
                        "handlebar/img/6443e14f0ba2e891b55731a9"
                      ) ||
                      selectedImg.includes(
                        "groupset/img/6446b40f953fc1bec0fe2d47"
                      ) ||
                      selectedImg.includes("tire/img") ||
                      selectedImg.includes(
                        "groupset/img/6446b432953fc1bec0fe2d4d"
                      ) ||
                      selectedImg.includes(
                        "groupset/img/6446b379953fc1bec0fe2d23"
                      ) ||
                      selectedImg.includes("/groupset/img") ? null : (
                        <>
                          {/* f1b2g4w6t8 . f1b2g4w6t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e1260ba2e891b55731a3"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b379953fc1bec0fe2d23"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/64488de92a3d38d5d2cecfb2"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(14, 16).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b24w7t8 . f1b2g4w7t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e1260ba2e891b55731a3"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b379953fc1bec0fe2d23"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/64488eb52a3d38d5d2cecfb8"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(12, 14).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b2g5w6t8 . f1b2g5w6t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e1260ba2e891b55731a3"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b3de953fc1bec0fe2d41"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/6448b82a6896144f519cc0bd"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(10, 12).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b2g5w7t8 . f1b2g5w7t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e1260ba2e891b55731a3"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b3de953fc1bec0fe2d41"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/6448b87b6896144f519cc0c3"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(8, 10).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b3g4w6t8 . f1b3g4w6t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e14f0ba2e891b55731a9"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b40f953fc1bec0fe2d47"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/6448cb868c288f29ef3df44a"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(6, 8).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b3g4w7t8 . f1b3g4w7t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e14f0ba2e891b55731a9"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b40f953fc1bec0fe2d47"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/6448cbbe8c288f29ef3df450"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(4, 6).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b3g5w6t8 . f1b3g5w6t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e14f0ba2e891b55731a9"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b432953fc1bec0fe2d4d"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/64488f7b2a3d38d5d2cecfbe"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(2, 4).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b3g5w7t8 . f1b3g5w7t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e14f0ba2e891b55731a9"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b432953fc1bec0fe2d4d"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/64488fa32a3d38d5d2cecfc4"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(0, 2).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>

                          {/* f1b3g5w7t8 . f1b3g5w7t9 */}
                          <div className="flex">
                            {selectedImg.includes(
                              "frame/photo/6443db470ba2e891b557315a"
                            ) ||
                            selectedImg.includes(
                              "handlebar/img/6443e14f0ba2e891b55731a9"
                            ) ||
                            selectedImg.includes(
                              "groupset/img/6446b432953fc1bec0fe2d4d"
                            ) ||
                            selectedImg.includes(
                              "wheelset/img/64488fa32a3d38d5d2cecfc4"
                            ) ? (
                              <div className="w-1/3 space-x-5 flex items-center">
                                {tireset.slice(0, 2).map((t, i) => (
                                  <div
                                    className="border hover:cursor-pointer"
                                    key={i}
                                  >
                                    <img
                                      src={`${
                                        import.meta.env.VITE_APP_REACT_APP_API
                                      }/tire/photo/${t._id}`}
                                      alt=""
                                      className="p-5"
                                    />
                                    <div className="flex items-center justify-between">
                                      <h1>{t.name}</h1>
                                      <h1>PHP{t.price}</h1>
                                    </div>
                                    <div>
                                      <button
                                        className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                        onClick={() =>
                                          handleConfirmation(
                                            `${
                                              import.meta.env
                                                .VITE_APP_REACT_APP_API
                                            }/tire/img/${t._id}`
                                          )
                                        }
                                      >
                                        Add To Build
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </>
                      )}
                    </div>

                    {selectedImg.includes("frame/photo") ||
                    selectedImg.includes("handlebar/img") ||
                    selectedImg.includes("groupset/img") ||
                    selectedImg.includes("wheelset/img") ? null : (
                      <>
                        {/* saddles combinations */}
                        {/* 1 */} {/* f1b2g4w6t8s10 . f1b2g4w6t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b379953fc1bec0fe2d23"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488de92a3d38d5d2cecfb2"
                        ) ||
                        selectedImg.includes(
                          "tire/img/64494fcd5dc87edde0869fb4"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(30, 32).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 2 */} {/* f1b2g4w6t9s10 . f1b2g4w6t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b379953fc1bec0fe2d23"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488de92a3d38d5d2cecfb2"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644950245dc87edde0869fc1"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(28, 30).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 3 */} {/* f1b2g4w7t8s10 . f1b2g4w7t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b379953fc1bec0fe2d23"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488eb52a3d38d5d2cecfb8"
                        ) ||
                        selectedImg.includes(
                          "tire/img/6449508d5dc87edde0869fd8"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(26, 28).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 4 */} {/* f1b2g4w7t9s10 . f1b2g4w7t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b379953fc1bec0fe2d23"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488eb52a3d38d5d2cecfb8"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644950af5dc87edde0869fde"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(24, 26).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 5 */} {/* f1b2g5w6t8s10 . f1b2g5w6t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b3de953fc1bec0fe2d41"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448b82a6896144f519cc0bd"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644951505dc87edde086a004"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(22, 24).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 6 */} {/* f1b2g5w6t9s10 . f1b2g5w6t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b3de953fc1bec0fe2d41"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448b82a6896144f519cc0bd"
                        ) ||
                        selectedImg.includes(
                          "tire/img/6449518d5dc87edde086a00a"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(20, 22).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 7 */} {/* f1b2g5w7t8s10 . f1b2g5w7t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b3de953fc1bec0fe2d41"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448b87b6896144f519cc0c3"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644952035dc87edde086a02b"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(18, 20).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 8 */} {/* f1b2g5w7t9s10 . f1b2g5w7t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e1260ba2e891b55731a3"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b3de953fc1bec0fe2d41"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448b87b6896144f519cc0c3"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644952595dc87edde086a031"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(16, 18).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 9 */} {/* f1b3g4w6t8s10 . f1b3g4w6t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b40f953fc1bec0fe2d47"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448cb868c288f29ef3df44a"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644953695dc87edde086a04f"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(14, 16).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 10 */} {/* f1b3g4w6t9s10 . f1b3g4w6t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b40f953fc1bec0fe2d47"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448cb868c288f29ef3df44a"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644954055dc87edde086a055"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(12, 14).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 11 */} {/* f1b3g4w7t8s10 . f1b3g4w7t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b40f953fc1bec0fe2d47"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448cbbe8c288f29ef3df450"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644954865dc87edde086a075"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(10, 12).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 12 */} {/* f1b3g4w7t9s10 . f1b3g4w7t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b40f953fc1bec0fe2d47"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/6448cbbe8c288f29ef3df450"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644954af5dc87edde086a07b"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(8, 10).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 13 */} {/* f1b3g5w6t8s10 . f1b3g5w6t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b432953fc1bec0fe2d4d"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488f7b2a3d38d5d2cecfbe"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644955515dc87edde086a09f"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(6, 8).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 14 */} {/* f1b3g5w6t9s10 . f1b3g5w6t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b432953fc1bec0fe2d4d"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488f7b2a3d38d5d2cecfbe"
                        ) ||
                        selectedImg.includes(
                          "tire/img/6449559a5dc87edde086a0a5"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(4, 6).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 15 */} {/* f1b3g5w7t8s10 . f1b3g5w7t8s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b432953fc1bec0fe2d4d"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488fa32a3d38d5d2cecfc4"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644956635dc87edde086a0db"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(2, 4).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* 16 */} {/* f1b3g5w7t9s10 . f1b3g5w7t9s11 */}
                        {selectedImg.includes(
                          "frame/photo/6443db470ba2e891b557315a"
                        ) ||
                        selectedImg.includes(
                          "handlebar/img/6443e14f0ba2e891b55731a9"
                        ) ||
                        selectedImg.includes(
                          "groupset/img/6446b432953fc1bec0fe2d4d"
                        ) ||
                        selectedImg.includes(
                          "wheelset/img/64488fa32a3d38d5d2cecfc4"
                        ) ||
                        selectedImg.includes(
                          "tire/img/644956a55dc87edde086a0e1"
                        ) ? (
                          <div className="flex font-bebas w-[50rem] items-center gap-10">
                            {saddle.slice(0, 2).map((s, i) => (
                              <div key={i} className="w-1/6">
                                <img
                                  src={`${
                                    import.meta.env.VITE_APP_REACT_APP_API
                                  }/saddle/photo/${s._id}`}
                                  className="p-2"
                                  alt=""
                                />
                                <div className="flex items-center justify-between">
                                  <h1>{s.name}</h1>
                                  <h1>PHP {s.price}</h1>
                                </div>
                                <div>
                                  <button
                                    className="p-2 w-full bg-orange-500 hover:bg-orange-400"
                                    onClick={() =>
                                      handleConfirmation(
                                        `${
                                          import.meta.env.VITE_APP_REACT_APP_API
                                        }/saddle/img/${s._id}`
                                      )
                                    }
                                  >
                                    Add To Build
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                        {/* end */}
                      </>
                    )}
                  </div>
                </div>
              </Paper>
            </Grid>
            {/* right side summary */}
            <Grid item className="w-[28rem]">
              <Paper className="p-3">Build Summary</Paper>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};
