"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "./page";
import { Shield, UserPen, Eye } from "lucide-react";

interface EditUserFormProps {
  user: User | null;
  onCancelAction: () => void;
  onSaveAction: (
    updatedUser: User,
    newRole: "Admin" | "Editor" | "Viewer"
  ) => void;
}

const roles = [
  {
    label: <span className="text-red-800">Admin</span>,
    value: "Admin",
    icon: <Shield className="w-4 h-4 text-red-800" />,
  },
  {
    label: <span className="text-blue-800">Editor</span>,
    value: "Editor",
    icon: <UserPen className="w-4 h-4 text-blue-800" />,
  },
  {
    label: <span className="text-green-800">Viewer</span>,
    value: "Viewer",
    icon: <Eye className="w-4 h-4 text-green-800" />,
  },
];

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email format."),
  role: z.enum(["Admin", "Editor", "Viewer"], {
    required_error: "Please select a role.",
  }),
});

export default function EditUserForm({
  user,
  onCancelAction,
  onSaveAction,
}: EditUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: user?.role || "Viewer",
    },
  });

  // Reset form values when user prop changes
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, form]);

  const selectedRole =
    roles.find((r) => r.value === form.watch("role")) || roles[0];

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    onSaveAction({ ...user, ...values }, values.role);
  };

  if (!user) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-1 mb-4"
      >
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter email"
                  className="bg-[#F7F4F0]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Select Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-[#F7F4F0] h-12">
                    <SelectValue>
                      <span className="flex items-center gap-2">
                        {selectedRole.icon}
                        {selectedRole.label}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <span className="flex items-center gap-2">
                        {role.icon}
                        {role.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
