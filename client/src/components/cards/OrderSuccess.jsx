import { useEffect } from "react";
import Confetti from "react-confetti";
import { AiFillCheckCircle } from "react-icons/ai";
import logo from "../../assets/logo1.png";
import { useAuth } from "../../context/Auth";

export const OrderSuccess = () => {
  //context

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/dashboard/user/orders";
    }, 3000);
  }, [auth?.token]);

  return (
    <>
      <div>
        <Confetti />
        <div className="max-h-screen py-[6%] font-bebas">
          <div className="flex justify-center mx-auto w-[30rem]">
            <img src={logo} alt="" />
          </div>

          <div className="mx-auto text-center tracking-wider text-2xl">
            Your Order Has Been Placed Successfully
          </div>

          <div className="flex items-center gap-2 text-green-500 text-xl justify-center mt-5">
            <AiFillCheckCircle />
            <h1 className="font-varela font-bold"></h1>
          </div>

          <div className="text-center mt-10 text-[8rem] font-bold font-pop tracking-tighter text-gray-900">
            <h1>THANK YOU!</h1>
          </div>

          <div className="flex justify-center"></div>
        </div>
      </div>
    </>
  );
};
