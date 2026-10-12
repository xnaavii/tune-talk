import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit();
			}}
			className="relative w-full p-[2px]"
		>
			<input
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="text-[14px] w-full pr-12 pl-4 py-[10px] text-[#FFFFFF] outline-none focus:ring-2 focus:ring-stone-100 rounded-[32px] focus:ring-inset placeholder:text-[#BABFC4] backdrop-blur-[10px] bg-[#C9CED3]/16  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.08)]"
				placeholder="Search for an artist, album or a song"
				aria-label="Search albums"
			/>
			<IoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFFFFF] w-[24px] h-[24px] stroke-[1.75]" />
		</form>
	);
}
