import { createAction, props } from "@ngrx/store";
import { Task } from "src/app/user-task.service";

export const searchTasks = createAction(
    '[List Page] Search Tasks',
    props<{ searchQuery: string, pageSize: number, currentPageIndex: number }>(),
);

export const searchTasksSuccess = createAction(
    '[List Page] Search Tasks Success',
    props<{ userTasks: Task[], taskLoadedNumber: number }>(),
);

export const searchTasksFailure = createAction(
    '[List Page] Search Tasks Failure',
    props<{ error: Error }>(),
);