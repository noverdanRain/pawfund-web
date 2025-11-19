"use client";

import { initAuthAtom } from "@/atom/auth";
import { useSetAtom } from "jotai";
import { useEffect, type ReactNode } from "react";

export default function ContextProvider({ children }: { children: ReactNode }) {
	const initAuthUser = useSetAtom(initAuthAtom);

	useEffect(() => {
		initAuthUser({ type: "INIT" });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{children}</>;
}
