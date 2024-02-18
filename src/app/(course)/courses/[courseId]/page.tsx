import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
  return (
    <div>
      <p>Hello world</p>
    </div>
  );
}

export default CourseDetailPage;
