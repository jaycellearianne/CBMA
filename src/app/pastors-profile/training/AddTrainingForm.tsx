"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddTrainingFormProps {
  onSaveAction: (training: Omit<TrainingFormData, "id">) => void;
  onCancelAction: () => void;
}

interface TrainingFormData {
  title: string;
  sponsoringAgency: string;
  venue: string;
  startDate: string;
  endDate: string;
}

const formSchema = z
  .object({
    title: z.string().nonempty("Title is required"),
    sponsoringAgency: z.string().nonempty("Sponsoring agency is required"),
    venue: z.string().nonempty("Venue is required"),
    startDate: z.string().nonempty("Start date is required"),
    endDate: z.string().nonempty("End date is required"),
  })
  .refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    }
  );

export default function AddTrainingForm({
  onSaveAction,
  onCancelAction,
}: AddTrainingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      sponsoringAgency: "",
      venue: "",
      startDate: "",
      endDate: "",
    },
  });

const onSubmit = (data: z.infer<typeof formSchema>) => {
  onSaveAction(data); // data is guaranteed valid by zod
};


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="title" className="text-[#6f4e37]">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="Enter training / seminar title"
                  className="bg-[#F7F4F0]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sponsoringAgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="sponsoringAgency" className="text-[#6f4e37]">
                Sponsoring Agency
              </FormLabel>
              <FormControl>
                <Input
                  id="sponsoringAgency"
                  placeholder="Enter sponsoring agency"
                  className="bg-[#F7F4F0]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="venue" className="text-[#6f4e37]">
                Venue
              </FormLabel>
              <FormControl>
                <Input
                  id="venue"
                  placeholder="Enter venue"
                  className="bg-[#F7F4F0]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="start" className="text-[#6f4e37] mb-2">
                  Start Date
                </FormLabel>
                <FormControl>
                  <Input
                    id="start"
                    type="date"
                    className="bg-[#F7F4F0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="end" className="text-[#6f4e37] mb-2">
                  End Date
                </FormLabel>
                <FormControl>
                  <Input
                    id="end"
                    type="date"
                    className="bg-[#F7F4F0]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button
            type="submit"
            className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
          >
            Add New Training
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
