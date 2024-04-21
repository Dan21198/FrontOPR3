import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Token is missing or expired.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
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

  getUserByEmail(email: string): Observable<User> {
    const headers = this.getHeaders()
    const params = { email };
    return this.http.get<User>(`${this.baseUrl}/email`, { headers, params });
  }
}
