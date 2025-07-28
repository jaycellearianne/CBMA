"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Fee } from "./FeesData";

interface AddFeesFormProps {
  open: boolean;
  onSaveAction: (feeData: Fee) => void;
  onCancelAction: () => void;
}

const formSchema = z.object({
  id: z.number().optional(),
  feeTitle: z.string().min(1, { message: "Fee Title is required." }),
  amount: z.string().min(1, { message: "Amount is required." }),
  year: z.string().min(1, { message: "Year is required." }),
  status: z.string().min(1, { message: "Status is required." }),
});

export default function AddFeesForm({
  open,
  onSaveAction,
  onCancelAction,
}: AddFeesFormProps) {
  const currentYear = new Date().getFullYear().toString();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feeTitle: "",
      amount: "",
      year: currentYear,
      status: "Unpaid",
    },
  });

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^\d.]/g, "");
    const parts = numericValue.split(".");
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (parts[1]) {
      parts[1] = parts[1].substring(0, 2);
    }
    return parts.join(".");
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedAmount = data.amount.startsWith("₱")
      ? data.amount
      : `₱${data.amount}`;
    onSaveAction({
      ...data,
      id: Date.now(),
      amount: formattedAmount,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-1 mb-4"
      >
        <FormField
          control={form.control}
          name="feeTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Fee Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter fee title"
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="₱0.00"
                    className="bg-[#F7F4F0]"
                    {...field}
                    onChange={(e) =>
                      field.onChange(formatAmount(e.target.value))
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Year</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full h-10 px-4 bg-[#F7F4F0] border-0 rounded-xl text-base">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: new Date().getFullYear() - 999 },
                        (_, i) => (1000 + i).toString()
                      ).map((y) => (
                        <SelectItem key={y} value={y}>
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Status</FormLabel>
                <FormControl>
                  <div className="flex bg-[#F7F4F0] rounded-xl p-1 h-10">
                    {["Paid", "Unpaid"].map((statusOption) => (
                      <button
                        key={statusOption}
                        type="button"
                        onClick={() => field.onChange(statusOption)}
                        className={`flex-1 rounded-lg text-sm font-medium transition-all ${
                          field.value === statusOption
                            ? "bg-[#8B7355] text-white shadow-sm"
                            : "text-black hover:text-black"
                        }`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
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
            Add Fee
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.reset();
              onCancelAction();
            }}
            className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
