"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/types/site-config";

interface FooterProps {
 config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
 return (
  <footer className="bg-flushOrange-950 text-white py-10 px-4 sm:px-8 md:px-12 lg:px-[60px]">
   <div className="mx-auto w-full max-w-7xl">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6 relative">
     <div className="space-y-4 flex flex-col items-center lg:items-start">
      {config.branding.logo ? (
       <a href="/" className="flex items-center">
        <Image
         src={config.branding.logo}
         alt={config.branding.companyName || "Logo"}
         width={45}
         height={47}
         className="h-[47px] w-[45px] invert brightness-110 contrast-200"
        />
       </a>
      ) : (
       <h2 className="font-bold text-lg">OJ</h2>
      )}
     </div>

     <div className="space-y-4 flex flex-col items-center lg:items-start">
      <nav className="space-y-2 w-full">
       {config.footer.quickLinks.slice(0, 3).map((link) => (
        <a
         key={link.url}
         href={link.url}
         className="block font-montserrat text-sm font-bold hover:underline text-center lg:text-left"
        >
         {link.title}
        </a>
       ))}
      </nav>
     </div>

     <div className="space-y-4 flex flex-col items-center lg:items-start">
      <nav className="space-y-2 w-full">
       {config.footer.quickLinks.slice(3).map((link) => (
        <a
         key={link.url}
         href={link.url}
         className="block font-montserrat text-sm font-bold hover:underline text-center lg:text-left"
        >
         {link.title}
        </a>
       ))}
      </nav>
     </div>

     <div className="space-y-4 flex flex-col items-center lg:items-start">
      <Button
       asChild
       className="w-fit md:w-full bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
      >
       <a href={config.hero.ctaLink || "#"}>Prendre rendez-vous</a>
      </Button>
      <p className="font-montserrat text-xs mt-2 text-flushOrange-50 text-center lg:text-left">
       La prise de rendez-vous se fait par le biais de doctoranytime.be
      </p>
     </div>

     <div className="space-y-4 flex flex-col items-center lg:items-start relative">
      <address className="not-italic w-full text-center lg:text-left">
       <p className="font-montserrat text-sm text-flushOrange-50">
        {config.contact.address}
       </p>
       <p className="font-montserrat text-sm text-flushOrange-50">
        {config.contact.postalCode} {config.contact.city}
       </p>
       <p className="font-montserrat text-sm text-flushOrange-50 mt-4">
        {config.contact.phone}
       </p>
       <p className="font-montserrat text-sm text-flushOrange-50">
        {config.contact.email}
       </p>
      </address>
     </div>
    </div>

    <div className="mt-8 pt-4 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
     <p className="font-montserrat text-xs text-flushOrange-500 text-center md:text-left">
      © {config.branding.companyName} - {new Date().getFullYear()}
     </p>
     <a
      href="#"
      className="font-montserrat text-xs text-flushOrange-500 mt-2 md:mt-0 text-center md:text-right hover:underline"
     >
      Privacy policies
     </a>
    </div>
   </div>
  </footer>
 );
}
