"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { SiteConfig, SpecializationItem } from "@/types/site-config";
import { Plus, Trash2 } from "lucide-react";

interface SpecializationsEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function SpecializationsEditor({
	config,
	onUpdate,
}: SpecializationsEditorProps) {
	const specializations = config.specializations || {
		title: "Spécialisations",
		subtitle: "",
		mainList: [],
		secondaryList: [],
		ctaText: "",
		ctaLink: "",
	};

	const updateSpecializations = (field: string, value: any) => {
		onUpdate({
			specializations: {
				...specializations,
				[field]: value,
			},
		});
	};

	const addItem = (listType: "mainList" | "secondaryList") => {
		const newItem: SpecializationItem = {
			id: `spec-${Date.now()}`,
			title: "",
		};
		updateSpecializations(listType, [...specializations[listType], newItem]);
	};

	const removeItem = (listType: "mainList" | "secondaryList", id: string) => {
		updateSpecializations(
			listType,
			specializations[listType].filter((item) => item.id !== id),
		);
	};

	const updateItem = (
		listType: "mainList" | "secondaryList",
		id: string,
		field: string,
		value: string,
	) => {
		updateSpecializations(
			listType,
			specializations[listType].map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Section Spécialisations</CardTitle>
				<CardDescription>
					Configurez les spécialisations affichées sur le site
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="specTitle">Titre principal</Label>
					<Input
						id="specTitle"
						value={specializations.title}
						onChange={(e) => updateSpecializations("title", e.target.value)}
						placeholder="Spécialisations"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="specSubtitle">Sous-titre</Label>
					<Textarea
						id="specSubtitle"
						value={specializations.subtitle}
						onChange={(e) => updateSpecializations("subtitle", e.target.value)}
						placeholder="Description des spécialisations..."
						rows={3}
					/>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Spécialisations principales</Label>
						<Button
							type="button"
							size="sm"
							onClick={() => addItem("mainList")}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter
						</Button>
					</div>
					<div className="space-y-3">
						{specializations.mainList.map((item) => (
							<div key={item.id} className="flex gap-2 items-start">
								<Input
									value={item.title}
									onChange={(e) =>
										updateItem("mainList", item.id, "title", e.target.value)
									}
									placeholder="Titre de la spécialisation"
									className="flex-1"
								/>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removeItem("mainList", item.id)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Spécialisations secondaires</Label>
						<Button
							type="button"
							size="sm"
							onClick={() => addItem("secondaryList")}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter
						</Button>
					</div>
					<div className="space-y-3">
						{specializations.secondaryList.map((item) => (
							<div key={item.id} className="flex gap-2 items-start">
								<Input
									value={item.title}
									onChange={(e) =>
										updateItem("secondaryList", item.id, "title", e.target.value)
									}
									placeholder="Titre de la spécialisation"
									className="flex-1"
								/>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removeItem("secondaryList", item.id)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="specCtaText">Texte du bouton</Label>
						<Input
							id="specCtaText"
							value={specializations.ctaText}
							onChange={(e) => updateSpecializations("ctaText", e.target.value)}
							placeholder="Prendre rendez-vous"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="specCtaLink">Lien du bouton</Label>
						<Input
							id="specCtaLink"
							value={specializations.ctaLink}
							onChange={(e) => updateSpecializations("ctaLink", e.target.value)}
							placeholder="https://..."
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
