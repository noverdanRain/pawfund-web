import CampaignDetails from "@/feature-pages/CampaignDetails";

type Params = Promise<{
	campaignId: string;
}>;

export default async function CampaignPage(props: { params: Params }) {
	const params = await props.params;

	return <CampaignDetails campaignId={params.campaignId} />;
}
