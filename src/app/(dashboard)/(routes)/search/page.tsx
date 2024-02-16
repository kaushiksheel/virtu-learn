import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchBox from "@/components/search-box";

const Searchpage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchBox />
      </div>
      <div className="p-6">
        <Categories items={categories} />
      </div>
    </>
  );
};

export default Searchpage;
