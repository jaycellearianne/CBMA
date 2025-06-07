"use client";
import BellIcon from "../../components/icons/BellIcon";
import HamburgerIcon from "../../components/icons/HamburgerIcon";
import { useState } from "react";
import Sidebar from "./Sidebar";

// TODO: Implement themes, instead of manually adding bg-white + text-black.
// TODO: Make the < Dashboard > adapt

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5 h-20 bg-white text-black relative">
        <button onClick={() => setIsOpen(true)}>
          <HamburgerIcon />
        </button>
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <BellIcon />
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-ghost bg-opacity-30"
        />
      )}
    </>
  );
}

export default NavBar;
