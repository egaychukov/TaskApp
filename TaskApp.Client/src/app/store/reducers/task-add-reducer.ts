import { createReducer, on } from "@ngrx/store";
import { initTaskAddState } from "../app.state";
import * as TaskAddActions from "../actions/task-add.actions";
import { produce } from "immer";

export const taskAddReducer = createReducer(
    initTaskAddState,
    on(TaskAddActions.changeFormModel, (state, { formData }) => 
        produce(state, draft => { 
            draft.formData = formData;
        })
    ),
    on(TaskAddActions.loadTaskTypesSuccess, (state, { taskTypes }) => 
        produce(state, draft => {
            draft.taskTypes = taskTypes;
        })
    ),
    on(TaskAddActions.createTask, state => ({
        ...state,
        taskCreating: true,    
    })),
    on(TaskAddActions.createTaskSuccess, state => ({
        ...initTaskAddState
    })),
    on(TaskAddActions.createTaskFailure, state => ({
        ...state,
        taskCreating: false,
    }))
);