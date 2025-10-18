import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/HeaderNav";
import DevelopmentAlert from "@/components/DevelopmentAlert";
import ContextProvider from "./provider";
import { headers } from "next/headers";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const bagelFatOne = Bagel_Fat_One({
	variable: "--font-bagel-fat-one",
	subsets: ["latin"],
	weight: "400",
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pawfund - A Fundraising Platform for Animals",
	description:
		"Pawfund is a fundraising platform designed specifically for animals, helping pet owners raise funds for their furry friends' medical needs and other expenses.",
	keywords: [
		"pawfund",
		"pet fundraising",
		"animal welfare",
		"pet medical expenses",
		"crowdfunding for animals",
		"pet care",
		"support animals",
	],
	openGraph: {
		title: "Pawfund - A Fundraising Platform for Animals",
		description:
			"Pawfund is a fundraising platform designed specifically for animals, helping pet owners raise funds for their furry friends' medical needs and other expenses.",
		url: "https://pawfunding.vercel.app",
		siteName: "Pawfund",
		type: "website",
		images: [
			{
				url: "/og-image/default.png",
				width: 900,
				height: 73,
				alt: "Pawfund - A Fundraising Platform for Animals",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Pawfund - A Fundraising Platform for Animals",
		description:
			"Pawfund is a fundraising platform designed specifically for animals, helping pet owners raise funds for their furry friends' medical needs and other expenses.",
		images: [
			{
				url: "/og-image/default.png",
				width: 900,
				height: 73,
				alt: "Pawfund - A Fundraising Platform for Animal",
			},
		],
	},
	icons: {
		icon: "/logo-icon.svg",
	},
	themeColor: "#ffffff",
	applicationName: "Pawfund",
	creator: "@pawfunding",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersObj = await headers();
	const cookies = headersObj.get("cookie");

	return (
		<html lang="en" className="text-[15px] sm:text-base">
			<body className={`${bagelFatOne.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
				<ContextProvider cookies={cookies}>
					<HeaderNav />
					{children}
					<Footer />
					<DevelopmentAlert />
					<div className="isolate" />
					<Toaster />
				</ContextProvider>
			</body>
		</html>
	);
}
