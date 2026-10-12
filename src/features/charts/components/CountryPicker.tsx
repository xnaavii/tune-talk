import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CHART_COUNTRIES, type ChartCountry } from "../countries";

const chipClass =
	"inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ring-1 transition-colors";

// Storefront chips that switch which country's chart is shown.
export function CountryPicker({
	selected,
	type,
}: {
	selected?: ChartCountry;
	type: "albums" | "songs";
}) {
	const selectedRef = useRef<HTMLAnchorElement>(null);

	// Bring the selected country into view when the picker scrolls.
	useEffect(() => {
		selectedRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
	}, []);

	return (
		<div className="shelf !auto-cols-max !gap-2 -mx-4 px-4 sm:-mx-8 sm:px-8">
			{Object.entries(CHART_COUNTRIES).map(([code, country]) => {
				const isSelected = code === selected;
				return (
					<Link
						key={code}
						ref={isSelected ? selectedRef : undefined}
						to="/charts"
						search={{ type, country: code as ChartCountry }}
						aria-current={isSelected ? "true" : undefined}
						className={`${chipClass} ${
							isSelected
								? "bg-ink text-navy-deep ring-ink"
								: "bg-glass/10 text-ink/80 ring-ink/10 hover:bg-glass/20 hover:text-ink"
						}`}
					>
						<span aria-hidden>{country.flag}</span>
						{country.name}
					</Link>
				);
			})}
		</div>
	);
}
