import { useParams } from "react-router-dom";
import useTodoPageStore from "../../store/todoPageStore";
import SettingsSidebar from "../../components/SettingsSidebar";
import { createPortal } from "react-dom";
import { useEffect, useMemo } from "react";
import TodoListContainer from "../../components/TodoListContainer";
import useGlobalStore, { PageEnum } from "../../store/global";
import TopbarMenu from "../../components/TopbarMenu";

const TodoPage = () => {
	const { id } = useParams();
	const { SetCurrentPage } = useGlobalStore();
	const { setCurrentTodoBoard } = useTodoPageStore();
	const LocalSettingsSidebar = useMemo(
		() =>
			createPortal(
				<SettingsSidebar />,
				document.getElementById("sidebar")!
			),
		[]
	);

	useEffect(() => {
		SetCurrentPage(PageEnum.TodoListCanvas);
		setCurrentTodoBoard(id!);
		console.log(id);
	}, []);

	return (
		<div className="todo-viewport position-relative mx-auto" id="parent">
			{/* <DraggableMenu /> */}
			<TopbarMenu />
			{LocalSettingsSidebar}
			<TodoListContainer />
		</div>
	);
};

export default TodoPage;
