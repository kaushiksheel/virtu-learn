import Image from "next/image";
import React from "react";
import SidebarRoutes from "./SidebarRoutes";

function Sidebar() {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto  shadow-sm">
      <div className="p-6">
        <Image
          src="/logo.svg"
          width={30}
          height={30}
          alt="virtu-learn logo"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
}
export default Sidebar;
