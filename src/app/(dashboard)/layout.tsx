import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <div className="w-full  md:pl-56 fixed inset-y-0 h-14  ">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-10">
        <Sidebar />
      </div>
      <main className="md:pl-56 h-full mt-14">{children}</main>
    </div>
  );
}

export default DashboardLayout;
