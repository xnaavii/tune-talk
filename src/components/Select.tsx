import type { ComponentProps } from "react";
import { IoChevronDown } from "react-icons/io5";

interface SelectProps extends Omit<ComponentProps<"select">, "onChange"> {
	label: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
}

// Native select in the glass pill style. 16px text keeps iOS Safari from
// zooming in on focus.
export function Select({
	label,
	options,
	onChange,
	className = "",
	...props
}: SelectProps) {
	return (
		<label className={`relative inline-flex ${className}`}>
			<span className="sr-only">{label}</span>
			<select
				{...props}
				onChange={(event) => onChange(event.target.value)}
				className="glass-input appearance-none cursor-pointer py-2! pr-10 [&>option]:bg-navy [&>option]:text-ink"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<IoChevronDown
				aria-hidden
				className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/80"
			/>
		</label>
	);
}
