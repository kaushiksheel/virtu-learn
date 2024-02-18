import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { Menu } from "lucide-react";
import React from "react";
import CourseSidebar from "./CourseSidebar";

type CourseMobileSidebarProps = {
  course: Course & {
    chapters: Chapter & {
      userProgress: UserProgress[] | null;
    };
  };
  progressCount: number;
};

function CourseMobileSidebar({
  course,
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition-all ease-linear ">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <CourseSidebar
          // TODO: FIX TYPE
          course={course as any}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CourseMobileSidebar;
