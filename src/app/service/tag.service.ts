import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8080/api/v1/tags';
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

  getTags(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  getTagsByNoteId(noteId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/notes/${noteId}`, { headers });
  }

  createTag(tagData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`, tagData, { headers });
  }

  updateTag(tagId: number, tagData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${tagId}`, tagData, { headers });
  }

  deleteTag(tagId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${tagId}`, { headers });
  }

  assignTagToNote(tagId: number, noteId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${tagId}/assign/${noteId}`, null, { headers });
  }

  removeTagFromNote(tagId: number, noteId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${tagId}/remove/${noteId}`, null, { headers });
  }
}
