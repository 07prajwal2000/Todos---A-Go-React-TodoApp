import { XCircleIcon } from "@heroicons/react/24/outline";

const SettingsSidebar = () => {
	return (
		<div>
			<div className="bg-dark-subtle position-fixed top-0 start-0 end-0 bottom-0 settings-sidebar-bg"></div>
			<div className="bg-light-subtle border border-2 shadow shadow-lg settings-sidebar">
				<div
					className="btn btn-light p-0 m-2 position-absolute rounded-circle d-flex align-items-center justify-content-center"
					style={{ right: "0", width: "37px", height: "37px" }}
				>
					<XCircleIcon
						style={{ width: "35px", height: "35px" }}
					/>
				</div>
			</div>
		</div>
	);
};

export default SettingsSidebar;
