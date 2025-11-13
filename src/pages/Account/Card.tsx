import { cn } from "@/lib/utils";

export default function Card(props: {
	children?: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}) {
	return (
		<div className={cn("space-y-2 rounded-2xl bg-gray-100 p-8", props.className)}>
			<h6 className="text-xl font-medium">{props.title}</h6>
			<p>{props.description}</p>
			{props.children}
		</div>
	);
}
