import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  constructor(
    private client: HttpClient,
  ) { }

  public getTasksByTitle(title: string): Observable<TaskResponse[]> {
    const params = new HttpParams()
      .set('title', title);

      return this.client.get<TaskResponse[]>(
        environment.userTasksApiUrl + environment.endpoints.GetTaskByTitle,
        { params },
      );
  }

  public createTask(userTask: TaskRequest): Observable<TaskRequest> {
    console.log(userTask);
    return this.client.post<TaskRequest>(
      environment.userTasksApiUrl + environment.endpoints.CreateTask, 
      userTask);
  }
}

export interface TaskRequest {
  title: string,
  description: string,
  userTaskTypeId: number,
}

export interface TaskResponse {
  title: string,
  description: string,
  taskType: string,
}