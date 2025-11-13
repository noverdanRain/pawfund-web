import { withProtectedRoute } from "@/components/ProtectedRoute";
import AccountPage from "@/pages/Account";

function Account() {
	return <AccountPage />;
}

export default withProtectedRoute(Account);
