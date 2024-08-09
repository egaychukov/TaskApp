import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserTaskService } from '../user-task.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  public taskTypes: TaskType[] = [];
  public descAreaRowsNumber: number = 6;
  private toastDuration: number = 3500;
  private failToastMessage: string = 'Task failed to create';
  private successToastMessage: string = 'Task created successfully';
  private actionToastText:string = 'Ok';
  public taskCreationForm: FormGroup = this.formBuilder.group({
    title: [''],
    userTaskTypeId: [''],
    description: [''],
  });

  constructor(
    private taskTypeService: TaskTypeService,
    private taskService: UserTaskService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.taskTypeService.getTaskTypes()
      .subscribe(types => this.taskTypes = types);
  }

  public createTask() {
    this.taskService.createTask(this.taskCreationForm.value)
      .subscribe({
        next: () => this.showSnackbar(true),
        error: () => this.showSnackbar(false),
      });
  }

  private showSnackbar(success: boolean) {
    const message = success ? this.successToastMessage : this.failToastMessage;
    return this.snackbar.open(
      message, 
      this.actionToastText, 
      { duration: this.toastDuration },
    );
  }
}