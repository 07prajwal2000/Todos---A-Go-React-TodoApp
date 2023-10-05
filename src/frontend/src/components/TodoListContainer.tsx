import TodoList from "./TodoList";

const lists = [5, 3];

const TodoListContainer = () => {
	return (
		<div
			style={{ minHeight: "100%", overflow: "auto" }}
			className="row flex-nowrap gap-3 justify-content-start overflow-y-auto"
		>
			{lists.map((x, i) => (
				<TodoList key={i} Id={i + 1} Total={x} />
			))}
		</div>
	);
};

export default TodoListContainer;
