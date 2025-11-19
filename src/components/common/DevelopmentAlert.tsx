import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { env } from "@/config/env";
const isProduction = env.NEXT_PUBLIC_ENVIRONMENT === "production";

export default function DevelopmentAlert() {
	return <Dialog />;
}

function Dialog() {
	return (
		<AlertDialog open={isProduction}>
			<AlertDialogContent className="max-w-md">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center text-2xl font-bold">
						🚧 Under Active Development 🚧
					</AlertDialogTitle>
					<AlertDialogDescription className="space-y-3 text-center">
						<p className="text-base">
							Welcome to <span className="text-primary font-semibold">PawFund</span>! 🐾
						</p>
						<p className="text-muted-foreground text-sm">
							We&apos;re working hard to bring you the best experience. Some features may be
							incomplete or undergoing improvements.
						</p>
						<div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-950">
							<p className="text-sm font-medium text-amber-800 dark:text-amber-200">
								⚠️ Important Notice
							</p>
							<p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
								Your data may be reset periodically during the development phase. Please don&apos;t
								use sensitive information.
							</p>
						</div>
						<p className="text-foreground text-sm font-medium">
							Thank you for your patience and support! 💙
						</p>
					</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
}
