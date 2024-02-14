"use client";
import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";

import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

type ChapterAccessForm = {
  chapter: Chapter;
  courseId: string;
};
const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export default function ChapterAccessForm({
  chapter,
  courseId,
}: ChapterAccessForm) {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isFree: !!chapter?.isFree },
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
        Access Settings
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={17} className="mr-2" />
              Edit access
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2">
          {chapter.isFree ? (
            <>This chapter is free for preview</>
          ) : (
            <>This is chapter is not free</>
          )}
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
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex items-center  space-x-3 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>

                  <FormDescription>
                    check this box if you want to make this chapter free for
                    review
                  </FormDescription>
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
