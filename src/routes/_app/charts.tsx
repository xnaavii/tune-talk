import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { z } from "zod";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { Tabs } from "#/components/Tabs";
import {
	RankedAlbumList,
	RankedListSkeleton,
} from "#/features/albums/components/RankedAlbumList";
import { CountryPicker } from "#/features/charts/components/CountryPicker";
import {
	CHART_COUNTRIES,
	type ChartCountry,
	chartCountrySchema,
} from "#/features/charts/countries";
import { chartQueries } from "#/features/charts/queries";
import { PlayButton } from "#/features/player/components/PlayButton";
import { SongList } from "#/features/songs/components/SongList";

const chartTypeSchema = z.enum(["songs", "albums"]).catch("songs");

export const Route = createFileRoute("/_app/charts")({
	validateSearch: z.object({
		type: chartTypeSchema.default("songs"),
		country: chartCountrySchema.default("us"),
	}),
	loaderDeps: ({ search }) => search,
	loader: ({ context: { queryClient }, deps }) =>
		deps.type === "songs"
			? queryClient.ensureQueryData(chartQueries.songs(deps.country))
			: queryClient.ensureQueryData(chartQueries.albums(deps.country)),
	head: () => ({ meta: [{ title: "Charts | Tunetalk" }] }),
	component: ChartsPage,
	pendingComponent: ChartsPending,
});

function ChartsHeader({
	type,
	country,
	action,
}: {
	type: "songs" | "albums";
	country: ChartCountry;
	action?: ReactNode;
}) {
	const { name, flag } = CHART_COUNTRIES[country];
	return (
		<div className="mb-6 flex flex-col gap-5">
			<PageHeader
				eyebrow={`Apple Music · Most played · ${flag} ${name}`}
				title={type === "songs" ? "Top 50 Songs" : "Top 50 Albums"}
				description="Updated daily from what people are actually playing."
			/>
			<div className="flex items-center justify-between gap-4">
				<Tabs
					label="Chart type"
					tabs={(["songs", "albums"] as const).map((tab) => ({
						label: tab === "songs" ? "Songs" : "Albums",
						link: { to: "/charts", search: { type: tab, country } },
						isActive: tab === type,
					}))}
				/>
				{action}
			</div>
			<CountryPicker selected={country} type={type} />
		</div>
	);
}

function ChartsPage() {
	const { type, country } = Route.useSearch();
	return type === "songs" ? (
		<SongsChart country={country} />
	) : (
		<AlbumsChart country={country} />
	);
}

const emptyChart = <StatusMessage>No chart available right now.</StatusMessage>;

function SongsChart({ country }: { country: ChartCountry }) {
	const { data: songs } = useSuspenseQuery(chartQueries.songs(country));
	return (
		<>
			<ChartsHeader
				type="songs"
				country={country}
				action={<PlayButton songs={songs} label="Play the chart" size="md" />}
			/>
			{songs.length > 0 ? <SongList songs={songs} /> : emptyChart}
		</>
	);
}

function AlbumsChart({ country }: { country: ChartCountry }) {
	const { data: albums } = useSuspenseQuery(chartQueries.albums(country));
	return (
		<>
			<ChartsHeader type="albums" country={country} />
			{albums.length > 0 ? <RankedAlbumList albums={albums} /> : emptyChart}
		</>
	);
}

function ChartsPending() {
	const { type, country } = Route.useSearch();
	return (
		<>
			<ChartsHeader type={type} country={country} />
			<RankedListSkeleton />
		</>
	);
}
