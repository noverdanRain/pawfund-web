import { alertDialogAtom, AlertDialogType } from "@/atom/components";
import { useAtom } from "jotai";

export function useAlertDialog(params: Omit<AlertDialogType, "isOpen">) {
	const [alertDialog, setAlertDialog] = useAtom(alertDialogAtom);
	const alert = () => {
		setAlertDialog({
			isOpen: true,
			...params,
		});
	};
	return alert;
}
