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
	email: z.email("Please enter a valid email address"),
	password: z.string().min(1, "Password is required"),
});

const routeApi = getRouteApi("/auth/login");

export function LoginForm() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { redirect } = routeApi.useSearch();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			const { data, error } = await authClient.signIn.email(value);

			if (error) {
				toast.error(error.message ?? "Could not log in");
				return;
			}

			queryClient.removeQueries({ queryKey: reviewQueries.all() });
			toast.success(`Logged in as ${data.user.email}`);
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
				<h2 className="text-2xl font-bold">Log in to your account</h2>
				<p className="text-sm text-stone-300">
					Log in to rate and review albums
				</p>
			</div>
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
						placeholder="Enter password"
						autoComplete="current-password"
					/>
				)}
			</form.Field>
			<form.Subscribe>
				{({ canSubmit, isSubmitting }) => (
					<SubmitButton
						disabled={!canSubmit}
						isSubmitting={isSubmitting}
						label="Log in"
						pendingLabel="Logging in..."
					/>
				)}
			</form.Subscribe>
			<p className="text-center text-sm text-stone-300">
				Don&apos;t have an account?{" "}
				<Link
					to="/auth/signup"
					search={{ redirect }}
					className="text-blue-300 hover:underline"
				>
					Sign up
				</Link>
			</p>
		</form>
	);
}
