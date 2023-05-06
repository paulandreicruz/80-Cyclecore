import { Paper } from "@mui/material";
import React from "react";
import { BiStats } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import { RiHandHeartLine } from "react-icons/ri";
import { LatestOrders } from "../../components/dashboard/LatestOrders";
import { TopSelling } from "../../components/dashboard/TopSelling";
import { AdminCharts } from "../../components/dashboard/AdminCharts";
import { Widgets } from "../../components/dashboard/Widgets";

function AdminDashboard() {
  return (
    <>
      <div className="bg-gray-200 h-full font-bebas px-10 py-5 space-y-5">
        <div className="space-y-10">
          <Widgets />

          <div className="flex gap-10">
            <div className="flex-1">
              <AdminCharts />
            </div>

            <div>
              <TopSelling />
            </div>
          </div>

          <div>
            <LatestOrders />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
