"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  Eye,
  UserPen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeactivateUserModal from "./DeactivateUserModal";
import DeleteUserModal from "./DeleteUserModal";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  avatar?: string;
  isActive: boolean;
}

export default function AccessControlPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Carlos Garcia",
      email: "carlos.garcia@gmail.com",
      role: "Admin",
      avatar: "",
      isActive: true,
    },
        {
      id: 2,
      name: "Faith Silva",
      email: "faith.silva@gmail.com",
      role: "Editor",
      avatar: "",
      isActive: true,
    },
            {
      id: 3,
      name: "Angel Guardian",
      email: "angel.guardian@gmail.com",
      role: "Viewer",
      avatar: "",
      isActive: true,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [modals, setModals] = useState({
    add: false,
    edit: false,
    role: false,
    deactivate: false,
    delete: false,
  });

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const toggleModal = (type: keyof typeof modals, value: boolean) => {
    setModals((prev) => ({ ...prev, [type]: value }));
  };

  const handleSaveNewUser = (newUser: {
    name: string;
    email: string;
    role: string;
  }) => {
    const id = Math.max(...users.map((u) => u.id)) + 1;
    const user: User = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as User["role"],
      avatar: "",
      isActive: true,
    };
    setUsers((prev) => [...prev, user]);
    toast.success(`${user.name} has been added.`);
    toggleModal("add", false);
  };

  const handleSaveEdit = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    toast(`${updatedUser.name} has been updated.`);
    toggleModal("edit", false);
  };

  const handleSaveRoleChange = (newRole: User["role"]) => {
    if (!selectedUser) return;

    const updatedUser = { ...selectedUser, role: newRole };

    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setSelectedUser(updatedUser);
    toast.success(`${updatedUser.name}'s role changed to ${newRole}.`);
    toggleModal("role", false);
  };

  const handleConfirmDeactivate = async (userId: number): Promise<void> => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: false } : u))
    );
    const deactivated = users.find((u) => u.id === userId);
    if (deactivated) toast.error(`${deactivated.name} has been deactivated.`);
    toggleModal("deactivate", false);
  };

  const handleConfirmActivate = async (userId: number): Promise<void> => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: true } : u))
    );
    const activated = users.find((u) => u.id === userId);
    if (activated) toast.success(`${activated.name} has been activated.`);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      toast.error(`${selectedUser.name} has been deleted.`);
      toggleModal("delete", false);
    }
  };

  const getRoleIcon = (role: string) =>
    role === "Admin" ? (
      <Shield className="w-4 h-4" />
    ) : role === "Editor" ? (
      <UserPen className="w-4 h-4" />
    ) : (
      <Eye className="w-4 h-4" />
    );

  const getRoleColor = (role: string) =>
    role === "Admin"
      ? "bg-red-100 text-red-800"
      : role === "Editor"
      ? "bg-blue-100 text-blue-800"
      : "bg-green-100 text-green-800";

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      // user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Access Control</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <Button
            onClick={() => toggleModal("add", true)}
            className="bg-[#6F4E37] hover:bg-[#A67B5B] text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add User
          </Button>
        </div>

        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center justify-between p-4 border rounded-xl ${
                !user.isActive ? "opacity-50 bg-gray-50" : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={user.avatar || "/images/users/img.jpg"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">
                    {isMobile && user.email.length > 20
                      ? `${user.email.slice(0, 20)}...`
                      : user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                    user.role
                  )}`}
                >
                  {getRoleIcon(user.role)}
                  <span>{user.role}</span>
                </div>

                {!user.isActive && (
                  <button
                    onClick={() => handleConfirmActivate(user.id)}
                    className="text-xs text-red-600 font-medium underline hover:no-underline"
                  >
                    Deactivated
                  </button>
                )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        toggleModal("edit", true);
                      }}
                    >
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        toggleModal("deactivate", true);
                      }}
                    >
                      Deactivate
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedUser(user);
                        toggleModal("delete", true);
                      }}
                      className="text-red-600"
                    >
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        open={modals.add}
        onOpenChangeAction={(v) => toggleModal("add", v)}
        onSubmitAction={handleSaveNewUser}
      />
      <EditUserModal
        open={modals.edit}
        user={selectedUser}
        onOpenChangeAction={(v) => toggleModal("edit", v)}
        onSaveAction={handleSaveEdit}
      />
      <DeactivateUserModal
        open={modals.deactivate}
        user={selectedUser}
        onOpenChangeAction={(v) => toggleModal("deactivate", v)}
        onConfirmAction={
          selectedUser?.isActive
            ? handleConfirmDeactivate
            : handleConfirmActivate
        }
      />
      <DeleteUserModal
        open={modals.delete}
        user={selectedUser}
        onOpenChangeAction={(v) => toggleModal("delete", v)}
        onSubmitAction={handleConfirmDelete}
      />
    </div>
  );
}
