"use client";
import BellIcon from "../../components/icons/BellIcon";
import HamburgerIcon from "../../components/icons/HamburgerIcon";
import { useState } from "react";
import Sidebar from "./Sidebar";

function NavBar() {
  const [isOpen, setIsOpenAction] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5 h-20 bg-white text-black relative">
        <button onClick={() => setIsOpenAction(true)}>
          <HamburgerIcon />
        </button>
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <BellIcon />
      </div>

      <Sidebar isOpen={isOpen} setIsOpenAction={setIsOpenAction} />

      {isOpen && (
        <div
          onClick={() => setIsOpenAction(false)}
          className="fixed inset-0 bg-ghost bg-opacity-30"
        />
      )}
    </>
  );
}

export default NavBar;
