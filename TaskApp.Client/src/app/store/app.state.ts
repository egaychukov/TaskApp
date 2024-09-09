import { ActionReducerMap } from "@ngrx/store";
import { TaskType } from "../task-type.service"; 
import { TaskCreateRequest, Task } from "../user-task.service";
import { taskAddReducer } from "./reducers/task-add-reducer";
import { taskListReducer } from "./reducers/task-list.reducer";

export interface TaskAddState {
    taskTypes: TaskType[];
    taskCreating: boolean;
    formData: TaskCreateRequest;
}

export interface TaskListState {
    userTasks: Task[];
    isLoading: boolean;
    loadFailed: boolean;
    pageTotal: number;
    errorMessage: string;
}

export interface AppState {
    taskAddState: TaskAddState;
    taskListState: TaskListState;
}

export const reducers: ActionReducerMap<AppState> = {
    taskAddState: taskAddReducer,
    taskListState: taskListReducer,
}