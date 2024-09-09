import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserTaskService } from "src/app/user-task.service";
import * as taskListActions from "../actions/task-list.actions";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TaskListEffects {
    searchTasks = createEffect(() => this.actions$.pipe(
        ofType(taskListActions.searchTasks),
        switchMap(searchAction => this.taskService.getTasksByTitle(
            searchAction.searchQuery,
            searchAction.currentPageIndex,
            searchAction.pageSize,
        ).pipe(
            delay(environment.responseDelay),
            map(action => taskListActions.searchTasksSuccess({ userTasks: action.tasks, taskLoadedNumber: action.count })),
            catchError(error => of(taskListActions.searchTasksFailure({ error })))
        ))
    ))

    constructor (
        private actions$: Actions,
        private taskService: UserTaskService,
    ) {}
}