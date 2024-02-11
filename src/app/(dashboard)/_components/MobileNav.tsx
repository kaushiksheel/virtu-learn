import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all ease-linear duration-100">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 ">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
