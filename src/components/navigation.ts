import type { IconType } from "react-icons";
import {
	IoCompass,
	IoCompassOutline,
	IoPerson,
	IoPersonOutline,
	IoPodium,
	IoPodiumOutline,
	IoSearch,
	IoSearchOutline,
	IoStar,
	IoStarOutline,
} from "react-icons/io5";

export interface NavItem {
	to: "/explore" | "/search" | "/charts" | "/popular" | "/reviews";
	label: string;
	icon: IconType;
	activeIcon: IconType;
}

// App sections, shared by the sidebar and the phone tab bar.
export const DISCOVER_ITEMS: NavItem[] = [
	{
		to: "/explore",
		label: "Explore",
		icon: IoCompassOutline,
		activeIcon: IoCompass,
	},
	{
		to: "/search",
		label: "Search",
		icon: IoSearchOutline,
		activeIcon: IoSearch,
	},
	{
		to: "/charts",
		label: "Charts",
		icon: IoPodiumOutline,
		activeIcon: IoPodium,
	},
];

export const COMMUNITY_ITEMS: NavItem[] = [
	{ to: "/popular", label: "Popular", icon: IoStarOutline, activeIcon: IoStar },
	{
		to: "/reviews",
		label: "Your Reviews",
		icon: IoPersonOutline,
		activeIcon: IoPerson,
	},
];
