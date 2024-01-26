import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserService, UsersApiResponse } from '../../core/services/user.service';
import { Store } from '@ngrx/store';
import { SearchApiActions, SingleUserApiActions, UsersApiActions } from '../../core/actions/user.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class NavComponent {
  title = 'Dynamic User Dashboard';
  menuItems = ['welcome', 'users'];
  id = new FormControl('', [Validators.required, Validators.pattern("^[1-9]*$")]);
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private userService: UserService, private store: Store) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  getErrorMessage() {
    if (this.id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.id.hasError('pattern') ? 'Not a valid number' : '';
  }

  search(event: Event) {
    if (this.id.value === '' || this.id.valid) {
      const searchId = parseInt((event.target as HTMLInputElement).value) || -1;
      this.store.dispatch(SearchApiActions.searchUser({ id: searchId }));

    }
  }




}

