import defaultBackground from "#/assets/record-blue.jpg";

// Full-bleed backdrop behind every page: the album cover, blurred into a
// wash of its colours, on album pages; the record photo everywhere else.
export function BackgroundImage({ image }: { image?: string | null }) {
	return (
		<div aria-hidden className="absolute inset-0 overflow-hidden">
			<div
				className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${
					image ? "scale-125 opacity-60 blur-3xl" : "opacity-20"
				}`}
				style={{ backgroundImage: `url("${image ?? defaultBackground}")` }}
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-deep/30 to-navy-deep/80" />
		</div>
	);
}
