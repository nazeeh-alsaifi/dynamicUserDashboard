import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient) { }

  loadUsers(page: number) {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get(requestUrl);
  }

  loadUser(id: number) {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}/${id}`;
    // const user:User = this._httpClient.get<UserApiResponse>(requestUrl).subscribe(userWrapper => userWrapper.data);
    return this._httpClient.get(requestUrl);
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
  data: any[],
  total: number,
  per_page: number,
}



