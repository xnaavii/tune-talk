import { afterEach, describe, expect, it, vi } from "vitest";
import { chartGet } from "./apple-music";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const json = (data: unknown, status = 200) =>
	new Response(JSON.stringify(data), { status });

afterEach(() => {
	fetchMock.mockReset();
	vi.useRealTimers();
});

describe("chartGet", () => {
	it("retries once when Apple answers with a server error", async () => {
		fetchMock
			.mockResolvedValueOnce(json({}, 504))
			.mockResolvedValueOnce(json({ feed: "ok" }));
		expect(await chartGet("/retry.json")).toEqual({ feed: "ok" });
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});

	it("reuses a fetched chart, and its last copy when Apple fails", async () => {
		vi.useFakeTimers({ toFake: ["Date"] });
		fetchMock.mockResolvedValueOnce(json({ feed: "first" }));
		expect(await chartGet("/cached.json")).toEqual({ feed: "first" });
		expect(await chartGet("/cached.json")).toEqual({ feed: "first" });
		expect(fetchMock).toHaveBeenCalledTimes(1);

		vi.setSystemTime(Date.now() + 1000 * 60 * 60);
		fetchMock.mockResolvedValue(json({}, 504));
		expect(await chartGet("/cached.json")).toEqual({ feed: "first" });
	});

	it("fails when there's no copy to fall back on", async () => {
		fetchMock.mockResolvedValue(json({}, 504));
		await expect(chartGet("/missing.json")).rejects.toThrow("(504)");
	});
});
