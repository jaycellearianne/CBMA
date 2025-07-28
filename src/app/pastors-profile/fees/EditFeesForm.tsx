"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Fee } from "./FeesData";
import { useEffect } from "react";

interface EditFeesFormProps {
  open: boolean;
  fee: Fee | null;
  onSaveAction: (feeData: {
    id?: number;
    feeTitle: string;
    amount: string;
    year: string;
    status: string;
  }) => void;
  onCancelAction: () => void;
}

const formSchema = z.object({
  id: z.number().optional(),
  feeTitle: z.string().min(1, { message: "Fee Title is required." }),
  amount: z.string().min(1, { message: "Amount is required." }),
  year: z.string().min(1, { message: "Year is required." }),
  status: z.string().min(1, { message: "Status is required." }),
});

export default function EditFeesForm({
  open,
  fee,
  onSaveAction,
  onCancelAction,
}: EditFeesFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: fee?.id ?? undefined,
      feeTitle: "",
      amount: "",
      year: "2024",
      status: "Paid",
    },
  });

  useEffect(() => {
    if (fee) {
      form.setValue("id", fee.id);
      form.setValue("feeTitle", fee.feeTitle);
      form.setValue("amount", fee.amount.replace(/[₱,]/g, ""));
      form.setValue("year", fee.year);
      form.setValue("status", fee.status);
    }
  }, [fee, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedAmount = values.amount.startsWith("₱")
      ? values.amount
      : `₱${values.amount
          .replace(/[^\d.]/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    onSaveAction({ ...values, amount: formattedAmount });
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
                  {...field}
                  placeholder="Enter Fee Title"
                  className="bg-[#F7F4F0]"
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
                <Input
                  {...field}
                  placeholder="0.00"
                  className="bg-[#F7F4F0]"
                  onChange={(e) =>
                    field.onChange(e.target.value.replace(/[^\d.]/g, ""))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Year</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter year"
                  className="bg-[#F7F4F0]"
                />
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

        <div className="flex flex-col gap-2.5">
          <Button
            type="submit"
            className="bg-[#6F4E37] text-white h-12 w-full hover:bg-[#5D3E2A] rounded-2xl"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={onCancelAction}
            variant="outline"
            className="bg-[#E8DDD4] text-[#6f4e37] h-12 w-full hover:bg-[#DDD0C4] border-0 rounded-2xl"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
