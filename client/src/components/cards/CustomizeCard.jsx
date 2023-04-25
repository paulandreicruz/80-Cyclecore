import { Button } from "@mui/material";
import React from "react";
import { AiOutlineLink } from 'react-icons/ai'

const CustomizeCard = (props) => {

  const handleSelect = () => {
    if (props.onSelect) {
      props.onSelect(props.img);
    }
  };

  return (
    <>

      <div>
        <button onClick={handleSelect} className="bg-gradient-to-b from-slate-300 via-slate-300 to-zinc-500 mb-4 rounded-lg hover:scale-110 hover:rounded-lg duration-200">
          <div className="p-7">
            <img src={props.img} alt="" className="w-96 mx-auto "/>
          </div>
          <div className="ml-2 space-x-16">
            <span className="font-varela text-xl">{props.title}</span>
            <span className="font-varela text-xl text-yellow-300">₱ {props.price}</span>
          </div>
         
        </button>
        <div className="flex items-center gap-2">Product Specifications <a href="" className="text-blue-600 font-bold hover:underline flex items-center gap-2">Read More <AiOutlineLink/></a></div>
      </div>
      

    </>
  );
};

export default CustomizeCard;
