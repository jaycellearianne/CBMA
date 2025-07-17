"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, CloudUpload, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { useState } from "react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import AddChurchModal from "../churches/AddChurchModal";
import AddPastorModal from "../pastors/AddPastorModal";

interface AddCircuitModalProps {
  onSuccess?: () => void;
}

export default function AddCircuitModal({ onSuccess }: AddCircuitModalProps) {
  const churchData = [
    {
      id: 1,
      pastor: "Arroz, Generoso Jr. C.",
      church: "Malublub Baptist Church",
    },
    { id: 2, pastor: "Francia, Jireh John", church: "Baptist Center Church" },
    {
      id: 3,
      pastor: "Mije, Rosendo",
      church: "Good Hope Baptist Church",
    },
    {
      id: 4,
      pastor: "Sian, Cris Amorsolo",
      church: "CPU University Church",
    },
  ];
  const [previews, setPreviews] = useState<string[]>([]);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }).max(50),
    description: z
      .string()
      .max(150, { message: "Description must be at most 150 characters" }),
    pastor: z
      .string({ required_error: "Please select a church" })
      .min(1, { message: "Please select a pastor" }),
    church: z
      .string({ required_error: "Please select a church" })
      .min(1, { message: "Please select a church" }),
    image: z
      .array(
        z.object({
          file: z
            .instanceof(File)
            .refine((file) => file.size > 0, {
              message: "File cannot be empty",
            })
            .refine((file) => file.type.startsWith("image/"), {
              message: "Only image files are allowed",
            }),
        })
      )
      .min(1, { message: "At least one image is required" }), //optional; required for the meantime
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast(" New pastor has been added successfully.", {
      icon: <CheckCircle className="text-green-600" />,
    });
    if (onSuccess) onSuccess();
    console.log(values);
  };

  return (
    <>
      <div className="bg-white ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="circuit-name" className="text-[#6f4e37]">
                    Circuit
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="circuit-name"
                      autoComplete="name"
                      placeholder="Circuit name"
                      className="bg-[#F7F4F0]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="circuit-description"
                    className="text-[#6f4e37]"
                  >
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="circuit-description"
                      placeholder="Enter description"
                      className="bg-[#F7F4F0] rounded-lg resize-none h-auto max-h-[250px] md:max-h-[300px] lg:max-h-[350px]"
                      maxLength={150}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Pastor */}
            <FormField
              control={form.control}
              name="pastor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="circuit-pastor"
                    className="text-[#6f4e37]"
                  >
                    Select Pastor
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        id="circuit-pastor"
                        name="pastor"
                        className="w-full bg-[#F7F4F0]"
                      >
                        <SelectValue
                          className="bg-[#F7F4F0]"
                          placeholder="Select pastor"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {churchData.map((pastor) => (
                        <SelectItem key={pastor.id} value={pastor.pastor}>
                          {pastor.pastor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <AddPastorModal />
                </FormItem>
              )}
            />
            {/* Church */}
            <FormField
              control={form.control}
              name="church"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="circuit-church"
                    className="text-[#6f4e37]"
                  >
                    Select Church
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        id="circuit-church"
                        name="church"
                        className="w-full bg-[#F7F4F0]"
                      >
                        <SelectValue
                          className="bg-[#F7F4F0]"
                          placeholder="Select church"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {churchData.map((church) => (
                        <SelectItem key={church.id} value={church.church}>
                          {church.church}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  <AddChurchModal />
                </FormItem>
              )}
            />
            {/* Upload Image */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="pastor-image" className="text-[#6f4e37]">
                    Upload Image
                  </FormLabel>
                  <Dropzone
                    accept={{ "image/*": [".jpg", "jpeg", ".png"] }}
                    onDrop={(acceptedFiles) => {
                      const files = acceptedFiles.map((file) => ({ file }));
                      field.onChange(files);
                      setPreviews(
                        acceptedFiles.map((file) => URL.createObjectURL(file))
                      );
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="h-32 md:h-30 flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded cursor-pointer"
                      >
                        <input
                          id="pastor-image"
                          name="image"
                          {...getInputProps()}
                        />
                        {previews.length > 0 ? (
                          <div className="flex">
                            {previews.map((src, idx) => (
                              <div key={idx} className="relative">
                                <Image
                                  src={src}
                                  alt={`preview-${idx}`}
                                  width={80}
                                  height={80}
                                  className="h-20 w-20 object-cover rounded"
                                />
                                <Button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviews((prev) =>
                                      prev.filter((_, i) => i !== idx)
                                    );
                                    field.onChange(
                                      field.value.filter((_, i) => i !== idx)
                                    );
                                  }}
                                  className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow p-0"
                                >
                                  <X />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center gap-1 text-center">
                            <CloudUpload
                              size={32}
                              className="mb-1 text-[#6F4E37]"
                            />
                            <span className="font-medium text-sm text-[#6F4E37]">
                              Drag & Drop your image
                            </span>
                            <span className="text-xs text-gray-500">or</span>
                            <span className="underline text-xs text-[#6F4E37]">
                              Browse files
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </FormItem>
              )}
            />
            <Button
              className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
              type="submit"
            >
              Add New Circuit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
