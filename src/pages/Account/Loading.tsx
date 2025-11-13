import { Skeleton } from "@/components/ui/skeleton";

export function AccountLoading() {
	return (
		<div className="mt-8 space-y-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<Skeleton key={index} className="h-48 w-full rounded-2xl bg-gray-200" />
			))}
		</div>
	);
}
