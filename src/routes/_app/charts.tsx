import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PageHeader } from "#/components/PageHeader";
import { StatusMessage } from "#/components/StatusMessage";
import { Tabs } from "#/components/Tabs";
import { AlbumGridSkeleton } from "#/features/albums/components/AlbumGrid";
import { RankedAlbumList } from "#/features/albums/components/RankedAlbumList";
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
type ChartType = z.infer<typeof chartTypeSchema>;

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
}: {
	type: ChartType;
	country: ChartCountry;
}) {
	return (
		<>
			<PageHeader
				title="Charts"
				description={`The most played ${type} on Apple Music today in ${CHART_COUNTRIES[country].name}.`}
			/>
			<div className="mb-5 flex flex-col gap-3">
				<Tabs
					label="Chart type"
					tabs={(["songs", "albums"] as const).map((tab) => ({
						label: tab === "songs" ? "Songs" : "Albums",
						link: { to: "/charts", search: { type: tab, country } },
						isActive: tab === type,
					}))}
				/>
				<CountryPicker selected={country} type={type} />
			</div>
		</>
	);
}

function ChartsPage() {
	const { type, country } = Route.useSearch();
	return (
		<>
			<ChartsHeader type={type} country={country} />
			{type === "songs" ? (
				<SongsChart country={country} />
			) : (
				<AlbumsChart country={country} />
			)}
		</>
	);
}

const emptyChart = <StatusMessage>No chart available right now.</StatusMessage>;

function SongsChart({ country }: { country: ChartCountry }) {
	const { data: songs } = useSuspenseQuery(chartQueries.songs(country));
	if (songs.length === 0) return emptyChart;
	return (
		<div className="flex flex-col gap-3">
			<PlayButton songs={songs} label="Play chart" />
			<SongList songs={songs} />
		</div>
	);
}

function AlbumsChart({ country }: { country: ChartCountry }) {
	const { data: albums } = useSuspenseQuery(chartQueries.albums(country));
	return albums.length > 0 ? <RankedAlbumList albums={albums} /> : emptyChart;
}

function ChartsPending() {
	const { type, country } = Route.useSearch();
	return (
		<>
			<ChartsHeader type={type} country={country} />
			<AlbumGridSkeleton />
		</>
	);
}
