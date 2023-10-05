import { XCircleIcon } from "@heroicons/react/24/outline";
import useTodoPageStore from "../store/todoPageStore";
import { ToolbarEnum } from "../store/todoPageStore";

const SettingsSidebar = () => {
	const { activeTool, prevActiveTool, setActiveTool } = useTodoPageStore();
	const settingsSelected = activeTool == ToolbarEnum.Settings;

	function closeSettings() {
		setActiveTool(prevActiveTool);
	}

	function onBackdropClick() {
		if (!settingsSelected) return;
		setActiveTool(prevActiveTool);
	}

	const SidebarContent = () => {
		return <h2>Settings</h2>
	};

	return (
		<div>
			<div
				style={{
					opacity: settingsSelected ? "70%" : "0",
					pointerEvents: settingsSelected ? "all" : "none",
				}}
				onClick={onBackdropClick}
				className={`bg-dark-subtle position-fixed top-0 start-0 end-0 bottom-0 settings-sidebar-bg`}
			></div>
			<div
				style={{
					width: settingsSelected ? "420px" : "0",
				}}
				className="bg-light-subtle border border-2 shadow shadow-lg settings-sidebar"
			>
				<div
					onClick={closeSettings}
					className={`btn p-0 m-2 bg-white position-absolute rounded-circle align-items-center justify-content-center ${
						settingsSelected ? "d-flex" : "d-none"
					}`}
					style={{ left: "-26px", width: "37px", height: "37px" }}
				>
					<XCircleIcon style={{ width: "35px", height: "35px" }} />
				</div>
				<div className="p-4">
					<SidebarContent />
				</div>
			</div>
		</div>
	);
};

export default SettingsSidebar;
