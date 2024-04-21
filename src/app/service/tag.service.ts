import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../model/Tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8080/api/v1/tags';

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

  getTags(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }

  getTagsByNoteId(noteId: number): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/notes/${noteId}`, { headers });
  }

  createTag(tagData: Tag): Observable<Tag> {
    const headers = this.getHeaders();
    return this.http.post<Tag>(this.apiUrl, tagData, { headers });
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
    const body = { tagId, noteId };
    return this.http.put<any>(`${this.apiUrl}/${tagId}/assign/${noteId}`, body, { headers });
  }


  removeTagFromNote(tagId: number, noteId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${tagId}/remove/${noteId}`, null, { headers });
  }
}
