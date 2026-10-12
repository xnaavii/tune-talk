import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/forms/LoginForm";
import { redirectSearchSchema } from "#/lib/redirect";

export const Route = createFileRoute("/auth/login")({
	component: LoginForm,
	validateSearch: redirectSearchSchema,
});
