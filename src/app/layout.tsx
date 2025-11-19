import { metadata } from "@/config/globalMetadata";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import ComponentsProvider from "./_provider/components-provider";
import ContextProvider from "./_provider/context-provider";
import TRPCProvider from "./_provider/trpc-provider";
import Web3Provider from "./_provider/web3-provider";
import "./globals.css";

const bagelFatOne = Bagel_Fat_One({
	variable: "--font-bagel-fat-one",
	subsets: ["latin"],
	weight: "400",
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en" className="text-[15px] sm:text-base">
			<body className={`${bagelFatOne.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
				<Web3Provider cookies={cookies}>
					<TRPCProvider>
						<ContextProvider>
							<ComponentsProvider>{children}</ComponentsProvider>
						</ContextProvider>
					</TRPCProvider>
				</Web3Provider>
			</body>
		</html>
	);
}

export { metadata };
export default RootLayout;
