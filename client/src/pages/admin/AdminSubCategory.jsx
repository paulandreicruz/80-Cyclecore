import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, InputLabel, Paper, TextField } from "@mui/material";

//icons
import { FiEdit } from "react-icons/fi";
import {
  MdCategory,
  MdEditNote,
  MdOutlineSystemSecurityUpdate,
} from "react-icons/md";
import { TiArrowBack } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { AiOutlineFolderAdd, AiTwotoneSave } from "react-icons/ai";
import { CgEditMarkup, CgErase } from "react-icons/cg";
import { FaRegWindowClose } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

export default function SubCategory() {
  const [subcategories, setsubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateshowModal, updatesetShowModal] = useState(false);
  const [name, setName] = useState();
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [deleteshowModal, deletesetShowModal] = useState(false);

  useEffect(() => {
    loadsubCategories();
  }, []);

  const loadsubCategories = async () => {
    try {
      const { data } = await axios.get("/subcategories");
      setsubCategories(data);
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
      const { data } = await axios.post("/subcategory", { name });
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
        loadsubCategories();
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
      toast.error("Create category failed, Try Again.", {
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
      const { data } = await axios.put(`/subcategory/${selected._id}`, {
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
        loadsubCategories();
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
      toast.error("Sub-Category may already exist", {
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
      const { data } = await axios.delete(`/subcategory/${selected._id}`);
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
        loadsubCategories();
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
      toast.error("Sub-Category may already exist", {
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
    <div className="font-bebas bg-gray-200 h-screen px-10 py-5">
      <div className="py-2 px-4 bg-white border-b font-bebas flex justify-between">
        <div className="flex items-center text-3xl font-bold tracking-wider">
          sub-category <MdCategory className="text-orange-500" />
        </div>
        <NavLink to="/dashboard/admin">
          <Button
            variant="contained"
            color="inherit"
            size="small"
            startIcon={<TiArrowBack />}
          >
            <span className="font-bebas tracking-wider font-bold text-lg">
              {" "}
              Back
            </span>
          </Button>
        </NavLink>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-4 bg-white shadow-xl">
          <div>
            <table className="table w-full border-collapse border border-gray-300">
              {/* <thead>
              <tr>
                <td>CategoryID</td>
                <td>Category Name</td>
                <td></td>
                <td>Order Date</td>
                <td>Order Total</td>
                <td>Shippin Address</td>
                <td>Order Status</td>
              </tr>
            </thead> */}
              <thead>
                <tr className="bg-gray-100 text-xl">
                  <th className="text-left py-3 px-4 uppercase font-semibold tracking-wider">
                    Sub-Category ID
                  </th>
                  <th className="items-center flex text-left py-3 px-4 uppercase font-semibold tracking-wider">
                    <div className="flex-1">Sub-Category Name</div>
                    <div className="">
                      <Button
                        type="button"
                        onClick={() => setShowModal(true)}
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<AiOutlineFolderAdd />}
                      >
                        <span className="font-bebas tracking-widest text-lg font-bold ">
                          create
                        </span>
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {subcategories?.map((subcategory) => (
                  <tr key={subcategory._id} className="border-b">
                    <td className="text-left py-3 px-4">{subcategory._id}</td>
                    <td className="text-left py-3 px-4 ">
                      <div className="flex items-center  space-x-2 ">
                        <div className="flex-1">
                          <span className="mr-4">{subcategory.name}</span>
                        </div>
                        <div className="flex">
                          <Button
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(subcategory);
                              setUpdatingName(subcategory.name);
                            }}
                            type="button"
                            variant="contained"
                            color="info"
                            size="small"
                            startIcon={<CgEditMarkup />}
                          >
                            <span className="font-bebas tracking-widest text-lg font-bold">
                              Edit
                            </span>
                          </Button>
                        </div>
                        <div className="flex">
                          <Button
                            onClick={() => {
                              deletesetShowModal(true);
                              setSelected(subcategory);
                              setUpdatingName(subcategory.name);
                            }}
                            type="button"
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<CgErase />}
                          >
                            <span className="font-bebas text-lg tracking-widest font-bold">
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
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between py-2 px-4 text border-b border-solid border-slate-200 rounded-t">
                    <h3 className=" text-2xl font-semibold justify-center">
                      Add Sub-Category
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <InputLabel>
                      <span className="font-bebas text-sm">
                        Add Sub-Category
                      </span>
                    </InputLabel>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="subcategory"
                      placeholder="Sub-Category"
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
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
                  <h3 className=" text-2xl font-semibold mx-auto flex items-center gap-1">
                    Update Sub-Category <MdOutlineSystemSecurityUpdate />
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => updatesetShowModal(false)}
                  ></button> */}
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-5 flex-auto">
                        <InputLabel>
                          <span className="font-bebas tracking-wide text-xs">
                            Update Sub-category
                          </span>
                        </InputLabel>
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="updatecategory"
                          size="small"
                          fullWidth
                          autoFocus="true"
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: "16.5px",
                              letterSpacing: "1px",
                            },
                          }}
                          variant="standard"
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
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-wider flex items-center gap-1"
                    type="button"
                    onClick={() => updatesetShowModal(false)}
                  >
                    <FaRegWindowClose />
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-widest flex items-center gap-1"
                    type="submit"
                    onClick={() => {
                      handleUpdate();
                      updatesetShowModal(false);
                    }}
                  >
                    <AiTwotoneSave />
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
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-2xl font-semibold tracking-wider text-center mx-auto flex items-center gap-1">
                    Delete Sub-Category <BsTrash />
                  </h3>
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => deletesetShowModal(false)}
                  ></button> */}
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-6 flex-auto">
                        <InputLabel>
                          <span className="font-bebas tracking-wider text-xs">
                            Delete Sub-category
                          </span>
                        </InputLabel>
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="deletesub-category"
                          size="small"
                          fullWidth
                          disabled
                          variant="standard"
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: "16.5px",
                              letterSpacing: "1px",
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
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-widest flex items-center gap-1"
                    type="button"
                    onClick={() => deletesetShowModal(false)}
                  >
                    <FaRegWindowClose />
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-widest flex items-center gap-1"
                    type="submit"
                    onClick={() => {
                      handleDelete();
                      deletesetShowModal(false);
                    }}
                  >
                    <AiTwotoneSave />
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
