import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Paper, TextField, Button, InputLabel } from "@mui/material";

//icons
import { FiEdit } from "react-icons/fi";
import { MdEditNote, MdOutlineNewLabel } from "react-icons/md";
import CustomModal from "../../components/Modal/CustomModal";
import { BsFlower1 } from "react-icons/bs";
import { TbEditCircle } from "react-icons/tb";
import { TiArrowBack, TiDelete } from "react-icons/ti";
import { NavLink } from "react-router-dom";

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateshowModal, updatesetShowModal] = useState(false);
  const [name, setName] = useState();
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [deleteshowModal, deletesetShowModal] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const { data } = await axios.get("/brands");
      setBrands(data);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (e) {
        e.preventDefault();
      }
      const { data } = await axios.post("/brand", { name });
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
        loadBrands();
        setName;
        toast.success(`"${data.name}" is created"`, {
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
    } catch (err) {
      console.log(err);
      toast.error("Create brand failed, Try Again.", {
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
  };

  const handleUpdate = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const { data } = await axios.put(`/brand/${selected._id}`, {
        name: updatingName,
      });
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
        loadBrands();
        setSelected(null);
        setUpdatingName("");
        toast.success(`"${data.name}" is updated"`, {
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
    } catch (err) {
      console.log(err);
      toast.error("Brand may already exist", {
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
  };

  const handleDelete = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const { data } = await axios.delete(`/brand/${selected._id}`);
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
        loadBrands();
        setSelected(null);
        toast.success(`"${data.name}" is deleted"`, {
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
    } catch (err) {
      console.log(err);
      toast.error("Error deleting brand, Try Again", {
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
  };

  return (
    <div className="font-bebas px-10 py-5 bg-gray-200 h-screen">
      <div className="py-2 bg-white px-4 text-3xl font-bold flex gap-1 tracking-wider border-b justify-between">
        <div className="flex items-center gap-1">
          <h1> Product Brands</h1>
          <BsFlower1 className="text-pink-500" />
        </div>

        <div>
          <NavLink to="/dashboard/admin">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              startIcon={<TiArrowBack />}
            >
              <span className="tracking-wider text-lg font-bebas font-bold">
                Back
              </span>
            </Button>
          </NavLink>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-4 shadow-md">
          <table className="table w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 ">
                <th className="text-left py-3 px-4 uppercase font-semibold tracking-wider text-xl">
                  Brand ID
                </th>
                <th className="flex items-center text-left py-3 px-4 uppercase font-semibold text-sm">
                  <div className="flex-1 tracking-wider text-xl">
                    Brand Name
                  </div>
                  <div className="">
                    <Button
                      type="button"
                      onClick={() => setShowModal(true)}
                      variant="contained"
                      color="success"
                      startIcon={<MdOutlineNewLabel />}
                      size="small"
                    >
                      <span className="font-bebas tracking-wider font-bold text-lg">
                        Create
                      </span>
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="tracking-wide">
              {brands?.map((brand) => (
                <tr key={brand._id} className="border-b border-gray-300">
                  <td className="text-left py-3 px-4">{brand._id}</td>
                  <td className="text-left py-3 px-4 ">
                    <div className="flex items-center  space-x-2 ">
                      <div className="flex-1">
                        <span className="mr-4">{brand.name}</span>
                      </div>
                      <div className="flex">
                        <Button
                          onClick={() => {
                            updatesetShowModal(true);
                            setSelected(brand);
                            setUpdatingName(brand.name);
                          }}
                          type="button"
                          variant="contained"
                          color="info"
                          startIcon={<TbEditCircle />}
                          size="small"
                        >
                          <span className="font-bebas font-bold text-lg">
                            Edit
                          </span>
                        </Button>
                      </div>
                      <div className="flex">
                        <Button
                          onClick={() => {
                            deletesetShowModal(true);
                            setSelected(brand);
                            setUpdatingName(brand.name);
                          }}
                          type="button"
                          variant="contained"
                          color="error"
                          startIcon={<TiDelete />}
                          size="small"
                        >
                          <span className="font-bebas font-bold text-lg">
                            Delete
                          </span>
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between py-2 px-4 border-b border-solid border-slate-200 rounded-t">
                    <h3 className=" text-2xl font-semibold">Add Brand</h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <InputLabel>
                      <span className="font-bebas text-sm">Create Brand</span>
                    </InputLabel>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="brand"
                      placeholder="Brand"
                      size="small"
                      fullWidth
                      autoFocus={true}
                      variant="standard"
                      InputProps={{
                        style: {
                          fontFamily: "Bebas Neue",
                          fontSize: 18,
                        },
                      }}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white tracking-wider active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => {
                        handleSubmit();
                        setShowModal(false);
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </form>
      {updateshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-2xl font-semibold">Update Brand</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => updatesetShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-6 flex-auto">
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="updatebrand"
                          placeholder={name}
                          size="small"
                          fullWidth
                          autoFocus={true}
                          variant="standard"
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: 18,
                            },
                          }}
                        />
                        {/* {categories?.map((c) => (
                          <button
                            key={c._id}
                            className="btn btn-outline-primary m-3"
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(c);
                              setUpdatingName(c.name);
                            }}
                          >
                            {c.name}
                          </button>
                        ))} */}
                      </div>
                    </div>
                  </div>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updatesetShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      handleUpdate();
                      updatesetShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {deleteshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between px-4 py-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-2xl font-semibold">Delete Brand</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => deletesetShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-6 flex-auto">
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="deletebrand"
                          size="small"
                          fullWidth
                          disabled
                          variant="standard"
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: 18,
                            },
                          }}
                        />
                        {/* {categories?.map((c) => (
                          <button
                            key={c._id}
                            className="btn btn-outline-primary m-3"
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(c);
                              setUpdatingName(c.name);
                            }}
                          >
                            {c.name}
                          </button>
                        ))} */}
                      </div>
                    </div>
                  </div>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deletesetShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      handleDelete();
                      deletesetShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
