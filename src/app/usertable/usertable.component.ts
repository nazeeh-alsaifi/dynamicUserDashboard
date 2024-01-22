import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class UsertableComponent implements AfterViewInit {
  displayedColumns = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  userService!: UserService | null;
  data: User[] = [];

  resultsLength = 0;
  per_page = 6;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private _httpClient: HttpClient) { }

  ngAfterViewInit() {
    this.userService = new UserService(this._httpClient);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.userService!.getUsers(
            this.paginator.pageIndex,
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {

          if (data === null) {
            return [];
          }

          this.resultsLength = data.total;
          this.per_page = data.per_page;
          return data.data;
        }),
      )
      .subscribe(data => (this.data = data));
  }

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


export class UserService {
  constructor(private _httpClient: HttpClient) { }

  getUsers(page: number): Observable<UsertableItem> {
    const href = 'https://reqres.in/api/users';
    const requestUrl = `${href}?page=${page + 1}`;

    return this._httpClient.get<UsertableItem>(requestUrl);
  }
}