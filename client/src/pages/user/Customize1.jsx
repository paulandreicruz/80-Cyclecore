import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../global/nav/Navbar";
import { Grid, Box, Typography } from "@mui/material";

function Customize1() {
  const [tires, setTires] = useState([]);
  const [groupset, setGroupset] = useState([]);
  const [frames, setFrames] = useState([]);
  const [handlebar, setHandlebar] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedHandlebar, setSelectedHandlebar] = useState(null);
  const [selectedGroupset, setSelectedGroupset] = useState(null);

  useEffect(() => {
    loadGroupset();
    loadFrames();
    loadTires();
    loadHandlebar();
  }, []);

  const loadFrames = async () => {
    const response = await axios.get("/frames");
    setFrames(response.data);
  };

  const loadTires = async () => {
    const response = await axios.get("/tires");
    setTires(response.data);
  };

  const loadHandlebar = async () => {
    const response = await axios.get("/handlebars");
    setHandlebar(response.data);
  };

  const loadGroupset = async () => {
    const response = await axios.get("/groupsets");
    setGroupset(response.data);
  };

  const handleFrameClick = (frame) => {
    setSelectedFrame(frame);
  };

  const handleHandlebarClick = (handlebar) => {
    setSelectedHandlebar(handlebar);
  };
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-3/4">
          {frames?.map((f) => (
            <div
              key={f._id}
              className="md:ml-32 font-varela"
              onClick={() => handleFrameClick(f)}
            >
              <Grid
                container
                display="flex"
                spacing={3}
                rowGap={5}
                className="mb-14 mx-auto cursor-pointer"
              >
                <Grid item md={4}>
                  <Box>
                    <img
                      src={`${
                        import.meta.env.VITE_APP_REACT_APP_API
                      }/frame/photo/${f._id}`}
                      alt=""
                      className="border border-"
                    />
                  </Box>
                </Grid>

                <Grid item md={8} alignContent="center" justifyItems="center">
                  <Box className="text-left space-y-5">
                    <Box>
                      <h1 className="text-3xl font-semibold ">{f.name}</h1>
                    </Box>
                    <Box>
                      <Typography>{f.description}</Typography>
                    </Box>

                    <Box>
                      <span className="font-bold">Price:</span>
                      <span className="text-xl">PHP {f.price}</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>

        <div className="w-1/4">
          {selectedFrame && (
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/frame/photo/${
                selectedFrame._id
              }`}
              alt=""
              className="border border-"
            />
          )}
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4">
          {handlebar?.map((h) => (
            <div
              key={h._id}
              className="md:ml-32 font-varela"
              onClick={() => {
                handleHandlebarClick(h);
                setSelectedGroupset(null); // reset selected groupset when a handlebar is clicked
              }}
            >
              <Grid
                container
                display="flex"
                spacing={3}
                rowGap={5}
                className="mb-14 mx-auto cursor-pointer"
              >
                <Grid item md={4}>
                  <Box>
                    <img
                      src={`${
                        import.meta.env.VITE_APP_REACT_APP_API
                      }/handlebar/photo/${h._id}`}
                      alt=""
                      className="border border-"
                    />
                  </Box>
                </Grid>

                <Grid item md={8} alignContent="center" justifyItems="center">
                  <Box className="text-left space-y-5">
                    <Box>
                      <h1 className="text-3xl font-semibold ">{h.name}</h1>
                    </Box>
                    <Box>
                      <Typography>{h.description}</Typography>
                    </Box>

                    <Box>
                      <span className="font-bold">Price:</span>
                      <span className="text-xl">PHP {h.price}</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>

        <div className="w-1/4">
          {selectedHandlebar && selectedGroupset && (
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/groupset/img/${
                selectedGroupset._id
              }/${selectedGroupset.img[0]}`}
              alt=""
              className="border border-"
            />
          )}

          {selectedHandlebar && !selectedGroupset && (
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/handlebar/img/${
                selectedHandlebar._id
              }`}
              alt=""
              className="border border-"
            />
          )}
        </div>
      </div>

      <div className="flex">
        <div className="w-3/4">
          {groupset?.map((g) => (
            <div
              key={g._id}
              className="md:ml-32 font-varela"
              onClick={() => {
                handleGroupsetClick(g);
                setSelectedHandlebar(null); // reset selected handlebar when a groupset is clicked
              }}
            >
              <Grid
                container
                display="flex"
                spacing={3}
                rowGap={5}
                className="mb-14 mx-auto cursor-pointer"
              >
                <Grid item md={4}>
                  <Box>
                    <img
                      src={`${
                        import.meta.env.VITE_APP_REACT_APP_API
                      }/groupset/photo/${g._id}`}
                      alt=""
                      className="border border-"
                    />
                  </Box>
                </Grid>

                <Grid item md={8} alignContent="center" justifyItems="center">
                  <Box className="text-left space-y-5">
                    <Box>
                      <h1 className="text-3xl font-semibold ">{g.name}</h1>
                    </Box>
                    <Box>
                      <Typography>{g.description}</Typography>
                    </Box>

                    <Box>
                      <span className="font-bold">Price:</span>
                      <span className="text-xl">PHP {g.price}</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </div>
          ))}
        </div>
        <div className="w-1/4">
          {selectedGroupset && selectedHandlebar && (
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/groupset/img/${
                selectedGroupset._id
              }/${selectedGroupset.img[0]}`}
              alt=""
              className="border border-"
            />
          )}
          {selectedGroupset && !selectedHandlebar && (
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/groupset/img/${
                selectedGroupset._id
              }/${selectedGroupset.img[0]}`}
              alt=""
              className="border border-"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Customize1;
