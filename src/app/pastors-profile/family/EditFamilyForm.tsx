"use client";
import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FamilyMember } from "./FamilyData";

interface EditFamilyFormProps {
  open: boolean;
  member: FamilyMember;
  onSaveAction: (member: FamilyMember) => void;
  onCancelAction: () => void;
}

const formSchema = z.object({
  id: z.number().optional(), // Add id property
  name: z.string().min(1, { message: "Full Name is required." }),
  relationship: z.string().min(1, { message: "Relationship is required." }),
  education: z.string().min(1, { message: "Education is required." }),
  occupation: z.string().min(1, { message: "Occupation is required." }),
  birthDate: z.string().min(1, { message: "Birth date is required." }),
  otherRelationship: z
    .string()
    .min(1, { message: "Other relationship is required." }),
});

export default function EditFamilyForm({
  open,
  member,
  onSaveAction,
  onCancelAction,
}: EditFamilyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0, // Default id value
      name: "",
      relationship: "",
      education: "",
      occupation: "",
      birthDate: "",
      otherRelationship: "",
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.getValues("name") &&
      form.getValues("relationship") &&
      form.getValues("education") &&
      form.getValues("occupation") &&
      form.getValues("birthDate")
    ) {
      onSaveAction({ ...form.getValues(), id: form.getValues().id ?? 0 });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 px-1 mb-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter name"
                  className="bg-[#F7F4F0]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Relationship</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("otherRelationship", ""); // reset otherRelationship
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-10 bg-[#F7F4F0]">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Father",
                    "Mother",
                    "Brother",
                    "Sister",
                    "Spouse",
                    "Daughter",
                    "Son",
                    "Grandfather",
                    "Grandmother",
                    "Uncle",
                    "Aunt",
                    "Cousin",
                    "Other", // 👈 Add "Other" option
                  ].map((rel) => (
                    <SelectItem key={rel} value={rel}>
                      {rel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("relationship") === "Other" && (
          <FormField
            control={form.control}
            name="otherRelationship"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="otherRelationship"
                  className="text-[#6f4e37]"
                >
                  Specify Relationship
                </FormLabel>
                <FormControl>
                  <Input
                    id="otherRelationship"
                    placeholder="Enter other relationship"
                    className="bg-[#F7F4F0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Education</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="education"
                  placeholder="Enter education"
                  className="bg-[#F7F4F0]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Occupation</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="occupation"
                  placeholder="Enter occupation"
                  className="bg-[#F7F4F0]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="birthDate" className="text-[#6f4e37]">
                Birth Date
              </FormLabel>
              <FormControl>
                <Input
                  id="birthDate"
                  type="date"
                  className="bg-[#F7F4F0]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
