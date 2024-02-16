"use client";
import ConfirmModal from "@/components/modals/confim-modal";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/useConfetti";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type CourseActionsProps = {
  disabled: boolean;
  courseId: string;

  isPublished: boolean;
};

function CourseActions({
  disabled,
  courseId,

  isPublished,
}: CourseActionsProps) {
  const router = useRouter();
  const { setConfetti } = useConfetti();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      router.refresh();
      toast.success("Course deleted successfully.");
      router.push("/mentor/courses");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished successfully.");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published successfully.");
        setConfetti(true);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={handlePublish}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={handleDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash size={18} />
        </Button>
      </ConfirmModal>
    </div>
  );
}

export default CourseActions;
