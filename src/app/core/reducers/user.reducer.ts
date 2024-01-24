
import { createReducer, on } from '@ngrx/store';
import { UsersApiActions } from '../actions/user.actions';
import { User, UserApiResponse, UsersApiResponse } from '../services/user.service';

export interface UserState {
    users: UsersApiResponse;
    selectedUser: UserApiResponse;
}

export const initialUserState = {
    users: {},
    selectedUser: {},
};


export const userReducer = createReducer(
    initialUserState,
    on(UsersApiActions.retrievedUsersList, (state, { users }) => ({ ...state, users })),
    on(UsersApiActions.retrievedSingleUser, (state, { selectedUser }) => ({ ...state, selectedUser })),
);