import { Link } from "@tanstack/react-router";
import { activeClass, buttonClass } from "#/components/Button";
import { CHART_COUNTRIES, type ChartCountry } from "../countries";

// Storefront pills that switch which country's chart is shown.
export function CountryPicker({
	selected,
	type,
}: {
	selected?: ChartCountry;
	type: "albums" | "songs";
}) {
	return (
		<nav aria-label="Country" className="flex flex-wrap gap-2">
			{Object.entries(CHART_COUNTRIES).map(([code, country]) => (
				<Link
					key={code}
					to="/charts"
					search={{ type, country: code as ChartCountry }}
					aria-current={code === selected ? "true" : undefined}
					className={`${buttonClass} ${code === selected ? activeClass : ""}`}
				>
					<span aria-hidden>{country.flag}</span>
					{country.name}
				</Link>
			))}
		</nav>
	);
}
