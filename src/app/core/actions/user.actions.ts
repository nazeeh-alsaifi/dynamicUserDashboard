import { createActionGroup, props } from '@ngrx/store';
import {  UserApiResponse, UsersApiResponse } from '../services/user.service';

export const UsersApiActions = createActionGroup({
    source: 'Users API',
    events: {
        'Retrieved Users List': props<{ users: UsersApiResponse }>(),
        'Retrieved Single User': props<{ selectedUser: UserApiResponse }>()
    },
}
)