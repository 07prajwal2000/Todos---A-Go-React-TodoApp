import React, { useState } from "react";
import useTodoPageStore from "../store/todoPageStore";
import TodoItem from "./TodoItem";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

type TodoListType = {
	Id: number;
	Total: number;
};

const todosD = [
	{
		id: Math.random() * 100000,
		uid: parseInt((Math.random() * 100000).toString()),
		name: "Todo 1",
	},
	{
		id: Math.random() * 100000,
		uid: parseInt((Math.random() * 100000).toString()),
		name: "Todo 2",
	},
	{
		id: Math.random() * 100000,
		uid: parseInt((Math.random() * 100000).toString()),
		name: "Todo 3",
	},
	{
		id: Math.random() * 100000,
		uid: parseInt((Math.random() * 100000).toString()),
		name: "Todo 4",
	},
];

const TodoList: React.FC<TodoListType> = ({ Id, Total }) => {
	const [todos, SetTodos] = useState(todosD);

	function onDragEnd(result: DropResult) {
    if (result.destination == null) return;
    const si = result.source.index - 1;
    const ei = result.destination.index - 1;
		const items = Array.from(todos);
    const [reorderedItem] = items.splice(si, 1);
    items.splice(ei, 0, reorderedItem);

    SetTodos(items);
	}

	return (
		<div className="border border-2 col-3 rounded-2 todo-list">
			<TodoTitle />
			<hr className="p-0 m-0" />
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="todos">
					{(p) => (
						<div {...p.droppableProps} ref={p.innerRef} className="d-flex flex-column gap-2 py-2 todos">
							{todos.map((x, i) => (
                <TodoItem
                  Name={x.name}
                  UniqueId={x.uid.toString()}
                  Id={i + 1}
                  />
							))}
              {p.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

const TodoTitle = () => {
	const { isEditMode } = useTodoPageStore();

	return (
		<div>
			<h3
				style={{ maxHeight: "120px", overflowY: "auto" }}
				className="px-2 z-1 todo-title rounded-2 fs-4 py-1 mt-1"
				spellCheck={false}
				suppressContentEditableWarning={true}
				contentEditable={isEditMode()}
			>
				ss
			</h3>
		</div>
	);
};

export default TodoList;
