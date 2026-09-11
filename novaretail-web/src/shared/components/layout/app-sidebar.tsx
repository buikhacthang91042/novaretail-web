"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/" },
  { label: "Sales", href: "/sales" },
  { label: "Inventory", href: "/inventory" },
  { label: "Products", href: "/products" },
  { label: "Employees", href: "/employees" },
  { label: "Promotions", href: "/promotions" },
];
export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex border-r border-gray-300 min-w-[300px]">
      <div className="flex flex-col w-full">
        {/* Logo and Title */}
        <div className=" border-b border-gray-300">
          <div className="flex p-5 justify-between items-center">
            <div className="flex gap-2 ">
              <span className="p-2 bg-green-300">Logo</span>
              <div>
                <h1 className="text-sm font-bold">Nova Retail</h1>
                <p className="text-gray-500 text-xs">Dashboard</p>
              </div>
            </div>
            {/* <button className="flex justify-center items-center h-5 w-5 rounded-full bg-gray-200 p-3">
              x
            </button> */}
          </div>
        </div>
        {/* Menu Items */}
        <div className="flex flex-1 flex-col items-start gap-2 p-3">
          {MENU_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`cursor-pointer  p-4 flex w-full justify-start items-center  gap-2
                    ${isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-300"}
                    `}
              >
                <p>Icon</p>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
