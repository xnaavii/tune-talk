import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

const buttonClass =
	"w-fit h-fit py-[6px] px-[8px] rounded-[16px] flex items-center justify-between gap-[6px] bg-[#C2E1FA]/20 text-[#F8F9FA] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] backdrop-blur-[23.2px] hover:cursor-pointer hover:bg-[#C2E1FA]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200";

interface ButtonContentProps {
	label?: string;
	icon?: IconType;
}

function ButtonContent({ label, icon: Icon }: ButtonContentProps) {
	return (
		<>
			{label && <span className="text-[12px] flex-1/2">{label}</span>}
			{Icon && <Icon className="w-[14px] h-[14px] text-[#F8F9FA]" />}
		</>
	);
}

export function Button({
	label,
	icon,
	type = "button",
	...props
}: ButtonContentProps & ComponentProps<"button">) {
	return (
		<button type={type} {...props} className={buttonClass}>
			<ButtonContent label={label} icon={icon} />
		</button>
	);
}

// A link styled as a Button, so navigation never nests a button in a link.
export function ButtonLink({
	label,
	icon,
	...props
}: ButtonContentProps & LinkProps) {
	return (
		<Link {...props} className={buttonClass}>
			<ButtonContent label={label} icon={icon} />
		</Link>
	);
}
