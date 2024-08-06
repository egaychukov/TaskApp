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

  public getUserTasks(): Observable<UserTask[]> {
    return this.client.get<UserTask[]>(
      `${environment.userTasksApiUrl}/${environment.endpoints.GetTasks}`,
    );
  }

  public getTaskByTitle(title: string): Observable<UserTask> {
    const params = new HttpParams()
      .set('title', title);

      return this.client.get<UserTask>(
        `${environment.userTasksApiUrl}/${environment.endpoints.GetTaskByTitle}`,
        { params },
      );
  }
}

export interface UserTask {
  title: string,
  description: string,
  userTaskTypeId: number,
}