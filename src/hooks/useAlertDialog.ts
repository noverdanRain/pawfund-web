import { alertDialogAtom, AlertDialogType } from "@/atom/components";
import { useSetAtom } from "jotai";

export function useAlertDialog(params: Omit<AlertDialogType, "isOpen">) {
	const setAlertDialog = useSetAtom(alertDialogAtom);
	const alert = () => {
		setAlertDialog({
			isOpen: true,
			...params,
		});
	};
	return alert;
}
