import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";
import DescForm from "./_components/DescForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";

async function SpecificCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-5">
      <div className="">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-500">
            Complete all fields ({completionText})
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div>
          <div className="flex items-center  gap-x-2">
            <h3 className="text-xl ">Customize your course</h3>
          </div>
          <TitleForm initialData={course} />
          <DescForm initialData={course} />
          <ImageForm initialData={course} />
          <CategoryForm
            initialData={course}
            options={categories.map(({ id, name }) => ({
              label: name,
              value: id,
            }))}
          />
        </div>
      </div>
    </div>
  );
}

export default SpecificCoursePage;
