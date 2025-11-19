"use client";

import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

interface TooltipWrapperProps {
	/**
	 * Konten yang akan ditampilkan di dalam tooltip
	 */
	content: React.ReactNode;

	/**
	 * Elemen children yang akan dibungkus dengan tooltip
	 */
	children: React.ReactNode;

	/**
	 * Posisi tooltip relatif terhadap trigger
	 * @default "top"
	 */
	side?: TooltipContentProps["side"];

	/**
	 * Alignment tooltip
	 * @default "center"
	 */
	align?: TooltipContentProps["align"];

	/**
	 * Jarak offset dari trigger (dalam pixel)
	 * @default 4
	 */
	sideOffset?: number;

	/**
	 * Delay sebelum tooltip muncul (dalam ms)
	 * @default 200
	 */
	delayDuration?: number;

	/**
	 * Custom className untuk tooltip content
	 */
	className?: string;

	/**
	 * Apakah tooltip disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Apakah tooltip selalu terbuka (untuk debugging)
	 * @default undefined
	 */
	open?: boolean;

	/**
	 * Callback ketika state open berubah
	 */
	onOpenChange?: (open: boolean) => void;
}

/**
 * TooltipWrapper - Komponen wrapper untuk menambahkan tooltip dengan mudah
 *
 * @example
 * ```tsx
 * <TooltipWrapper content="Klik untuk menyimpan">
 *   <Button>Simpan</Button>
 * </TooltipWrapper>
 * ```
 *
 * @example
 * ```tsx
 * <TooltipWrapper
 *   content="Info penting"
 *   side="right"
 *   sideOffset={8}
 * >
 *   <div>Hover di sini</div>
 * </TooltipWrapper>
 * ```
 */
export function TooltipWrapper({
	content,
	children,
	side = "top",
	align = "center",
	sideOffset = 4,
	delayDuration = 200,
	className,
	disabled = false,
	open,
	onOpenChange,
}: TooltipWrapperProps) {
	if (disabled || !content) {
		return <>{children}</>;
	}

	return (
		<Tooltip delayDuration={delayDuration} open={open} onOpenChange={onOpenChange}>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				align={align}
				sideOffset={sideOffset}
				className={cn("bg-foreground", className)}
			>
				{content}
			</TooltipContent>
		</Tooltip>
	);
}
