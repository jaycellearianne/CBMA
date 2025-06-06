"use client";
import BellIcon from "../../components/icons/BellIcon";
import HamburgerIcon from "../../components/icons/HamburgerIcon";
import { useState } from "react";
import Sidebar from "./Sidebar";

// TODO: Implement themes, instead of manually adding bg-white + text-black.
// TODO: Make the <div>Section<div> adapt

function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-4 h-16 bg-white text-black z-20 relative">
        <button onClick={() => setIsOpen(true)}>
          <HamburgerIcon />
        </button>
        <div>Section</div>
        <BellIcon />
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-0"
        />
      )}
    </>
  );
}

export default NavBar;
