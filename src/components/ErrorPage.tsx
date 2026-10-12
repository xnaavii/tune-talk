import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";

export function ErrorPage({ error }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center h-full gap-3 text-center">
			<h3 className="text-2xl font-bold text-stone-100">
				Something went wrong
			</h3>
			<p className="text-red-300">
				{error instanceof Error ? error.message : "Unknown error"}
			</p>
			<button
				type="button"
				onClick={() => router.invalidate()}
				className="text-blue-300 hover:underline font-medium"
			>
				Try again
			</button>
		</div>
	);
}
