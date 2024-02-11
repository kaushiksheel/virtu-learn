"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

function NavRoutes() {
  const pathname = usePathname();

  const isMentorPage = pathname.startsWith("/mentor");
  const isPlayerPage = pathname.startsWith("/chapter");
  return (
    <div className="flex items-center gap-x-3 ml-auto">
      {isMentorPage || isPlayerPage ? (
        <Link href="/">
          <Button className="flex items-center gap-x-2 py-1">
            <LogOut size={20} />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/mentor/courses" className="">
          <Button variant="outline">Mentor Mode</Button>
        </Link>
      )}
      <ModeToggle />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default NavRoutes;
