import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTask, UserTaskService } from '../user-task.service';
import { interval, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {

  private userTasksSubscription: Subscription | undefined;
  
  public isLoading: boolean = true;
  public userTasks: UserTask[] | undefined;
  public spinnerDiameter: number = 50;
  public taskListRefreshFreq: number = 30000;

  constructor(private userTaskService: UserTaskService) { }

  ngOnInit(): void {
    this.userTasksSubscription = interval(this.taskListRefreshFreq)
      .pipe(startWith(() => this.userTaskService.getUserTasks()))
      .pipe(switchMap(() => {
        this.isLoading = true;
        return this.userTaskService.getUserTasks()
      }))
      .subscribe(userTasks => {
        this.isLoading = false;
        this.userTasks = userTasks;
      });
  }

  ngOnDestroy(): void {
    this.userTasksSubscription?.unsubscribe();
  }
}
