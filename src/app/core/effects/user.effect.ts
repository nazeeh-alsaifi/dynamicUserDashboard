import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import { SearchApiActions, SingleUserApiActions, UsersApiActions } from '../actions/user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,private userService: UserService) {}

  loadUsers$ = createEffect(() => 
    this.actions$.pipe(
      ofType(UsersApiActions.loadUsers),
      map((action: any) => action),
      mergeMap((action:any) => {
        return this.userService.loadUsers(action.page).pipe(
          map(data => UsersApiActions.loadUsersSuccess({ data })),
          catchError(error => of(UsersApiActions.loadUsersFailure({ error })))
        );
      })
    )
  )

  loadUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SingleUserApiActions.loadUser),
      map((action: any) => action),
      mergeMap((action:any) => {
        return this.userService.loadUser(action.id).pipe(
          map(data => SingleUserApiActions.loadUserSuccess({ data })),
          catchError(error => of(SingleUserApiActions.loadUserFailure({ error })))
        );
      })
    )
  )

  searchUser$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SearchApiActions.searchUser),
      map((action: any) => action),
      mergeMap((action:any) => {
        return this.userService.loadUser(action.id).pipe(
          map(data => SearchApiActions.searchUserSuccess({ data })),
          catchError(error => of(SearchApiActions.searchUserFailure({ error })))
        );
      })
    )
  )
}