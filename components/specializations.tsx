"use client";

import type { SiteConfig } from "@/types/site-config";
import { Button } from "@/components/ui/button";

interface SpecializationsProps {
 config: SiteConfig["specializations"];
}

export function Specializations({ config }: SpecializationsProps) {
 if (!config) return null;

 return (
  <section
   id="specialization"
   className="w-full bg-flushOrange-50 flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8"
  >
   <div className="max-w-7xl mx-auto w-full flex flex-col justify-start items-center">
    <div className="flex flex-col mb-8 space-y-4 sm:space-y-8 w-full max-w-4xl">
     <h2 className="font-bold text-4xl lg:text-5xl">{config.title}</h2>
     {config.subtitle && (
      <p className="font-semibold text-base sm:text-lg">{config.subtitle}</p>
     )}
    </div>
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center w-full max-w-4xl">
     <div>
      <ul className="space-y-3 text-left">
       <p className="font-semibold">Je suis spécialisée en</p>
       {config.mainList.map((item) => (
        <li
         key={item.id}
         className="relative pl-8 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-royalPurple-500"
        >
         <h4>{item.title}</h4>
        </li>
       ))}
      </ul>
     </div>
     <div>
      <ul className="space-y-3 text-left">
       <p className="font-semibold">Mais aussi</p>
       {config.secondaryList.map((item) => (
        <li
         key={item.id}
         className="relative pl-8 before:content-[''] before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:w-4 before:h-4 before:rounded-full before:bg-royalPurple-500"
        >
         <h4>{item.title}</h4>
        </li>
       ))}
       {config.ctaText && config.ctaLink && (
        <li>
         <Button
          className="mt-3 w-full md:w-fit bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
          asChild
         >
          <a href={config.ctaLink}>{config.ctaText}</a>
         </Button>
        </li>
       )}
      </ul>
     </div>
    </div>
   </div>
  </section>
 );
}
