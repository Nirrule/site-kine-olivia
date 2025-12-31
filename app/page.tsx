"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Kinesitherapy } from "@/components/kinesitherapy";
import { Methodology } from "@/components/methodology";
import { PracticalInfo } from "@/components/practical-info";
import { Specializations } from "@/components/specializations";
import { reloadSiteConfig } from "@/lib/site-data";
import type { SiteConfig } from "@/types/site-config";

export default function HomePage() {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadConfig = async () => {
			try {
				const siteConfig = await reloadSiteConfig();
				setConfig(siteConfig);
			} catch (error) {
				console.error("Failed to load site configuration:", error);
			} finally {
				setLoading(false);
			}
		};

		loadConfig();

		const handleFocus = () => {
			loadConfig();
		};

		window.addEventListener("focus", handleFocus);
		return () => window.removeEventListener("focus", handleFocus);
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
			</div>
		);
	}

	if (!config) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-destructive mb-4">
						Erreur de configuration
					</h1>
					<p className="text-muted-foreground">
						Impossible de charger la configuration du site.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen">
			<Header config={config} />
			<main>
				<Hero config={config} />
				<Specializations config={config.specializations} />
				<Kinesitherapy config={config.kinesitherapy} />
				<Methodology config={config.methodology} />
				<PracticalInfo config={config.practicalInfo} />
			</main>
			<Footer config={config} />
		</div>
	);
}
