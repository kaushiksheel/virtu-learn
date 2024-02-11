"use client";
import { Layout, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const routes = [
  {
    id: 1,
    icon: Layout,
    name: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icon: Search,
    name: "Search",
    href: "/search",
  },
  {
    id: 3,
    icon: Layout,
    name: "Instructors",
    href: "/instructors",
  },
  {
    id: 4,
    icon: Layout,
    name: "Students",
    href: "/students",
  },
  {
    id: 5,
    icon: Layout,
    name: "Settings",
    href: "/settings",
  },
];

function SidebarRoutes() {
  const pathname = usePathname();
  const isMatch = (href: string) => pathname === href;
  return (
    <div className="flex flex-col w-full">
      {routes.map(({ href, icon: Icon, id, name }) => (
        <Link
          key={id}
          href={href}
          className={`flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-slate-600 hover:bg-slate-300/20 ${
            isMatch(href)
              ? "bg-primary text-white hover:bg-primary hover:text-white"
              : ""
          } p-3 `}
        >
          <Icon size={20} />
          {name}
        </Link>
      ))}
    </div>
  );
}

export default SidebarRoutes;
