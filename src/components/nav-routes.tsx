import { UserButton } from "@clerk/nextjs";
import React from "react";

function NavRoutes() {
  return (
    <div className="flex items-center gap-x-3 ml-auto">
      <UserButton />
    </div>
  );
}

export default NavRoutes;
