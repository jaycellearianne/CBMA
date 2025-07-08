"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AddPersonalDataProps {
  onSuccess?: () => void;
}

export default function AddPersonalData({ onSuccess }: AddPersonalDataProps) {
  const [open, setOpen] = useState(false);

  const birthdayformat = (input: string) => {
    let value = input.replace(/[^0-9]/g, "");
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 4) value = value.slice(0, 4) + "-" + value.slice(4);
    if (value.length > 7) value = value.slice(0, 7) + "-" + value.slice(7);
    return value;
  };

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    birthday: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Birthday must be in YYYY-MM-DD format",
      })
      .refine(
        (val) => {
          const [year, month, day] = val.split("-").map(Number);
          const date = new Date(val);
          if (
            date.getFullYear() !== year ||
            date.getMonth() + 1 !== month ||
            date.getDate() !== day
          ) {
            return false;
          }
          return true;
        },
        { message: "Birthday must be a valid date" }
      )
      .refine(
        (val) => {
          const date = new Date(val);
          const now = new Date();
          return date <= now;
        },
        { message: "Date of birth cannot be a future date." }
      ),
    address: z.string().min(1, { message: "Home Address is required" }),
    zipCode: z.string().min(1, { message: "Zip Code is required" }),
    civilStatus: z.string().min(1, { message: "Civil Status is required" }),
    age: z.string().min(1, { message: "Age is required" }),
    height: z.string().min(1, { message: "Height is required" }),
    weight: z.string().min(1, { message: "Weight is required" }),
    cellphoneNumber: z
      .string()
      .min(11, { message: "Cellphone number must be at least 11 digits" })
      .max(13, { message: "Cellphone number must be at most 13 digits" })
      .regex(/^09\\d{9}$/, {
        message: "Cellphone number must start with 09 and be 11 digits",
      }), //check again
    telephoneNumber: z.string().optional().or(z.literal("")),
    email: z.string().email({ message: "Invalid email address" }).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      birthday: "",
      address: "",
      zipCode: "",
      civilStatus: "",
      age: "",
      height: "",
      weight: "",
      cellphoneNumber: "",
      telephoneNumber: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast("Successfully added Personal data", {
      icon: <CheckCircle className="text-green-600" />,
    });
    if (onSuccess) onSuccess();
    console.log(values);
  };

  return (
    <>
      {open ? (
        <div className="min-h-screen w-full items-center justify-center flex flex-grow">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full px-8"
            >
              <div className="flex flex-col  mt-3 ">
                <h2 className="text-lg font-medium">Personal details</h2>
                <div className="space-y-3">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="gap-0">
                        <FormLabel className="text-[#6f4e37] text-base">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            autoComplete="name"
                            placeholder="Enter full name"
                            className="bg-[#F7F4F0]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Home Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="gap-0">
                        <FormLabel
                          className="text-[#6f4e37] text-base"
                          htmlFor="address"
                        >
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="address"
                            autoComplete="address"
                            type="text"
                            inputMode="numeric"
                            placeholder="Enter home address"
                            className="bg-[#F7F4F0]"
                            value={field.value}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Zip Code */}
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="gap-0">
                        <FormLabel className="text-[#6f4e37] text-base">
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="zipCode"
                            maxLength={4}
                            placeholder="Enter zip code"
                            className="bg-[#F7F4F0]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birthday */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => {
                      const handleChange = (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        field.onChange(birthdayformat(e.target.value));
                      };
                      return (
                        <FormItem className="gap-0">
                          <FormLabel
                            className="text-[#6f4e37] text-base"
                            htmlFor="birthday"
                          >
                            Birthday
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="birthday"
                              autoComplete="bday"
                              type="text"
                              inputMode="numeric"
                              pattern="\d{4}-\d{2}-\d{2}"
                              placeholder="YYYY-MM-DD"
                              className="bg-[#F7F4F0]"
                              value={field.value}
                              onChange={handleChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Age */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem className="gap-0">
                        <FormLabel className="text-[#6f4e37] text-base">
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="age"
                            placeholder="Enter age"
                            className="bg-[#F7F4F0]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Civil Status */}
                  <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                      <FormItem className="gap-0">
                        <FormLabel className="text-[#6f4e37] text-base">
                          Civil Status
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row mt-2"
                          >
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem color="" value="single" />
                              </FormControl>
                              <FormLabel className="text-[#6f4e37] ">
                                {" "}
                                Single
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-centergap-3">
                              <FormControl>
                                <RadioGroupItem value="married" />
                              </FormControl>
                              <FormLabel> Married</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-centergap-3">
                              <FormControl>
                                <RadioGroupItem value="divorced" />
                              </FormControl>
                              <FormLabel> Divorced</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-centergap-3">
                              <FormControl>
                                <RadioGroupItem value="Widowed" />
                              </FormControl>
                              <FormLabel> Widowed</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Gender */}
                  <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#6f4e37]">Sex </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row"
                          >
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem value="Female" />
                              </FormControl>
                              <FormLabel> Female</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-centergap-3">
                              <FormControl>
                                <RadioGroupItem value="Male" />
                              </FormControl>
                              <FormLabel> Male</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Height */}
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#6f4e37]">
                          Height cm
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="height"
                            placeholder="Enter height"
                            className="bg-[#F7F4F0]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Weight */}
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#6f4e37]">
                          Weight kg
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="We"
                            placeholder="Enter height"
                            className="bg-[#F7F4F0]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2 mt-3 ">
                <h2 className="text-lg font-medium">Contact details</h2>
                {/* Cellphone Number */}
                <FormField
                  control={form.control}
                  name="cellphoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6f4e37] text-base">
                        Cellphone Number{" "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="cellphoneNumber"
                          placeholder="Enter cellphone number"
                          className="bg-[#F7F4F0]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Telephone Number */}
                <FormField
                  control={form.control}
                  name="telephoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6f4e37] text-base">
                        Telephone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="telephoneNumber"
                          placeholder="Enter telephone number"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#6f4e37] text-base">
                        Cellphone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Enter email"
                          className="bg-[#F7F4F0]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="absolute flex w-full justify-center items-center">
          <Button
            className="max-w-md h-10 bg-[#4E342E]"
            onClick={() => setOpen(true)}
          >
            <Plus size={24} />
            Add Personal Data
          </Button>
        </div>
      )}
    </>
  );
}
