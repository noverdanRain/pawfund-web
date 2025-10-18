import CampaignDetails from "@/pages/CampaignDetails";
import { trpcServer } from "../_trpc/serverClient";
import { TRPCError } from "@trpc/server";

type Params = Promise<{
	campaignId: string;
}>;

export default async function CampaignPage(props: { params: Params }) {
	const params = await props.params;
	try {
		const getUser = await trpcServer.userRouter.getUser({
			address: "0x1234567890abcdef1234567890abcdef12345678",
		});
		console.log({ getUser });
	} catch (error) {
		if (error instanceof TRPCError) {
			console.error("Error fetching user:", error.code);
		} else {
			console.error("Unexpected error:", error);
		}
	}

	return <CampaignDetails campaignId={params.campaignId} />;
}
