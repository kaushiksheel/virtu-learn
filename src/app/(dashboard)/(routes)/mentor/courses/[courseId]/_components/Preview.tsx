"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type PreviewProps = {
  value: string;
};

function Preview({ value }: PreviewProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="">
      <ReactQuill value={value} theme="bubble" readOnly />
    </div>
  );
}

export default Preview;
