"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle } from "lucide-react";

interface AddEducationFormProps {
  category?: "Elementary" | "High School" | "College" | "Graduate Studies";
  onSuccess?: () => void;
  onSubmitAction: (data: {
    course?: string;
    school: string;
    year: string;
    category: string;
  }) => void;
}

export default function AddEducationForm({
  category,
  onSuccess,
  onSubmitAction,
}: AddEducationFormProps) {
  const formSchema = z.object({
    course: z
      .string()
      .min(2, { message: "Course is required" })
      .max(50)
      .optional(),
    school: z.string().min(2, { message: "School is required" }).max(50),
    year: z
      .string()
      .min(4, { message: "Year is required" })
      .max(4, { message: "Year must be 4 digits" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course:
        category === "College" || category === "Graduate Studies"
          ? ""
          : undefined,
      school: "",
      year: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const submitData: Parameters<typeof onSubmitAction>[0] = {
      school: values.school,
      year: values.year,
      category: category || "General",
    };
    if (category === "College" || category === "Graduate Studies") {
      submitData.course = values.course;
    }

    onSubmitAction(submitData);
    toast("Success", {
      description: "Education record saved successfully",
      icon: <CheckCircle className="text-green-600" />,
    });
    form.reset();
    if (onSuccess) onSuccess();
  };

 const getSchoolPlaceholder = () => {
  switch (category) {
    case "Elementary":
      return "Enter elementary school name";
    case "High School":
      return "Enter high school name";
    case "College":
      return "Enter college/university name";
    case "Graduate Studies":
      return "Enter graduate school name";
    default:
      return "Enter school name";
  }
};

const getCoursePlaceholder = () => {
  switch (category) {
    case "College":
      return "Enter course/degree";
    case "Graduate Studies":
      return "Enter degree (e.g. Master of Science)";
    default:
      return "Enter course or field";
  }
};


  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {(category === "College" || category === "Graduate Studies") && (
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#6f4e37] block text-sm font-medium">
                    {category === "Graduate Studies"
                      ? "Course/Degree"
                      : "Course/Degree"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={getCoursePlaceholder()}
                      className="bg-[#F7F4F0] border border-gray-300 w-full p-2 rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37] block text-sm font-medium">
                  School
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={getSchoolPlaceholder()}
                    className="bg-[#F7F4F0] border border-gray-300 w-full p-2 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs" />
              </FormItem>
            )}
          />

          {/* Year Graduated  */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37] text-sm font-medium">
                  Year Graduated
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="bg-[#F7F4F0] border border-gray-300 rounded-lg text-sm py-3 px-4 w-full">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className="max-h-60 overflow-y-auto"
                    side="bottom"
                    align="start"
                  >
                    {Array.from(
                      { length: new Date().getFullYear() - 1950 + 1 },
                      (_, i) => {
                        const year = (new Date().getFullYear() - i).toString();
                        return (
                          <SelectItem
                            key={year}
                            value={year}
                            className="text-sm py-2 px-3 cursor-pointer"
                          >
                            {year}
                          </SelectItem>
                        );
                      }
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-[#6F4E37] text-white hover:bg-[#A67B5B] w-full py-2 rounded-lg"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
