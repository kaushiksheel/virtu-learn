import { getChapter } from "@/action/get-chapter";
import Banner from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/VideoPlayer";
import CourseEnrollButton from "./_components/CourseEnrollButton";
import { Separator } from "@/components/ui/separator";
import Preview from "@/app/(dashboard)/(routes)/mentor/courses/[courseId]/_components/Preview";
import Link from "next/link";
import { File } from "lucide-react";
import { CourseProgressButton } from "./_components/CourseProgressButton";

const ChapterInfoPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  console.log(muxData?.playbackId);
  return (
    <div className="">
      {userProgress?.isCompleted && (
        <Banner label="Already completed" variant="success" />
      )}
      {isLocked && (
        <Banner label="You need to purchase this chapter" variant="warning" />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="">
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
            {purchase ? (
              <div className="">
                <CourseProgressButton
                  chapterId={params.chapterId}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  isCompleted={!!userProgress?.isCompleted}
                />
              </div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div className="">
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <Link
                    href={attachment.url}
                    key={attachment.id}
                    target="_blank"
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 hover:underline transition line-clamp-1 "
                  >
                    <File />
                    <p>{attachment.name}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterInfoPage;
