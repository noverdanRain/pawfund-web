import { atom } from "jotai";

export type AlertDialogType = {
	title: string;
	description?: string;
	actionText?: string;
	cancelText?: string;
	onAction?: () => void;
	onCancel?: () => void;
	variant?: "primary" | "destructive";
	isOpen: boolean;
};
export const alertDialogAtom = atom<AlertDialogType>({
	title: "Confirm Your Action",
	isOpen: false,
});
