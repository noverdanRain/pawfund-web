"use client";

import { Toaster } from "../ui/sonner";
import DevelopmentAlert from "../DevelopmentAlert";
import Footer from "../Footer";
import HeaderNav from "../HeaderNav";
import { usePathname } from "next/navigation";
import { pathNotIncludeHeaderFooter } from "@/constants";
import NextTopLoader from "nextjs-toploader";
import { AlertDialogProvider } from "../ui/alert-dialog";

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
			<AlertDialogProvider />
			<div className="isolate" />
		</>
	);
}
