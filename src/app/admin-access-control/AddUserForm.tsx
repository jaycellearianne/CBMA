"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Eye, UserPen, Shield } from "lucide-react";
import { useState } from "react";

interface AddUserFormProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  onSubmitAction: (user: { name: string; email: string; role: string }) => void;
  onCancelAction: () => void;
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
  name: z.string().min(1, { message: "Full Name is required." }),
  email: z
    .string()
    .min(1, { message: "Email Address is required." })
    .email({ message: "Invalid email format." }),
  role: z.string().min(1, { message: "Please select a role." }),
});

export default function AddUserForm({
  open,
  onOpenChangeAction,
  onSubmitAction,
  onCancelAction,
}: AddUserFormProps) {
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: roles[0].value,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmitAction(values);
    onOpenChangeAction(false);
    form.reset();
    setSelectedRole(roles[0]);
  };

  const handleCancel = () => {
    form.reset(); // Reset the form fields
    setSelectedRole(roles[0]); // Reset the selected role
    onOpenChangeAction(false); // Close the modal
    if (onCancelAction) onCancelAction(); // Call the onCancel callback if provided
  };

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
              <FormLabel htmlFor="name" className="text-[#6f4e37]">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter full name"
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
              <FormLabel htmlFor="email" className="text-[#6f4e37]">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="example@email.com"
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#6f4e37]">Select Role</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const role = roles.find((r) => r.value === value);
                  if (role) setSelectedRole(role);
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-12 bg-[#F7F4F0]">
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
            type="submit"
            className="bg-[#6F4E37] w-full hover:bg-[#432F21]"
          >
            Add New User
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            className="border border-[#A67B5B]/25 bg-[#A67B5B]/10 w-full text-black hover:bg-red-50"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
