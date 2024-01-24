import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../core/services/user.service';
import { SingleUserApiActions } from '../core/actions/user.actions';
import { Store } from '@ngrx/store';
import * as UsersSelectors from "../core/selectors/user.selector";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule,],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  public user$: Observable<User>;
  selectedId = 0;

  constructor(private route: ActivatedRoute,
    private store: Store) {
    this.route.paramMap.subscribe(params => this.selectedId = parseInt(params.get('id')!))
    this.store.dispatch(SingleUserApiActions.loadUser({ id: this.selectedId }));

  }

  ngOnInit() {
    this.user$ = this.store.select(UsersSelectors.getUser);
  }

}
