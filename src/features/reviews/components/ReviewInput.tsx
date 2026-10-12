import { Button } from "#/components/Button";

interface ReviewInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	isEditing: boolean;
	disabled?: boolean;
}

export const REVIEW_MAX_LENGTH = 250;

export function ReviewInput({
	value,
	onChange,
	onSubmit,
	isEditing,
	disabled,
}: ReviewInputProps) {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit();
			}}
			className="glass-card flex flex-col gap-2 p-3"
		>
			<textarea
				name="review"
				aria-label="Your review"
				placeholder={
					isEditing ? "Update your review" : "What did you think of it?"
				}
				rows={3}
				maxLength={REVIEW_MAX_LENGTH}
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="w-full resize-none rounded-lg bg-navy/30 p-3 text-base text-ink placeholder:text-ink/50 outline-none ring-1 ring-ink/15 focus:ring-2 focus:ring-ink/60"
			/>
			<div className="flex items-center justify-between gap-2">
				<span className="text-xs tabular-nums text-ink/50">
					{value.length}/{REVIEW_MAX_LENGTH}
				</span>
				<Button
					type="submit"
					label={isEditing ? "Update review" : "Post review"}
					disabled={disabled || !value.trim()}
				/>
			</div>
		</form>
	);
}
