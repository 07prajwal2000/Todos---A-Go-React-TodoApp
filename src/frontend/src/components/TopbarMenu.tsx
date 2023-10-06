import {
	ArrowUturnLeftIcon,
	Cog6ToothIcon,
	EyeIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/outline";
import useTodoPageStore, { ToolbarEnum } from "../store/todoPageStore";
import { Link } from "react-router-dom";

const toolsButtonData = [
	{
		id: 1,
		tooltip: "Edit mode",
		icon: <PencilSquareIcon width={"30px"} />,
		type: ToolbarEnum.Edit,
	},
	{
		id: 2,
		tooltip: "View mode",
		icon: <EyeIcon width={"30px"} />,
		type: ToolbarEnum.View,
	},
	{
		id: 3,
		tooltip: "Settings",
		icon: <Cog6ToothIcon width={"30px"} />,
		type: ToolbarEnum.Settings,
	},
];

const TopbarMenu = () => {
	const { activeTool, setActiveTool } =
		useTodoPageStore();

	return (
		<div className="container-fluid border border-2 my-3 mx-auto p-2 rounded-2 row flex-row justify-content-between align-items-center">
			<div className="col-md-4 col-sm-4">
				<input
					type="text"
					title="Todo List title"
					style={{ fontSize: "1.1rem", fontWeight: "500" }}
					className="border w-100 p-1 px-2 todo-title rounded-2"
					placeholder="Title"
					spellCheck={false}
					defaultValue={"Hello world"}
				/>
			</div>
			<div className="col-4 d-flex justify-content-center flex-row gap-3">
				{toolsButtonData.map((x) => (
					<div
						onClick={() => setActiveTool(x.type)}
						key={x.id}
						title={x.tooltip}
						className={`btn ${
							activeTool == x.type
								? "btn-primary"
								: "btn-outline-light shadow shadow-lg"
						} p-1`}
					>
						{x.icon}
					</div>
				))}
			</div>
			<div className="col-4 d-flex flex-row justify-content-end">
				<Link
					to={"/account/boards"}
					title="Back to the boards page"
					className="text-decoration-none"
				>
					<button className="btn btn-secondary d-flex align-items-center gap-2">
						<ArrowUturnLeftIcon width={"18px"} /> Back to Boards
					</button>
				</Link>
			</div>
		</div>
	);
};

export default TopbarMenu;
