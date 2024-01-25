
import { createReducer, on } from '@ngrx/store';
import { SingleUserApiActions, UsersApiActions, SearchApiActions } from '../actions/user.actions';

export const usersFeatureKey = 'users'
export interface State {
    loading: boolean;
    errors: any;
    users: any[];
    page: number;
    total: number;
    per_page: number;
    user: any;
}

export const initialUserState: State = {
    loading: false,
    errors: null,
    users: [],
    per_page: 0,
    total: 0,
    page: 0,
    user: null
};


export const userReducer = createReducer(
    initialUserState,

    on(UsersApiActions.loadUsers, (state, { page }) => ({ ...state, loading: true, errors: null, page })),
    on(UsersApiActions.loadUsersSuccess, (state, { data }) => ({
        ...state,
        users: data.data,
        loading: false,
        total: data.total,
        error: null
    })),
    on(UsersApiActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),


    on(SingleUserApiActions.loadUser, (state, { id }) => ({ ...state, loading: true, errors: null, id })),
    on(SingleUserApiActions.loadUserSuccess, (state, { data }) => ({
        ...state,
        user: data.data,
        loading: false,
        error: null
    })),
    on(SingleUserApiActions.loadUserFailure, (state, { error }) => ({ ...state, loading: true, errors: error })),


    on(SearchApiActions.searchUser, (state, { id }) => ({ ...state, loading: true, errors: null, id })),
    on(SearchApiActions.searchUserSuccess, (state, { data }) => ({ ...state, loading: false, errors: null, users: [data.data] })),
    on(SearchApiActions.searchUserFailure, (state, { error }) => ({ ...state, loading: true, errors: error }))

);