import React from "react";

function SpecificCoursePage({ params }: { params: { courseId: string } }) {
  return (
    <div>
      <p>Course Id : {params.courseId}</p>
    </div>
  );
}

export default SpecificCoursePage;
