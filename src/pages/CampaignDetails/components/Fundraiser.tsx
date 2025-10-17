import { PawCircular } from "@/assets/icons/PawCircular";
import { formatAddress } from "@/lib/utils";
import Image from "next/image";

type FundraiserProps = {
	imageUrl?: string;
	name: string;
	address: string;
};

export default function Fundraiser(props: FundraiserProps) {
	return (
		<div className="mt-4 flex items-center gap-2">
			{props.imageUrl ? (
				<Image
					className="size-12 rounded-full bg-gray-200"
					src={props.imageUrl}
					alt="Fundraiser Image"
					width={72}
					height={72}
				/>
			) : (
				<PawCircular className="-ml-2 size-14" bgColor="#D1D5DB" fgColor="#FFFFFF" />
			)}
			<div>
				<p className="font-medium">{props.name}</p>
				<p className="text-sm text-gray-500">{formatAddress(props.address, 6)}</p>
			</div>
		</div>
	);
}
