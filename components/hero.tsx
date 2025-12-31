"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/types/site-config";

interface HeroProps {
 config: SiteConfig;
}

export function Hero({ config }: HeroProps) {
 return (
  <section className="w-full bg-white flex flex-col items-center justify-center pb-24 px-4 sm:px-6 lg:px-8">
   <div className="w-full max-w-[95%] mx-auto flex flex-col items-center justify-center">
    {config.hero.backgroundImage && (
     <div className="w-full flex justify-center mb-8 relative">
      <Image
       src={config.hero.backgroundImage}
       alt="Illustration kinésithérapie"
       width={1000}
       height={1000}
       className="w-full max-w-[95%] h-auto"
       priority
      />

      <h1 className="absolute top-5/12 right-30 -translate-y-1/2 translate-x-24 sm:translate-x-8 text-2xl sm:text-5xl lg:text-[88px] font-bold text-royalPurple-950 leading-tight max-w-2xl text-left px-4 lg:px-0">
       <span className="block">Besoin</span>
       <span className="block">d'une séance</span>
       <span className="block">de kiné&nbsp;?</span>
      </h1>
     </div>
    )}

    {/* Texte d'intro */}
    <p className="text-base sm:text-lg text-black text-center mb-8 mt-10 sm:mt-24 max-w-4xl">
     {config.hero.description}
    </p>

    {/* CTA */}
    <Button
     asChild
     className="w-full max-w-xs bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
    >
     <a href={config.hero.ctaLink}>{config.hero.ctaText}</a>
    </Button>
   </div>
  </section>
 );
}
