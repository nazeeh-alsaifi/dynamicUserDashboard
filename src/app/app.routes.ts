import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersComponent } from './user/users/users.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserDetailComponent }

];
