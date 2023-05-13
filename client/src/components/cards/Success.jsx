
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Paper, TextField } from "@mui/material";
import { FcApproval } from "react-icons/fc";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GrSend } from "react-icons/gr";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Success = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect( () => {
  //     let intervalId;
  //     if(remainingTime > 0) {
  //         intervalId = setInterval(() => {
  //             setRemainingTime((prevTime) => prevTime - 1);
  //         }, 1000);
  //     }

  //     return () => clearInterval(intervalId)
  //   }, [remainingTime]);

  //   const isCountdownActive = remainingTime > 0;

  const handleResendVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/resend-verification-email", {
        email,
      });
      setIsLoading(true);
      toast.success(response.data.message);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsLoading(false);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 10000); // set the time period to 10 seconds
      }, 2000);
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.error);
      } else if (error.response.status === 404) {
        toast.error("Email address not found");
      } else if (error.response.status === 429) {
        toast.error("Maximum resend verification email limit reached");
      } else {
        console.error(error.message);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <div className="max-h-screen py-[10%] font-varela">
        <Paper elevation={10} className="max-w-lg mx-auto p-3 space-y-4">
          <div className="flex justify-center mb-5 mt-14">
            <FcApproval fontSize={200} />
          </div>
          <div className="flex justify-center">
            <h1>You Are One Step Away From Verifying Your Account!</h1>
          </div>

          <div className="font-varela text-center mx-auto">
            <h1>Enter Email:</h1>

            <form onSubmit={handleResendVerification  }>
              <div className="flex items-center mx-auto justify-center space-x-2">
                <TextField
                  variant="outlined"
                  label="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="hover:cursor-pointer">
                  <button type="submit">
                    {isLoading ? (
                      <div className="animate-spin">
                        <AiOutlineLoading3Quarters />
                      </div>
                    ) : isSubmitted ? (
                      <FcCheckmark fontSize={20} />
                    ) : (
                      <GrSend fontSize={20} />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {isSubmitted ? (
            <div className="flex justify-center">
              <h1 className="text-gray-300 font-signika">
                Please Check Your Email To Verify Your Account...
              </h1>
            </div>
          ) : null}

          <div className="flex items-center justify-center">
            <h1>Or Login Now</h1>
          </div>

          <div className="flex justify-center">
            <Button
              variant="contained"
              color="inherit"
              fullWidth
              startIcon={<MdOutlineSpaceDashboard />}
            >
              <NavLink to="/login">
                <span className="font-varela">Go To Login</span>
              </NavLink>
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Success;
