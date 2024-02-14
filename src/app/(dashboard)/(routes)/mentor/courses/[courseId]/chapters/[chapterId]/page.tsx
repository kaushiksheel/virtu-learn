import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescForm from "./_components/ChapterDescForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";

async function ChapterIdPage({
  params: { courseId, chapterId },
}: {
  params: { courseId: string; chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      courseId,
    },
    include: {
      muxData: true,
    },
  });

  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/mentor/courses/${courseId}`}
            className="flex items-center text-sm hover:opacity-75 gap-x-2 transition-all mb-6"
          >
            <ArrowLeft size={20} />
            Go Back
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-3xl font-medium">Chapter Creation</h2>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="space-y-4">
          <h2 className="text-xl">Edit your chapter</h2>
          <div className="">
            <ChapterTitleForm courseId={courseId} initialData={chapter} />
            <ChapterDescForm courseId={courseId} chapter={chapter} />
          </div>
          <div className="flex flex-col gap-y-2 mt-4">
            <h2 className="text-xl">Access Settings</h2>
            <ChapterAccessForm chapter={chapter} courseId={courseId} />
          </div>
        </div>
        <div className="flex flex-col  gap-3">
          <h2 className="text-xl ">Add a video</h2>

          <ChapterVideoForm initialData={chapter} courseId={courseId} />
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;
