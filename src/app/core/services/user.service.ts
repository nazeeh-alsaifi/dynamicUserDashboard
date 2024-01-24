import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient) { }

  getUsers(page: number): Observable<UsersApiResponse> {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<UsersApiResponse>(requestUrl).pipe(map((userApiResponse => userApiResponse || [])));
  }

  getUser(id: number): Observable<UserApiResponse> {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}/${id}`;
    // const user:User = this._httpClient.get<UserApiResponse>(requestUrl).subscribe(userWrapper => userWrapper.data);
    return this._httpClient.get<UserApiResponse>(requestUrl).pipe(map((userWrapper => userWrapper || false)));
  }
}

export interface UserApiResponse {
  data: User
}

export interface User {
  id: number,
  email: String
  first_name: String,
  last_name: String,
  avatar: String
}
export interface UsersApiResponse {
  page: number,
  data: User[],
  total: number,
  per_page: number,
}


