"use client";
import { X, Shield, Settings, HelpCircle, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface MenuOverlayProps {
  isOpen: boolean;
  onCloseAction: () => void;
  userName: string | null;
  userEmail: string | null;
}

export default function MenuOverlay({
  isOpen,
  onCloseAction,
  userName,
  userEmail,
}: MenuOverlayProps) {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onCloseAction();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/auth/sign-in");
    onCloseAction();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <aside className="fixed inset-0 z-40" onClick={onCloseAction} />
      )}

      {/* Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onCloseAction}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/images/users/img.jpg"
                alt="User Avatar"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {userName || "Guest User"}
              </h3>
              <p className="text-sm text-gray-600">{userName ? userEmail : "guest@example.com"}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="py-4">
          <div className="space-y-1">
            <button
              onClick={() => handleNavigation("/admin-access-control")}
              className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <Shield className="w-5 h-5 mr-3" />
              <span>Access Control</span>
            </button>

            <button
              onClick={() => handleNavigation("/settings")}
              className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => handleNavigation("/help")}
              className="w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              <span>Help</span>
            </button>

            <div className="border-t mt-4 pt-4">
              <button
                onClick={() => handleNavigation("/auth/sign-in")}
                className="w-full flex items-center px-6 py-3 text-left hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
