import { createActionGroup, props } from '@ngrx/store';

export const UsersApiActions = createActionGroup({
    source: 'Users API',
    events: {
        'Load Users': props<{ page: number }>(),
        'Load Users Success': props<{ data: any }>(),
        'Load Users Failure': props<{ error: any }>()
    },
})

export const SingleUserApiActions = createActionGroup({
    source: 'SingleUser API',
    events: {
        'Load User': props<{ id: number }>(),
        'Load User Success': props<{ data: any }>(),
        'Load User Failure': props<{ error: any }>()
    },
})


export const SearchApiActions = createActionGroup({
    source: 'Search User API',
    events: {
        'Search User': props<{ id: number }>(),
        'Search User Success': props<{ data: any }>(),
        'Search User Failure': props<{ error: any }>()
    },
})