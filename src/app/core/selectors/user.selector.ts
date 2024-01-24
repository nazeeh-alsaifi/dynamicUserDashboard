import { createFeatureSelector } from "@ngrx/store";
import { User, UserApiResponse, UsersApiResponse } from "../services/user.service";


export const selectUsers = createFeatureSelector<UsersApiResponse>('users');
export const selectSelectedUser = createFeatureSelector<UserApiResponse>('user');