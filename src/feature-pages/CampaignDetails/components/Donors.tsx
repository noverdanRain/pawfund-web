import { PawCircular } from "@/assets/icons/PawCircular";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/utils";

export default function Donors() {
	return (
		<>
			<p className="font-semibold">Who Supported Us</p>
			<div className="grid grid-cols-2 gap-2">
				{Array.from({ length: 8 }).map((_, idx) => (
					<div className="flex items-center gap-1" key={idx}>
						<PawCircular className="size-14" bgColor="#D1D5DB" fgColor="#FFFFFF" />
						<div>
							<p className="text-sm text-gray-500">
								{formatAddress("0xA7Dd557C3628e35D4CC9618F13Aa94D57FDb7E7C", 8)}
							</p>
							<p className="mt-0.5 text-sm font-medium">0.001 ETH</p>
						</div>
					</div>
				))}
				<Button variant={"outline"} shape={"circle"} className="col-span-2 px-6">
					See all donations
				</Button>
			</div>
		</>
	);
}
