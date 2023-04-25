import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardSideBar from "./AdminSideBar";

const AdminLayout = () => {
  return (
    <div className="flex flex-row bg-neutral-100 w-screen h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <AdminDashboardSideBar />
      </div>
      <div className="flex-1 overflow-y-scroll">
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
