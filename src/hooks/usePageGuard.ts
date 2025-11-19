"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UsePageGuardProps {
	isDirty: boolean;
	onBeforeLeave?: () => void;
}

export function usePageGuard({ isDirty, onBeforeLeave }: UsePageGuardProps) {
	const router = useRouter();
	const [showConfirm, setShowConfirm] = useState(false);
	const [nextAction, setNextAction] = useState<(() => void) | null>(null);

	// Handle browser refresh
	useEffect(() => {
		if (!isDirty) return;

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			// e.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isDirty]);

	// Handle browser back
	useEffect(() => {
		if (!isDirty) return;

		const handlePopState = () => {
			// window.removeEventListener("popstate", handlePopState);
			window.history.pushState(null, "", window.location.href);
			// setShowConfirm(true);
			// onBeforeLeave?.();
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [isDirty, onBeforeLeave]);

	const handleConfirm = useCallback(() => {
		setShowConfirm(false);
		if (nextAction) {
			nextAction();
		} else {
			router.back();
		}
	}, [nextAction, router]);

	const handleCancel = useCallback(() => {
		setShowConfirm(false);
		setNextAction(null);
	}, []);

	return {
		showConfirm,
		handleConfirm,
		handleCancel,
	};
}
