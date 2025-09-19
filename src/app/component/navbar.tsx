"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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

        {/* Navigation Links */}
        <div className="flex space-x-6 text-slate-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-pink-400 transition ${
                pathname === link.href ? "text-nppink-400 font-semibold" : ""
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
