import { Component, OnInit } from '@angular/core';
import { TaskTypeService, TaskType } from '../task-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserTaskService } from '../user-task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniqueTitleValidatorAsync } from '../validators/unique-title.validator';
import { delay, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  private toastDuration: number = 3500;
  private creationDelay: number = 1500;
  private failToastMessage: string = 'Task failed to create';
  private successToastMessage: string = 'Task created successfully';
  private actionToastText:string = 'Ok';

  public taskTypes: TaskType[] = [];
  public spinnerDiameter: number = 50;
  public descAreaRowsNumber: number = 6;
  public creatingTask: boolean = false;
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
    this.creatingTask = true;
    this.taskService.createTask(this.taskCreationForm.value)
      .pipe(delay(this.creationDelay))
      .subscribe({
        next: () => {
          this.taskCreationForm.reset();
          this.creatingTask = false;
          this.showSnackbar(true)
            .afterDismissed()
            .pipe(take(1))
            .subscribe(() => this.router.navigateByUrl('/taskList'));
        },
        error: () => {
          this.creatingTask = false;
          this.showSnackbar(false);
        },
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