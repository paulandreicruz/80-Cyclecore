import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { MdStore } from "react-icons/md";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";

import paper from "../../assets/paper.png";

// styles
const containerStyles = "mt-6 flex flex-row font-bebas tracking-widest";
const iconStyles = "h-8 w-8 text-slate-200 mr-2 ";
const h2Styles = "text-slate-400 text-xs";
const pStyles = "text-white text-xs font-bebas";

const ContactSection = () => {
  const [showContactInfo, setShowContactInfo] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { name, email, subject, message } = formData;

  const handleSwitch = () => {
    setShowContactInfo(!showContactInfo);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(formData);

      await axios.post("/send-email", body, config);

      toast.success("Email sent successfully", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          width: "300px",
          height: "20px",
          fontSize: "17px",
          fontFamily: "Bebas Neue",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Error sending email", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          width: "300px",
          height: "20px",
          fontSize: "17px",
          fontFamily: "Bebas Neue",
        },
      });
    }
  };

  return (
    <div className="bg-gray-200">
      <div
        data-aos="slide-left"
        data-aos-duration="1000"
        data-aos-delay="300"
        className="px-10"
      >
        <img src={paper} alt="" className="w-full h-60 rotate-180" />
      </div>
      <div className="justify-between px-20 py-20 max-w-screen-2xl mx-auto md:flex md:space-y-0 space-y-6 drop-shadow-xl">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="max-w-lg text-center md:text-left transition duration-500 ease-in-out"
        >
          <h1 className="pt-4 pb-1 md:text-6xl sm:text-5xl text-3xl font-bold font-bebas tracking-widest leading-tight duration-700">
            Hello Please Feel Free To send Your Concerns To{" "}
            <span className="text-[#FFA500]">Us!</span>
          </h1>
          <p className="pt-4 md:text-lg sm:text-md text-sm font-lg font-bebas tracking-wider text-[#606060] leading-relaxed">
            This will help us on improving our service to you!
          </p>
        </div>

        <div
          data-aos="fade-up-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="grid grid-cols-1 place-items-center max-w-2xl transition duration-500 ease-in-out"
        >
          <div className="bg-white rounded-md shadow-md flex ">
            {/* store info info */}
            <div
              id="contact_info"
              className={`h-[350px] w-[350px] bg-blue-800 p-8 md:hover:scale-y-125 md:hover:scale-x-125 rounded-md md:rounded-r-none hover:rounded-md transition duration-500 ease-in-out ${
                !showContactInfo
                  ? "hidden transition duration-500 md:block"
                  : ""
              }  `}
            >
              <div className="flex justify-between">
                {/* Page Title */}
                <h2 className="text-white font-bebas tracking-widest text-xl">
                  Contact Information
                </h2>
                <h2
                  onClick={handleSwitch}
                  id="switch_to_contact_us"
                  className="text-red-500 font-bebas tracking-wider text-xs flex items-center flex-row md:hidden cursor-pointer"
                >
                  Contact Us <HiOutlineChevronDoubleRight />
                </h2>
              </div>

              <div className={containerStyles}>
                {/* NAME */}
                <div>
                  {/* contact icon */}
                  <IoIosContact className={iconStyles} />
                </div>
                <div className="">
                  <h2 className={h2Styles}>Name:</h2>
                  <p className={pStyles}>Cyclecore</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* EMAIL */}
                <div>
                  {/* email icon */}
                  <MdEmail className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Email:</h2>
                  <p className={pStyles}>cyclecorebikeshop@gmail.com</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* PHONE */}
                <div>
                  {/* phone icon */}
                  <AiTwotonePhone className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Phone:</h2>
                  <p className={pStyles}>+639-964-9382</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* ADDRESS */}
                <div>
                  {/* address icon */}
                  <MdStore className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Address:</h2>
                  <p className={pStyles}>
                    390 Col. Bonny Serrano Ave Libis 1110 Quezon City,
                    Philippines
                  </p>
                </div>
              </div>
            </div>
            {/* contact us from */}
            <div
              id="contact_us"
              className={`h-[350px] w-[350px] bg-white px-6 py-8 md:rounded-r-md duration-700 rounded-md transition opacity-100 delay-500 ${
                showContactInfo ? "hidden md:block" : ""
              }`}
            >
              <div className="flex justify-between ">
                {/* Page Title */}
                <h2 className="text-blue-500 text-xl font-bebas tracking-wider font-semibold leading-relaxed">
                  Get In Touch
                </h2>
                <h2
                  onClick={handleSwitch}
                  id="switch_to_contact_info"
                  className="text-red-800 text-xs flex font-bebas tracking-wider flex-row items-center font-semibold md:hidden cursor-pointer"
                >
                  Contact Info
                  <HiOutlineChevronDoubleRight />
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="font-bebas">
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={handleChange}
                  required
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={handleChange}
                  required
                  placeholder="Enter Your Concerns"
                  className="w-full text-xs px-3 h-20 my-2 outline-none rounded-md border focus:shadow-sm resize-none focus-within:scale-110"
                />

                <button
                  type="submit"
                  className="flex items-center gap-1 bg-[#FFA500] hover:scale-105 font-bebas tracking-widest duration-500 px-4 py-2 rounded-md text-xs cursor-pointer hover:shadow-md max-w-md uppercase "
                >
                  <FiSend /> <span className="tracking-[2px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
