"use client";

import { Toaster } from "@/components/ui/sonner";
import DevelopmentAlert from "@/components/common/DevelopmentAlert";
import Footer from "@/components/common/Footer";
import HeaderNav from "@/components/common/HeaderNav";
import { usePathname } from "next/navigation";
import { pathNotIncludeHeaderFooter } from "@/constants";
import NextTopLoader from "nextjs-toploader";
import { AlertDialogProvider } from "@/components/ui/alert-dialog";

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
