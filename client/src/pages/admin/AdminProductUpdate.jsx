import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//components
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomModal from "../../components/Modal/CustomModal";
import { Button, Paper, TextField } from "@mui/material";
import ProductCustomSelect from "../../components/select/AdminProductsSelect";
import ProductCustUpload from "../../components/upload/AdminProductsUpload";

//icons image
import productlogo from "../../assets/product.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  MdOutlineSecurityUpdateGood,
  MdSubdirectoryArrowLeft,
} from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { Grid } from "@mui/material";
import { TiUploadOutline } from "react-icons/ti";
import { RiDeleteBin5Line, RiUploadCloudLine } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";

export default function AdminUpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  ///load categories
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSubCategories();
  }, []);

  const loadSubCategories = async () => {
    try {
      const { data } = await axios.get("/subcategories");
      setSubcategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const { data } = await axios.get("/brands");
      setBrands(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const styles = {
    input: {
      fontFamily: "Arial",
    },
  };

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category._id);
      setSubcategory(data.subcategory._id);
      setBrand(data.brand._id);
      setShipping(data.shipping);
      setId(data._id);
      console.log("data =>", data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("subcategory", subcategory);
      productData.append("brand", brand);
      productData.append("shipping", shipping);
      productData.append("price", price);

      // console.log(...[productData]);
      const { data } = await axios.put(`/product/${id}`, productData);
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
        toast.success(`"${data.name}" is updated`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (req, res) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await axios.delete(`/product/${id}`);
      toast.success(`"${data.name}" is deleted`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/dashboard/admin/products");
    } catch (err) {
      toast.error("Delete Failed, Try Again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  return (
    <div className="">
      <div className="font-bebas py-5 px-10 max-w-[95rem] mx-auto">
        <div className="px-4 py-2 bg-white border-b flex justify-between">
          <h1 className="flex items-center text-3xl font-bold gap-2 tracking-wider">
            Update Product
            <RxUpdate />
          </h1>

          <NavLink to="/dashboard/admin/products">
            <Button
              variant="contained"
              color="inherit"
              className="items-center flex text-white gap-1"
              size="small"
            >
              <IoArrowBackCircleOutline className="text-lg" />
              <span className="font-bebas tracking-widest text-lg font-bold">
                Back
              </span>
            </Button>
          </NavLink>
        </div>

        <div className="py-10 px-44 bg-white shadow-lg">
          <Grid container justifyContent="space-between">
            {/* left side */}
            <Grid item>
              <div className="p-5 py-[13rem]">
                {/* <div className="text-center">
                  {name}
                </div> */}
                <img
                  src={`${
                    import.meta.env.VITE_APP_REACT_APP_API
                  }/product/photo/${id}?${new Date().getTime()}`}
                  alt=""
                  className="w-[35rem]"
                />
              </div>
            </Grid>

            {/* right side */}
            <Grid item>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <div>
                      <InputLabel id="category-label">
                        <span className="font-bebas tracking-wider">
                          Category
                        </span>
                      </InputLabel>
                      <Select
                        disablesearch="true"
                        labelId="category-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        onChange={(e) => setCategory(e.target.value)}
                        size="small"
                        label="Category"
                        sx={{ minWidth: 400 }}
                        value={category}
                        variant="standard"
                      >
                        {categories?.map((c) => (
                          <MenuItem key={c._id} value={c._id}>
                            <span className="font-bebas tracking-wider text-xl">
                              {c.name}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        <span className="font-bebas tracking-wider">
                          Sub-Category
                        </span>
                      </InputLabel>
                      <Select
                        disablesearch="true"
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        onChange={(e) => setSubcategory(e.target.value)}
                        size="small"
                        label="Sub-Category"
                        sx={{ minWidth: 400 }}
                        value={subcategory}
                        variant="standard"
                      >
                        {subcategories?.map((s) => (
                          <MenuItem key={s._id} value={s._id}>
                            <span className="font-bebas tracking-wider text-xl">
                              {s.name}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        <span className="font-bebas tracking-wider">Brand</span>
                      </InputLabel>
                      <Select
                        disablesearch="true"
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        onChange={(e) => setBrand(e.target.value)}
                        size="small"
                        label="Brands"
                        value={brand}
                        sx={{ minWidth: 400 }}
                        variant="standard"
                      >
                        {brands?.map((b) => (
                          <MenuItem key={b._id} value={b._id}>
                            <span className="font-bebas tracking-wider text-xl">
                              {b.name}
                            </span>
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <InputLabel id="name-id">
                        <span className="font-bebas tracking-wider">
                          Product Name
                        </span>
                      </InputLabel>
                      <TextField
                        type="text"
                        labelId="name-id"
                        name="name"
                        placeholder="Product Name"
                        size="small"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: 19,
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wider">
                          Product Description
                        </span>
                      </InputLabel>
                      <TextField
                        type="text"
                        name="description"
                        placeholder="Description"
                        size="small"
                        fullWidth
                        rows={5}
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: 19,
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel id="price-id">
                        <span className="font-bebas tracking-wider">Price</span>
                      </InputLabel>
                      <TextField
                        type="number"
                        name="stocks"
                        placeholder="Price"
                        size="small"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        variant="standard"
                        InputProps={{
                          style: {
                            fontFamily: "Bebas Neue",
                            fontSize: 19,
                          },
                        }}
                      />
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wider">
                          Shipping
                        </span>
                      </InputLabel>
                      <Select
                        disablesearch="true"
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        autoWidth
                        onChange={(e) => setShipping(e.target.value)}
                        size="small"
                        label="Shipping"
                        sx={{ minWidth: 400 }}
                        value={shipping ? "1" : "0"}
                        variant="standard"
                      >
                        <MenuItem value="0">
                          <span className="font-bebas tracking-wider text-xl">
                            No
                          </span>
                        </MenuItem>
                        <MenuItem value="1">
                          <span className="font-bebas tracking-wider text-xl">
                            Yes
                          </span>
                        </MenuItem>
                      </Select>
                    </div>

                    <div>
                      <InputLabel>
                        <span className="font-bebas tracking-wider">
                          Upload Image
                        </span>
                      </InputLabel>

                      {photo ? (
                        <label className="px-3 py-5 flex items-center justify-center border border-gray-600 border-dotted hover:cursor-pointer hover:text-slate-300 hover:border-slate-300 rounded-sm">
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                          <TiUploadOutline />
                          <span>Upload File</span>
                        </label>
                      ) : null}

                      {photo ? (
                        <div className="text-center mx-auto justify-center flex items-center ml-20 pt-2">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product photo"
                            className="object-scale down h-32 mx-auto justify-center flex"
                          ></img>
                        </div>
                      ) : (
                        <div>
                          <img
                            src={`${
                              import.meta.env.VITE_APP_REACT_APP_API
                            }/product/photo/${id}?${new Date().getTime()}`}
                            alt="product photo"
                            className="object-scale down h-32 mx-auto justify-center flex opacity-30"
                          />

                          <div className="text-center opacity-25">
                            {name}.jpg
                          </div>

                          <div>{photo ? photo.name : null}</div>
                          <label className="p-3 flex items-center gap-1 underline hover:cursor-pointer hover:text-slate-300 mx-auto justify-center">
                            <input
                              type="file"
                              name="change image"
                              id=""
                              onChange={(e) => setPhoto(e.target.files[0])}
                              hidden
                            />
                            <RiUploadCloudLine />
                            <h1>Change Image</h1>
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="justify-between flex">
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<MdOutlineSecurityUpdateGood />}
                      >
                        <span className="font-bebas tracking-wider">
                          Update Product
                        </span>
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        startIcon={<RiDeleteBin5Line />}
                      >
                        <span className="font-bebas tracking-wider">
                          Delete Product
                        </span>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
