"use client";

import type { SiteConfig } from "@/types/site-config";
import { Button } from "@/components/ui/button";

interface PracticalInfoProps {
	config: SiteConfig["practicalInfo"];
}

export function PracticalInfo({ config }: PracticalInfoProps) {
	if (!config) return null;

	return (
		<section
			id="practicalInfo"
			className="w-full bg-royalPurple-100 py-24 px-4 sm:px-6 lg:px-8"
		>
			<div className="max-w-7xl mx-auto">
				<h2 className="text-center text-4xl lg:text-5xl font-bold text-foreground mb-16">{config.title}</h2>
				<div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12">
				<div className="w-full lg:w-1/2 flex flex-col">
					{config.sessionDuration && (
						<p className="mb-5">{config.sessionDuration}</p>
					)}
					{config.pricing.map((price) => (
						<p key={price.id} className="mb-5">
							{price.label}: {price.price}
							{price.duration && ` / ${price.duration}`}
						</p>
					))}
					{config.reminders.map((reminder, index) => (
						<p key={index} className={index < config.reminders.length - 1 ? "mb-5" : "mb-8"}>
							{reminder}
						</p>
					))}
					{config.ctaText && config.ctaLink && (
						<div className="w-full space-y-4 mt-6">
							<Button
								asChild
								className="w-full md:w-fit bg-flushOrange-500 hover:bg-flushOrange-600 text-white"
							>
								<a href={config.ctaLink}>{config.ctaText}</a>
							</Button>
							<p>La prise de rendez-vous se fait par le biais de doctoranytime.be</p>
						</div>
					)}
				</div>
				<div className="w-full lg:w-1/2 flex flex-col gap-y-6">
					{config.infoBlocks.map((block) => (
						<div key={block.id} className="space-y-2">
							<h3>{block.title}</h3>
							<p className="whitespace-pre-line">{block.content}</p>
						</div>
					))}
				</div>
			</div>
			</div>
		</section>
	);
}
