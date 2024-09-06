import { Component, OnInit } from '@angular/core';
import { TaskType } from '../task-type.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UniqueTitleValidatorAsync } from '../validators/unique-title.validator';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import * as TaskAddActions from '../store/actions/task-add.actions';
import { TaskAddState } from '../store/app.state';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {

  public spinnerDiameter: number = 50;
  public descAreaRowsNumber: number = 6;

  public creatingTask$: Observable<boolean>;
  public taskTypes$: Observable<TaskType[]>;

  public taskCreationForm: FormGroup = this.formBuilder.group({
    title: ['', null, this.uniqueTitleValidator.validate.bind(this.uniqueTitleValidator)],
    userTaskTypeId: [''],
    description: [''],
  });

  constructor (
    private store: Store<{ taskAddState: TaskAddState }>,
    private formBuilder: FormBuilder,
    private uniqueTitleValidator: UniqueTitleValidatorAsync,
  ) { 
    this.creatingTask$ = store.select(state => state.taskAddState.taskCreating);
    this.taskTypes$ = store.select(state => state.taskAddState.taskTypes);
  }

  ngOnInit(): void {
    this.store.dispatch(TaskAddActions.loadTaskTypes());

    this.taskCreationForm.valueChanges
      .subscribe(formData => this.store.dispatch(
        TaskAddActions.changeFormModel({ formData })
      ));
  }

  public createTask() {
    this.store.select(store => store.taskAddState.formData)
      .pipe(take(1))
      .subscribe(formData => {
        this.store.dispatch(TaskAddActions.createTask({ formData }));
      });
  }

  public get title() { return this.taskCreationForm.get('title')!; }
  
  public get taskType() { return this.taskCreationForm.get('userTaskTypeId')!; }

  public get description() { return this.taskCreationForm.get('description')!; };
}