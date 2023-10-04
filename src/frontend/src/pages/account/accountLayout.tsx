import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const AccountLayout = () => {
	return (
		<div>
			<Sidebar />
			<div style={{marginLeft: '100px'}}>
        <Outlet />
      </div>
		</div>
	);
};

export default AccountLayout;
