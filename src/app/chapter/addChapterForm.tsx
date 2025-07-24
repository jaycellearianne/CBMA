"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, CloudUpload, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Dropzone from "react-dropzone";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import AddPastorModal from "./[slug]/pastors/AddPastorModal";
import AddChurchModal from "./[slug]/churches/AddChurchModal";

interface AddChapterFormProps {
  pastors: { id: number; name: string }[];
  churches: { id: number; name: string; location: string }[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddChapterForm({
  pastors,
  churches,
  onSuccess,
  onCancel,
}: AddChapterFormProps) {
  const router = useRouter();
  const [chapterName, setChapterName] = useState("");
  const [description, setDescription] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);

  const formSchema = z.object({
    chapterName: z.string().min(2, { message: "Chapter name is required" }),
    description: z
      .string()
      .max(500, { message: "Description must be at most 500 characters" }),
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
      .min(1, { message: "At least one image is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chapterName: "",
      description: "",
      pastors: [],
      churches: [],
      image: [],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = chapterName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    const newChapter = {
      name: chapterName,
      description,
      image: previews[0] || "/images/chapter/placeholder.webp",
    };
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("chapters");
      const chapters = stored ? JSON.parse(stored) : {};
      chapters[slug] = newChapter;
      localStorage.setItem("chapters", JSON.stringify(chapters));
    }
    router.push(`/chapter/${slug}`);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="bg-white w-full h-full overflow-y-auto px-1 pb-4">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="chapterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#6f4e37]">Chapter Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chapter name"
                    className="bg-[#F7F4F0]"
                    {...field}
                    onChange={(e) => {
                      setChapterName(e.target.value);
                      field.onChange(e);
                    }}
                  />
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
                <FormLabel
                  htmlFor="circuit-description"
                  className="text-[#6f4e37]"
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="chapter-description"
                    placeholder="Enter description"
                    className="bg-[#F7F4F0] rounded-lg resize-none h-auto max-h-[250px]"
                    maxLength={500}
                    {...field}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      field.onChange(e);
                    }}
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

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
            >
              Add New Chapter
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
