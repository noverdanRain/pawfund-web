import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, HandHeart } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ButtonSelectAmount } from "./DonationField";
import { Input, InputWrapper } from "@/components/ui/input";
import { EthereumRoundedIcon } from "@/assets/icons/EthereumRoundedIcon";

type InputDonationDialogProps = {
	triggerButton?: React.ReactNode;
};

export default function InputDonationDialog(props: InputDonationDialogProps) {
	const [open, setOpen] = useState(false);
	const [donationAmount, setDonationAmount] = useState<string>();

	const FormSchema = z.object({
		feedback: z
			.string()
			.min(1, "Feedback is required")
			.max(200, "Feedback cannot exceed 200 characters"),
	});

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { feedback: "" },
		mode: "onSubmit",
	});

	function onSubmit() {
		toast.custom((t) => (
			<Alert variant="mono" icon="primary" onClose={() => toast.dismiss(t)}>
				<AlertIcon>
					<Check />
				</AlertIcon>
				<AlertTitle>Your feedback successfully submitted</AlertTitle>
			</Alert>
		));

		form.reset();
		setOpen(false);
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		// Only allow numbers, one decimal point, and only one zero before decimal
		const regex = /^0(\.\d*)?$|^[1-9]\d*(\.\d*)?$|^$/;
		if (regex.test(value)) {
			setDonationAmount(value);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{props.triggerButton && <DialogTrigger asChild>{props.triggerButton}</DialogTrigger>}
			<DialogContent className="sm:max-w-md">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Donation Amount</DialogTitle>
							<DialogDescription>
								Please enter the amount you wish to donate (ETH)
							</DialogDescription>
						</DialogHeader>
						<DialogBody>
							<div className="mt-4">
								<div className="mt-2 grid grid-cols-4 gap-2">
									<ButtonSelectAmount
										amount="0.1"
										selected={donationAmount == "0.1"}
										onSelected={(amount) => setDonationAmount(amount)}
									/>
									<ButtonSelectAmount
										amount="0.2"
										selected={donationAmount == "0.2"}
										onSelected={(amount) => setDonationAmount(amount)}
									/>
									<ButtonSelectAmount
										amount="0.4"
										selected={donationAmount == "0.4"}
										onSelected={(amount) => setDonationAmount(amount)}
									/>
									<ButtonSelectAmount
										amount="0.5"
										selected={donationAmount == "0.5"}
										onSelected={(amount) => setDonationAmount(amount)}
									/>
								</div>
								<InputWrapper className="mt-3 h-12 gap-2 rounded-full border-gray-300 bg-transparent px-4 shadow-none">
									<EthereumRoundedIcon fill="#424242" />
									<Input
										id="input-donation"
										type="text"
										inputMode="decimal"
										placeholder="0.00"
										variant={"lg"}
										value={donationAmount}
										onChange={handleInputChange}
									/>
								</InputWrapper>
							</div>
						</DialogBody>
						<DialogFooter>
							<Button type="submit" className="h-10" shape={"circle"}>
								<HandHeart />
								Send Donation
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
