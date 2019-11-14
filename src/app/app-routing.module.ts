import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';


const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'user/:id', component: UserEditComponent },
    { path: 'user', component: UserEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }