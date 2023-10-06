import { Draggable } from "react-beautiful-dnd";
import useTodoPageStore from "../store/todoPageStore";
import React, { useState } from "react";
import {
	CheckIcon,
	EllipsisHorizontalCircleIcon,
	MinusIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import Toast from "../common/Toast";

type TodoItemType = {
	Id: number;
	UniqueId: string;
	Name: string;
};

const TodoItem = ({ Id, Name, UniqueId }: TodoItemType) => {
	const { isEditMode } = useTodoPageStore();
	const [prevName, setPrevName] = useState(Name);
	const [completed, setCompleted] = useState(false);

	function onFocusOut(e: React.FocusEvent<HTMLInputElement>) {
		const name = e.target.innerText;
		if (prevName == name) return;
		onChange(name);
	}

	function onChange(name: string) {
		setPrevName(name);
		console.log("changed ", name);
	}

	function toggleComplete() {
		setCompleted((p) => !p);
	}

	function deleteTodo() {
		Toast.Success(`Todo: ${Name} is deleted.`);
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
					className={`border p-2 rounded d-flex flex-row justify-content-start ${
						snapshot.isDragging
							? "shadow shadow-lg bg-primary-subtle"
							: completed
							? "bg-completed fst-italic"
							: "bg-light"
					}`}
				>
					<h5
						onBlur={onFocusOut}
						title={isEditMode() ? "Edit todo name" : Name}
						style={{ fontSize: "1rem" }}
						spellCheck={false}
						className={`h-100 fw-normal p-1 my-auto todo-title rounded-1 flex-grow-1 ${
							completed && "text-decoration-line-through"
						}`}
						suppressContentEditableWarning={true}
						contentEditable={isEditMode() && !completed}
					>
						{Name}
					</h5>
					<div className="dropdown ms-1">
						<button
							className="bg-light btn btn-sm btn-outline-light todo-option-btn"
							type="button"
							title="Options"
							id="dropdownMenuButton1"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<EllipsisHorizontalCircleIcon width={"20px"} />
						</button>
						<ul
							className="dropdown-menu"
							aria-labelledby="dropdownMenuButton1"
						>
							<li
								className="dropdown-item"
								onClick={toggleComplete}
							>
								{completed ? (
									<>
										<MinusIcon width={"18px"} />
										Undo
									</>
								) : (
									<>
										<CheckIcon width={"18px"} /> Complete
									</>
								)}
							</li>
							<li
								className="dropdown-item dropdown-item-danger"
								onClick={deleteTodo}
							>
								<TrashIcon width={"18px"} /> Delete
							</li>
						</ul>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default TodoItem;

{
	/* <EllipsisHorizontalCircleIcon width={"20px"} /> */
}
// btn btn-sm btn-outline-light dropdown-toggle
