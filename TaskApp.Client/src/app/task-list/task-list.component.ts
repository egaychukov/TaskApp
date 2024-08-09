import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskResponse, UserTaskService } from '../user-task.service';
import { delay, interval, Observable, startWith, Subscription, catchError, EMPTY, concatMap, range, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  
  private taskRefreshSub: Subscription | undefined;

  public userTasks: TaskResponse[] = [];
  public isLoading: boolean = true;
  public loadFailed: boolean = false;
  public spinnerDiameter: number = 50;
  public responseDelay: number = 500;
  public taskRefreshFreq: number = 30000;
  public errorMessage: string = '';
  public searchQuery: string = '';

  constructor(private userTaskService: UserTaskService) { }

  ngOnInit(): void {
    this.taskRefreshSub = this.searchTasks(
        interval(this.taskRefreshFreq)
          .pipe(startWith(this.searchTasks(range(1, 1))))
      )
      .subscribe((tasks) => this.handleResponse(tasks));
  }

  public search() {
    this.searchTasks(range(1, 1))
      .subscribe((tasks) => this.handleResponse(tasks));
  }

  private searchTasks(outerObservable: Observable<any>) {
    return outerObservable
      .pipe(switchMap(() => {
        this.isLoading = true;
        this.loadFailed = false;
        return this.userTaskService.getTasksByTitle(this.searchQuery)
          .pipe(catchError(error => {
            this.handleError(error);
            return EMPTY;
          }))
      }))
      .pipe(delay(this.responseDelay));
  }

  private handleError(error: Error) {
    this.userTasks = [];
    this.isLoading = false;
    this.loadFailed = true;

    if (error instanceof HttpErrorResponse) {
      const message = environment.errorMessages[error.status];
      this.errorMessage = message ?? environment.defaultErrorMessage;
    }
    else {
      throw error;
    }
  }

  private handleResponse(userTasks: TaskResponse[]) {
    this.userTasks = userTasks;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.taskRefreshSub?.unsubscribe();
  }
}
