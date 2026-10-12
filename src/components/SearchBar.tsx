import type { Ref } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
	autoFocus?: boolean;
	// Shorter input for the app navbar.
	compact?: boolean;
	inputRef?: Ref<HTMLInputElement>;
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchBar({
	value,
	onChange,
	onSubmit,
	autoFocus,
	compact = false,
	inputRef,
	onKeyDown,
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
					ref={inputRef}
					type="search"
					value={value}
					onChange={(event) => onChange(event.target.value)}
					onKeyDown={onKeyDown}
					// biome-ignore lint/a11y/noAutofocus: the landing page is a search page
					autoFocus={autoFocus}
					className={`glass-input [&::-webkit-search-cancel-button]:hidden ${compact ? "py-[7px]! pl-4 pr-10 text-[13px]!" : "pr-12"}`}
					placeholder="Search music"
					aria-label="Search music"
				/>
				<button
					type="submit"
					aria-label="Search"
					className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full text-ink cursor-pointer ${compact ? "right-2" : "right-3"}`}
				>
					<IoSearch
						aria-hidden
						className={compact ? "size-[17px]" : "size-[22px]"}
					/>
				</button>
			</form>
		</search>
	);
}
