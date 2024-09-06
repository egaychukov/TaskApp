import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TaskAddActions from "../actions/task-add.actions";
import { catchError, concatMap, delay, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { TaskTypeService } from "src/app/task-type.service";
import { UserTaskService } from "src/app/user-task.service";
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class TaskAddEffects {
    loadTaskTypes = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.loadTaskTypes),
        switchMap(() => this.taskTypeService.getTaskTypes()),
        map(taskTypes => TaskAddActions.loadTaskTypesSuccess({ taskTypes }))
    ));

    createTask = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.createTask),
        exhaustMap(createTaskAction => this.userTaskService.createTask(createTaskAction.formData)),
        delay(environment.responseDelay),
        map(() => TaskAddActions.createTaskSuccess()),
        catchError(() => of(TaskAddActions.createTaskFailure())),
    ));

    handleSuccess = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.createTaskSuccess),
        concatMap(() => [
            TaskAddActions.showSnackbar({ 
                message: 'Created successfully', 
                duration: 3000, 
                actionText: 'OK',
            }),
            TaskAddActions.navigateToListPage(),
        ]),
    ));

    handleCreationError = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.createTaskFailure),
        concatMap(() => [
            TaskAddActions.showSnackbar({ 
                message: 'Failed to create a task', 
                duration: 3000, 
                actionText: 'OK',
            }),
        ]),
    ));

    navigateToPage = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.navigateToListPage),
        tap(() => this.router.navigateByUrl('/taskList')),
    ), { dispatch: false });

    showSnackbar = createEffect(() => this.actions$.pipe(
        ofType(TaskAddActions.showSnackbar),
        tap(snackbarAction => this.snackbar.open(
            snackbarAction.message,
            snackbarAction.actionText,
            { duration: snackbarAction.duration },
        )),
    ), { dispatch: false });

    constructor (
        private actions$: Actions,
        private taskTypeService: TaskTypeService,
        private userTaskService: UserTaskService,
        private router: Router,
        private snackbar: MatSnackBar,
    ) {}
}