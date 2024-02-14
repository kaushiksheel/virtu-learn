"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type ChapterTitleForm = {
  initialData: {
    title: string;
    id: string;
  };
  courseId: string;
};
const formSchema = z.object({
  title: z.string().min(1),
});

export default function ChapterTitleForm({
  initialData,
  courseId,
}: ChapterTitleForm) {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${initialData.id}`,
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
        Chapter Title
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={17} className="mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="eg. Introduction"
                      {...field}
                    />
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
