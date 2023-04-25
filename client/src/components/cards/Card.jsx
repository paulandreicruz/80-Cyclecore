import { Button } from "@mui/material";
import React from "react";

const Card = (props) => {

  const handleSelect = () => {
    if (props.onSelect) {
      props.onSelect(props.img);
    }
  };

  return (
    <div>
      <div
        href="#"
        class="flex font-varela items-center mx-auto bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-lg hover:bg-gray-100 dark:bg-slate-200 dark:border-slate-200 "
      >
        <div className="w-[8rem]">
          <img
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={props.img}
            alt=""
          />
        </div>
        
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-left">
            {props.title}
          </h5>
          <Button variant="contained" fullWidth onClick={handleSelect}>SELECT</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
