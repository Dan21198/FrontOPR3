import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private baseUrl = 'http://localhost:8080/api/v1/notes';

  constructor(private http: HttpClient) { }

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

  getAllNotes(): Observable<any[]> {
    let headers: HttpHeaders;
    try {
      headers = this.getHeaders();
    } catch (error) {
      return throwError(error);
    }
    return this.http.get<any[]>(`${this.baseUrl}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getNotesByFinishedStatus(finished: boolean): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/finished/${finished}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getNotesByTag(tagId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/tag/${tagId}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
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
