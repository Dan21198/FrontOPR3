import {Injectable} from '@angular/core';
import {User} from "./user";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  private users = new BehaviorSubject<User[]>([
    new User(1, 'Franta', 'franta@seznam.cz','123'),
    new User(2, 'Johnty', 'Hello@mynameisjohny.cz','123'),
    new User(3, 'Paul', 'paul@thebeatle.com','123'),
    new User(4, 'Ringo', 'ringo@isthebest.fi','123'),
  ]);

  getUsers() {
    //return this.users.asObservable();
    return this.http.get<User[]>(this.apiUrl);
  }

  /*addUser(newUser: User): boolean {
    const currentUsers = this.users.value;
    this.users.next([...currentUsers, newUser]);
    return true;
  }*/

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
