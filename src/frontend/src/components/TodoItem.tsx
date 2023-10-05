import { Draggable } from "react-beautiful-dnd";
import useTodoPageStore from "../store/todoPageStore";
import React, { useMemo, useState } from "react";

type TodoItemType = {
	Id: number;
	UniqueId: string;
	Name: string;
};

const TodoItem = ({ Id, Name, UniqueId }: TodoItemType) => {
	const { isEditMode } = useTodoPageStore();
  const [prevName, setPrevName] = useState(Name);

  function onFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    const name = e.target.innerText;
    if (prevName == name) return;
    onChange(name);
  }

  function onChange(name:string) {
    setPrevName(name);
    console.log("changed ", name);
  }
  
	return (
		<Draggable
			key={Id}
			draggableId={Id.toString()}
			index={Id}
			isDragDisabled={isEditMode()}
		>
			{(p, snapshot) => (
				<div
					ref={p.innerRef}
					{...p.dragHandleProps}
					{...p.draggableProps}
					className={`border p-2 rounded ${
						snapshot.isDragging
							? "shadow shadow-lg bg-primary-subtle"
							: "bg-light"
					}`}
				>
					<h5
            onBlur={onFocusOut}
            style={{ fontSize: "1rem" }}
            spellCheck={false}
            className="h-100 fw-normal p-1 my-auto todo-title rounded-1"
            suppressContentEditableWarning={true}
            contentEditable={isEditMode()}
          >
            {Name}
						</h5>
				</div>
			)}
		</Draggable>
	);
};

export default TodoItem;
