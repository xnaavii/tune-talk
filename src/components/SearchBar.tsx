import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	autoFocus?: boolean;
}

export function SearchBar({
	value,
	onChange,
	onSubmit,
	autoFocus,
}: SearchBarProps) {
	return (
		<search className="w-full">
			<form
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit();
				}}
				className="relative w-full"
			>
				<input
					type="search"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					// biome-ignore lint/a11y/noAutofocus: the landing page is a search page
					autoFocus={autoFocus}
					className="glass-input pr-12 [&::-webkit-search-cancel-button]:hidden"
					placeholder="Artists, songs or albums"
					aria-label="Search music"
				/>
				<button
					type="submit"
					aria-label="Search"
					className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-ink cursor-pointer"
				>
					<IoSearch aria-hidden className="size-[22px]" />
				</button>
			</form>
		</search>
	);
}
