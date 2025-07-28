"use client";
import { useState } from "react";
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

interface EditEducationFormProps {
  education: {
    id: string;
    course?: string;
    school: string;
    year: string;
    category: "Elementary" | "High School" | "College" | "Graduate Studies";
  };
  onSuccess?: () => void;
  onSubmitAction: (data: {
    id: string;
    course?: string;
    school: string;
    year: string;
    category: "Elementary" | "High School" | "College" | "Graduate Studies";
  }) => void;
  onCancelAction: () => void;
}

export default function EditEducationForm({
  education,
  onSuccess,
  onSubmitAction,
  onCancelAction,
}: EditEducationFormProps) {
  const formSchema = z.object({
    course: z
      .string()
      .min(2, { message: "Course is required" })
      .max(50)
      .optional(),
    school: z.string().min(2, { message: "School is required" }).max(50),
    year: z
      .string()
      .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: education.course ?? "",
      school: education.school,
      year: education.year,
    },
  });

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const getSchoolPlaceholder = () => {
    switch (education.category) {
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
    switch (education.category) {
      case "College":
        return "Enter course/degree";
      case "Graduate Studies":
        return "Enter degree (e.g. Master of Arts)";
      default:
        return "Enter course or field";
    }
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedData = {
      id: education.id,
      category: education.category,
      school: values.school,
      year: values.year,
      ...(education.category === "College" ||
      education.category === "Graduate Studies"
        ? { course: values.course }
        : {}),
    };

    onSubmitAction(updatedData);
    toast("Updated", {
      description: "Education record updated successfully",
      icon: <CheckCircle className="text-green-600" />,
    });
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-1 mb-4"
      >
        {(education.category === "College" ||
          education.category === "Graduate Studies") && (
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37] text-sm font-medium">
                  Course/Degree
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
              <FormLabel className="text-[#6f4e37] text-sm font-medium">
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
                <SelectContent className="max-h-60 overflow-y-auto">
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

        <div className="flex flex-col gap-2.5">
          <Button
            className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
            type="submit"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={onCancelAction}
            className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
