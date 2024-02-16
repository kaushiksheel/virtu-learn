import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./course-card";

type CourseWithProgressAndCateogy = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type CoursesProps = {
  items: CourseWithProgressAndCateogy[];
};

function Courses({ items }: CoursesProps) {
  return (
    <div className="">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map(
          ({ id, title, imageUrl, chapters, price, progress, category }) => (
            <CourseCard
              key={id}
              id={id}
              title={title}
              imageUrl={imageUrl}
              chaptersLength={chapters.length}
              price={price}
              progress={progress}
              category={category}
            />
          )
        )}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  );
}

export default Courses;
