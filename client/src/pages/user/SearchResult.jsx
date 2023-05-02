import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/Search";
import CustomShopCard from "../../components/cards/CustomShopCard";

export default function SearchResult() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [checked, setChecked] = useState([]); //categories,brands,subcateg
  const [radio, setRadio] = useState([]); //radio,price
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useSearch();

  ///
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  useEffect(() => {
    const fetchProductsCount = async () => {
      const response = await axios.get("/products-count");
      setTotalProducts(response.data);
    };

    const fetchProducts = async () => {
      const response = await axios.get(`/list-products/${currentPage}`, {
        params: {
          perPage: productsPerPage,
        },
      });
      setProducts(response.data);
    };

    fetchProductsCount();
    fetchProducts();
  }, [currentPage, productsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) loadSubCategories();
  }, [checked, radio]);

  useEffect(() => {
    loadBrands();
  }, []);

  // useEffect(() => {
  //   getTotal();
  // }, []);

  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);

  // const getTotal = async () => {
  //   try {
  //     const { data } = await axios.get("/products-count");
  //     setTotal(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBrands = async () => {
    try {
      const { data } = await axios.get("/brands");
      setBrands(data);
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
      setSubCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

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

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-16">
        <span className=" font-bebas text-3xl">Search Result </span>
      </div>
      <div className="flex justify-center">
        <div className="text-center mt-3">
          <span className="font-bebas text-center">
            {values?.results?.length < 1
              ? "No products found"
              : `Found ${values?.results?.length} Products`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:flex m-20 md:mt-24 ">
        <div className="flex-1 ">
          {values?.results?.map((p) => (
            <div key={p._id}>
              <CustomShopCard p={p} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
