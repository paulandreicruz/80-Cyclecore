import React from "react";

const YourSelection = (props) => {
  return (
    <>
      <div className="">
        <div className="text-center">
          <img src={props.img} alt="" className='w-[15rem] h-[10rem] relative'/>
          <h1 className="bg-gray-800 w-24 p-0.5 rounded-full bg-opacity-50 relative -top-36"><span className="text-white text-center mx-auto font-varela font-bold">{props.type}</span></h1>
        </div>

        <h1>{props.title}</h1>
        <p>₱ {props.price}</p>
      </div>
    </>
  );
};

export default YourSelection;
