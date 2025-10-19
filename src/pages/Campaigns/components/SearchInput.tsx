"use client";

import { Badge, BadgeButton } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, InputWrapper } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

export function SearchInput() {
	const [inputValue, setInputValue] = useState<string>("");
	const [searchResult, setSearchResult] = useState<string>("asdasd");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSearch = () => {
		setSearchResult(inputValue);
		setInputValue("");
	};

	const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 100) return;
		setInputValue(e.target.value);
	};
	const handleClearInput = () => {
		setInputValue("");
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};
	return (
		<>
			<div className="mt-10 flex w-full max-w-3xl items-center gap-2">
				<InputWrapper className="h-12 rounded-full pr-1.5 pl-4 shadow-none">
					<Search className="mr-1" />
					<Input
						placeholder="Type some input"
						className="!h-full"
						ref={inputRef}
						value={inputValue}
						onChange={handleOnChangeInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
					<Button
						onClick={handleClearInput}
						variant="dim"
						mode={"icon"}
						className="-me-"
						disabled={inputValue === ""}
					>
						{inputValue !== "" && <X size={16} />}
					</Button>
				</InputWrapper>
				<Button onClick={handleSearch} className="h-11 px-4 font-semibold" shape={"circle"}>
					Search
				</Button>
			</div>
			<div className="mt-8 w-full">
				{searchResult && (
					<Badge
						onClick={() => {}}
						variant={"outline"}
						size={"lg"}
						className={cn(
							"h-8 cursor-pointer rounded-full px-3 text-sm select-none hover:bg-gray-100/50",
						)}
					>
						<Search />
						{searchResult}
						{searchResult && (
							<BadgeButton
								onClick={(e) => {
									e.stopPropagation();
									setSearchResult("");
								}}
							>
								<X />
							</BadgeButton>
						)}
					</Badge>
				)}
			</div>
		</>
	);
}
