import { Component, OnInit } from '@angular/core';
import { Task } from '../user-task.service';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as taskListActions from '../store/actions/task-list.actions';
import { UIConfig } from '../ui-config';
import { selectErrorMessage, selectLoadFailureStatus, selectLoadingStatus, selectPageTotalNumber, selectUserTasks } from '../store/selectors/task-list.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public userTasks$: Observable<Task[]>;
  public isLoading$: Observable<boolean>;
  public loadFailed$: Observable<boolean>;
  public pagesTotal$: Observable<number>;
  public errorMessage$: Observable<string>;
  public spinnerDiameter: number = UIConfig.spinnerDiameter;
  public taskRefreshFreq: number = 30000;
  public searchQuery: string = '';
  public currentPageIndex: number = 0;
  public pageSize: number = 5;
  public pageSizeOptions: number[] = [5, 10];

  constructor(private store: Store<AppState>) { 
    this.userTasks$ = store.pipe(select(selectUserTasks));
    this.isLoading$ = store.pipe(select(selectLoadingStatus));
    this.loadFailed$ = store.pipe(select(selectLoadFailureStatus));
    this.pagesTotal$ = store.pipe(select(selectPageTotalNumber));
    this.errorMessage$ = store.pipe(select(selectErrorMessage));
  }

  ngOnInit(): void {
    this.dispatchSearchAction();
    setInterval(() => this.dispatchSearchAction(), this.taskRefreshFreq);
  }

  private dispatchSearchAction() {
    const searchAction = taskListActions.searchTasks({
      searchQuery: this.searchQuery,
      currentPageIndex: this.currentPageIndex,
      pageSize: this.pageSize,
    });
    return this.store.dispatch(searchAction);
  }

  public search() {
    this.currentPageIndex = 0;
    this.dispatchSearchAction();
  }

  handlePaginatorChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.dispatchSearchAction();
  }
}