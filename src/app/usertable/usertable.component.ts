import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { UsersApiActions } from '../core/actions/user.actions';
import { Store } from '@ngrx/store';

import * as UsersSelectors from "../core/selectors/user.selector";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../core/services/user.service';

@Component({
  selector: 'app-usertable',
  templateUrl: './usertable.component.html',
  styleUrl: './usertable.component.css',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule]
})
export class UsertableComponent implements OnInit {
  displayedColumns = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  public users$: Observable<User[]>;
  resultsLength$: any = 0;
  per_page = 6;
  page = 0;


  constructor(private _router: Router, private store: Store) {
    this.store.dispatch(UsersApiActions.loadUsers({ page: this.page }));

  }
  ngOnInit(): void {
    this.users$ = this.store.select(UsersSelectors.getUsers);
    this.resultsLength$ = this.store.select(UsersSelectors.getTotal);
  }
  pageNavigate(event: PageEvent) {
    this.store.dispatch(UsersApiActions.loadUsers({ page: event.pageIndex }));
  }

  goToUser(id: number) {
    this._router.navigate(['/user', id]);
  }

}


