import { withProtectedRoute } from "@/components/common/ProtectedRouteHoc";
import AccountPage from "@/feature-pages/Account";

function Account() {
	return <AccountPage />;
}

export default withProtectedRoute(Account);
