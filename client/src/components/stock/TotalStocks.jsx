import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import instock from "../../assets/in-stock.png"
import new2 from "../../assets/new-product.png"


export const TotalStocks = () => {
  // context
  const [auth, setAuth] = useAuth();

  // states
  const [stocksCount, setStocksCount] = useState(0)
  const [totalNewlyAddedStocks, setTotalNewlyAddedStocks] = useState(0);
  

  useEffect(() => {
    async function fetchNewlyAddedStocks() {
      const response = await axios.get('/products/total-stocks/today');
      setTotalNewlyAddedStocks(response.data.totalNewlyAddedStocks);
    }
    fetchNewlyAddedStocks();
  }, []);
    


  // TOTAL STOCKS
  useEffect(() => {
    if (auth?.token) getStocksCount();
  }, [auth?.token]);

    const getStocksCount = async () => {
      try {
        const response = await axios.get("/totalstocks");
        setStocksCount(response.data.totalStocks);
      } catch (err) {
        console.log(err);
      }
    };
  
  
  
     

return (
  <>
        <div className='mb-5 flex gap-4'>
        <div className="bg-white flex items-center justify-between w-[50%] p-2.5 shadow-md rounded-sm">
            <div className="w-20">
            <img src={instock} alt="" />
            </div>

            <div className="mt-3 space-y-3">
            <div className="text-xs tracking-wide">Total Stocks</div>
            <div className="text-xl font-bold tracking-wide">
                {stocksCount} stocks
            </div>
            </div>
        </div>

        <div className="bg-white flex items-center justify-between w-[50%] p-2.5 shadow-md rounded-sm">
            <div className="w-20">
            <img src={new2} alt="" />
            </div>

            <div className="mt-3 space-y-3">
            <div className="text-xs tracking-wide">Total New Added Stocks Today</div>
            <div className="text-xl font-bold tracking-wide">
                {totalNewlyAddedStocks} stocks
            </div>
            </div>
        </div>

        </div>
    </>
    );
}
