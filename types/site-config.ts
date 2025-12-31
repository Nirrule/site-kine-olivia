export interface SiteConfig {
	version: string;
	metadata: {
		title: string;
		description: string;
		keywords: string[];
	};
	branding: {
		companyName: string;
		logo: string;
		favicon: string;
	};
	// Theme configuration (key-value color map)
	theme: {
		[key: string]: string;
	};

	contact: {
		phone: string;
		email: string;
		address: string;
		city: string;
		postalCode: string;
	};
	hero: {
		title: string;
		subtitle: string;
		description: string;
		backgroundImage: string;
		ctaText: string;
		ctaLink: string;
		stats?: HeroStat[];
	};
	specializations?: {
		title: string;
		subtitle: string;
		mainList: SpecializationItem[];
		secondaryList: SpecializationItem[];
		ctaText?: string;
		ctaLink?: string;
	};
	services: Service[];
	kinesitherapy?: {
		title: string;
		content: string[];
		image: string;
	};
	methodology?: {
		title: string;
		content: string[];
		image: string;
		ctaText?: string;
		ctaLink?: string;
	};
	practicalInfo?: {
		title: string;
		sessionDuration: string;
		pricing: PricingInfo[];
		reminders: string[];
		infoBlocks: InfoBlock[];
		ctaText?: string;
		ctaLink?: string;
	};
	about: {
		title: string;
		description: string;
		image: string;
		features: string[];
	};
	gallery: {
		title: string;
		images: GalleryImage[];
		categories: string[];
	};
	footer: {
		description: string;
		socialLinks: SocialLink[];
		quickLinks: QuickLink[];
	};
	lastModified?: string;
}

interface HeroStat {
	id: string;
	icon: string;
	value: string | number;
	label: string;
}

export interface SpecializationItem {
	id: string;
	title: string;
}

export interface PricingInfo {
	id: string;
	label: string;
	price: string;
	duration?: string;
}

export interface InfoBlock {
	id: string;
	title: string;
	content: string;
}

export interface Service {
	id: string;
	title: string;
	description: string;
	image: string;
	price?: string;
	features: string[];
	icon: string;
}

export interface GalleryImage {
	id: string;
	url: string;
	alt: string;
	category: string;
	title?: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

export interface QuickLink {
	title: string;
	url: string;
}

export interface AdminConfig {
	adminCode: string;
	lastUpdated: string;
	sessionTimeout: number; // in minutes
	maxLoginAttempts: number;
	lockoutDuration: number; // in minutes
	allowedIPs?: string[];
}

export interface LoginAttempt {
	ip: string;
	timestamp: string;
	success: boolean;
}

export interface AdminSession {
	token: string;
	createdAt: string;
	expiresAt: string;
	ip: string;
}
