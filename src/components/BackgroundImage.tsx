import defaultBackground from "#/assets/record-blue.jpg";

// Full-bleed blurred backdrop behind every page: the album cover on album
// pages, the record photo everywhere else.
export function BackgroundImage({ image }: { image?: string | null }) {
	return (
		<div
			className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all"
			style={{
				backgroundImage: `url("${image ?? defaultBackground}")`,
				opacity: image ? 0.4 : 0.2,
			}}
		/>
	);
}
