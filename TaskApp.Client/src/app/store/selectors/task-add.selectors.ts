import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskAddState } from "../app.state";

export const selectTaskAddFeature = createFeatureSelector<TaskAddState>('taskAddState');

export const selectTaskCreatingStatus = createSelector(
    selectTaskAddFeature,
    (state: TaskAddState) => state.taskCreating,
);

export const selectTaskTypes = createSelector(
    selectTaskAddFeature,
    (state: TaskAddState) => state.taskTypes,
);