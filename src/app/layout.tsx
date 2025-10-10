import type { Metadata } from "next";
import { Bagel_Fat_One, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
	title: "Pawfund - A Fundraising Platform for Pets",
	description:
		"Pawfund is a fundraising platform designed specifically for pets, helping pet owners raise funds for their furry friends' medical needs and other expenses.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="text-[15px] sm:text-base">
			<body className={`${bagelFatOne.variable} ${spaceGrotesk.variable} antialiased`}>
				{children}
				<div className="isolate" />
			</body>
		</html>
	);
}
