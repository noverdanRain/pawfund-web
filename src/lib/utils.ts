import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function formatAddress(address: string, length = 6): string {
	return `${address.slice(0, length)}...${address.slice(-length)}`;
}

export function formatBalance(balance?: {
	decimals: number;
	formatted: string;
	symbol: string;
	value: bigint;
}): string {
	if (!balance) {
		return "0.00";
	}
	const formattedValue = formatUnits(balance.value, balance.decimals);
	return `${Number(formattedValue).toFixed(3)} ${balance.symbol}`;
}
