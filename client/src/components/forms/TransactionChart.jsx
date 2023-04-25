import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "January", Income: 4000, Expense: 2400, amt: 2400 },
  { name: "February", Income: 3000, Expense: 1398, amt: 2210 },
  { name: "March", Income: 2000, Expense: 9800, amt: 2290 },
  { name: "April", Income: 2780, Expense: 3908, amt: 2000 },
  { name: "May", Income: 1890, Expense: 4800, amt: 2181 },
  { name: "June", Income: 2390, Expense: 3800, amt: 2500 },
  { name: "July", Income: 3490, Expense: 4300, amt: 2100 },
];

const TransactionChart = () => {
  return (
    <>
        <div className='flex gap-4 w-full'>
      <BoxWrapper>
        
        {/* left-side */}
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-200'>
            <FcBriefcase className='text-2xl text-white'/>
        </div>
        {/* right-side */}
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Sales</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>₱ 3000.00</strong>
            <span className='text-sm text-green-500 pl-2'>+243</span>
          </div>
        </div>
        
      </BoxWrapper>

      <BoxWrapper>
         
        {/* left-side */}
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-200'>
            <FcMoneyTransfer className='text-2xl text-white'/>
        </div>
        {/* right-side */}
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Expenses</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>₱ 3000.00</strong>
            <span className='text-sm text-green-500 pl-2'>+243</span>
          </div>
        </div>
        
      </BoxWrapper>
      <BoxWrapper>
         
        {/* left-side */}
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-200'>
            <FcCustomerSupport className='text-2xl text-white'/>
        </div>
        {/* right-side */}
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Customers</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>₱ 3000.00</strong>
            <span className='text-sm text-green-500 pl-2'>+243</span>
          </div>
        </div>
        
      </BoxWrapper>
      <BoxWrapper>
         
        {/* left-side */}
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-200'>
            <FcApproval className='text-2xl text-white'/>
        </div>
        {/* right-side */}
        <div className='pl-4'>
          <span className='text-sm text-gray-500 font-light'>Total Orders</span>
          <div className='flex items-center'>
            <strong className='text-xl text-gray-700 font-semibold'>₱ 3000.00</strong>
            <span className='text-sm text-green-500 pl-2'>+243</span>
          </div>
        </div>
        
      </BoxWrapper>
    </div>
    
    <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#8884d8" />
            <Bar dataKey="Expense" fill="#82ca9d" />
            <Bar dataKey="amt" fill="#882" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
    
  );
};

export default TransactionChart;

function BoxWrapper ({ children }) {
    return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>
  }