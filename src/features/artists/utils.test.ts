import { describe, expect, it } from "vitest";
import type { Album } from "#/features/albums/types";
import { isSingleOrEp } from "#/features/albums/utils";
import { artistIdSchema, byReleaseDate, uniqueReleases } from "./utils";

const album = (
	id: string,
	title: string,
	releaseDate = "2024-01-01",
): Album => ({
	id,
	title,
	artist: "Artist",
	releaseDate,
	image: null,
	appleMusicUrl: null,
});

describe("uniqueReleases", () => {
	it("drops the clean copy of an explicit release", () => {
		expect(
			uniqueReleases([
				album("1", "SOS"),
				album("2", "sos"),
				album("3", "Ctrl"),
			]),
		).toHaveLength(2);
	});

	it("treats a single and the album of the same name as one release", () => {
		expect(
			uniqueReleases([album("1", "Saturn - Single"), album("2", "Saturn")]),
		).toHaveLength(1);
	});
});

describe("byReleaseDate", () => {
	it("puts the newest release first", () => {
		const sorted = [
			album("1", "Old", "2017-06-09"),
			album("2", "New", "2024-12-20"),
		].sort(byReleaseDate);
		expect(sorted[0].id).toBe("2");
	});
});

describe("isSingleOrEp", () => {
	it("reads singles and EPs from the title", () => {
		expect(isSingleOrEp({ title: "Saturn - Single" })).toBe(true);
		expect(isSingleOrEp({ title: "Naked in North America - EP" })).toBe(true);
		expect(isSingleOrEp({ title: "SOS" })).toBe(false);
	});
});

describe("artistIdSchema", () => {
	it("accepts numeric Apple Music ids only", () => {
		expect(artistIdSchema.safeParse({ artistId: "605800394" }).success).toBe(
			true,
		);
		expect(artistIdSchema.safeParse({ artistId: "sza" }).success).toBe(false);
	});
});
