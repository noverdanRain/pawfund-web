"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, HelpCircle, Wallet, HandHeart, Plus } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useAppKit } from "@reown/appkit/react";
import { useLogout } from "@/hooks/useLogout";

interface MainMenuDropdownProps {
	children?: ReactNode;
}

export default function MainMenuDropdown({ children }: MainMenuDropdownProps) {
	const { open: openWallet } = useAppKit();
	const { disconnect: disconnectWallet } = useLogout();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{children || (
					<button className="border-input bg-background hover:bg-accent flex h-10 w-10 items-center justify-center rounded-lg border">
						<Menu className="h-5 w-5" />
					</button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={8} className="w-56 rounded-2xl">
				<Button variant={"outline"} className="mt-1 mb-1.5 w-full rounded-lg shadow-none">
					<Plus className="mr-2 h-4 w-4" />
					<span>Create Campaign</span>
				</Button>
				<DropdownMenuItem>
					<User className="mr-2 h-4 w-4" />
					<span>Account</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => openWallet()}>
					<Wallet className="mr-2 h-4 w-4" />
					<span>Wallet</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<HandHeart className="mr-2 h-4 w-4" />
					<span>My Campaign</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<HelpCircle className="mr-2 h-4 w-4" />
					<span>Help</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => disconnectWallet()} className="text-red-600">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
