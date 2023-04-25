// import Footer from "../../global/footer/Footer";
// import Navbar from "../../global/nav/Navbar";
// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/Auth";
// import axios from "axios";
// import { Button, TextField } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function UserProfile() {
//   //context
//   const [auth, setAuth] = useAuth();

//   //state
//   const [firstname, setfirstName] = useState("");
//   const [lastname, setlastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (auth?.user) {
//       const { firstname, lastname, email, address } = auth.user;
//       setfirstName(firstname || "");
//       setlastName(lastname || "");
//       setEmail(email || "");
//       setAddress(address || "");
//     }
//   }, [auth?.user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/profile", {
//         firstname,
//         lastname,
//         password,
//         address,
//       });

//       if (data?.error) {
//         toast.error(data.error, {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//       } else {
//         // console.log("profile updated =>", data);
//         setAuth({ ...auth, user: data });
//         //local storage update
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated", {
//           position: "top-center",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: false,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         navigate("/cart");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <>
//         <div className="p-20 space-y-4">
//           <div className="justify-center">
//             <span className="justify-center mx-auto flex font-bold font-varela text-3xl">
//               User Profile
//             </span>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="grid max-w-lg mx-auto space-y-4">
//               <TextField
//                 label="First Name"
//                 size="small"
//                 value={firstname}
//                 onChange={(e) => setfirstName(e.target.value)}
//               />
//               <TextField
//                 label="Last Name"
//                 size="small"
//                 value={lastname}
//                 onChange={(e) => setlastName(e.target.value)}
//               />
//               <TextField
//                 label="Email"
//                 size="small"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <TextField
//                 label="Password"
//                 size="small"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <TextField
//                 label="Shipping Address"
//                 size="small"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//               <Button type="submit" variant="contained">
//                 SUBMIT
//               </Button>
//             </div>
//           </form>
//         </div>
//       </>
//       <Footer />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";

function UserProfile2() {
  const [address, setAddress] = useState({
    region: "",
    city: "",
    barangay: "",
    postalCode: "",
    street: "",
  });
  const [addresses, setAddresses] = useState([]);
  //context
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.token) getUserAddresses();
  }, [auth?.token]);

  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get("/useraddress");
      setAddresses(data);
    } catch (err) {
      console.log(err);
    }
  };

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const deleteAddress = async (addressId) => {
    try {
      await axios.delete(`/useraddress/${addressId}`);
      setAddresses(addresses.filter((a) => a._id !== addressId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put("/address", address);
      console.log(data);
      toast.success("Added Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("An error occurred. Please try again", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div>
      <>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="region"
              value={address.region}
              onChange={handleChange}
              placeholder="Region"
            />
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              type="text"
              name="barangay"
              value={address.barangay}
              onChange={handleChange}
              placeholder="Barangay"
            />
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
            />
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              placeholder="Street"
            />
            <button type="submit">Add Address</button>
          </form>
        </div>
        <div>
          {addresses?.map((a, i) => (
            <div key={i}>
              <div>
                {a.region}
                {a.postalCode}
                {a.barangay}
                {a.city}
                {a.street}
                <button onClick={() => deleteAddress(a._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default UserProfile;
