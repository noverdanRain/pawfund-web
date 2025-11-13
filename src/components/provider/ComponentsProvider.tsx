"use client";

import { Toaster } from "sonner";
import DevelopmentAlert from "../DevelopmentAlert";
import Footer from "../Footer";
import HeaderNav from "../HeaderNav";
import { usePathname } from "next/navigation";
import { pathNotIncludeHeaderFooter } from "@/constants";

export default function ComponentsProvider({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isIncludeHeaderFooter = !pathNotIncludeHeaderFooter.some((path) =>
		pathname ? pathname.startsWith(path) : false,
	);
	return (
		<>
			{isIncludeHeaderFooter && <HeaderNav />}
			{children}
			{isIncludeHeaderFooter && <Footer />}
			<DevelopmentAlert />
			<Toaster />
			<div className="isolate" />
		</>
	);
}
