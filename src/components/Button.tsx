import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

export const buttonClass =
	"h-fit w-fit inline-flex items-center gap-[6px] rounded-full py-[6px] px-[10px] bg-glass/20 text-ink text-[12px] shadow-soft backdrop-blur-[23px] hover:bg-glass/35 active:bg-glass/45 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

// Current page in the nav reads as pressed.
export const activeClass = "bg-glass/45 ring-1 ring-ink/40";

interface ButtonContentProps {
	label?: string;
	icon?: IconType;
	// Classes for the label, e.g. "max-lg:sr-only" for icon-only on small screens.
	labelClassName?: string;
}

function ButtonContent({
	label,
	icon: Icon,
	labelClassName,
}: ButtonContentProps) {
	return (
		<>
			{label && <span className={labelClassName}>{label}</span>}
			{Icon && <Icon aria-hidden className="size-[14px]" />}
		</>
	);
}

export function Button({
	label,
	icon,
	labelClassName,
	type = "button",
	className = "",
	...props
}: ButtonContentProps & ComponentProps<"button">) {
	return (
		<button type={type} {...props} className={`${buttonClass} ${className}`}>
			<ButtonContent
				label={label}
				icon={icon}
				labelClassName={labelClassName}
			/>
		</button>
	);
}

// A link styled as a Button, so navigation never nests a button in a link.
export function ButtonLink({
	label,
	icon,
	labelClassName,
	...props
}: ButtonContentProps & LinkProps) {
	return (
		<Link
			{...props}
			className={buttonClass}
			activeProps={{ className: activeClass }}
		>
			<ButtonContent
				label={label}
				icon={icon}
				labelClassName={labelClassName}
			/>
		</Link>
	);
}

// Round icon-only glass button (back, remove rating).
export function IconButton({
	icon: Icon,
	label,
	className = "",
	...props
}: { icon: IconType; label: string } & ComponentProps<"button">) {
	return (
		<button
			type="button"
			aria-label={label}
			title={label}
			{...props}
			className={`inline-flex items-center justify-center size-9 rounded-full bg-glass/15 text-ink hover:bg-glass/30 active:bg-glass/40 transition-colors cursor-pointer ${className}`}
		>
			<Icon aria-hidden className="size-5" />
		</button>
	);
}
