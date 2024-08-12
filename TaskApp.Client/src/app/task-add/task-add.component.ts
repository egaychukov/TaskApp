import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TaskResponse, UserTaskService } from '../user-task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniqueTitleValidatorAsync } from '../validators/unique-title.validator';
import { take } from 'rxjs';
import { Router } from '@angular/router';

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
    title: ['', null, this.uniqueTitleValidator.validate.bind(this.uniqueTitleValidator)],
    userTaskTypeId: [''],
    description: [''],
  });

  constructor(
    private taskTypeService: TaskTypeService,
    private taskService: UserTaskService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private uniqueTitleValidator: UniqueTitleValidatorAsync,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.taskTypeService.getTaskTypes()
      .subscribe(types => this.taskTypes = types);
  }

  public createTask() {
    this.taskService.createTask(this.taskCreationForm.value)
      .subscribe({
        next: () => {
          this.showSnackbar(true)
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/taskList'));
        },
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

  public get title() { return this.taskCreationForm.get('title')!; }
  
  public get taskType() { return this.taskCreationForm.get('userTaskTypeId')!; }

  public get description() { return this.taskCreationForm.get('description')!; };
}