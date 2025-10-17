import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function CampaignImage(props: { isLoading?: boolean; imageUrl: string }) {
	return (
		<>
			{props.isLoading ? (
				<Skeleton className="aspect-[16/9] w-full rounded-3xl bg-gray-200" />
			) : (
				<Image
					className="aspect-[16/9] w-full rounded-3xl bg-gray-200 object-cover"
					src={props.imageUrl}
					alt="Campaign Image"
					width={720}
					height={512}
				/>
			)}
		</>
	);
}
