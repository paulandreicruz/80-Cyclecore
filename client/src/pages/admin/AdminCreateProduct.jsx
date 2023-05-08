import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//components
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, Paper, TextField } from "@mui/material";

//icons image
import productlogo from "../../assets/product.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  MdOutlineCreateNewFolder,
  MdSubdirectoryArrowLeft,
} from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import cyclecore from "../../assets/cyclecore.png";
import upload from "../../assets/upload.png";
import { FcEditImage } from "react-icons/fc";
import { FaRegSave } from "react-icons/fa";

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
  const [stocks, setStocks] = useState(0);

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
      <div className="px-10 py-5 bg-gray-200">
        <div className="py-2 px-4 bg-white border-b flex justify-between">
          <div>
            <h1 className="flex items-center gap-1 font-bebas font-bold text-3xl tracking-wider">
              CREATE PRODUCT <MdOutlineCreateNewFolder />
            </h1>
          </div>

          <NavLink to="/dashboard/admin/products">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              startIcon={<TiArrowBack />}
            >
              <span className="font-bebas tracking-wider text-lg font-bold">
                Back
              </span>
            </Button>
          </NavLink>
        </div>

        <div className="px-4 py-16 bg-white shadow-lg">
          <Grid container justifyContent="center" gap={30}>
            <Grid item>
              <div className="pt-28">
                <img src={cyclecore} alt="" className="rounded-full" />
              </div>
            </Grid>

            {/* rightside */}
            <Grid item>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Category
                    </span>
                  </InputLabel>
                  <Select
                    disablesearch="true"
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
                        <span className="font-bebas tracking-wider text-[16px]">
                          {c.name}
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Sub-Category
                    </span>
                  </InputLabel>
                  <Select
                    disablesearch="true"
                    autoWidth
                    onChange={(e) => setSubcategory(e.target.value)}
                    size="small"
                    sx={{ minWidth: 400 }}
                    value={subcategory}
                    variant="standard"
                  >
                    {subcategories?.map((s) => (
                      <MenuItem key={s._id} value={s._id}>
                        <span className="font-bebas tracking-wider text-[16px]">
                          {s.name}
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Brand
                    </span>
                  </InputLabel>
                  <Select
                    disablesearch="true"
                    autoWidth
                    onChange={(e) => setBrand(e.target.value)}
                    size="small"
                    label="Category"
                    sx={{ minWidth: 400 }}
                    value={brand}
                    variant="standard"
                  >
                    {brands?.map((b) => (
                      <MenuItem key={b._id} value={b._id}>
                        <span className="font-bebas tracking-wider text-[16px]">
                          {b.name}
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Product Name
                    </span>
                  </InputLabel>
                  <TextField
                    disablesearch="true"
                    id="demo-simple-select-autowidth"
                    autoWidth
                    onChange={(e) => setName(e.target.value)}
                    size="small"
                    sx={{ minWidth: 400 }}
                    value={name}
                    variant="standard"
                    InputProps={{
                      style: {
                        fontFamily: "Bebas Neue",
                        fontSize: "16px",
                      },
                    }}
                  />
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Product Description
                    </span>
                  </InputLabel>
                  <TextField
                    type="text"
                    name="description"
                    size="small"
                    fullWidth
                    rows={2.5}
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="standard"
                    InputProps={{
                      style: {
                        fontFamily: "Bebas Neue",
                        fontSize: 16,
                      },
                    }}
                  />
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Price
                    </span>
                  </InputLabel>
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    variant="standard"
                    InputProps={{
                      style: {
                        fontFamily: "Bebas Neue",
                        fontSize: 16,
                      },
                    }}
                  />
                </div>

                <div>
                  <InputLabel>
                    <span className="font-bebas text-sm tracking-wider">
                      Stocks
                    </span>
                  </InputLabel>
                  <Select
                    disablesearch="true"
                    autoWidth
                    onChange={(e) => setStocks(e.target.value)}
                    size="small"
                    sx={{ minWidth: 400 }}
                    value={stocks}
                    variant="standard"
                  >
                    <MenuItem value={10}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        10
                      </span>
                    </MenuItem>

                    <MenuItem value={20}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        20
                      </span>
                    </MenuItem>

                    <MenuItem value={30}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        30
                      </span>
                    </MenuItem>

                    <MenuItem value={40}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        40
                      </span>
                    </MenuItem>

                    <MenuItem value={50}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        50
                      </span>
                    </MenuItem>

                    <MenuItem value={60}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        60
                      </span>
                    </MenuItem>

                    <MenuItem value={70}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        70
                      </span>
                    </MenuItem>

                    <MenuItem value={80}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        80
                      </span>
                    </MenuItem>

                    <MenuItem value={90}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        90
                      </span>
                    </MenuItem>

                    <MenuItem value={100}>
                      <span className="font-bebas tracking-wider text-[16px]">
                        100
                      </span>
                    </MenuItem>
                  </Select>
                </div>

                <div className="pt-5 ">
                  <InputLabel id="demo-simple-select-autowidth-label">
                    <span className="font-bebas text-sm tracking-wider">
                      For Shipping
                    </span>
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
                    variant="standard"
                  >
                    <MenuItem value="0">
                      <span className="font-bebas tracking-wider font-[16px]">
                        Yes
                      </span>
                    </MenuItem>
                    <MenuItem value="1">
                      <span className="font-bebas tracking-wider font-[16px]">
                        No
                      </span>
                    </MenuItem>
                  </Select>
                </div>

                <div>
                  {photo ? null : (
                    <>
                      <InputLabel>
                        <span className="font-bebas text-sm tracking-wider">
                          Upload image
                        </span>
                      </InputLabel>
                      <div className="p-10 border-2 border-dashed hover:cursor-pointer hover:border-sky-400 font-bebas text-center">
                        <label className="hover:cursor-pointer">
                          <img src={upload} alt="" className="w-16 mx-auto" />
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                          <p className="tracking-wider font-bold">
                            No files chosen yet, Click here to upload file
                          </p>
                        </label>
                      </div>
                    </>
                  )}

                  {photo && (
                    <>
                      <div className="text-center font-bebas opacity-20">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product photo"
                          className="w-32 mx-auto"
                        ></img>
                      </div>
                      <p className="font-bebas text-center">{photo.name}</p>

                      <label className="font-bebas font-bold tracking-widest hover:cursor-pointer hover:underline hover:text-sky-400 text-sm flex justify-center">
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                        <p className="flex items-center gap-1">
                          Change Image here
                          <FcEditImage />
                        </p>
                      </label>
                    </>
                  )}
                </div>

                {photo ? (
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      fullWidth
                      startIcon={<FaRegSave />}
                    >
                      <span className="font-bebas tracking-widest text-xl font-bold">
                        save
                      </span>
                    </Button>
                  </div>
                ) : null}
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
