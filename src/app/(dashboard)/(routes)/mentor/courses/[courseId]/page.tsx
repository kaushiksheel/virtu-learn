import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import TitleForm from "./_components/TitleForm";
import DescForm from "./_components/DescForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import { File } from "lucide-react";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/banner";
import CourseActions from "./_components/CourseActions";

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
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
    course.chapters.some(({ isPublished }) => isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && <Banner label="Your course is not published" />}
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-500">
              Complete all fields ({completionText})
            </span>
          </div>
          <CourseActions
            disabled={!isComplete}
            courseId={course.id}
            isPublished={course.isPublished}
          />
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
          <div className="space-y-5">
            <div>
              <h3 className="text-xl">Chapters</h3>
            </div>
            <div className="">
              <ChaptersForm initialData={course} />
            </div>
            <div className="flex items-center gap-x-2">
              <h3 className="text-xl">Sell your course</h3>
            </div>
            <PriceForm initialData={course} />

            <div className="">
              <div className="flex items-center gap-x-3">
                <File />
                <h3 className="text-xl">Attachements</h3>
              </div>
              <AttachmentForm initialData={course} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificCoursePage;
