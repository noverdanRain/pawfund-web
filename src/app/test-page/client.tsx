"use client";

import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TestPageClient() {
	const { ...account } = useAccount();

	// console.log("Is Account Connected: ", account.isConnected);
	return (
		<div className="bg-muted mt-10 space-y-2 p-4">
			<h1 className="text-xl font-bold">Test Page Client</h1>
			<p>Address: {account.address}</p>
			<Button
				onClick={() => toast("Welcome!", { description: "This is a simple toast notification." })}
			>
				Toast Biasa
			</Button>
			<Button
				onClick={() =>
					toast.warning("Warning!", { description: "This is a warning toast notification." })
				}
			>
				Toast Warning
			</Button>
			<Button
				onClick={() =>
					toast.error("Error!", { description: "This is an error toast notification." })
				}
			>
				Toast Error
			</Button>
			<Button
				onClick={() =>
					toast.success("Success!", { description: "This is a success toast notification." })
				}
			>
				Toast Success
			</Button>
			<Button
				onClick={() => toast.info("Info!", { description: "This is an info toast notification." })}
			>
				Toast Info
			</Button>
			<Button
				onClick={() =>
					toast.loading("Loading...", {
						description: "This is a loading toast notification.",
						cancel: {
							label: "Close",
							onClick: () => toast.dismiss(),
						},
					})
				}
			>
				Toast Loading
			</Button>
		</div>
	);
}
