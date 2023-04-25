import { React, useState } from "react";
import { Grid } from "@mui/material";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import ReactImageMagnify from "react-image-magnify";

const AddToCartSection = () => {
  const [quantity, setQuantity] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);

  const handleMinus = () => {
    quantity === 0 ? "" : setQuantity(quantity - 1);
  };

  const handleHover = (data) => {
    setImg(data.img);
    setHoverIndex(data.id);
  };

  return (
    <>
      <div className="font-signika mt-12">
        <Grid container gap={10} justifyContent="center">
          <Grid item>
            <div className="container max-w-4xl mx-auto">
              <div className="left flex space-x-6">
                <div className="left-1 flex flex-col mt-24 gap-3">
                  {imgData.map((data) => (
                    <div
                      className={`image-wrap w-[80px] h-[80px] border cursor-pointer flex items-center justify-center ${
                        data.id === hoverIndex
                          ? "border-yellow-400 border-2"
                          : ""
                      }`}
                      key={data.id}
                      onMouseOver={() => handleHover(data)}
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="w-[70px] h-[70px] object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div className="left-2 max-w-4xl">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: img,
                      },
                      largeImage: {
                        src: img,
                        width: 1200,
                        height: 1800,
                      },
                      enlargedImageContainerDimensions: {
                        width: "100%",
                        height: "100%",
                      },
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                    }}
                  />

                  {/* <img src={img} alt="" className="[w-500px] h-[100%]" /> */}
                </div>
              </div>
              {/* "https://pngimg.com/d/bicycle_PNG5380.png" */}
            </div>
          </Grid>
          <Grid item my="auto">
            <div className="max-w-lg grid space-y-6">
              <span className="text-4xl">
                <b>Saint M820-B Disc Brake</b>
              </span>
              <span className="text-4xl text-red-500">
                <b>$220.99</b>
              </span>
              <p className="flex items-center">
                4 interest-free installments or from $19.95/mo with installments
                powered by Affirm
              </p>

              <div>
                <span className="flex items-center gap-4">
                  <b>Availability</b>
                  <p>Many in stock</p>
                </span>
                <span className="flex items-center gap-4">
                  <b>SKU</b>
                  <p>IM820BJLFPNA100</p>
                </span>
                <span className="flex items-center gap-4">
                  <b>Est. Weight</b>
                  <p>312 grams (0.69 lbs)</p>
                </span>
              </div>

              <div className="flex items-center">
                <button
                  className="border border-r-0 w-7 rounded rounded-r-none flex  justify-center"
                  onClick={() => handleMinus()}
                >
                  {" "}
                  <TiMinusOutline size={24} />{" "}
                </button>
                <span className="border w-10 flex justify-center">
                  {quantity}
                </span>
                <button
                  className="border w-7 border-l-0 rounded rounded-l-none flex  justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  {" "}
                  <TiPlusOutline size={24} />{" "}
                </button>
              </div>

              <button className="bg-[#656565] text-white rounded-md h-[48px] text-[1.25rem] w-full">
                Add To Cart
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddToCartSection;
