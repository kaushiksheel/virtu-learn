"use client";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";

import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Preview from "../../../_components/Preview";

type ChapterDescProps = {
  chapter: Chapter;
  courseId: string;
};
const formSchema = z.object({
  description: z.string().min(1),
});

export default function ChapterDescForm({
  chapter,
  courseId,
}: ChapterDescProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: chapter?.description || "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapter.id}`,
        values
      );
      toast.success("Chapter updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Description
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={17} className="mr-2" />
              Edit Description
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2">
          {!chapter.description && "No Description"}

          {chapter.description && <Preview value={chapter.description} />}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
