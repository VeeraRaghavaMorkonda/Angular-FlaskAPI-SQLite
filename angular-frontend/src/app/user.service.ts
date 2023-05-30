import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl = 'http://localhost:8000'; // URL to FLASK REST API

  constructor(private http: HttpClient) {}

  /** GET users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/api/users');
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<any> {
    const url = `${this.userUrl}/api/users/${id}`;
    return this.http.get<User>(url);
  }

  /** POST: add a new user to the server */
  addUser(user: User) {
    //console.log(user);
    return this.http.post(this.userUrl + '/api/users/add', user, httpOptions);
  }

  /** PUT: update the user on the server */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl + '/api/users/update', user, httpOptions);
  }

  /** DELETE: delete the user from the server */
  deleteUser(user: User | number) {
    if (confirm('Are you sure to delete this User?')) {
      const id = typeof user === 'number' ? user : user.user_id;
      const url = `${this.userUrl}/api/users/delete/${id}`;
      return this.http.delete(url, httpOptions);
    }
    return of({});
  }
}
