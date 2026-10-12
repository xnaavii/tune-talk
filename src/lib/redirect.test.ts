import { describe, expect, it } from "vitest";
import { redirectSearchSchema } from "./redirect";

describe("redirectSearchSchema", () => {
	it("keeps same-site paths", () => {
		expect(redirectSearchSchema.parse({ redirect: "/reviews" })).toEqual({
			redirect: "/reviews",
		});
	});

	it("drops redirects to other sites", () => {
		for (const redirect of ["https://evil.example", "//evil.example"]) {
			expect(redirectSearchSchema.parse({ redirect }).redirect).toBeUndefined();
		}
	});
});
