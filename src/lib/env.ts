// Reads a required server env var, failing with a message that says how to fix it.
export function requireEnv(name: string) {
	const value = process.env[name];
	if (!value) {
		throw new Error(
			`${name} is not set. Add it to your environment variables (see .env.example).`,
		);
	}
	return value;
}
