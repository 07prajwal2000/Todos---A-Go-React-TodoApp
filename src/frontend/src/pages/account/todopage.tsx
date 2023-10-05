import { useParams } from "react-router-dom";
import useTodoPageStore from "../../store/todoPageStore";
import DraggableMenu from "../../components/DraggableMenu";
import SettingsSidebar from "../../components/SettingsSidebar";
import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";
import TodoListContainer from "../../components/TodoListContainer";

const TodoPage = () => {
	const { id } = useParams();
	const { setCurrentTodoBoard } = useTodoPageStore();
	const Sidebar = useMemo(
		() =>
			createPortal(
				<SettingsSidebar />,
				document.getElementById("sidebar")!
			),
		[]
	);

	useEffect(() => {
		setCurrentTodoBoard(id!);
		console.log(id);
	}, []);

	return (
		<div className="px-2 todo-viewport position-relative" id="parent">
			<DraggableMenu />
			{Sidebar}
			<TodoListContainer />
		</div>
	);
};

export default TodoPage;
