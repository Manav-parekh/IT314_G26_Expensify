"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck, Home, FileText, Download } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export default function SideNav() {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Reports', icon: FileText, path: '/dashboard/report' },
    { id: 4, name: 'Download', icon: Download, path: '/dashboard/download' }, 
    { id: 5, name: 'Help', icon: ShieldCheck, path: '/dashboard/help' },
  ];

  const path = usePathname();
  const [hoveredId, setHoveredId] = useState();

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleDownloadClick = () => {
    // Add logic to trigger the file download (e.g., generating a report or downloading a file)
    console.log("Download initiated");
  };

  return (
    <div className="h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 flex flex-col justify-between p-5">
      {/* Logo */}
      <div className="flex justify-center items-center mb-5">
        <Link href="/" className="items-center">
          <Image src={'/logo.png'} alt="logo" width={80} height={80} className="cursor-pointer" />
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow mt-10 space-y-2">
        {menuList.map((menu) => (
          <Link key={menu.id} href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-blue-500 font-medium p-5 cursor-pointer rounded-md transition duration-200 
                ${path === menu.path ? 'bg-blue-500 text-white' : 'hover:text-white hover:bg-blue-500'}`}
              onMouseEnter={() => setHoveredId(menu.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto space-y-2">
        {/* Go to Main Page Component */}
        <Link href="/" className="block">
          <h2
            className={`flex gap-2 items-center text-blue-500 font-medium p-5 cursor-pointer rounded-md transition duration-200 
              ${path === '/' ? 'bg-blue-500 text-white' : 'hover:text-white hover:bg-blue-500'}`}
          >
            <Home />
            Go to Main Page
          </h2>
        </Link>

       

        {/* User Button */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
