"use client";

// Search "TODO: Implement Add User logic" to find where you need to implement the actual Add User logic

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Users, UserPen, Eye, ChevronDown } from "lucide-react";

const roles = [
  {
    label: "Admin",
    value: "admin",
    icon: <Users className="w-4 h-4 text-blue-600" />,
  },
  {
    label: "Editor",
    value: "editor",
    icon: <UserPen className="w-4 h-4 text-green-600" />,
  },
  {
    label: "Viewer",
    value: "viewer",
    icon: <Eye className="w-4 h-4 text-gray-600" />,
  },
];

export default function AddUserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" }); // New state for validation errors

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { name: "", email: "" };
    let isValid = true;

    // Validate Full Name
    if (formData.name.trim() === "") {
      newErrors.name = "Full Name is required.";
      isValid = false;
    }

    // Validate Email Address
    if (formData.email.trim() === "") {
      newErrors.email = "Email Address is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return; // Stop submission if there are errors
    }

    // TODO: Implement Add User logic here (Also trim the full name pls :)
    const trimmedName = formData.name.trim(); // Trim the full name
    console.log({
      name: trimmedName,
      email: formData.email,
      role: selectedRole.value,
    });

    // Actual Add User logic would go here, e.g., API call
    // try {
    //   const response = await fetch('/api/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name: trimmedName, email: formData.email, role: selectedRole.value }),
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to add user');
    //   }
    //   // Handle success (e.g., refresh user list, show success message)
    //   console.log('User added successfully!');
    //   setIsOpen(false);
    //   setFormData({ name: "", email: "" }); // Clear form
    // } catch (error) {
    //   console.error('Error adding user:', error);
    //   // Handle error (e.g., show error message to user)
    // }

    setIsOpen(false);
    setFormData({ name: "", email: "" }); // Clear form after successful submission
  };

  return (
    <>
      <Button
        className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex items-center gap-2"
        onClick={() => {
          setIsOpen(true);
          setErrors({ name: "", email: "" }); // Clear errors when opening modal
          setFormData({ name: "", email: "" }); // Clear form data when opening modal
        }}
      >
        <Plus className="w-4 h-4" />
        Add User
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                  className={`h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="example@email.com"
                  className={`h-12 px-4 border rounded-lg text-base placeholder:text-gray-400 focus:outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Select Role
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full h-12 border rounded-md px-4 text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {selectedRole.icon}
                      {selectedRole.label}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          onClick={() => {
                            setSelectedRole(role);
                            setDropdownOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {role.icon}
                          {role.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6F4E37] text-white hover:bg-[#A67B5B]"
                >
                  Save User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
