import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/users';
  private jwtToken: string = '';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      console.log('Token set:', this.jwtToken);
    } else {
      console.error('Invalid token provided.');
    }
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.jwtToken) {
      headers = headers.append('Authorization', `Bearer ${this.jwtToken}`);
    }
    console.log('Headers:', headers);

    return headers;
  }

  getUserById(userId: number): Observable<User> {
    const headers = this.getHeaders()
    return this.http.get<User>(`${this.baseUrl}/${userId}`, { headers });
  }

  getAllUsers(): Observable<User[]> {
    const headers = this.getHeaders()
    return this.http.get<User[]>(this.baseUrl, { headers });
  }

  createUser(user: User): Observable<User> {
    const headers = this.getHeaders()
    return this.http.post<User>(this.baseUrl, user, { headers });
  }

  updateUser(userId: number, user: User): Observable<User> {
    const headers = this.getHeaders()
    return this.http.put<User>(`${this.baseUrl}/${userId}`, user, { headers });
  }

  deleteUser(userId: number): Observable<void> {
    const headers = this.getHeaders()
    return this.http.delete<void>(`${this.baseUrl}/${userId}`, { headers });
  }
}
