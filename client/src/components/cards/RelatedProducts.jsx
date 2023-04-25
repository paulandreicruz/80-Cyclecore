import React from "react";

function RelatedProducts({ p }) {
  return (
    <>
      <div className="grid justify-center mt-12 font-signika">
        <div className="mx-auto">
          <b>Related Products:</b>
        </div>
        <div className="flex space-x-4">
          <div className="max-w-xs grid text-center">
            <img
              src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${
                p._id
              }`}
              alt=""
              className="w-40 mx-auto"
            />
            <span className="text-gray-400">{p.category.name}</span>
            <b>{p?.name}</b>
            <b>
              {p?.price?.toLocaleString("en-Us", {
                style: "currency",
                currency: "PHP",
              })}
            </b>
          </div>
        </div>
      </div>
    </>
  );
}

export default RelatedProducts;
