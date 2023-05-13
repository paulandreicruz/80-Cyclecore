import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import logo  from "../../assets/logo1.png"
import { AiFillCheckCircle } from 'react-icons/ai'
import Confetti from 'react-confetti';

function VerifyEmail() {
  const { token } = useParams(); // get the verification token from the URL params
  const [message, setMessage] = useState(""); // state variable to hold the verification message
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);


  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await axios.get(`/verify-email/?token=${token}`); // send a GET request to the /api/verify-email endpoint with the verification token
        setMessage(response.data.message); // update the message state variable with the verification message from the API response
        toast.success(response.data.message); // show a success toast with the verification message
      } catch (error) {
        console.log(error);
        setMessage("An error occurred while verifying your email address"); // if there was an error, display a generic error message
        toast.error("An error occurred while verifying your email address"); // show an error toast with a generic error message
      }
    }

    verifyEmail(); // call the verifyEmail function when the component mounts
  }, [token]);

  return (
    <>
      <div>
        <div className="max-h-screen py-[10%] font-varela">
        {showConfetti && <Confetti />}
          
          <div className="flex justify-center mx-auto w-40"><img src={logo} alt="" /></div>

          
          <div className="flex items-center gap-2 text-green-500 text-xl justify-center mt-8">
            <AiFillCheckCircle/>
            <h1 className="font-varela font-bold">{message}</h1>  
          </div>  

          <div className="text-center mt-10 text-[8rem] font-bold font-pop tracking-tighter text-gray-900">
            <h1>THANK YOU!</h1>
          </div>     

          <div className="flex justify-center">
            <Button variant="contained" color="inherit"><NavLink to="/login"><span className="font-varela font-bold">GO BACK TO LOGIN PAGE</span></NavLink></Button>
          </div>
             
        </div>
      </div>
      
    </>
  );
}

export default VerifyEmail;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// function EmailVerification(props) {
//   const { token } = props.match.params;
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     async function verifyEmail() {
//       try {
//         const response = await axios.get(`/verify-email/?token=${token}`);
//         setMessage(response.data.message);
//         toast.success(response.data.message);
//       } catch (error) {
//         console.log(error);
//         setMessage("An error occurred while verifying your email address");
//         toast.error("An error occurred while verifying your email address");
//       }
//     }

//     verifyEmail();
//   }, [token]);

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default EmailVerification;
