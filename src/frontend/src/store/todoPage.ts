import { create } from "zustand";

export enum ToolbarEnum {
	Edit = "Edit Mode",
	View = "View Mode",
	Settings = "Settings",
}

type TodoPageStore = {
  activeTool: ToolbarEnum;
  prevActiveTool: ToolbarEnum;
  setActiveTool: (tool: ToolbarEnum) => void;
  toolbarVisible: boolean;
  setToolbarVisible: (visible: boolean) => void;
};

const useTodoPageStore = create<TodoPageStore>((set) => ({
  activeTool: ToolbarEnum.Edit,
  prevActiveTool: ToolbarEnum.Edit,
  toolbarVisible: true,
  setActiveTool(tool: ToolbarEnum) {
    set((s) => ({
      ...s,
      prevActiveTool: tool == ToolbarEnum.Settings ? ToolbarEnum.Edit : s.activeTool,
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