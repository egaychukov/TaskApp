import { TaskType } from "../task-type.service"; 
import { TaskCreateRequest } from "../user-task.service";

export interface TaskAddState {
    taskTypes: TaskType[];
    taskCreating: boolean;
    formData: TaskCreateRequest;
}

export const initTaskAddState: TaskAddState = {
    taskTypes: [],
    taskCreating: false,
    formData: {
        title: '',
        description: '',
        userTaskTypeId: 0,
    },
}