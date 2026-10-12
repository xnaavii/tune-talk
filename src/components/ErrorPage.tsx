import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { Button } from "./Button";
import { StatusMessage } from "./StatusMessage";

export function ErrorPage({ error }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<StatusMessage
			tone="error"
			action={<Button label="Try again" onClick={() => router.invalidate()} />}
		>
			{error instanceof Error ? error.message : "Something went wrong"}
		</StatusMessage>
	);
}
