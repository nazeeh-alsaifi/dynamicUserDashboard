import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, UserService } from '../core/services/user.service';


@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class UsertableComponent implements AfterViewInit {
  displayedColumns = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  data: User[] = [];
  resultsLength = 0;
  per_page = 6;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private _httpClient: HttpClient, private _router: Router, private userService: UserService) { }

  ngAfterViewInit() {

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

  goToUser(id: number) {
    this._router.navigate(['/user', id]);
  }

}


