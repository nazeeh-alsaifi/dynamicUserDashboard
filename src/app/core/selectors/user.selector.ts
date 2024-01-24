import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUserReducer from '../reducers/users.reducer'


export const getUsersState = createFeatureSelector<fromUserReducer.State>('users');


// export const selectUsers = createFeatureSelector<UsersApiResponse>('users');
// export const selectSelectedUser = createFeatureSelector<UserApiResponse>('user');
export const loading = createSelector(
    getUsersState,
    (state: fromUserReducer.State) => state.loading
);

export const getUsers = createSelector(
    getUsersState,
    (state: fromUserReducer.State) => state.users
);

export const getTotal = createSelector(
    getUsersState,
    (state: fromUserReducer.State) => state.total
);

export const getUser = createSelector(
    getUsersState,
    (state: fromUserReducer.State) => state.user
);