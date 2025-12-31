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
import type { SiteConfig } from "@/types/site-config";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";

interface KinesitherapyEditorProps {
	config: SiteConfig;
	onUpdate: (updates: Partial<SiteConfig>) => void;
}

export function KinesitherapyEditor({
	config,
	onUpdate,
}: KinesitherapyEditorProps) {
	const kinesitherapy = config.kinesitherapy || {
		title: "Kinésithérapie ?",
		content: [],
		image: "",
	};

	const updateKinesitherapy = (field: string, value: any) => {
		onUpdate({
			kinesitherapy: {
				...kinesitherapy,
				[field]: value,
			},
		});
	};

	const addParagraph = () => {
		updateKinesitherapy("content", [...kinesitherapy.content, ""]);
	};

	const removeParagraph = (index: number) => {
		updateKinesitherapy(
			"content",
			kinesitherapy.content.filter((_, i) => i !== index),
		);
	};

	const updateParagraph = (index: number, value: string) => {
		updateKinesitherapy(
			"content",
			kinesitherapy.content.map((p, i) => (i === index ? value : p)),
		);
	};

	return (
		<Card className="border-0 shadow-lg">
			<CardHeader>
				<CardTitle>Section Kinésithérapie</CardTitle>
				<CardDescription>
					Configurez la section explicative de la kinésithérapie
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-2">
					<Label htmlFor="kineTitle">Titre</Label>
					<Input
						id="kineTitle"
						value={kinesitherapy.title}
						onChange={(e) => updateKinesitherapy("title", e.target.value)}
						placeholder="Kinésithérapie ?"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="kineImage">Image URL</Label>
					<Input
						id="kineImage"
						value={kinesitherapy.image}
						onChange={(e) => updateKinesitherapy("image", e.target.value)}
						placeholder="https://example.com/image.svg"
					/>
					<p className="text-sm text-muted-foreground">
						URL de l'image illustrative
					</p>
					{kinesitherapy.image && (
						<div className="mt-2">
							<Image
								src={kinesitherapy.image}
								alt="Aperçu"
								width={640}
								height={180}
								className="w-full max-w-md h-32 object-cover border border-border rounded"
								onError={() => {}}
							/>
						</div>
					)}
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<Label>Paragraphes de contenu</Label>
						<Button
							type="button"
							size="sm"
							onClick={addParagraph}
							className="flex items-center gap-2"
						>
							<Plus className="w-4 h-4" />
							Ajouter un paragraphe
						</Button>
					</div>
					<div className="space-y-3">
						{kinesitherapy.content.map((paragraph, index) => (
							<div key={index} className="flex gap-2 items-start">
								<Textarea
									value={paragraph}
									onChange={(e) => updateParagraph(index, e.target.value)}
									placeholder="Texte du paragraphe..."
									rows={3}
									className="flex-1"
								/>
								<Button
									type="button"
									size="icon"
									variant="destructive"
									onClick={() => removeParagraph(index)}
								>
									<Trash2 className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
