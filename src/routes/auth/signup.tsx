import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "#/features/auth/forms/SignupForm";
import { redirectSearchSchema } from "#/lib/redirect";

export const Route = createFileRoute("/auth/signup")({
	component: SignupForm,
	validateSearch: redirectSearchSchema,
});
