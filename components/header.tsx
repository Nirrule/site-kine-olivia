"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/types/site-config";
import React from "react";

interface HeaderProps {
 config: SiteConfig;
}

const navItems = [
 { name: "Spécialisations", href: "#specialization", id: "specialization" },
 { name: "Kinésithérapie", href: "#kine", id: "kine" },
 { name: "Méthodo", href: "#methodo", id: "methodo" },
 { name: "Infos pratiques", href: "#practicalInfo", id: "practicalInfo" },
];

export function Header({ config }: HeaderProps) {
 const [menuOpen, setMenuOpen] = React.useState(false);

 return (
  <nav className="w-full bg-white py-4">
   <div className="flex items-center justify-between px-4 sm:px-8 md:px-[60px] h-12">
    {config.branding.logo ? (
     <a href="/" className="flex items-center">
      <Image
       src={config.branding.logo}
       alt={config.branding.companyName || "Logo"}
       width={45}
       height={47}
       className="h-[47px] w-[45px]"
      />
     </a>
    ) : (
     <span className="font-bold text-xl text-royalPurple-900">OJ</span>
    )}

    {/* Desktop Navigation - liens en noir, sans état actif */}
    <ul className="hidden lg:flex flex-1 gap-x-12 items-center justify-end mr-8">
     {navItems.map((item) => (
      <li key={item.name}>
       <a
        href={item.href}
        className="font-bold text-base text-black hover:underline"
       >
        {item.name}
       </a>
      </li>
     ))}
    </ul>

    {/* Desktop Button */}
    <div className="hidden lg:block">
     <Button
      asChild
      className="ml-4 bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
     >
      <a href={config.hero.ctaLink || "#"}>Prendre rendez-vous</a>
     </Button>
    </div>

    {/* Mobile Hamburger */}
    <button
     type="button"
     className="lg:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-flushOrange-500"
     aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
     onClick={() => setMenuOpen((open) => !open)}
    >
     <svg
      className="h-7 w-7 text-black"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M4 8h16M4 16h16"
      />
     </svg>
    </button>
   </div>

   {/* Mobile Fullscreen Menu */}
   {menuOpen && (
    <div className="fixed inset-0 z-50 bg-royalPurple-100 flex flex-col justify-between">
     {/* Top bar: Logo + X */}
     <div className="flex items-center justify-between px-6 pt-6">
      {config.branding.logo ? (
       <Image
        src={config.branding.logo}
        alt={config.branding.companyName || "Logo"}
        width={45}
        height={47}
        className="h-[47px] w-[45px]"
       />
      ) : (
       <span className="font-bold text-2xl text-royalPurple-900">OJ</span>
      )}
      <button
       type="button"
       aria-label="Fermer le menu"
       className="p-2"
       onClick={() => setMenuOpen(false)}
      >
       <svg
        className="h-7 w-7 text-royalPurple-900"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M6 18L18 6M6 6l12 12"
        />
       </svg>
      </button>
     </div>

     {/* Menu items - liens en noir */}
     <ul className="flex flex-col items-center gap-y-8 mt-12">
      {navItems.map((item) => (
       <li key={item.name}>
        <a
         href={item.href}
         className="font-bold text-xl text-black"
         onClick={() => setMenuOpen(false)}
        >
         {item.name}
        </a>
       </li>
      ))}
     </ul>

     {/* CTA Button */}
     <div className="px-6 pb-8">
      <Button
       asChild
       className="w-full bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
       onClick={() => setMenuOpen(false)}
      >
       <a href={config.hero.ctaLink || "#"}>Prendre rendez-vous</a>
      </Button>
     </div>
    </div>
   )}
  </nav>
 );
}
