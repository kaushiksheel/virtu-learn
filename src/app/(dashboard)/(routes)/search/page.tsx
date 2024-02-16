import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchBox from "@/components/search-box";
import { getCourses } from "@/action/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Courses from "@/components/courses";

type SearchPageProps = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

const Searchpage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchBox />
      </div>
      <div className="p-6 space-y-5">
        <Categories items={categories} />
        <Courses items={courses} />
      </div>
    </>
  );
};

export default Searchpage;
