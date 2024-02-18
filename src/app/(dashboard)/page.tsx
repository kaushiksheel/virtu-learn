import { getDashboardCourses } from "@/action/get-dashboard-courses";
import { CoursesList } from "@/components/CoursesList";
import { InfoCard } from "@/components/info-card";

import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
