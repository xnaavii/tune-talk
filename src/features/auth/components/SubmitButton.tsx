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
			className="w-full py-[10px] rounded-[32px] bg-[#C2E1FA]/30 hover:bg-[#C2E1FA]/45 text-[#F8F9FA] text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
		>
			{isSubmitting ? pendingLabel : label}
		</button>
	);
}
