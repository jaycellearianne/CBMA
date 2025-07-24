"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle, CloudUpload, PlusIcon, X } from "lucide-react";
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from "@/components/ui/shadcn-io/tags";
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

type AddCircuitModalProps = {
  pastors: { id: number; name: string }[];
  churches: { id: number; name: string; location: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function AddCircuitModal({
  pastors,
  churches,
  onSuccess,
  onCancel,
}: AddCircuitModalProps) {
  // MOCK DATA
  const mockPastors = [
    { id: 1, name: "Pastor John Doe" },
    { id: 2, name: "Pastor Jane Smith" },
    { id: 3, name: "Pastor Luke Sky" },
  ];

  const mockChurches = [
    { id: 101, name: "Grace Community Church", location: "Downtown" },
    { id: 102, name: "Faith Baptist Church", location: "Uptown" },
    { id: 103, name: "Hope Revival Church", location: "Suburbs" },
  ];

  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedPastors, setSelectedPastors] = useState<number[]>([]);
  const [selectedChurches, setSelectedChurches] = useState<number[]>([]);

  const formSchema = z.object({
    circuitName: z.string().min(2, { message: "Name is required" }).max(50),
    description: z
      .string()
      .max(150, { message: "Description must be at most 150 characters" }),
    pastors: z
      .array(z.number())
      .min(1, { message: "At least one pastor must be selected" }),
    churches: z
      .array(z.number())
      .min(1, { message: "At least one church must be selected" }),
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
      circuitName: "",
      description: "",
      pastors: [],
      churches: [],
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
    <div className="bbg-white w-full h-full overflow-y-auto px-1 pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="circuitName"
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
                    className="bg-[#F7F4F0] rounded-lg resize-none h-auto max-h-[250px]"
                    maxLength={500}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pastors"
            render={({ field }) => {
              const selected = field.value;
              const handleRemove = (id: number) => {
                field.onChange(selected.filter((val) => val !== id));
              };
              const handleSelect = (id: number) => {
                if (selected.includes(id)) {
                  handleRemove(id);
                } else {
                  field.onChange([...selected, id]);
                }
              };

              return (
                <FormItem>
                  <FormLabel className="text-[#6f4e37]">
                    Select Pastors
                  </FormLabel>
                  <Tags className="bg-[#F7F4F0]">
                    <TagsTrigger>
                      {selected.map((id) => {
                        const pastor = pastors.find((p) => p.id === id);
                        return (
                          <TagsValue key={id} onRemove={() => handleRemove(id)}>
                            {pastor?.name}
                          </TagsValue>
                        );
                      })}
                    </TagsTrigger>
                    <TagsContent>
                      <TagsInput placeholder="Search pastor..." />
                      <TagsList>
                        <TagsEmpty>
                          <div className="w-full text-center">
                            <button
                              type="button"
                              className="mx-auto flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:underline"
                              onClick={() => {
                                // Add logic to open AddPastorModal
                              }}
                            >
                              <PlusIcon
                                className="text-muted-foreground"
                                size={14}
                              />
                              Create new pastor
                            </button>
                          </div>
                        </TagsEmpty>
                        <TagsGroup>
                          {pastors
                            .filter((p) => !selected.includes(p.id))
                            .map((p) => (
                              <TagsItem
                                key={p.id}
                                value={String(p.id)}
                                onSelect={() => handleSelect(p.id)}
                              >
                                {p.name}
                              </TagsItem>
                            ))}
                        </TagsGroup>
                      </TagsList>
                    </TagsContent>
                  </Tags>
                  {/* <div className="mt-2 flex justify-end">
                    <AddPastorModal />
                  </div> */}
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="churches"
            render={({ field }) => {
              const selected = field.value;
              const handleRemove = (id: number) => {
                field.onChange(selected.filter((val) => val !== id));
              };
              const handleSelect = (id: number) => {
                if (selected.includes(id)) {
                  handleRemove(id);
                } else {
                  field.onChange([...selected, id]);
                }
              };

              return (
                <FormItem>
                  <FormLabel className="text-[#6f4e37]">
                    Select Churches
                  </FormLabel>
                  <Tags className="bg-[#F7F4F0]">
                    <TagsTrigger>
                      {selected.map((id) => {
                        const church = churches.find((c) => c.id === id);
                        return (
                          <TagsValue key={id} onRemove={() => handleRemove(id)}>
                            {church?.name}
                          </TagsValue>
                        );
                      })}
                    </TagsTrigger>
                    <TagsContent>
                      <TagsInput placeholder="Search church..." />
                      <TagsList>
                        <TagsEmpty>
                          <div className="w-full text-center">
                            <button
                              type="button"
                              className="mx-auto flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:underline"
                              onClick={() => {
                                // Add logic to open AddChurchModal
                              }}
                            >
                              <PlusIcon
                                className="text-muted-foreground"
                                size={14}
                              />
                              Create new church
                            </button>
                          </div>
                        </TagsEmpty>
                        <TagsGroup>
                          {churches
                            .filter((c) => !selected.includes(c.id))
                            .map((c) => (
                              <TagsItem
                                key={c.id}
                                value={String(c.id)}
                                onSelect={() => handleSelect(c.id)}
                              >
                                <div>
                                  <div>{c.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {c.location}
                                  </div>
                                </div>
                              </TagsItem>
                            ))}
                        </TagsGroup>
                      </TagsList>
                    </TagsContent>
                  </Tags>
                  {/* <div className="mt-2 flex justify-end">
                    <AddChurchModal />
                  </div> */}
                  <FormMessage />
                </FormItem>
              );
            }}
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

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
            >
              Add New Circuit
            </Button>

            <Button
              type="button"
              onClick={onCancel}
              className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
