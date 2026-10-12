import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi, Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";
import { reviewQueries } from "#/features/reviews/queries";
import { authClient } from "#/lib/auth-client";
import { AuthField } from "../components/AuthField";
import { SubmitButton } from "../components/SubmitButton";

const formSchema = z.object({
	name: z.string().trim().min(1, "Name is required").max(50),
	email: z.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

const routeApi = getRouteApi("/auth/signup");

export function SignupForm() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { redirect } = routeApi.useSearch();

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await authClient.signUp.email(value);

			if (error) {
				toast.error(error.message ?? "Could not create your account");
				return;
			}

			queryClient.removeQueries({ queryKey: reviewQueries.all() });
			toast.success(`Welcome to Tune Talk, ${data.user.name}`);
			router.history.push(redirect ?? "/");
		},
	});

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<div className="flex flex-col items-center gap-1 text-center">
				<h2 className="text-2xl font-bold">Create an account</h2>
				<p className="text-sm text-stone-300">
					Sign up to rate and review albums
				</p>
			</div>
			<form.Field name="name">
				{(field) => (
					<AuthField
						field={field}
						label="Name"
						placeholder="Shown on your reviews"
						autoComplete="name"
					/>
				)}
			</form.Field>
			<form.Field name="email">
				{(field) => (
					<AuthField
						field={field}
						label="Email"
						type="email"
						placeholder="Enter your email address"
						autoComplete="email"
					/>
				)}
			</form.Field>
			<form.Field name="password">
				{(field) => (
					<AuthField
						field={field}
						label="Password"
						type="password"
						placeholder="At least 8 characters"
						autoComplete="new-password"
					/>
				)}
			</form.Field>
			<form.Subscribe>
				{({ canSubmit, isSubmitting }) => (
					<SubmitButton
						disabled={!canSubmit}
						isSubmitting={isSubmitting}
						label="Sign up"
						pendingLabel="Creating account..."
					/>
				)}
			</form.Subscribe>
			<p className="text-center text-sm text-stone-300">
				Already have an account?{" "}
				<Link
					to="/auth/login"
					search={{ redirect }}
					className="text-blue-300 hover:underline"
				>
					Log in
				</Link>
			</p>
		</form>
	);
}
