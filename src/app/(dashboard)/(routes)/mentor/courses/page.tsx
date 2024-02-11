import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

function CoursesPage() {
  return (
    <div className="p-6">
      <Link href="/mentor/create" className="">
        <Button variant="outline" className="flex items-center gap-2">
          <Plus />
          Add Course
        </Button>
      </Link>
    </div>
  );
}

export default CoursesPage;
