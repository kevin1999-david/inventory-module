import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { API } from "../../services/APIS/api.global";
import { Roles, User, UserResponse } from './../../models/user.interace';
import { catchError, map, take } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';




const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<any>(null);
  private userToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }



  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin(): Observable<string> {
    return this.role.asObservable();
  }

  get userTokenValue(): string {
    return this.userToken.getValue();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${API.inventory}/auth/login`, authData)
      .pipe(map((user: UserResponse) => {
        this.saveLocalStorage(user);
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
        return user;
      }),
        catchError((err) => this.handlerError(err)));
  }

  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.role.next(null);
    this.userToken.next('');
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.role.next(user.role);
        this.userToken.next(user.token);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    //localStorage.setItem('token', token);
    const { id, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'An error ocurred'
    if (err) {
      errorMessage = `Error: code${err.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }

}
