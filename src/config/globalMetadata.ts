import { Metadata } from "next";

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
