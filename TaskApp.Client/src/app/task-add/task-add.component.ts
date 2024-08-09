import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  public taskTypes: TaskType[] = [];

  constructor(private taskTypeService: TaskTypeService) { }

  ngOnInit(): void {
    this.taskTypeService.getTaskTypes()
      .subscribe(types => this.taskTypes = types);
  }
}
