import type { ReactNode } from "react";

interface StatusMessageProps {
	children: ReactNode;
	tone?: "muted" | "error";
	action?: ReactNode;
}

// Empty, error and hint states, styled the same on every page.
export function StatusMessage({
	children,
	tone = "muted",
	action,
}: StatusMessageProps) {
	return (
		<div
			role={tone === "error" ? "alert" : undefined}
			className="glass-card flex flex-col items-center gap-3 px-6 py-10 text-center"
		>
			<p
				className={`text-sm ${tone === "error" ? "text-red-300" : "text-ink/70"}`}
			>
				{children}
			</p>
			{action}
		</div>
	);
}
