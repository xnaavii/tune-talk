import { beforeEach, describe, expect, it, vi } from "vitest";

const chartGet = vi.fn();
const legacyChartGet = vi.fn();
const lookupSongs = vi.fn((ids: string[]) => Promise.resolve(ids));

vi.mock("#/lib/apple-music", () => ({ chartGet, legacyChartGet }));
vi.mock("#/features/songs/server/songs.server", () => ({ lookupSongs }));

const { fetchTopAlbums, fetchTopSongs } = await import("./charts.server");

const legacyEntry = (id: string) => ({
	"im:name": { label: `Album ${id}` },
	"im:artist": { label: "Artist" },
	id: { attributes: { "im:id": id } },
});

beforeEach(() => {
	vi.clearAllMocks();
	vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("chart fallback", () => {
	it("uses the Apple Music chart when it answers", async () => {
		chartGet.mockResolvedValue({
			feed: { results: [{ id: "1", name: "A", artistName: "B" }] },
		});
		const albums = await fetchTopAlbums("us");
		expect(albums.map((album) => album.id)).toEqual(["1"]);
		expect(legacyChartGet).not.toHaveBeenCalled();
	});

	it("falls back to the iTunes chart when the Apple Music chart fails", async () => {
		chartGet.mockRejectedValue(new Error("504"));
		legacyChartGet.mockResolvedValue({ feed: { entry: [legacyEntry("2")] } });
		const albums = await fetchTopAlbums("gb");
		expect(albums.map((album) => album.id)).toEqual(["2"]);
		expect(legacyChartGet).toHaveBeenCalledWith(
			"/rss/topalbums/limit=50/json",
			"gb",
		);
	});

	it("falls back for songs when the Apple Music chart is empty", async () => {
		chartGet.mockResolvedValue({ feed: { results: [] } });
		legacyChartGet.mockResolvedValue({ feed: { entry: legacyEntry("3") } });
		expect(await fetchTopSongs("us")).toEqual(["3"]);
	});
});
