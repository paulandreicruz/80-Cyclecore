import React, { useEffect } from "react";
import { useAuth } from "../../context/Auth";
import planet from "../../assets/planet.gif";
import logo from "../../assets/logo1.png";

const Loading = () => {
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }, [auth?.token]);

  return (
    <div className="font-bebas bg-[#e3f9fc] h-screen space-y-10">
      <div className="relative">
        <img src={planet} alt="" className="w-[80rem]  mx-auto" />
      </div>

      <div className="text-center text-xl text-[#800080] font-bold tracking-widest absolute top-[0rem] left-[37rem]">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Loading;
