import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import AdminDashboardSideBar from "../../components/admin/AdminSideBar";
import TransactionChart from "../../components/forms/TransactionChart";
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

import { Cell, Pie, PieChart } from "recharts";

import {
  FcBriefcase,
  FcMoneyTransfer,
  FcCustomerSupport,
  FcApproval,
} from "react-icons/fc";

const data = [
  { name: "January", Income: 4000, Expense: 2400, amt: 2400 },
  { name: "February", Income: 3000, Expense: 1398, amt: 2210 },
  { name: "March", Income: 2000, Expense: 9800, amt: 2290 },
  { name: "April", Income: 2780, Expense: 3908, amt: 2000 },
  { name: "May", Income: 1890, Expense: 4800, amt: 2181 },
  { name: "June", Income: 2390, Expense: 3800, amt: 2500 },
  { name: "July", Income: 3490, Expense: 4300, amt: 2100 },
];

const data2 = [
  {
    name: "SHIMANO",
    value: 540,
  },
  {
    name: "GIANT",
    value: 620,
  },
  {
    name: "SPECIALIZED",
    value: 210,
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function AdminDashboard() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="">
        <div className="flex gap-4 w-full">
          <BoxWrapper>
            {/* left-side */}
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-200">
              <FcBriefcase className="text-2xl text-white" />
            </div>
            {/* right-side */}
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Total Sales
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  ₱ 3000.00
                </strong>
                <span className="text-sm text-green-500 pl-2">+243</span>
              </div>
            </div>
          </BoxWrapper>

          <BoxWrapper>
            {/* left-side */}
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-200">
              <FcMoneyTransfer className="text-2xl text-white" />
            </div>
            {/* right-side */}
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Total Expenses
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  ₱ 3000.00
                </strong>
                <span className="text-sm text-green-500 pl-2">+243</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            {/* left-side */}
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-200">
              <FcCustomerSupport className="text-2xl text-white" />
            </div>
            {/* right-side */}
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Total Customers
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  ₱ 3000.00
                </strong>
                <span className="text-sm text-green-500 pl-2">+243</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            {/* left-side */}
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-200">
              <FcApproval className="text-2xl text-white" />
            </div>
            {/* right-side */}
            <div className="pl-4">
              <span className="text-sm text-gray-500 font-light">
                Total Orders
              </span>
              <div className="flex items-center">
                <strong className="text-xl text-gray-700 font-semibold">
                  ₱ 3000.00
                </strong>
                <span className="text-sm text-green-500 pl-2">+243</span>
              </div>
            </div>
          </BoxWrapper>
        </div>

        <div className="flex">
          <div className="flex-1">
            <div className="w-full h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
              <strong className="text-gray-700 font-medium">
                Transactions
              </strong>
              <div className="w-full mt-3 flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
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
          </div>

          <div className="">
            <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col font-bold">
              <strong className="text-gray-700 font-medium">
                Buyer Profile
              </strong>
              <div className=" mt-3 flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={400} height={400}>
                    <Pie
                      data={data2}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Table Recent Orders */}
        <div>
          <strong>Recent Orders</strong>
          {orders?.map((o, i) => {
            return (
              <div
                key={o._id}
                className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1"
              >
                <div className="mt-3">
                  <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Order Date</th>
                        <th className="px-4 py-2">Order Total</th>
                        <th className="px-4 py-2">Shipping Address</th>
                        <th className="px-4 py-2">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">
                          <Link to="/">#{i + 1}</Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link to="/">
                            {o?.buyer?.lastname},{o?.buyer?.firstname}
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link to="/">
                            {moment(o.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss"
                            )}
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link to="/">
                            {/* {(o?.totalAmount ?? 0).toFixed(2)} */}3
                          </Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link to="/">{o?.buyer?.address}</Link>
                        </td>
                        <td className="px-4 py-2">
                          <Link to="/">{o?.status}</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
