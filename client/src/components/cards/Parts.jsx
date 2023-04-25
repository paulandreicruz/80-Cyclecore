import { Box, Button, Grid } from "@mui/material";
import Card from "./CustomizeCard";
import Selection from "./YourSelection";
import { React, useState } from "react";
import { frame1Data, frame2Data } from "../../Data/data";
import logo from "../../assets/Logo3.png";
import { TypeAnimation } from "react-type-animation";
import ReactImageMagnify from 'react-image-magnify';


const Parts = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
  const [selectedImg, setSelectedImg] = useState(
    "https://i.pinimg.com/originals/08/5e/1e/085e1e0cb381962a36eadc0711e58525.gif"
  );
  const [selectedFrame, setSelectedFrame] = useState(null);

  const handleCardSelect = (imgUrl) => {
    setSelectedImg(imgUrl);
  };

  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
    setActiveButtonIndex(-1);
  };

  const getFrameData = () => {
    if (selectedFrame === 1) {
      return frame1Data;
    } else {
      return frame2Data;
    }
  };

  const frameCards = getFrameData().frameData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
    />
  ));

  const barCards = getFrameData().barData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
          />
  ));

  const groupCards = getFrameData().groupSetData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
    />
  ));

  const rimCards = getFrameData().rimSetData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
    />
  ));

  const tireCards = getFrameData().tireSetData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
    />
  ));

  const saddleCards = getFrameData().saddleSetData.map((data, index) => (
    <Card
      img={data.cardimg}
      title={data.title}
      price={data.price}
      key={index}
      onSelect={() => handleCardSelect(data.img)}
    />
  ));

  return (
    <>
      <div className="m-20">
        <Grid container>
          {/* Left Side */}
          <Grid item md={9}>
            <div className="flex gap-10">
              <div>
                <img src={logo} alt="" className="w-32 flex mx-auto" />
                <h1 className="font-varela text-center">CYCLECORE</h1>
              </div>

              <div className="w-0.5 h-32 rounded-full bg-[#8d9797]" />

              <div className="my-auto">
                <span className="font-varela font-bold tracking-[1rem] text-2xl">
                  CUSTOMIZATION
                </span>
              </div>
            </div>

            <div className="my-5">
              <div className="flex mx-auto mb-10">
                <h1 className="mx-auto justify-center font-varela text-4xl text-gray-700 font-bold">
                  Hello Bikers
                </h1>
              </div>

              <div className="text-center font-varela text-4xl text-[#cddd35] font-bold">
                <TypeAnimation
                  sequence={[
                    "Choose FrameSet",
                    3000,
                    "Choose Bar & Stem",
                    3000,
                    "Choose Group set",
                    3000,
                    "Choose Rim Set",
                    3000,
                    "Choose Tire Set",
                    3000,
                    "Choose Saddle",
                    3000,
                  ]}
                  wrapper="span"
                  cursor={true}
                  repeat={Infinity}
                  style={{ fontSize: "2em", display: "inline-block" }}
                />
              </div>
              {/* image magnify */}
              <div >
                <ReactImageMagnify
                className="mx-auto"
                {...{
                  smallImage: {
                    alt: '',
                    src: selectedImg,
                    width: 800,
                    height: 800
                  },
                  largeImage: {
                    src: selectedImg,
                    width: 1800,
                    height: 2200,
                  }
                }}

                enlargedImageContainerDimensions={{width: '90%', height: '100%'}}
                enlargedImageContainerStyle={{background: '#fff'}}
              />
              </div>
              
            </div>
            

            <h1 className="font-varela text-3xl font-bold tracking-widest">
              YOUR SELECTION
            </h1>

            <div className="flex space-x-5">
              {getFrameData().frameData.map((d, i) => (
                <Selection
                  key={i}
                  img={d.cardimg}
                  title={d.title}
                  price={d.price}
                  type={d.type}
                />
              ))}

              {getFrameData().barData.map((d, i) => (
                <Selection
                  key={i}
                  img={d.cardimg}
                  title={d.title}
                  price={d.price}
                  type={d.type}
                />
              ))}

              {getFrameData().groupSetData.map((d, i) => (
                <Selection
                  key={i}
                  img={d.cardimg}
                  title={d.title}
                  price={d.price}
                  type={d.type}
                />
              ))}

              {getFrameData().rimSetData.map((d, i) => (
                <Selection
                  key={i}
                  img={d.cardimg}
                  title={d.title}
                  price={d.price}
                  type={d.type}
                />
              ))}
            </div>
          </Grid>

          {/* Right Side */}
          <Grid item md={3} className="border-[3px] rounded-lg p-3">
            <div className="mx-auto flex bg-yellow-400 rounded-xl font-varela text-gray-700">
              {!selectedFrame ? <h1 className="mx-auto justify-center">Please Select A Brand First</h1> : null}
              {selectedFrame && activeButtonIndex === 0 ? <h1 className="mx-auto justify-center">Now Select A frameset</h1> : null}
              {activeButtonIndex === 1 ? <h1 className="mx-auto justify-center">Now Select A Bar & Stems</h1> : null}
              {activeButtonIndex === 2 ? <h1 className="mx-auto justify-center">Now Select A Group Set</h1> : null}
              {activeButtonIndex === 3 ? <h1 className="mx-auto justify-center">Now Select A Rim Set</h1> : null}
              {activeButtonIndex === 4 ? <h1 className="mx-auto justify-center">Now Select A Tire Set</h1> : null}
              {activeButtonIndex === 5 ? <h1 className="mx-auto justify-center">Now Select A Saddle</h1> : null}
            </div>
            
            <Box display="flex" justifyContent="center" mt="2rem">
              <Button
                variant={selectedFrame === 1 ? "contained" : "text"}
                onClick={() => handleFrameSelect(1)}
                color="inherit"
                
              >
                <span className="font-varela">S-Works</span>
              </Button>

              <Button
                variant={selectedFrame === 2 ? "contained" : "text"}
                onClick={() => handleFrameSelect(2)}
                color="inherit"
                
              >
                <span className="font-varela">TimeZone</span>
              </Button>
            </Box>

            <Box display="flex" justifyContent="center" mt="2rem">
            {(selectedFrame === 1 ) ? ( // condition to check if either S-Works or TimeZone is selected
              <>
              
              
                <Button
                  variant={activeButtonIndex === 0 ? "contained" : "text"}
                  onClick={() => handleButtonClick(0)}
                  color="inherit"
                  disabled={!selectedFrame}
                  className={selectedFrame ? 'flex' : 'hidden'}
                >
                  <span className="font-varela">Frame Set</span>
                </Button>
              
                

                <Button
                  variant={activeButtonIndex === 1 ? "contained" : "text"}
                  onClick={() => handleButtonClick(1)}
                  color="inherit"
                  disabled={activeButtonIndex < 0}
                >
                  <span className="font-varela">Bars & Stems</span>
                </Button>

                <Button
                  variant={activeButtonIndex === 2 ? "contained" : "text"}
                  onClick={() => handleButtonClick(2)}
                  color="inherit"
                  disabled={activeButtonIndex < 1 }
                >
                  <span className="font-varela">Group Set</span>
                </Button>

                <Button
                  variant={activeButtonIndex === 3 ? "contained" : "text"}
                  onClick={() => handleButtonClick(3)}
                  color="inherit"
                  disabled={activeButtonIndex < 2}
                >
                  <span className="font-varela">Rim Set</span>
                </Button>

                <Button
                  variant={activeButtonIndex === 4 ? "contained" : "text"}
                  onClick={() => handleButtonClick(4)}
                  color="inherit"
                  disabled={activeButtonIndex < 3}
                >
                  <span className="font-varela">Tire Set</span>
                </Button>

                <Button
                  variant={activeButtonIndex === 5 ? "contained" : "text"}
                  onClick={() => handleButtonClick(5)}
                  color="inherit"
                  disabled={activeButtonIndex < 4}
                >
                  <span className="font-varela">Saddle Set</span>
                </Button>
              </>
              ) : (
                <>
                  <Button
                    variant={activeButtonIndex === 0 ? "contained" : "text"}
                    onClick={() => handleButtonClick(0)}
                    color="inherit"
                    disabled={!selectedFrame}
                  >
                    <span className="font-varela">Frame Set</span>
                  </Button>

                  <Button
                    variant={activeButtonIndex === 1 ? "contained" : "text"}
                    onClick={() => handleButtonClick(1)}
                    color="inherit"
                    disabled={activeButtonIndex < 0}
                  >
                    <span className="font-varela">Bars & Stems</span>
                  </Button>
                  <Button
                    variant={activeButtonIndex === 2 ? "contained" : "text"}
                    onClick={() => handleButtonClick(2)}
                    color="inherit"
                    disabled={activeButtonIndex < 1}
                  >
                    <span className="font-varela">Group Set</span>
                  </Button>
                  <Button
                    variant={activeButtonIndex === 3 ? "contained" : "text"}
                    onClick={() => handleButtonClick(3)}
                    color="inherit"
                    disabled={activeButtonIndex < 2}
                  >
                    <span className="font-varela">Rim Set</span>
                  </Button>
                  <Button
                    variant={activeButtonIndex === 4 ? "contained" : "text"}
                    onClick={() => handleButtonClick(4)}
                    color="inherit"
                    disabled={activeButtonIndex < 3}
                  >
                    <span className="font-varela">Tire Set</span>
                  </Button>
                  <Button
                    variant={activeButtonIndex === 5 ? "contained" : "text"}
                    onClick={() => handleButtonClick(5)}
                    color="inherit"
                    disabled={activeButtonIndex < 4}
                  >
                    <span className="font-varela">Saddle Set</span>
                  </Button>
                </>
              )}
            </Box>
            <Box className="mt-[2rem] gap-20">
              {activeButtonIndex === 0 && frameCards}
              {activeButtonIndex === 1 && barCards}
              {activeButtonIndex === 2 && groupCards}
              {activeButtonIndex === 3 && rimCards}
              {activeButtonIndex === 4 && tireCards}
              {activeButtonIndex === 5 && saddleCards}
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Parts;

//   //   return (
//   //   <>
//   //     <Grid cotainer>
//   //       <Grid item>
//   //         <Box>
//   //           <div className="flex gap-10">
//   //             <Box>
//   //               <img src={logo} alt="" className="w-32 flex mx-auto" />
//   //               <h1 className="tracking-[0.5rem] font-varela font-bold">
//   //                 CYCLECORE
//   //               </h1>
//   //             </Box>

//   //             <div className="w-0.5 h-32 rounded-full bg-[#00FFFF]"></div>

//   //             <div className="my-auto">
//   //               <span className="font-varela font-bold tracking-widest text-2xl">
//   //                 CUSTOMIZATION
//   //               </span>
//   //             </div>
//   //           </div>
//   //         </Box>

//   //         <Box width="60rem" mt="2rem">
//   //           <img src={selectedImg} alt="" className="mx-auto" />
//   //         </Box>
//   //       </Grid>

//   //       <Grid item>
//   // <Box display="flex" justifyContent="center" mt="2rem">
//   //   <Button
//   //     variant={selectedFrame === 1 ? "contained" : "text"}
//   //     onClick={() => handleFrameSelect(1)}
//   //   >
//   //     Bike 1
//   //   </Button>

//   //   <Button
//   //     variant={selectedFrame === 2 ? "contained" : "text"}
//   //     onClick={() => handleFrameSelect(2)}
//   //   >
//   //     Bike 2
//   //   </Button>
//   // </Box>

//   // <Box display="flex" justifyContent="center" mt="2rem">
//   //   {selectedFrame === 1 ? (
//   //     <>
//   //       <Button
//   //         variant={activeButtonIndex === 0 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(1)}
//   //       >
//   //         Frameset
//   //       </Button>

//   //       <Button
//   //         variant={activeButtonIndex === 1 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(1)}
//   //       >
//   //         Bars
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 2 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(2)}
//   //       >
//   //         Group Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 3 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(3)}
//   //       >
//   //         Rim Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 4 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(4)}
//   //       >
//   //         Tire Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 5 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(5)}
//   //       >
//   //         Saddle Set
//   //       </Button>
//   //     </>
//   //   ) : (
//   //     <>
//   //       <Button
//   //         variant={activeButtonIndex === 0 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(0)}
//   //       >
//   //         Frameset
//   //       </Button>

//   //       <Button
//   //         variant={activeButtonIndex === 1 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(1)}
//   //       >
//   //         Bars
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 2 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(2)}
//   //       >
//   //         Group Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 3 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(3)}
//   //       >
//   //         Rim Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 4 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(4)}
//   //       >
//   //         Tire Set
//   //       </Button>
//   //       <Button
//   //         variant={activeButtonIndex === 5 ? "contained" : "text"}
//   //         onClick={() => handleButtonClick(5)}
//   //       >
//   //         Saddle Set
//   //       </Button>
//   //     </>
//   //   )}
//   // </Box>

//   // <Box className="mt-[2rem] gap-20">
//   //   {activeButtonIndex === 0 && frameCards}
//   //   {activeButtonIndex === 1 && barCards}
//   //   {activeButtonIndex === 2 && groupCards}
//   //   {activeButtonIndex === 3 && rimCards}
//   //   {activeButtonIndex === 4 && tireCards}
//   //   {activeButtonIndex === 5 && saddleCards}
//   // </Box>

//   //       </Grid>
//   //     </Grid>
//   //   </>

//   //   );
//   // };

// your selection map

// {getFrameData().frameData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}

// {getFrameData().barData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}

// {getFrameData().groupSetData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}

// {getFrameData().rimSetData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}

// {getFrameData().tireSetData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}

// {getFrameData().saddleSetData.map((data, index) => (
//   <div
//     key={index}
//     className="max-w-[13rem] text-center font-varela"
//   >
//     <img src={data.cardimg} alt="" />
//     <h1>{data.title}</h1>
//     <p>{data.description}</p>
//   </div>
// ))}
