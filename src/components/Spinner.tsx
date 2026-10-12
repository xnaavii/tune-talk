export function Spinner() {
	return (
		<output
			aria-label="Loading"
			className="flex items-center justify-center h-full py-10"
		>
			<div className="animate-spin rounded-full size-9 border-3 border-ink/30 border-t-ink" />
		</output>
	);
}
