"use client";

import { Category } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import qs from "query-string";

import {
  FcCustomerSupport,
  FcMultipleDevices,
  FcReading,
  FcSettings,
  FcSportsMode,
  FcVideoCall,
  FcVoicePresentation,
  FcWebcam,
  FcAcceptDatabase,
  FcAdvertising,
  FcAndroidOs,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";

type CategoriesProps = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcCustomerSupport,
  "Algorithms & Data Structures": FcMultipleDevices,
  "Artificial Intelligence": FcReading,
  Databases: FcAcceptDatabase,
  Networking: FcVoicePresentation,
  Cybersecurity: FcWebcam,
  "Software Engineering": FcSettings,
  "Operating Systems": FcSportsMode,
  "Machine Learning": FcVideoCall,
  "Web Development": FcAdvertising,
  "Computer Graphics": FcAndroidOs,
};

function Categories({ items }: CategoriesProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCateogryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = (value: string) => currentCateogryId === value;

  const onCategoryClick = (categoryId: string, value: string) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected(categoryId) ? null : categoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((category) => {
        const Icon = iconMap[category.name];
        return (
          <button
            onClick={() => onCategoryClick(category.id, category.name)}
            key={category.id}
            className={`flex items-center gap-x-1 px-2 py-1  border rounded-full  ${
              isSelected(category.id) && "bg-primary/25 "
            }  `}
          >
            <Icon size={20} />
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Categories;
