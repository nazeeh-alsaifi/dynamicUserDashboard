import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UsersComponent } from './users/users.component';
import { GithubListComponent } from './github-list/github-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserDetailComponent }

];
