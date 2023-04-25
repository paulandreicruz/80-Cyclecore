import { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, Radio, Pagination } from "antd";

import { prices } from "../../prices";
import CustomShopCard from "../../components/cards/CustomShopCard";

export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [checked, setChecked] = useState([]); //categories,brands,subcateg
  const [radio, setRadio] = useState([]); //radio,price
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(/list-products/${page});
  //     setProducts([...products, ...data]);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const handleCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handleSubCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((s) => s !== id);
    }
    setChecked(all);
  };

  const handleBrandCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((b) => b !== id);
    }
    setChecked(all);
  };

  return (
    <>
      {/* <div className="md:flex">
            <div className="mb-20 md:mb-0 md:block flex">
                
            </div>
          <div className="md:flex-1 mx-auto justify-center items-center">
            {products?.map((p) => (
              <div className="items-center justify-center" key={p._id}>
                <CustomShopCard p={p} />
              </div>
            ))}
          </div>
        </div> */}

      <div className="grid grid-cols-1 md:flex p-20 md:pt-24 font-bebas bg-gray-200">
        <div>
          <h1 className=" mx-auto mb-10 font-bold tracking-wider">
            Filter by Categories
          </h1>
          {categories?.map((c) => (
            <div key={c._id}>
              <Checkbox onChange={(e) => handleCheck(e.target.checked, c._id)}>
                <span className="font-bebas tracking-wider">{c.name}</span>
              </Checkbox>
            </div>
          ))}
          <h1 className=" mx-auto mb-10 pt-10 font-bold tracking-wider">
            Filter by Sub-Categories
          </h1>
          {subcategories?.map((s) => (
            <div key={s._id}>
              <Checkbox
                onChange={(e) => handleSubCheck(e.target.checked, s._id)}
              >
                <span className="font-bebas tracking-wider">{s.name}</span>
              </Checkbox>
            </div>
          ))}
          <h1 className=" mx-auto mb-10 pt-10 font-bold tracking-wider">
            Filter by Brands
          </h1>
          {brands?.map((b) => (
            <div key={b._id}>
              <Checkbox
                onChange={(e) => handleBrandCheck(e.target.checked, b._id)}
              >
                <span className="font-bebas tracking-wider">{b.name}</span>
              </Checkbox>
            </div>
          ))}
          <h1 className=" mx-auto mb-10 pt-10 font-bold tracking-wider">
            Filter by Price
          </h1>
          <div>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((p) => (
                <div key={p._id} style={{ marginLeft: "8px" }}>
                  <Radio value={p.array}>
                    <span className="font-bebas tracking-wider">{p.name}</span>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-7">
            <button onClick={() => window.location.reload()}>Reset</button>
          </div>
        </div>
        <div className="flex-1 ">
          {products?.map((p) => (
            <div key={p._id}>
              <CustomShopCard p={p} />
            </div>
          ))}
        </div>
      </div>
      {/* <div>
        {products && products.length < total && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading.." : "Load More"}
          </button>
        )}
      </div> */}
      <div className="flex justify-center pb-12 bg-gray-200">
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={totalProducts}
          onChange={handlePageChange}
        ></Pagination>
      </div>
    </>
  );
}
