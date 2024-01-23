import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient) { }

  getUsers(page: number): Observable<UsertableItem> {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<UsertableItem>(requestUrl);
  }

  getUser(id: number): Observable<UserWrapper> {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}/${id}`;

    return this._httpClient.get<UserWrapper>(requestUrl);
  }
}

export interface UserWrapper{
  data: User
}

export interface User {
  id: number,
  email: String
  first_name: String,
  last_name: String,
  avatar: String
}
export interface UsertableItem {
  page: number,
  data: any[],
  total: number,
  per_page: number,
}


