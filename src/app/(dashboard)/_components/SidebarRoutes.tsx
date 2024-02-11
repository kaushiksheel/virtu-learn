"use client";
import { BarChart, Layout, List, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const publicRoutes = [
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

const mentorRoutes = [
  {
    id: 1,
    icon: List,
    name: "Courses",
    href: "/mentor/courses",
  },
  {
    id: 2,
    icon: BarChart,
    name: "Analytics",
    href: "/mentor/analytics",
  },
];

function SidebarRoutes() {
  const pathname = usePathname();
  const isMatch = (href: string) => pathname === href;
  const isMentorPage = pathname.includes("/mentor");

  const routes = isMentorPage ? mentorRoutes : publicRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map(({ href, icon: Icon, id, name }) => (
        <Link
          key={id}
          href={href}
          className={`flex items-center gap-3 text-sm font-medium   hover:bg-slate-300/20 ${
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
