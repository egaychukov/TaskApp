import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskListState } from "../app.state";

export const selectTaskListFeature = createFeatureSelector<TaskListState>('taskListState');

export const selectUserTasks = createSelector(
    selectTaskListFeature,
    (state: TaskListState) => state.userTasks,
);

export const selectLoadingStatus = createSelector(
    selectTaskListFeature,
    (state: TaskListState) => state.isLoading,
);

export const selectLoadFailureStatus = createSelector(
    selectTaskListFeature,
    (state: TaskListState) => state.loadFailed,
);

export const selectPageTotalNumber = createSelector(
    selectTaskListFeature,
    (state: TaskListState) => state.pageTotal,
);

export const selectErrorMessage = createSelector(
    selectTaskListFeature,
    (state: TaskListState) => state.errorMessage,
);