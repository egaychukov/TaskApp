import { Component, OnInit } from '@angular/core';
import { UserTask, UserTaskService } from '../user-task.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public userTasks: UserTask[] | undefined;

  constructor(private userTaskService: UserTaskService) { }

  ngOnInit(): void {
    this.userTaskService.getUserTasks()
      .pipe(take(1))
      .subscribe(userTasks => {
        console.log(userTasks);
        this.userTasks = userTasks;
      });
  }
}
