import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskGetResponse, Task, UserTaskService } from '../user-task.service';
import { delay, interval, Observable, startWith, Subscription, catchError, EMPTY, range, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  
  private taskRefreshSub: Subscription | undefined;

  public userTasks: Task[] = [];
  public isLoading: boolean = true;
  public loadFailed: boolean = false;
  public spinnerDiameter: number = 50;
  public responseDelay: number = 500;
  public taskRefreshFreq: number = 30000;
  public errorMessage: string = '';
  public searchQuery: string = '';
  public pagesTotal: number = 0;
  public currentPageIndex: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10];

  constructor(private userTaskService: UserTaskService) { }

  ngOnInit(): void {
    this.taskRefreshSub = this.searchTasks(
        interval(this.taskRefreshFreq)
          .pipe(startWith(this.searchTasks(range(1, 1))))
      )
      .subscribe((response) => this.handleResponse(response));
  }

  public initiateSearchRequest() {
    this.currentPageIndex = 0;
    this.search();
  }

  private search() {
    this.searchTasks(range(1, 1))
      .subscribe((response) => this.handleResponse(response));
  }

  private searchTasks(outerObservable: Observable<any>) {
    return outerObservable
      .pipe(switchMap(() => {
        this.isLoading = true;
        this.loadFailed = false;
        return this.userTaskService.getTasksByTitle(this.searchQuery, this.currentPageIndex, this.pageSize)
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

  private handleResponse(response: TaskGetResponse) {
    this.userTasks = response.tasks;
    this.isLoading = false;
    this.pagesTotal = response.count;
  }

  handlePaginatorChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.search();
  }

  ngOnDestroy(): void {
    this.taskRefreshSub?.unsubscribe();
  }
}
