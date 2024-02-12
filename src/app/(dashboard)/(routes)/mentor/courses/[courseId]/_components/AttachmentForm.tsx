"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${initialData.id}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${initialData.id}/attachments/${id}`);
      toast.success("attachment deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-slate-500 text-sm mt-2">
              No attachements found{" "}
            </p>
          )}

          {initialData?.attachments?.length > 0 && (
            <div className="space-y-2">
              {initialData?.attachments?.map(({ id, name }) => (
                <div
                  key={id}
                  className="flex items-center gap-1 p-3 w-full bg-slate-100 border-slate-300 border text-slate-500 rounded-md "
                >
                  <File size={20} />
                  <span className="line-clamp-1 text-xs">{name}</span>
                  <div className="ml-auto">
                    {deletingId === id && (
                      <Loader2
                        size={20}
                        className="animate-spin duration-200"
                      />
                    )}
                  </div>
                  <Button
                    onClick={() => onDelete(id)}
                    variant="ghost"
                    className="ml-auto text-slate-500 hover:text-red-800 transition-all"
                  >
                    {deletingId !== id && <X size={20} />}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Provide any supplementary materials or resources required for
            students to excel in the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
