"use client";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type CategoryFormProps = {
  initialData: Course;
  options: { label: string; value: string }[];
};
const formSchema = z.object({
  categoryId: z.string(),
});

export default function CategoryForm({
  initialData,
  options,
}: CategoryFormProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { categoryId: initialData?.categoryId || "" },
  });

  const { isValid, isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${initialData.id}`, values);
      toast.success("Course updated");
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const selectedOption = options.find(
    ({ value }) => value == initialData.categoryId
  );

  console.log(selectedOption);
  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={() => setIsEditing(!isEditing)} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil size={17} className="mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2">{selectedOption?.label || "no category"}</p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboBox options={options} {...field} />
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
