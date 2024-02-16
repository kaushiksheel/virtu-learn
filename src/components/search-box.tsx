"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

function SearchBox() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedQuery,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [currentCategoryId, debouncedQuery, pathname, router]);

  return (
    <div className="relative">
      <Search
        size={24}
        className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        className="pl-10 md:w-[300px]"
      />
    </div>
  );
}

export default SearchBox;
