"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, CloudUpload, X } from "lucide-react";
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

interface AddChurchModalProps {
  onSuccess?: () => void;
}

export default function AddChurchModal({ onSuccess }: AddChurchModalProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Church name is required" }),
    location: z.string().min(2, { message: "Location is required" }),
    serviceTime: z.string().min(1, { message: "Service time is required" }),
    description: z
      .string()
      .max(150, { message: "Description must be at most 150 characters" }),
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
      .min(1, { message: "At least one image is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      serviceTime: "",
      description: "",
      image: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast("New church has been added successfully.", {
      icon: <CheckCircle className="text-green-600" />,
    });
    if (onSuccess) onSuccess();
    console.log(values);
  };

  return (
    <div className="bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Church Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Church name"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Location"
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
            name="serviceTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Service Time</FormLabel>
                <FormControl>
                  <Input type="time" className="bg-[#F7F4F0]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    className="bg-[#F7F4F0] rounded-lg resize-none h-auto max-h-[250px]"
                    maxLength={150}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Upload Image</FormLabel>
                <Dropzone
                  accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
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
                      className="h-32 flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded cursor-pointer"
                    >
                      <input {...getInputProps()} />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
            type="submit"
          >
            Add New Church
          </Button>
        </form>
      </Form>
    </div>
  );
}
