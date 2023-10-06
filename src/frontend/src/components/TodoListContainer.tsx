import TodoList from "./TodoList";

const lists = [2, 2];

const TodoListContainer = () => {
	return (
		<div
			style={{ overflow: "auto" }}
			className="row px-2 list-container mx-auto flex-nowrap gap-3 justify-content-start overflow-y-auto"
		>
			{lists.map((x, i) => (
				<TodoList key={i} Id={i + 1} Total={x} />
			))}
		</div>
	);
};

export default TodoListContainer;
