import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Paper, TextField, Button, InputLabel } from "@mui/material";

//icons
import { FiEdit } from "react-icons/fi";
import { MdEditNote, MdOutlineSystemSecurityUpdate } from "react-icons/md";
import CustomModal from "../../components/Modal/CustomModal";
import { BiCategory } from "react-icons/bi";
import { AiOutlineFolderAdd, AiTwotoneSave } from "react-icons/ai";
import { CgErase, CgEditMarkup } from "react-icons/cg";
import { TiArrowBack } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { FaRegWindowClose } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateshowModal, updatesetShowModal] = useState(false);
  const [name, setName] = useState();
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [deleteshowModal, deletesetShowModal] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
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
      const { data } = await axios.post("/category", { name });
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
        loadCategories();
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
      const { data } = await axios.put(`/category/${selected._id}`, {
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
        loadCategories();
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
      toast.error("Category may already exist", {
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
      const { data } = await axios.delete(`/category/${selected._id}`);
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
        loadCategories();
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
      toast.error("Category may already exist", {
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
    <div className="px-10 py-5 bg-gray-200 h-screen">
      <div className="py-2 px-4 bg-white border-b font-bebas flex justify-between">
        <div className="text-3xl tracking-wider flex gap-0.5 font-bold">
          Categories
          <BiCategory className="text-violet-500" />
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

      <div className="p-4 font-bebas bg-white shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <table className="table w-full border">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 ">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-xl tracking-wider">
                    Category ID
                  </th>
                  <th className="flex items-center text-left py-3 px-4 uppercase font-semibold text-sm">
                    <div className="flex-1 text-xl tracking-wider">
                      Category Name
                    </div>
                    <div className="">
                      <Button
                        type="button"
                        onClick={() => setShowModal(true)}
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<AiOutlineFolderAdd />}
                      >
                        <span className="font-bebas tracking-widest text-lg font-bold">
                          CREATE
                        </span>
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {categories?.map((category) => (
                  <tr key={category._id} className="border-b border-gray-300">
                    <td className="text-left py-3 px-4 tracking-wide">
                      {category._id}
                    </td>
                    <td className="text-left py-3 px-4 ">
                      <div className="flex items-center  space-x-2 ">
                        <div className="flex-1">
                          <span className="mr-4 tracking-wide">
                            {category.name}
                          </span>
                        </div>
                        <div className="flex">
                          <Button
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(category);
                              setUpdatingName(category.name);
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
                              setSelected(category);
                              setUpdatingName(category.name);
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
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}

                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className=" text-2xl font-semibold">Add Category</h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <InputLabel>
                        <span className="font-bebas text-xs tracking-wide"></span>
                      </InputLabel>
                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="category"
                        placeholder="Write Category"
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
      </div>
      {updateshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none font-bebas">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-2xl font-semibold tracking-wider justify-center flex items-center mx-auto">
                    Update Category
                    <MdOutlineSystemSecurityUpdate />
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
                      <div className="relative p-6 flex-auto">
                        <InputLabel>
                          <span className="font-bebas tracking-wider text-xs">
                            Category
                          </span>
                        </InputLabel>
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="updatecategory"
                          placeholder=""
                          size="small"
                          fullWidth
                          autoFocus={true}
                          variant="standard"
                          InputProps={{
                            style: {
                              fontFamily: "Bebas Neue",
                              fontSize: "18px",
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
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 tracking-widest flex items-center gap-1 bg-re"
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
          <div className="justify-center items-center flex overflow-x-hidden font-bebas overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className=" text-2xl font-semibold flex items-center gap-1 mx-auto tracking-widest">
                    Delete Category <BsTrash />
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
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="updatecategory"
                          placeholder=""
                          label="Category"
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
