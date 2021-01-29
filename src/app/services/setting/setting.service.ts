import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API } from "./../APIS/api.global";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SettingPartial, Setting } from 'src/app/models/setting.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }






  getAll(): Observable<Setting[]> {
    return this.http.get<Setting[]>(API.inventory + "/settings/")
      .pipe(catchError(this.handleError));
  }

  new(setting: SettingPartial): Observable<any> {
    return this.http.post<any>(`${API.inventory}/settings`, setting)
      .pipe(catchError(this.handleError));;
  }

  getByDates(to: string, end: string): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${API.inventory}/settings/bydates/${to}/${end}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any): Observable<never> {
    let errorMessage: string = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  };
}
