import { create } from "zustand";

export enum ToolbarEnum {
	Edit = "Edit Mode",
	View = "View Mode",
	Settings = "Settings",
}

type TodoPageStore = {
  currentTodoBoard: string;
  setCurrentTodoBoard: (id: string) => void;
  
  isEditMode: () => boolean;
  isViewMode: () => boolean;
  activeTool: ToolbarEnum;
  prevActiveTool: ToolbarEnum;
  setActiveTool: (tool: ToolbarEnum) => void;

  toolbarVisible: boolean;
  setToolbarVisible: (visible: boolean) => void;
};

const useTodoPageStore = create<TodoPageStore>((set, get) => ({
  currentTodoBoard: '',
  setCurrentTodoBoard(id: string) {
    set((s) => ({
      ...s,
      currentTodoBoard: id
    }));
  },
  activeTool: ToolbarEnum.Edit,
  isEditMode: () => get().activeTool == ToolbarEnum.Edit,
  isViewMode: () => get().activeTool == ToolbarEnum.View,
  prevActiveTool: ToolbarEnum.Edit,
  toolbarVisible: true,
  setActiveTool(tool: ToolbarEnum) {
    set((s) => ({
      ...s,
      prevActiveTool: s.prevActiveTool == ToolbarEnum.Settings ? ToolbarEnum.Edit : s.activeTool,
      activeTool: tool
    }));
  },
  setToolbarVisible(visible) {
    set((s) => ({
      ...s,
      toolbarVisible: visible
    }));
  },
}));

export default useTodoPageStore;