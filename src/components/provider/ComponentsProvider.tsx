"use client";

import { Toaster } from "../ui/sonner";
import DevelopmentAlert from "../DevelopmentAlert";
import Footer from "../Footer";
import HeaderNav from "../HeaderNav";
import { usePathname } from "next/navigation";
import { pathNotIncludeHeaderFooter } from "@/constants";
import NextTopLoader from "nextjs-toploader";

export default function ComponentsProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isIncludeHeaderFooter = !pathNotIncludeHeaderFooter.some((path) =>
		pathname ? pathname.startsWith(path) : false,
	);
	return (
		<>
			<NextTopLoader color="#F59E0B" showSpinner={false} />
			{isIncludeHeaderFooter && <HeaderNav />}
			{children}
			{isIncludeHeaderFooter && <Footer />}
			<DevelopmentAlert />
			<Toaster />
			<div className="isolate" />
		</>
	);
}
