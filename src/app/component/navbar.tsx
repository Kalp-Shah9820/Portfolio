"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {href: "/", label: "About" },
    { href: "/about/projects", label: "Projects" },
    { href: "/about/contacts", label: "Contact" },
  ];

  return (
    <header className="px-8 py-4 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
      <nav className="flex items-center justify-between">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          MyPortfolio 🚀
        </h1>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-300 hover:text-pink-400 transition"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`md:flex space-x-6 text-slate-300 ${isOpen ? 'flex' : 'hidden'} md:space-x-6 flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-slate-900/95 md:bg-transparent backdrop-blur md:backdrop-blur-none p-4 md:p-0 border-b md:border-b-0 border-slate-700/50 space-y-4 md:space-y-0`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`hover:text-pink-400 transition block md:inline ${
                pathname === link.href ? "text-pink-400 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
