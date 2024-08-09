import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

  constructor(private client: HttpClient) { }

  public getTaskTypes(): Observable<TaskType[]> {
    return this.client.get<TaskType[]>(
      environment.userTasksApiUrl + environment.endpoints.GetTaskTypes
    );
  }
}

export interface TaskType {
  userTaskTypeId: number,
  title: string, 
}
