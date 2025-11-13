import { withProtectedRoute } from "@/components/ProtectedRoute";
import AccountPage from "@/feature-pages/Account";

function Account() {
	return <AccountPage />;
}

export default withProtectedRoute(Account);
