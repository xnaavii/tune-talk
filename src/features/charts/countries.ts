import { z } from "zod";

// Apple Music storefronts the charts page can switch between.
export const CHART_COUNTRIES = {
	us: { name: "United States", flag: "🇺🇸" },
	gb: { name: "United Kingdom", flag: "🇬🇧" },
	ca: { name: "Canada", flag: "🇨🇦" },
	au: { name: "Australia", flag: "🇦🇺" },
	de: { name: "Germany", flag: "🇩🇪" },
	fr: { name: "France", flag: "🇫🇷" },
	es: { name: "Spain", flag: "🇪🇸" },
	it: { name: "Italy", flag: "🇮🇹" },
	se: { name: "Sweden", flag: "🇸🇪" },
	rs: { name: "Serbia", flag: "🇷🇸" },
	br: { name: "Brazil", flag: "🇧🇷" },
	mx: { name: "Mexico", flag: "🇲🇽" },
	jp: { name: "Japan", flag: "🇯🇵" },
	kr: { name: "South Korea", flag: "🇰🇷" },
	in: { name: "India", flag: "🇮🇳" },
	ng: { name: "Nigeria", flag: "🇳🇬" },
} as const;

export type ChartCountry = keyof typeof CHART_COUNTRIES;

export const chartCountrySchema = z
	.enum(Object.keys(CHART_COUNTRIES) as [ChartCountry, ...ChartCountry[]])
	.catch("us");
