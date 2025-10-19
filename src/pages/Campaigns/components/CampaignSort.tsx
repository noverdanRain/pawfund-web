import { Badge, BadgeButton } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, X } from "lucide-react";
import { useState } from "react";

type SortOption = "newest" | "oldest" | "closeToGoal" | "popular";

export function CampaignSort() {
	const [sortSelected, setSortSelected] = useState<SortOption | null>();
	return (
		<div className="mt-2 flex w-full items-center gap-2">
			<Badge
				variant="outline"
				appearance={"ghost"}
				size={"lg"}
				className="mr-2 text-base font-bold"
			>
				<ArrowUpDown className="!size-4" />
				Sort
			</Badge>

			<BadgeSelect
				isActive={sortSelected === "newest"}
				value={"newest"}
				onSelected={setSortSelected}
				onDeselected={setSortSelected}
			>
				Newest
			</BadgeSelect>
			<BadgeSelect
				isActive={sortSelected === "oldest"}
				value={"oldest"}
				onSelected={setSortSelected}
				onDeselected={setSortSelected}
			>
				Oldest
			</BadgeSelect>
			<BadgeSelect
				isActive={sortSelected === "closeToGoal"}
				value={"closeToGoal"}
				onSelected={setSortSelected}
				onDeselected={setSortSelected}
			>
				Close To Goal
			</BadgeSelect>
			<BadgeSelect
				isActive={sortSelected === "popular"}
				value={"popular"}
				onSelected={setSortSelected}
				onDeselected={setSortSelected}
			>
				Popular
			</BadgeSelect>
		</div>
	);
}

function BadgeSelect({
	children,
	isActive,
	value,
	onSelected,
	onDeselected,
}: {
	children: React.ReactNode;
	isActive: boolean;
	value: SortOption;
	onSelected?: (value: SortOption) => void;
	onDeselected?: (v: null) => void;
}) {
	return (
		<Badge
			onClick={() => onSelected?.(value)}
			variant={"outline"}
			size={"lg"}
			className={cn(
				"h-8 cursor-pointer rounded-full px-3 text-sm select-none hover:bg-gray-100/50",
				isActive && "bg-gray-200 hover:bg-gray-200/70",
			)}
		>
			{children}
			{isActive && (
				<BadgeButton
					onClick={(e) => {
						e.stopPropagation();
						onDeselected?.(null);
					}}
				>
					<X />
				</BadgeButton>
			)}
		</Badge>
	);
}
