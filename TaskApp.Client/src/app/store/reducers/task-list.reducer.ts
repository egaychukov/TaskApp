import { createReducer, on } from "@ngrx/store";
import * as taskListActions from "../actions/task-list.actions";
import { TaskListState } from "../app.state";
import { HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const initTaskListState: TaskListState = {
    userTasks: [],
    isLoading: false,
    loadFailed: false,
    pageTotal: 0,
    errorMessage: '',
};

export const taskListReducer = createReducer(
    initTaskListState,
    on(taskListActions.searchTasks, state => ({
        ...state,
        isLoading: true,
        loadFailed: false,
    })),
    on(taskListActions.searchTasksSuccess, (_, { userTasks, taskLoadedNumber }) => ({
        ...initTaskListState,
        userTasks: userTasks,
        pageTotal: taskLoadedNumber,
    })),
    on(taskListActions.searchTasksFailure, (_, { error }) => {
        console.log(error);
        if (error instanceof HttpErrorResponse) {
            return {
                ...initTaskListState,
                errorMessage: environment.errorMessages[error.status],
                loadFailed: true,
            }    
        }
        else {
            throw error;
        }
    })
);