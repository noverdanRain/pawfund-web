import CampaignList from "./components/CampaignList";
import CampaignPagination from "./components/CampaignPagination";
import CampaignSort from "./components/CampaignSort";
import SearchInput from "./components/SearchInput";

type SearchParams = {
	search?: string | string[] | undefined;
	filter?: string | string[] | undefined;
	sort?: string | string[] | undefined;
	page?: string | string[] | undefined;
};

type CampaignsPageProps = {
	searchParams: SearchParams;
	children?: React.ReactNode;
};
export default function CampaignsPage(props: CampaignsPageProps) {
	const { searchParams } = props;
	// const { filter, page, search, sort } = searchParams;
	// console.log({ filter, page, search, sort });
	return (
		<main className="mx-auto mt-40 min-h-[calc(100dvh-7rem)] w-[calc(100%-1.5rem)] max-w-6xl">
			<div className="flex flex-col items-center gap-2">
				<h1 className="font-display text-5xl">Find Campaign</h1>
				<h6 className="mt-2 text-center text-lg font-medium">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</h6>
				<SearchInput />
				<CampaignSort />
				<CampaignList />
				<CampaignPagination />
			</div>
		</main>
	);
}
