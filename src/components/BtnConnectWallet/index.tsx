"use client";

import { Button } from "../ui/button";

export default function BtnWalletConnect() {
	const isConnected = true; // Replace with actual connection logic
	return (
		<>
			{isConnected ? (
				<Button
					shape="circle"
					variant="secondary"
					size="lg"
					className="flex items-center gap-2 bg-gray-200 font-medium ring-2 ring-white hover:bg-gray-200/80 sm:pr-1.5"
				>
					<div className="flex items-center gap-1">
						<svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32">
							<g fill="none" fillRule="evenodd">
								<circle cx={16} cy={16} r={16} fill="#000"></circle>
								<g fill="#fff" fillRule="nonzero">
									<path fillOpacity={0.602} d="M16.498 4v8.87l7.497 3.35z"></path>
									<path d="M16.498 4L9 16.22l7.498-3.35z"></path>
									<path fillOpacity={0.602} d="M16.498 21.968v6.027L24 17.616z"></path>
									<path d="M16.498 27.995v-6.028L9 17.616z"></path>
									<path fillOpacity={0.2} d="m16.498 20.573l7.497-4.353l-7.497-3.348z"></path>
									<path fillOpacity={0.602} d="m9 16.22l7.498 4.353v-7.701z"></path>
								</g>
							</g>
						</svg>
						<p>{0.014} ETH</p>
					</div>
					<div className="hidden rounded-full border border-white bg-gray-100 px-2 py-1 sm:block">
						0xA7D...7E7C
					</div>
				</Button>
			) : (
				<Button
					shape="circle"
					variant="secondary"
					size="lg"
					className="bg-gray-200 font-medium ring-2 ring-white hover:bg-gray-200/80"
				>
					Login
				</Button>
			)}
		</>
	);
}
