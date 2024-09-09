import { createAction, props } from '@ngrx/store';
import { TaskCreateRequest } from 'src/app/user-task.service';
import { TaskType } from 'src/app/task-type.service';

export const loadTaskTypes = createAction(
  '[Creation Page] Load Task Types',
);

export const loadTaskTypesSuccess = createAction(
  '[Creation Page] Load Task Types Success',
  props<{ taskTypes: TaskType[] }>(),
);

export const createTask = createAction(
  '[Creation Page] Create Task',
  props<{ formData: TaskCreateRequest }>(),
);

export const createTaskSuccess = createAction(
  '[Creation Page] Create Task Success',
);

export const createTaskFailure = createAction(
  '[Creation Page] Create Task Failure',
);

export const changeFormModel = createAction(
  '[Creation Page] Change Form Model',
  props<{ formData: TaskCreateRequest }>(),
);

export const showSnackbar = createAction(
  '[Creation Page] Show Snackbar',
  props<{ message: string, actionText: string, duration: number }>(),
);

export const navigateToListPage = createAction(
  '[Creation Page] Navigate To List Page',
);