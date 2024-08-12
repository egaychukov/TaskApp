import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
export class UniqueTitleValidatorAsync implements AsyncValidator {
    
    constructor(private client: HttpClient) {}

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const params = new HttpParams()
            .set('title', control.value);
        
        return this.client.get<boolean>(
            environment.userTasksApiUrl + environment.endpoints.CheckTitle,
            { params },
        ).pipe(map(result => !result ? null : { 'titleDuplicate': true }));
    }
}