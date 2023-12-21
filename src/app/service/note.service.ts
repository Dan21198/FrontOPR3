import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:8080/api/v1/notes';
  private jwtToken: string = '';
  constructor(private http: HttpClient,
              private authService: AuthService) { }

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
  getAllNotes(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}`, { headers });
  }

  getNoteById(noteId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${noteId}`);
  }

  createNote(noteData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.baseUrl}`, noteData, { headers });
  }

  updateNote(noteId: number, updatedNote: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.baseUrl}/${noteId}`, updatedNote, { headers });
  }

  deleteNote(noteId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.baseUrl}/${noteId}`, { headers });
  }

}
