import { Menu } from "lucide-react";
import MobileNav from "./MobileNav";
import NavRoutes from "@/components/nav-routes";

const Navbar = () => {
  return (
    <div className="w-full h-full border-b flex items-center  px-5">
      <MobileNav />
      <NavRoutes />
    </div>
  );
};

export default Navbar;
