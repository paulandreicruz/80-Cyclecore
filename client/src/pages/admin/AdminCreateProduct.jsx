import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//components
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CustomModal from "../../components/Modal/CustomModal";
import { TextField } from "@mui/material";
import ProductCustomSelect from "../../components/select/AdminProductsSelect";
import ProductCustUpload from "../../components/upload/AdminProductsUpload";

//icons image
import productlogo from "../../assets/product.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

export default function AdminCreateProduct() {
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
  const [stocks, setStocks] = useState("");

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("subcategory", subcategory);
      productData.append("brand", brand);
      productData.append("stocks", stocks);
      productData.append("shipping", shipping);
      productData.append("price", price);

      // console.log(...[productData]);
      const { data } = await axios.post("/product", productData);
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
        toast.success(`"${data.name}" is created`, {
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

  return (
    <div>
      <div className="flex font-pop ml-5 mt-5 items-center">
        <div>
          <NavLink to="/dashboard/admin">
            <MdSubdirectoryArrowLeft className="h-5 w-5" />
          </NavLink>
        </div>
        <div className="ml-2">Exit to Menu</div>
      </div>
      <div className=" bg-[#1F2A40] px-4 pt-3 pb-4 border border-gray-200 items-center mt-5 mr-5 ml-5 rounded-t-lg font-pop shadow-lg">
        <div>
          <NavLink to="/dashboard/admin/products">
            <button className=" mb-3 items-center flex uppercase shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded">
              <IoArrowBackCircleOutline className="h-5 w-5" />
              Back
            </button>
          </NavLink>
        </div>
      </div>
      <div className=" bg-zinc-200 justify-between flex border-2 rounded-l- border-gray-400 mr-5 ml-5  px-4 pt-3 pb-4">
        <div className="mt-5 mr-5 pl-20">
          <img src={productlogo} alt="" className="pt-8 h-72 w-96 mt-20"></img>
        </div>
        <div className="font-pop mr-24 mt-5 w-1/2">
          <h1 className="flex pt-8 pr-28 text-3xl text-black">
            Create Product
            <IoMdAddCircle className="pl-2" />
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="pt-5 ">
              <h1 className="text-lg">Category :</h1>
              <div className="pt-5 ">
                {/* <FormControl sx={{ minWidth: 400 }}> */}
                <InputLabel id="demo-simple-select-autowidth-label">
                  Category
                </InputLabel>
                <Select
                  disableSearch
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                  label="Category"
                  sx={{ minWidth: 400 }}
                >
                  {categories?.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* </FormControl> */}
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Sub-Category :</h1>
              <div className="pt-5 ">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Sub-Category
                </InputLabel>
                <Select
                  disableSearch
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  onChange={(e) => setSubcategory(e.target.value)}
                  size="small"
                  label="Sub-Category"
                  sx={{ minWidth: 400 }}
                >
                  {subcategories?.map((s) => (
                    <MenuItem key={s._id} value={s._id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Brand :</h1>
              <div className="pt-5 ">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Brands
                </InputLabel>
                <Select
                  disableSearch
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  onChange={(e) => setBrand(e.target.value)}
                  size="small"
                  label="Brands"
                  sx={{ minWidth: 400 }}
                >
                  {brands?.map((b) => (
                    <MenuItem key={b._id} value={b._id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Product Name :</h1>
              <div className="pt-5 ">
                <TextField
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  label="Product Name"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Product Description :</h1>
              <div className="pt-5 ">
                <TextField
                  type="text"
                  name="description"
                  placeholder="Description"
                  label="Description"
                  size="small"
                  fullWidth
                  rows={4}
                  multiline
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Price :</h1>
              <div className="pt-5 ">
                <TextField
                  type="number"
                  name="stocks"
                  placeholder="Price"
                  label="Price"
                  size="small"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">stocks :</h1>
              <div className="pt-5 ">
                <TextField
                  type="number"
                  name="stocks"
                  placeholder="stocks"
                  label="stocks"
                  size="small"
                  fullWidth
                  value={stocks}
                  onChange={(e) => setStocks(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                />
              </div>
            </div>
            <div className="pt-5 ">
              <h1 className="text-lg">Shipping :</h1>
              <div className="pt-5 ">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Shipping
                </InputLabel>
                <Select
                  disableSearch
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  onChange={(e) => setShipping(e.target.value)}
                  size="small"
                  label="Shipping"
                  sx={{ minWidth: 400 }}
                >
                  <MenuItem value="0">No</MenuItem>
                  <MenuItem value="1">Yes</MenuItem>
                </Select>
              </div>
            </div>
            {/* <div className="pt-5 ">
              <h1 className="text-lg">Sizes :</h1>
              <div className="pt-5 ">
                <ProductCustomSelect />
              </div>
            </div> */}
            <div className="pt-5 ">
              <h1 className="text-lg">Image :</h1>
              <div className="pt-5 ">
                <label className="uppercase shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-md pt-4 px-52 rounded w-auto ">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  ></input>
                </label>
                {photo && (
                  <div className="text-center items-center ml-20 pt-2">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      className="object-scale down h-36"
                    ></img>
                  </div>
                )}
              </div>
            </div>
            <div className="pt-5">
              <button className="flex uppercase shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded">
                Submit
              </button>
            </div>
            {/* <>
              {categories?.length}
              {subcategories?.length}
              {brands?.length}
            </> */}
          </form>
        </div>
      </div>
    </div>
  );
}
