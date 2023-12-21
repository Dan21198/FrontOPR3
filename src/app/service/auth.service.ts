import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = [];
  private loggedIn = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  register(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, request);
  }

  login(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, request);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {});
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

}
