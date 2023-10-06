import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect } from "react";
import useGlobalStore, { NavbarTypes } from "../../store/global";

const AccountLayout = () => {
	const { SetNavbarType, ShowDashboardSidebar } = useGlobalStore();

	useEffect(() => {
		SetNavbarType(NavbarTypes.Account);
		return () => SetNavbarType(NavbarTypes.Default);
	}, []);
	return (
		<div>
			{ShowDashboardSidebar && <Sidebar />}
			<div style={{ marginLeft: !ShowDashboardSidebar ? "0px" : "100px" }}>
				<Outlet />
			</div>
		</div>
	);
};

export default AccountLayout;
