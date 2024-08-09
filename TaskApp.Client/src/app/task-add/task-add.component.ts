import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';
import { FormBuilder } from '@angular/forms';

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
    type: [''],
    description: [''],
  });

  constructor(
    private taskTypeService: TaskTypeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.taskTypeService.getTaskTypes()
      .subscribe(types => this.taskTypes = types);
  }

  public logStatus() {
    console.log(this.taskCreationForm.value);
  }
}
