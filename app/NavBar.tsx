"use client";
import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <div className="border-b-[1px] border-zinc-300 ">
      <div className="flex h-14 container mx-auto space-x-6 text-xl font-semibold items-center">
        <Link href={"/"}>
          <FaBug className='text-zinc-800' />
        </Link>
        <ul className="flex space-x-6">
          {navItems.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={
                currentPath === navItem.href
                  ? `text-zinc-800`
                  : `text-zinc-500 hover:text-zinc-800 `
              }
            >
              {" "}
              {navItem.label}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
