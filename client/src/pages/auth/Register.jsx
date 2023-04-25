// import React, {useState} from 'react'
// import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
// import { TextField } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../../context/Auth';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     //open
//     const [open,setOpen] = useState(false);
//     const [opening,setOpening] = useState (false);

//     //hooks
//     const [ auth, setAuth ] = useAuth();
//     const navigate = useNavigate();

//     //register user state
//     const [firstname, setfirstName] = useState("");
//     const [lastname, setlastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [address, setAddress] = useState("");
//     const [contactnum, setContactnum] = useState("");
//     const [birthdate, setBirthdate] = useState("2017-05-24");
//     const [password, setPassword] = useState("");
//     const [confirmpassowrd, setConfirmpassword] = useState("");
//     const [error, setError] = useState("");

//     // connecting port
//     // console.log(import.meta.env.VITE_APP_REACT_APP_API)

//     //handle submit form register
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(`/register`,{
//                 firstname,
//                 lastname,
//                 email,
//                 birthdate,
//                 contactnum,
//                 password,
//             });
//             console.log(data);
//             if (data?.error) {
//                 toast.error(data.error, {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     });
//             } else {
//                 localStorage.setItem('auth', JSON.stringify(data));
//                 setAuth({...auth, token: data.token, user: data.user });
//                 console.log(data)
//                 toast.success('Registration Successful', {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     });
//                 navigate("/dashboard");
//             }
//         } catch (err) {
//             console.log(err);
//             toast.error('Registration Failed. Try Again.', {
//                 position: "top-center",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//                 })
//         }
//     };

//     // handle toggle
//     const toggle = () => {
//         setOpen(!open);
//     };

//     const toggle2 = () => {
//         setOpening(!opening);
//     };

//     return (
//         <div>

//             <section className="bg-gray-50 min-h-screen flex items-center justify-center">
//                 {/* login container */}
//                 <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-7xl p-5 ">

//                     {/* form */}
//                     <div className="md:w-1/2 p-5">

//                         <div>
//                             <NavLink to="/">
//                                 <img className="w-[200px] items-center p-0" src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/321421696_988840015430714_1756898395352918694_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFqiQB2gn6RBunaj9ahDT12t2Rk1xQTRUe3ZGTXFBNFRzYuqjmxGbLqx-JD-cnn0QuX6xcVH3ZYzHye8iOZEqt6&_nc_ohc=df1vqQ2w6s0AX_9DzAd&_nc_ht=scontent.fmnl17-5.fna&oh=03_AdQUcHvA0bAkfp6Uf4vht22FGaaZ8OPTNqi-9JWdjnE9aQ&oe=640C5F61" alt="" />
//                             </NavLink>
//                         </div>

//                         <h2 className="text-[#002D74] font-bold text-2xl">Register</h2>
//                         <p className="text-[#002D74] text-sm my-4">If you are already a member, easily login <NavLink to="/login" className='underline font-se'>Here</NavLink></p>

//                         <form onSubmit={handleSubmit} className="gap-4 flex flex-col">

//                             <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 ">
//                                 {/* <input className="p-2 mt-8 rounded-xl border" type="text" name="firstname" placeholder="Firstname" /> */}
//                                 <TextField value={firstname} onChange={(e) => setfirstName(e.target.value)} type="text" placeholder='Firstname' label="Firstname" size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth />

//                                 <TextField value={lastname} onChange={(e) => setlastName(e.target.value)} type="text" placeholder='Lastname' label="Lastname" size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>
//                                 {/* <input className="p-2 mt-8 rounded-xl border" type="text" name="firstname" placeholder="Lastname" /> */}
//                             </div>

//                             <div className='mb-5'>
//                                 {/* <input type="email" name="" id="" placeholder='Email' className='p-2 rounded-xl border w-full'/> */}

//                                 <TextField value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' label="Email" size='small' fullWidth sx={{backgroundColor:'white', mb: 3}}/>
//                             </div>

//                             <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 '>

//                                 <TextField value={birthdate} onChange={(e) => setBirthdate(e.target.value)} type="date" label="Birthdate"
//                                 sx={{backgroundColor:'white', mb: 3}}
//                                 InputLabelProps={{
//                                 shrink: true,
//                                 }}
//                                 size='small'/>

//                                 <TextField value={contactnum} onChange={(e) => setContactnum(e.target.value)} type='number' label='Contact' size='small' sx={{backgroundColor:'white', mb: 3}} />
//                             </div>

//                             {/*
//                             <div>
//                                     <input type="number" placeholder='Age' className='p-2 rounded-xl border w-[80px]'/>
//                             </div> */}

//                             <div className='mb-5'>
//                                 <h3 className='mb-4 text-[#002D74] text-sm mt-4"'>Address</h3>

//                                 <div className='grid gap-4 mb-7 sm:grid-cols-1 md:grid-cols-2'>
//                                     {/* <input type="text" name="street" id="" placeholder="Street" className='p-2 rounded-xl border w-full mb-2' /> */}

//                                     <TextField  type='text' label='Street' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     <TextField  type='text' label='Barangay' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     {/* <input type="text" name="street" id="" placeholder="Barangay" className='p-2 rounded-xl border w-full mb-2' /> */}
//                                 </div>

//                                 <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-3 '>
//                                     {/* <input type="text" name="street" id="" placeholder="City" className='p-2 rounded-xl border ' /> */}

//                                     <TextField type='text' label='City' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     <TextField type='text' label='Region' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     <TextField type='number' label='Postal Code' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     {/* <input type="text" name="street" id="" placeholder="Region" className='p-2 rounded-xl border ' />

//                                     <input type="Number" name="street" id="" placeholder="Postal Code" className='p-2 rounded-xl border ' /> */}
//                                 </div>

//                             </div>

//                             <div className="relative">

//                                 {/* <input className="w-full p-2 rounded-xl border" type={(open === false ? "password" : "text")}
//                                 name="password" placeholder="*******" /> */}

//                                 <TextField value={password} onChange={(e) => setPassword(e.target.value)} type={(open === false ? "password" : "text")} label='Password' size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>

//                                 <div className="text-2xl absolute top-2.5 right-2">
//                                 {
//                                     (open === false) ? <AiOutlineEye onClick={toggle} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle} className="cursor-pointer"/>
//                                 }

//                                 </div>
//                             </div>

//                             <div className="relative">

//                                 {/* <input className="w-full p-2 rounded-xl border" type={(opening === false ? "password" : "text")}
//                                 name="password" placeholder="Confirm Password" /> */}

//                                 <TextField type={(open === false ? "password" : "text")} label='Confirm Password' size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>

//                                 <div className="text-2xl absolute top-2.5 right-2">
//                                 {
//                                     (opening === false) ? <AiOutlineEye onClick={toggle2} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle2} className="cursor-pointer"/>
//                                 }

//                                 </div>
//                             </div>

//                             <div className=''>
//                                 <input type="checkbox" name="" id="" className='border-gray-400 mr-2'/>

//                                 <span>
//                                     I accept the <a href="" className='font-semibold underline'>Terms of Use</a> & <a href="" className='font-semibold underline'>Privacy Policy</a>
//                                 </span>
//                             </div>

//                             <button type="submit" className="hover:bg-[#6dec9e] duration-300 rounded-xl bg-[#c8f5d9] text-[#242424] py-2">Register</button>

//                         </form>

//                     </div>
//                     {/* image */}
//                     <div className="rounded-xl w-1/2 md:block hidden bg-[url('https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/330314779_1631701457280641_130997889362160226_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEkQpjH2BgyqCmYGlAfIq6fTgWED4WGWbpOBYQPhYZZugL5cGpzkwFMiPXDtBU_PViYO1O3uPJ-CdyQ-AlhTvZc&_nc_ohc=OtAfy81VKXUAX8HpjDZ&tn=MhX7EIYTgp3cA82U&_nc_ht=scontent.fmnl17-1.fna&oh=03_AdRBzmPddv3eOHyqlpBpbWShQ9MI9dweeZ_OdbyK-0wZ0Q&oe=640D7382')] bg-no-repeat bg-cover text-white p-12">
//                     <h1 className='text-6xl mb-5 mt-[200px] text-center tracking-[1.5rem] font-bold font-lobster text-zinc-50'>Welcome</h1>
//                     <div>
//                         <p className='font-semibold text-center'>A bicycle is a useful vehicle that helps us reach a destination without polluting the environment. It is composed of steel and has two wheels. In addition, it has got a seat and handle with two pedals and also a bell. Some bicycles have a carrier while some don’t. It is a popular choice amongst poor people and students. Essay on bicycle will help us understand its importance.</p>
//                     </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// };

// export default Register;

import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isBefore, subYears, isAfter } from "date-fns";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import reglogo from "../../assets/reg.jpg";
import logoreg1 from "../../assets/Logo3.png";

// validations
const fnameValidations = Yup.string().required("Firstname is required!");

const lnameValidations = Yup.string().required("Lastname is required!");

const emailValidation = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

const phoneNumberValidation = Yup.string()
  .required("This field is required!")
  // .matches(/^(63|0)\d{11,12}$/,'Invalid phone number format')
  // .matches(/^63\d{10,11}$/,'Invalid phone number format')
  // .matches(/^0\d{10}$/,'Invalid phone number format')
  // .min(10,11,'Invalid phone number format must be 10 to 11 digits long')
  .matches(/^(63|9)\d{9,10}$/, "Invalid phone number format.");

// address section

// const streetValidations = Yup.string().required("This field is required!");

// const brgyValidations = Yup.string().required("This field is required!");

// const cityValidations = Yup.string().required("This field is required!");

// const regionValidations = Yup.string().required("This field is required!");

// const postalValidations = Yup.string()
//   .required("This field is required!")
//   .matches(/^\d{4}$/, "Invalid format - must be 4 digits");

const passwordValidation = Yup.string()
  .required("Password is required")
  .min(16, "Password must be at least 16 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[@$!%*#?&.^-_=+]/,
    "Password must contain at least one special character"
  );

const confirmPassValidation = Yup.string()
  .oneOf([Yup.ref("password"), null], "Passwords must match")
  .required("This field is required!");

const chkbxValidation = Yup.bool().required(
  "Please agree to the terms and conditions"
);

const today = new Date();
const earliestDate = subYears(today, 150);
const latestDate = subYears(today, 18);

const dateOfBirthValidationSchema = Yup.date()
  .required("Please select date of birth!")
  .max(today, "Invalid birth of date! must not be a date in the future!")
  .test(
    "user-is-18-years-old-today",
    "You must be 18 years of age",
    (value) => {
      return isAfter(subYears(today, 18), value);
    }
  )
  .test(
    "date-is-too-early",
    `Invalid birth of date! date is too early!`,
    (value) => {
      return isBefore(earliestDate, value);
    }
  );

const validationSchema = Yup.object({
  firstname: fnameValidations,
  lastname: lnameValidations,
  email: emailValidation,
  contactnum: phoneNumberValidation,
  // street: streetValidations,
  // barangay: brgyValidations,
  // city: cityValidations,
  // region: regionValidations,
  // postal: postalValidations,
  password: passwordValidation,
  cnfrmpass: confirmPassValidation,
  checkbox: chkbxValidation,
  birthdate: dateOfBirthValidationSchema,
});

//form submit

// console.log('Form Errors', formik.errors)

const Register = () => {
  //hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);

  //handle on submit
  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post(`/register`, values);
      console.log(data);
      if (data?.error) {
        toast.error(data.error, {
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
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        console.log(data);
        toast.success("Registration Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/sucess");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //form submit
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        contactnum: "",
        street: "",
        barangay: "",
        region: "",
        postal: "",
        city: "",
        password: "",
        cnfrmpass: "",
      },
      validationSchema,
      onSubmit,
    });

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  const toggle2 = () => {
    setOpening(!opening);
  };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5">
          {/* form */}
          <div className="md:w-1/2 p-5">
            <div>
              <NavLink to="/">
                <img
                  className="w-[200px] items-center p-0"
                  src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/321421696_988840015430714_1756898395352918694_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFqiQB2gn6RBunaj9ahDT12t2Rk1xQTRUe3ZGTXFBNFRzYuqjmxGbLqx-JD-cnn0QuX6xcVH3ZYzHye8iOZEqt6&_nc_ohc=df1vqQ2w6s0AX_9DzAd&_nc_ht=scontent.fmnl17-5.fna&oh=03_AdQUcHvA0bAkfp6Uf4vht22FGaaZ8OPTNqi-9JWdjnE9aQ&oe=640C5F61"
                  alt=""
                />
              </NavLink>
            </div>
            <NavLink to="/">
              <img src={logoreg1} className="w-32 mx-auto" />
            </NavLink>

            <h2 className="text-[#002D74] font-bold text-2xl">Register</h2>
            <p className="text-[#002D74] text-sm my-4">
              If you are already a member, easily login{" "}
              <NavLink to="/login" className="underline font-se">
                Here
              </NavLink>
            </p>

            <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <TextField
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    label="Firstname"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    value={values.firstname}
                    onBlur={handleBlur}
                  />

                  {touched.firstname && errors.firstname ? (
                    <div
                      className="text-red-600 font-semibold text-sm
                                    capitalize"
                    >
                      {errors.firstname}
                    </div>
                  ) : null}
                </div>

                <div>
                  <TextField
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    label="Lastname"
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    value={values.lastname}
                    onBlur={handleBlur}
                  />

                  {touched.lastname && errors.lastname ? (
                    <div
                      className="text-red-600 font-semibold text-sm
                                    capitalize"
                    >
                      {errors.lastname}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="">
                <TextField
                  type="text"
                  name="email"
                  placeholder="Email"
                  label="Email"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />

                {touched.email && errors.email ? (
                  <div className="text-red-600 font-semibold text-sm">
                    {errors.email}
                  </div>
                ) : null}
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                <div className="grid sm:grid-cols-1">
                  <TextField
                    type="date"
                    label="Birthdate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    size="small"
                    name="birthdate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.birthdate && errors.birthdate ? (
                    <div className="text-red-600 font-semibold text-sm transition-all ease-in duration-700">
                      {errors.birthdate}
                    </div>
                  ) : null}
                </div>

                <div className="grid sm:grid-cols-1">
                  <TextField
                    type="number"
                    name="contactnum"
                    label="Contact"
                    size="small"
                    onChange={handleChange}
                    value={values.contactnum}
                    onBlur={handleBlur}
                  />

                  {touched.contactnum && errors.contactnum ? (
                    <div className="text-red-600 font-semibold text-sm">
                      {errors.contactnum}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="relative">
                <TextField
                  type={open === false ? "password" : "text"}
                  name="password"
                  label="Password"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />

                {touched.password && errors.password ? (
                  <div className="text-red-600 font-semibold text-sm">
                    {errors.password}
                  </div>
                ) : null}

                <div className="text-2xl absolute top-2.5 right-2">
                  {open === false ? (
                    <AiOutlineEye onClick={toggle} className="cursor-pointer" />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={toggle}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="relative">
                <TextField
                  type={opening === false ? "password" : "text"}
                  name="cnfrmpass"
                  label="Confirm Password"
                  size="small"
                  fullWidth
                  onChange={handleChange}
                  value={values.cnfrmpass}
                  onBlur={handleBlur}
                />

                {touched.cnfrmpass && errors.cnfrmpass ? (
                  <div className="text-red-600 font-semibold text-sm">
                    {errors.cnfrmpass}
                  </div>
                ) : null}

                <div className="text-2xl absolute top-2.5 right-2">
                  {opening === false ? (
                    <AiOutlineEye
                      onClick={toggle2}
                      className="cursor-pointer"
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={toggle2}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>

              <div className="font-varela">
                <input
                  type="checkbox"
                  name="checkbox"
                  id=""
                  className="border-gray-400 mr-2"
                  onChange={handleChange}
                  value={values.terms}
                  onBlur={handleBlur}
                />
                I accept the{" "}
                <span
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => setOpenDialog(true)}
                >
                  Terms Of Use
                </span>{" "}
                &{" "}
                <span
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => setOpenDialog2(true)}
                >
                  Privacy Policy
                </span>
                {errors.checkbox ? (
                  <div className="text-red-600 font-semibold text-sm">
                    {errors.checkbox}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="hover:scale-105 duration-300 rounded-xl bg-[#002D74] text-white py-2"
              >
                Register
              </button>
            </form>
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              className=""
            >
              <DialogTitle>Terms of Use</DialogTitle>
              <DialogContent>
                <div className="space-y-5 mb-5">
                  <strong className="">Welcome to Cyclecore!</strong>
                  <p className="font-varela">
                    These terms and conditions outline the rules and regulations
                    for the use of Cyclecore's Website, located at
                    Cyclecore.com.ph.
                  </p>
                  <p className="font-varela">
                    By accessing this website we assume you accept these terms
                    and conditions. Do not continue to use Cyclecore if you do
                    not agree to take all of the terms and conditions stated on
                    this page.
                  </p>
                  <p className="font-varela">
                    The following terminology applies to these Terms and
                    Conditions, Privacy Statement and Disclaimer Notice and all
                    Agreements: "Client", "You" and "Your" refers to you, the
                    person log on this website and compliant to the Company's
                    terms and conditions. "The Company", "Ourselves", "We",
                    "Our" and "Us", refers to our Company. "Party", "Parties",
                    or "Us", refers to both the Client and ourselves. All terms
                    refer to the offer, acceptance and consideration of payment
                    necessary to undertake the process of our assistance to the
                    Client in the most appropriate manner for the express
                    purpose of meeting the Client's needs in respect of
                    provision of the Company's stated services, in accordance
                    with and subject to, prevailing law of ph. Any use of the
                    above terminology or other words in the singular, plural,
                    capitalization and/or he/she or they, are taken as
                    interchangeable and therefore as referring to same.
                  </p>
                </div>
                <div className="space-y-5 mb-5">
                  <h1 className="font-varela font-bold">Cookies</h1>
                  <p className="font-varela">
                    We employ the use of cookies. By accessing Cyclecore, you
                    agreed to use cookies in agreement with the Cyclecore's
                    Privacy Policy.
                  </p>
                  <p className="font-varela">
                    Most interactive websites use cookies to let us retrieve the
                    user's details for each visit. Cookies are used by our
                    website to enable the functionality of certain areas to make
                    it easier for people visiting our website. Some of our
                    affiliate/advertising partners may also use cookies.
                  </p>
                </div>
                <div className="font-varela space-y-5 mb-5">
                  <h1 className="font-bold">License</h1>
                  <p>
                    License Unless otherwise stated, Cyclecore and/or its
                    licensors own the intellectual property rights for all
                    material on Cyclecore. All intellectual property rights are
                    reserved. You may access this from Cyclecore for your own
                    personal use subjected to restrictions set in these terms
                    and conditions.
                  </p>
                  <h1 className="font-bold">You must not :</h1>
                  <ul>
                    <li>- Republish Cyclecore</li>
                    <li>- Sell, rent or sub-license material from Cyclecore</li>
                    <li>
                      - Reproduce, duplicate or copy material from Cyclecore
                    </li>
                    <li>- Redistribute content from Cyclecore</li>
                  </ul>

                  <p>
                    Parts of this website offer an opportunity for users to post
                    and exchange opinions and information in certain areas of
                    the website. Cyclecore does not filter, edit, publish or
                    review Comments prior to their presence on the website.
                    Comments do not reflect the views and opinions of
                    Cyclecore,its agents and/or affiliates. Comments reflect the
                    views and opinions of the person who post their views and
                    opinions. To the extent permitted by applicable laws,
                    Cyclecore shall not be liable for the Comments or for any
                    liability, damages or expenses caused and/or suffered as a
                    result of any use of and/or posting of and/or appearance of
                    the Comments on this website.
                  </p>
                  <p>
                    Cyclecore reserves the right to monitor all Comments and to
                    remove any Comments which can be considered inappropriate,
                    offensive or causes breach of these Terms and Conditions.
                  </p>
                </div>
                <div className="font-varela space-y-5">
                  <h1 className="font-bold">Disclaimer</h1>
                  <p>
                    To the maximum extent permitted by applicable law, we
                    exclude all representations, warranties and conditions
                    relating to our website and the use of this website. Nothing
                    in this disclaimer will:
                  </p>
                  <ul>
                    <li>
                      - limit or exclude our or your liability for death or
                      personal injury
                    </li>
                    <li>
                      - limit or exclude our or your liability for fraud or
                      fraudulent misrepresentation
                    </li>
                    <li>
                      - limit any of our or your liabilities in any way that is
                      not permitted under applicable law or
                    </li>
                    <li>
                      - exclude any of our or your liabilities that may not be
                      excluded under applicable law.
                    </li>
                  </ul>
                  <p>
                    The limitations and prohibitions of liability set in this
                    Section and elsewhere in this disclaimer: (a) are subject to
                    the preceding paragraph; and (b) govern all liabilities
                    arising under the disclaimer, including liabilities arising
                    in contract, in tort and for breach of statutory duty.
                  </p>
                  <p>
                    As long as the website and the information and services on
                    the website are provided free of charge, we will not be
                    liable for any loss or damage of any nature
                  </p>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
              </DialogActions>
            </Dialog>

            <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)}>
              <DialogTitle>Privacy Policy</DialogTitle>
              <DialogContent>
                <div className="font-varela space-y-5 mb-6">
                  <p>
                    At Cyclecore, accessible from cyclecore.com.ph, one of our
                    main priorities is the privacy of our visitors. This Privacy
                    Policy document contains types of information that is
                    collected and recorded by Cyclecore and how we use it.
                  </p>
                  <p>
                    If you have additional questions or require more information
                    about our Privacy Policy, do not hesitate to contact us.
                  </p>
                  <p>
                    This Privacy Policy applies only to our online activities
                    and is valid for visitors to our website with regards to the
                    information that they shared and/or collect in Cyclecore.
                    This policy is not applicable to any information collected
                    offline or via channels other than this website.
                  </p>
                </div>

                <div className="font-varela space-y-5">
                  <h1 className="font-bold">Consent</h1>
                  <p>
                    By using our website, you hereby consent to our Privacy
                    Policy and agree to its terms.
                  </p>

                  <h1 className="font-bold">Information we collect</h1>
                  <p>
                    The personal information that you are asked to provide, and
                    the reasons why you are asked to provide it, will be made
                    clear to you at the point we ask you to provide your
                    personal information.
                  </p>
                  <p>
                    If you contact us directly, we may receive additional
                    information about you such as your name, email address,
                    phone number, the contents of the message and/or attachments
                    you may send us, and any other information you may choose to
                    provide.
                  </p>
                  <p>
                    When you register for an Account, we may ask for your
                    contact information, including items such as name, company
                    name, address, email address, and telephone number.
                  </p>

                  <h1 className="font-bold">How we use your information</h1>
                  <p>
                    We use the information we collect in various ways, including
                    to:
                  </p>

                  <ul>
                    <li>- Provide, operate, and maintain our website</li>
                    <li>- Improve, personalize, and expand our website</li>
                    <li>- Understand and analyze how you use our website</li>
                    <li>
                      - Develop new products, services, features, and
                      functionality
                    </li>
                    <li>
                      - Communicate with you, either directly or through one of
                      our partners, including for customer service, to provide
                      you with updates and other information relating to the
                      website, and for marketing and promotional purposes
                    </li>
                    <li>- Send you emails</li>
                    <li>- Find and prevent fraud</li>
                  </ul>

                  <h1 className="font-bold">Log Files</h1>
                  <p>
                    Cyclecore follows a standard procedure of using log files.
                    These files log visitors when they visit websites. All
                    hosting companies do this and a part of hosting services'
                    analytics. The information collected by log files include
                    internet protocol (IP) addresses, browser type, Internet
                    Service Provider (ISP), date and time stamp, referring/exit
                    pages, and possibly the number of clicks. These are not
                    linked to any information that is personally identifiable.
                    The purpose of the information is for analyzing trends,
                    administering the site, tracking users' movement on the
                    website, and gathering demographic information.
                  </p>

                  <h1 className="font-bold">Cookies and Web Beacons</h1>
                  <p>
                    Like any other website, Cyclecore uses "cookies". These
                    cookies are used to store information including visitors'
                    preferences, and the pages on the website that the visitor
                    accessed or visited. The information is used to optimize the
                    users' experience by customizing our web page content based
                    on visitors' browser type and/or other information.
                  </p>

                  <h1 className="font-bold">
                    Advertising Partners Privacy Policies
                  </h1>
                  <p>
                    You may consult this list to find the Privacy Policy for
                    each of the advertising partners of Cyclecore.
                  </p>
                  <p>
                    Third-party ad servers or ad networks uses technologies like
                    cookies, JavaScript, or Web Beacons that are used in their
                    respective advertisements and links that appear on
                    Cyclecore, which are sent directly to users' browser. They
                    automatically receive your IP address when this occurs.
                    These technologies are used to measure the effectiveness of
                    their advertising campaigns and/or to personalize the
                    advertising content that you see on websites that you visit.
                  </p>
                  <p>
                    Note that Cyclecore has no access to or control over these
                    cookies that are used by third-party advertisers.
                  </p>

                  <h1 className="font-bold">Changes to This Privacy Policy</h1>
                  <p>
                    We may update our Privacy Policy from time to time. Thus, we
                    advise you to review this page periodically for any changes.
                    We will notify you of any changes by posting the new Privacy
                    Policy on this page. These changes are effective
                    immediately, after they are posted on this page.
                  </p>

                  <h1 className="font-bold">Contact Us</h1>
                  <p>
                    If you have any questions or suggestions about our Privacy
                    Policy, do not hesitate to contact us.
                  </p>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog2(false)}>Close</Button>
              </DialogActions>
            </Dialog>
          </div>
          {/* image */}
          <div
            style={{ backgroundImage: `url(${reglogo})` }}
            className="rounded-xl w-9/12 md:block hidden  bg-no-repeat bg-cover text-white p-12"
          >
            <h1 className="text-6xl mb-5 mt-[200px] text-center tracking-[1.5rem] font-bold font-lobster text-zinc-50">
              Welcome
            </h1>
            <div>
              <p className="font-semibold text-center">
                A bicycle is a useful vehicle that helps us reach a destination
                without polluting the environment. It is composed of steel and
                has two wheels. In addition, it has got a seat and handle with
                two pedals and also a bell. Some bicycles have a carrier while
                some don’t. It is a popular choice amongst poor people and
                students. Essay on bicycle will help us understand its
                importance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
