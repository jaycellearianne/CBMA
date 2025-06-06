"use client";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "../../components/icons/UserIcon";
import UsersIcon from "../../components/icons/UsersIcon";
import UserPenIcon from "../../components/icons/UserPenIcon";
import SettingIcon from "../../components/icons/SettingIcon";
import CircleHelpIcon from "../../components/icons/CircleHelpIcon";
import LogoutIcon from "../../components/icons/LogoutIcon";

// TODO: Change the Image SRC to the actual profile image
// TODO: Change the Name to the actual name of the user
// TODO: Attach the links (href)

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <aside
      className={`px-8 py-12 fixed top-0 left-0 h-full w-64 rounded-tr-xl rounded-br-xl bg-white text-black transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-20`}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="right-0 top-0 absolute m-4 "
      >
        ✕
      </button>
      <div className="relative w-20 h-20 rounded-full overflow-hidden">
        <Image
          src="/UserProfile.jpg"
          alt={"User Profile"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* USER INFORMATION */}
      <div className="text-[#6F4E37] text-left mt-4">
        <h1 className="text-lg font-medium">Diego Paul P. Lee Tian</h1>
        <h2 className="text-sm mb-2">diego.leetian@gmail.com</h2>
        <h1 className="text-md font-bold text-black">Admin</h1>
      </div>

      <hr className="border-t border-2 my-4" />

      {/* NAVIGATION */}
      <div className="flex flex-col gap-4">
        <Link href={"#"} className="flex items-center gap-4">
          <UserIcon />
          <h2 className="text-sm">Profiles</h2>
        </Link>

        <Link href={"#"} className="flex items-center gap-4">
          <UsersIcon />
          <h2 className="text-sm">Change Profiles</h2>
        </Link>

        <Link href={"#"} className="flex items-center gap-4">
          <UserPenIcon />
          <h2 className="text-sm">Access Control</h2>
        </Link>

        <Link href={"#"} className="flex items-center gap-4">
          <SettingIcon />
          <h2 className="text-sm">Settings</h2>
        </Link>

        <Link href={"#"} className="flex items-center gap-4">
          <CircleHelpIcon />
          <h2 className="text-sm">Help</h2>
        </Link>

        <Link href={"#"} className="flex items-center gap-4">
          <LogoutIcon />
          <h2 className="text-sm">Logout</h2>
        </Link>
      </div>
    </aside>
  );
}
