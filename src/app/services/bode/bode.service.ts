import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bode } from 'src/app/models/user.interace';
import { API } from "./../APIS/api.global";

@Injectable({
  providedIn: 'root'
})
export class BodeService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Bode[]> {
    return this.http.get<Bode[]>(API.inventory + "/users/byrole/BODE")
      .pipe(catchError(this.handleError));
  }


  getById(id: string): Observable<Bode> {
    return this.http.get<Bode>(`${API.inventory}/users/${id}`);
  }

  new(bode: Bode): Observable<any> {
    //let params = JSON.stringify(bode);

    return this.http.post<any>(`${API.inventory}/users`, bode);
  }

  updatePassword(id: string, password: string): Observable<any> {
    return this.http.patch<any>(`${API.inventory}/users/update-password/${id}`, { password }).pipe(catchError(this.handleError));
  }


  update(bode: Bode): Observable<any> {
    return this.http.put<any>(`${API.inventory}/users/${bode.id}`, bode).pipe(catchError(this.handleError));
  }


  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${API.inventory}/users/${id}`);
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
