import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';
import { FormBuilder } from '@angular/forms';
import { UserTaskService } from '../user-task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  public taskTypes: TaskType[] = [];
  public descAreaRowsNumber: number = 6;
  public taskCreationForm = this.formBuilder.group({
    title: [''],
    userTaskTypeId: [''],
    description: [''],
  });

  constructor(
    private taskTypeService: TaskTypeService,
    private taskService: UserTaskService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.taskTypeService.getTaskTypes()
      .subscribe(types => this.taskTypes = types);
  }

  public createTask() {
    this.taskService.createTask(this.taskCreationForm.value)
      .subscribe({
        next: task => console.log(task),
        error: err => console.log(err),
      });
  }
}