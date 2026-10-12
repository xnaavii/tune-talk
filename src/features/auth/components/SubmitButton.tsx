interface SubmitButtonProps {
	disabled: boolean;
	isSubmitting: boolean;
	label: string;
	pendingLabel: string;
}

export function SubmitButton({
	disabled,
	isSubmitting,
	label,
	pendingLabel,
}: SubmitButtonProps) {
	return (
		<button
			type="submit"
			disabled={disabled}
			className="mt-1 w-full rounded-full bg-ink py-[10px] text-sm font-semibold text-navy shadow-soft transition-colors hover:bg-glass disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
		>
			{isSubmitting ? pendingLabel : label}
		</button>
	);
}
