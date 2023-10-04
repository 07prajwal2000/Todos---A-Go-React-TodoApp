import Draggable from "react-draggable";
import useTodoPageStore, { ToolbarEnum } from "../store/todoPage";
import { ArrowLeftCircleIcon, Cog6ToothIcon, EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const DraggableMenu = () => {
	const { activeTool, setActiveTool, setToolbarVisible, toolbarVisible } =
		useTodoPageStore();

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

	function mouseDown(e: any) {
		e.target.style.cursor = "grabbing";
	}
	function mouseUp(e: any) {
		e.target.style.cursor = "grab";
	}

	function onCloseBtnClicked() {
		setToolbarVisible(!toolbarVisible);
	}

	return (
		<Draggable
			defaultPosition={{ x: 500, y: 0 }}
			handle="#drag-handle"
			bounds={{
				top: -10,
				bottom: document.documentElement.scrollHeight - 250,
				left: 0,
				right: document.documentElement.scrollWidth - 400,
			}}
		>
			<div
				style={{
					width: '255px',
					height: "55px",
				}}
				className="position-relative d-flex align-items-center"
			>
				<div
					style={{
						width: toolbarVisible ? '255px' : "60px",
						height: "55px",
						transition: "width 120ms ease-in-out",
					}}
					className="bg-white overflow-hidden border border-2 d-flex justify-content-around flex-row shadow shadow-lg rounded-2 flex-row align-items-center gap-2 px-5 position-relative"
				>
					{toolbarVisible &&
						toolsButtonData.map((x) => (
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
					<div
						id="drag-handle"
						className="ms-3 btn btn-light px-1 py-1"
						style={{ cursor: "grab" }}
						onMouseDown={mouseDown}
						onMouseUp={mouseUp}
            title="Move Menubar"
					>
						<DragHandleSvg />
					</div>
				</div>
				<div
					onClick={onCloseBtnClicked}
					className="btn bg-primary-subtle p-1 rounded-circle position-absolute"
					style={{
						transition: "all 250ms ease-in-out",
						left: "-20px",
						rotate: toolbarVisible ? "180deg" : "0deg",
					}}
          title={toolbarVisible ? 'Close Menubar' : 'Open Menubar'}
				>
					<ArrowLeftCircleIcon width={"25px"} />
				</div>
			</div>
		</Draggable>
	);
};

const DragHandleSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30px"
			height="30px"
			viewBox="0 0 25 25"
			fill="none"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9.5 8C10.3284 8 11 7.32843 11 6.5C11 5.67157 10.3284 5 9.5 5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8ZM9.5 14C10.3284 14 11 13.3284 11 12.5C11 11.6716 10.3284 11 9.5 11C8.67157 11 8 11.6716 8 12.5C8 13.3284 8.67157 14 9.5 14ZM11 18.5C11 19.3284 10.3284 20 9.5 20C8.67157 20 8 19.3284 8 18.5C8 17.6716 8.67157 17 9.5 17C10.3284 17 11 17.6716 11 18.5ZM15.5 8C16.3284 8 17 7.32843 17 6.5C17 5.67157 16.3284 5 15.5 5C14.6716 5 14 5.67157 14 6.5C14 7.32843 14.6716 8 15.5 8ZM17 12.5C17 13.3284 16.3284 14 15.5 14C14.6716 14 14 13.3284 14 12.5C14 11.6716 14.6716 11 15.5 11C16.3284 11 17 11.6716 17 12.5ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"
				fill="#121923"
			/>
		</svg>
	);
};

export default DraggableMenu;