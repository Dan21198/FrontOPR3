import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = [];
  private loggedIn = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.loggedIn.next(true);
    }
  }

  register(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, request);
  }

  login(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, request)
      .pipe(
        tap((response) => {
          if (response && response.access_token) {
            localStorage.setItem(this.TOKEN_KEY, response.access_token);
            this.loggedIn.next(true);
          }
        })
      );
  }


  logout(): Observable<any> {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

}
