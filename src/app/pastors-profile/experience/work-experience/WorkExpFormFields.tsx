// components/work-experience/WorkExpForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle, CalendarIcon } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const workExpSchema = z.object({
  church: z.string().min(2).max(100),
  address: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  status: z.enum(["Full-Time", "Part-Time"]),
  startDate: z.string().min(6),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
});

export type WorkExperienceFormValues = z.infer<typeof workExpSchema>;

interface WorkExpFormProps {
  defaultValues?: Partial<WorkExperienceFormValues>;
  onSubmitAction: (data: WorkExperienceFormValues) => void;
  onSuccess?: () => void;
  submitLabel?: string;
}

export default function WorkExpForm({
  defaultValues,
  onSubmitAction,
  onSuccess,
  submitLabel = "Save",
}: WorkExpFormProps) {
  const form = useForm<WorkExperienceFormValues>({
    resolver: zodResolver(workExpSchema),
    defaultValues: {
      church: "",
      address: "",
      position: "",
      status: "Full-Time",
      startDate: "",
      endDate: "",
      isCurrent: false,
      ...defaultValues,
    },
  });

  const isCurrent = form.watch("isCurrent");

  const handleSubmit = (values: WorkExperienceFormValues) => {
    onSubmitAction({
      ...values,
      endDate: values.isCurrent ? undefined : values.endDate,
    });

    toast("Saved", {
      description: "Experience saved successfully",
      icon: <CheckCircle className="text-green-600" />,
    });

    if (!defaultValues) form.reset(); // Only reset for Add form
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Church */}
        <FormField
          control={form.control}
          name="church"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Church</FormLabel>
              <FormControl>
                <Input placeholder="Church or institution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Position */}
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#F7F4F0]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Inclusive Dates */}
        <div>
          <FormLabel>Inclusive Dates</FormLabel>
          <div className="flex items-center gap-2 mt-1">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <MonthYearPicker value={field.value} onChange={field.onChange} />
              )}
            />
            <span>—</span>
            {isCurrent ? (
              <div className="bg-[#F7F4F0] rounded-xl px-4 py-2 text-sm text-[#40342d] border border-gray-300 flex items-center space-x-2 w-36 justify-center">
                <span>Present</span>
                <CalendarIcon className="w-4 h-4" />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <MonthYearPicker value={field.value} onChange={field.onChange} />
                )}
              />
            )}
          </div>
        </div>

        {/* Is Current */}
        <FormField
          control={form.control}
          name="isCurrent"
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              <label className="text-sm">I currently work here</label>
            </div>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#6F4E37] text-white hover:bg-[#A67B5B]"
        >
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}

function MonthYearPicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const [open, setOpen] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState(currentYear);

  const handleSelect = (monthIndex: number) => {
    const formatted = `${months[monthIndex]} ${selectedYear}`;
    onChange(formatted);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-36 justify-between bg-[#F7F4F0] text-[#40342d] border border-gray-300 rounded-xl"
        >
          {value || "Select Date"}
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-2">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-1 mb-2"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month, idx) => (
            <Button
              key={month}
              variant="outline"
              className="text-sm"
              onClick={() => handleSelect(idx)}
            >
              {month}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
