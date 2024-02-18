"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import axios, { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";

const CourseEnrollButton = ({
  price,
  courseId,
}: {
  price: number;
  courseId: string;
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      disabled={isLoading}
      onClick={handleClick}
      size="sm"
      className="w-full md:w-auto "
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
