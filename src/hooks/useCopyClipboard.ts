import { useCallback } from "react";
import { toast } from "sonner";

export const useCopyClipboard = () => {
	const copyClipboard = useCallback(async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			toast.success("Copied to clipboard", {
				duration: 2000,
			});
		} catch (error) {
			toast.error("Failed to copy to clipboard", {
				duration: 2000,
			});
			console.error("Failed to copy text:", error);
		}
	}, []);

	return copyClipboard;
};
