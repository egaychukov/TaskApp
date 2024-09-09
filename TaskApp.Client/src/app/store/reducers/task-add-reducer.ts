import { createReducer, on } from "@ngrx/store";
import * as TaskAddActions from "../actions/task-add.actions";
import { produce } from "immer";
import { TaskAddState } from "../app.state";

export const initTaskAddState: TaskAddState = {
    taskTypes: [],
    taskCreating: false,
    formData: {
        title: '',
        description: '',
        userTaskTypeId: 0,
    },
};

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
    on(TaskAddActions.createTaskSuccess, () => ({
        ...initTaskAddState
    })),
    on(TaskAddActions.createTaskFailure, state => ({
        ...state,
        taskCreating: false,
    }))
);