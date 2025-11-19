"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useLogout } from "@/hooks/useLogout";
import { useAppKit } from "@reown/appkit/react";
import { HandHeart, HelpCircle, LogOut, Menu, Plus, User, Wallet } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { memo, ReactNode } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface MainMenuDropdownProps {
	children?: ReactNode;
}

const MainMenuDropdown = memo(function MainMenuDropdown({ children }: MainMenuDropdownProps) {
	const { open: openWallet } = useAppKit();
	const { disconnect: disconnectWallet } = useLogout();
	const { user, isLoading } = useAuthUser();
	const router = useRouter();

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
				{user && (
					<>
						{user?.type === "fundraiser" && (
							<Button variant={"outline"} className="mt-1 mb-1.5 w-full rounded-lg shadow-none">
								<Plus className="mr-2 h-4 w-4" />
								<span>Create Campaign</span>
							</Button>
						)}
						<DropdownMenuItem onClick={() => router.push("/account")}>
							<User className="mr-2 h-4 w-4" />
							<span>Account</span>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => openWallet()}>
							<Wallet className="mr-2 h-4 w-4" />
							<span>Wallet</span>
						</DropdownMenuItem>
						{user?.type === "fundraiser" && (
							<DropdownMenuItem>
								<HandHeart className="mr-2 h-4 w-4" />
								<span>My Campaign</span>
							</DropdownMenuItem>
						)}
						<DropdownMenuItem>
							<HelpCircle className="mr-2 h-4 w-4" />
							<span>Help</span>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => disconnectWallet()} className="text-red-600">
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</>
				)}
				{isLoading && <Skeleton className="h-36 w-full rounded-lg bg-gray-100" />}
			</DropdownMenuContent>
		</DropdownMenu>
	);
});

export default MainMenuDropdown;
