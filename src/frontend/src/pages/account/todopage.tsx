import { useParams } from "react-router-dom";
import useTodoPageStore from "../../store/todoPage";
import DraggableMenu from "../../components/DraggableMenu";
import SettingsSidebar from "../../components/SettingsSidebar";
import { createPortal } from "react-dom";
import { useMemo } from "react";

const TodoPage = () => {
	const { id } = useParams();
	const { } = useTodoPageStore();
  const sidebarElement = useMemo(() => document.getElementById('sidebar'), []);
  
	console.log(id);
	return (
		<div className="border todo-viewport position-relative" id="parent">
			<DraggableMenu />
      {createPortal(<SettingsSidebar />, sidebarElement!)}
		</div>
	);
};

export default TodoPage;
