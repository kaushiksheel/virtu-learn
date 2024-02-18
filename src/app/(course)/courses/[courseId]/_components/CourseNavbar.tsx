import NavRoutes from "@/components/nav-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import CourseMobileSidebar from "./CourseMobileSidebar";

type CourseNavbarProps = {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

function CourseNavbar({ course, progressCount }: CourseNavbarProps) {
  return (
    <div className="p-4 border-b h-full flex items-center  shadow-sm">
      {/* TODO: FIX TYPE */}
      <CourseMobileSidebar
        course={course as any}
        progressCount={progressCount}
      />
      <NavRoutes />
    </div>
  );
}

export default CourseNavbar;
