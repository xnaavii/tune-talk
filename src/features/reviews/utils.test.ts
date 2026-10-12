import { describe, expect, it } from "vitest";
import { averageRating } from "./utils";

describe("averageRating", () => {
	it("averages ratings and ignores unrated comments", () => {
		expect(averageRating([{ rating: 4 }, { rating: 0 }, { rating: 5 }])).toBe(
			4.5,
		);
	});

	it("is 0 with no ratings", () => {
		expect(averageRating([])).toBe(0);
		expect(averageRating([{ rating: 0 }])).toBe(0);
	});
});
