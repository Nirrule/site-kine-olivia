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
import type { SiteConfig, PricingInfo, InfoBlock } from "@/types/site-config";
import { Plus, Trash2 } from "lucide-react";

interface PracticalInfoEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function PracticalInfoEditor({
	config,
	onUpdate,
}: PracticalInfoEditorProps) {
	const practicalInfo = config.practicalInfo || {
		title: "Infos pratiques",
		sessionDuration: "",
		pricing: [],
		reminders: [],
		infoBlocks: [],
		ctaText: "",
		ctaLink: "",
	};

	const updatePracticalInfo = (field: string, value: any) => {
		onUpdate({
			practicalInfo: {
				...practicalInfo,
				[field]: value,
			},
		});
	};

	// Pricing methods
	const addPricing = () => {
		const newPricing: PricingInfo = {
			id: `price-${Date.now()}`,
			label: "",
			price: "",
			duration: "",
		};
		updatePracticalInfo("pricing", [...practicalInfo.pricing, newPricing]);
	};

	const removePricing = (id: string) => {
		updatePracticalInfo(
			"pricing",
			practicalInfo.pricing.filter((p) => p.id !== id),
		);
	};

	const updatePricing = (
		id: string,
		field: keyof PricingInfo,
		value: string,
	) => {
		updatePracticalInfo(
			"pricing",
			practicalInfo.pricing.map((p) =>
				p.id === id ? { ...p, [field]: value } : p,
			),
		);
	};

	// Reminder methods
	const addReminder = () => {
		updatePracticalInfo("reminders", [...practicalInfo.reminders, ""]);
	};

	const removeReminder = (index: number) => {
		updatePracticalInfo(
			"reminders",
			practicalInfo.reminders.filter((_, i) => i !== index),
		);
	};

	const updateReminder = (index: number, value: string) => {
		updatePracticalInfo(
			"reminders",
			practicalInfo.reminders.map((r, i) => (i === index ? value : r)),
		);
	};

	// InfoBlock methods
	const addInfoBlock = () => {
		const newBlock: InfoBlock = {
			id: `block-${Date.now()}`,
			title: "",
			content: "",
		};
		updatePracticalInfo("infoBlocks", [
			...practicalInfo.infoBlocks,
			newBlock,
		]);
	};

	const removeInfoBlock = (id: string) => {
		updatePracticalInfo(
			"infoBlocks",
			practicalInfo.infoBlocks.filter((b) => b.id !== id),
		);
	};

	const updateInfoBlock = (
		id: string,
		field: keyof InfoBlock,
		value: string,
	) => {
		updatePracticalInfo(
			"infoBlocks",
			practicalInfo.infoBlocks.map((b) =>
				b.id === id ? { ...b, [field]: value } : b,
			),
		);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Section Infos Pratiques</CardTitle>
				<CardDescription>
					Configurez les informations pratiques (tarifs, modalités, etc.)
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="practicalTitle">Titre</Label>
					<Input
						id="practicalTitle"
						value={practicalInfo.title}
						onChange={(e) => updatePracticalInfo("title", e.target.value)}
						placeholder="Infos pratiques"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="sessionDuration">Durée des séances</Label>
					<Input
						id="sessionDuration"
						value={practicalInfo.sessionDuration}
						onChange={(e) =>
							updatePracticalInfo("sessionDuration", e.target.value)
						}
						placeholder="Chaque séance dure 30 minutes."
					/>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Tarification</Label>
						<Button
							type="button"
							size="sm"
							onClick={addPricing}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter un tarif
						</Button>
					</div>
					<div className="space-y-3">
						{practicalInfo.pricing.map((price) => (
							<div key={price.id} className="flex gap-2 items-start">
								<div className="flex-1 grid grid-cols-3 gap-2">
									<Input
										value={price.label}
										onChange={(e) =>
											updatePricing(price.id, "label", e.target.value)
										}
										placeholder="1ère séance"
									/>
									<Input
										value={price.price}
										onChange={(e) =>
											updatePricing(price.id, "price", e.target.value)
										}
										placeholder="38€*"
									/>
									<Input
										value={price.duration || ""}
										onChange={(e) =>
											updatePricing(price.id, "duration", e.target.value)
										}
										placeholder="40 minutes"
									/>
								</div>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removePricing(price.id)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Rappels / Notes</Label>
						<Button
							type="button"
							size="sm"
							onClick={addReminder}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter un rappel
						</Button>
					</div>
					<div className="space-y-3">
						{practicalInfo.reminders.map((reminder, index) => (
							<div key={index} className="flex gap-2 items-start">
								<Input
									value={reminder}
									onChange={(e) => updateReminder(index, e.target.value)}
									placeholder="*(séances conventionnées)"
									className="flex-1"
								/>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removeReminder(index)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Blocs d'information</Label>
						<Button
							type="button"
							size="sm"
							onClick={addInfoBlock}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter un bloc
						</Button>
					</div>
					<div className="space-y-3">
						{practicalInfo.infoBlocks.map((block) => (
							<div key={block.id} className="flex gap-2 items-start">
								<div className="flex-1 space-y-2">
									<Input
										value={block.title}
										onChange={(e) =>
											updateInfoBlock(block.id, "title", e.target.value)
										}
										placeholder="Paiement"
									/>
									<Textarea
										value={block.content}
										onChange={(e) =>
											updateInfoBlock(block.id, "content", e.target.value)
										}
										placeholder="Le paiement peut se faire..."
										rows={2}
									/>
								</div>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removeInfoBlock(block.id)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label htmlFor="practicalCtaText">Texte du bouton</Label>
						<Input
							id="practicalCtaText"
							value={practicalInfo.ctaText}
							onChange={(e) => updatePracticalInfo("ctaText", e.target.value)}
							placeholder="Prendre rendez-vous"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="practicalCtaLink">Lien du bouton</Label>
						<Input
							id="practicalCtaLink"
							value={practicalInfo.ctaLink}
							onChange={(e) => updatePracticalInfo("ctaLink", e.target.value)}
							placeholder="https://..."
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
