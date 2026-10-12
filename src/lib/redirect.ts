import { z } from "zod";

// Post-login redirect target. Only same-site paths are allowed, so a crafted
// link can't send users to another site after they log in.
export const redirectSearchSchema = z.object({
	redirect: z
		.string()
		.refine((path) => path.startsWith("/") && !path.startsWith("//"))
		.optional()
		.catch(undefined),
});
