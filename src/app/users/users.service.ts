import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
     return this.http.get<User[]>(environment.apiUrl + '/users');
  }

  getUser(id: number): Observable<User> {
     return this.http.get<User>(environment.apiUrl + '/users/' + id);
  }

  updateUser(user: User, id:number): Observable<User> {
    return this.http.put<User>(environment.apiUrl + '/users/', { firstname: user.firstname, lastname: user.lastname, email: user.email, age: user.age, id: id }, this.httpOptions);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + '/users/', { firstname: user.firstname, lastname: user.lastname, email: user.email, age: user.age }, this.httpOptions);
  }
}
