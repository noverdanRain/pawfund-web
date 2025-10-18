import { PawCircular } from "@/assets/icons/PawCircular";
import { cn } from "@/lib/utils";
import HalfCirc from "./half-circ.svg";
import Image from "next/image";
import { HeartDrawLine } from "@/assets/icons/HeartDrawLine";
import Link from "next/link";
import { ArrowTopRightShape } from "@/assets/icons/ArrowTopRightShape";

const Footer = () => {
	return (
		<>
			<div
				className={cn(
					"h-7 w-full bg-transparent",
					`bg-size-[auto_16px] bg-position-[center_bottom] bg-repeat-x sm:bg-size-[auto_18px]`,
				)}
				style={{
					backgroundImage: `url(${HalfCirc.src})`,
				}}
			/>
			<footer className={"-mt-[1px] w-full bg-amber-500 py-8"}>
				<div className="bg relative mx-auto flex w-[calc(100%-3rem)] max-w-6xl flex-col justify-between gap-8 sm:flex-row sm:items-center">
					<div>
						<Image
							src={"/logo-text-white.svg"}
							alt="Pawfund Logo"
							width={160}
							height={40}
							className="h-auto w-40"
						/>
						<p className="mt-4 flex items-center gap-0.5 font-medium text-white sm:mt-5">
							Made With
							<span>
								<HeartDrawLine className="size-6" />
							</span>
							by Paw Fund Team
						</p>
					</div>
					<div className="flex flex-col gap-3 sm:items-end">
						<nav className="flex items-center gap-4">
							<Link
								href={"#contract"}
								className="flex items-center gap-1 font-bold text-white hover:underline"
							>
								CONTRACT
								<ArrowTopRightShape className="size-3" />
							</Link>
							<Link
								href={"https://github.com/noverdanRain/pawfund-web"}
								target="_blank"
								className="flex items-center gap-1 font-bold text-white hover:underline"
							>
								GITHUB
								<ArrowTopRightShape className="size-3" />
							</Link>
						</nav>
						<Link href={"#privacy"} className="text-sm font-medium text-white underline">
							Privacy Policy
						</Link>
						<PawCircular
							bgColor="#FFF"
							fgColor="#E11D48"
							className="absolute -top-1 right-0 size-12 transform sm:top-2 sm:left-1/2 sm:size-14 sm:-translate-x-1/2"
						/>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
