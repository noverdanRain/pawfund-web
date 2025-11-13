import CampaignsPage from "@/feature-pages/Campaigns";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Campaigns(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams;
	// console.log({ searchParams });
	return <CampaignsPage searchParams={searchParams} />;
}
