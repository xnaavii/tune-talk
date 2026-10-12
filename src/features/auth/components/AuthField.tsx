import type { AnyFieldApi } from "@tanstack/react-form";

interface AuthFieldProps {
	field: AnyFieldApi;
	label: string;
	type?: "text" | "email" | "password";
	placeholder?: string;
	autoComplete?: string;
}

// A labelled input bound to a TanStack Form field, shared by the auth forms.
export function AuthField({
	field,
	label,
	type = "text",
	placeholder,
	autoComplete,
}: AuthFieldProps) {
	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
	const errorId = `${field.name}-error`;

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={field.name} className="text-sm text-stone-200">
				{label}
			</label>
			<input
				id={field.name}
				name={field.name}
				type={type}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(event) => field.handleChange(event.target.value)}
				placeholder={placeholder}
				autoComplete={autoComplete}
				aria-invalid={isInvalid}
				aria-describedby={isInvalid ? errorId : undefined}
				className="text-[14px] w-full px-4 py-[10px] text-[#FFFFFF] outline-none focus:ring-2 focus:ring-stone-100 rounded-[32px] focus:ring-inset placeholder:text-[#BABFC4] backdrop-blur-[10px] bg-[#C9CED3]/16 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)] aria-invalid:ring-2 aria-invalid:ring-red-400"
			/>
			{isInvalid && (
				<p id={errorId} className="text-xs text-red-300">
					{field.state.meta.errors
						.map((error) => error?.message ?? String(error))
						.join(", ")}
				</p>
			)}
		</div>
	);
}
