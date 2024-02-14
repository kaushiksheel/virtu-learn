"use client";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function Editor({ value, onChange }: EditorProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div className="">
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
}

export default Editor;
