"use client";

import type { SiteConfig } from "@/types/site-config";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MethodologyProps {
	config: SiteConfig["methodology"];
}

export function Methodology({ config }: MethodologyProps) {
	if (!config) return null;

	return (
		<section
			id="methodo"
			className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white"
		>
			<div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
				<div className="w-full max-w-lg flex flex-col">
				<h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">{config.title}</h2>
				<div className="space-y-4">
					{config.content.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
				{config.ctaText && config.ctaLink && (
					<div className="mt-6 sm:mt-8">
						<Button className="w-full md:w-fit bg-flushOrange-500 hover:bg-flushOrange-600 text-white" asChild>
							<a href={config.ctaLink}>{config.ctaText}</a>
						</Button>
					</div>
				)}
			</div>
			<div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg mb-6 lg:mb-0 aspect-square">
				<Image
					src={config.image}
					alt={config.title}
					fill
					className="object-contain"
				/>
			</div>
			</div>
		</section>
	);
}
