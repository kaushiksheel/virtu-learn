"use client";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CourseCardProps = {
  id: string;
  title: string;
  imageUrl: string | null;
  chaptersLength: number;
  price: number | null;
  progress: number | null;
  category: {
    id: string;
    name: string;
  } | null;
};

function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition-all overflow-hidden rounded-md p-3 h-full border">
        <div className="relative w-full aspect-video overflow-hidden rounded-md">
          <Image
            src={imageUrl!}
            alt={title}
            fill
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-semibold group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category?.name}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
              <span>&middot;</span>
            </div>
          </div>
          {progress !== null ? (
            <div className="flex items-center gap-x-2">
              <div className="flex items-center gap-x-1">
                <span className="text-sm text-slate-500">Progress:</span>
                <span className="text-sm text-slate-500">
                  {progress}% Complete
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <span className="text-sm text-slate-500">Last:</span>
                <span className="text-sm text-slate-500">Chapter 2</span>
              </div>
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700 font-medium">
              {formatPrice(price as number)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
