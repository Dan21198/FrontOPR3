import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../login/login.component';
import { RegistrationComponent } from '../registration/registration.component';
import {NoteComponent} from "../note/note.component";
import {TagComponent} from "../tag/tag.component";
import {authGuard} from "../auth.guard";
import {UserComponent} from "../user/user.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'notes', component: NoteComponent, canActivate: [authGuard] },
  { path: 'tags', component: TagComponent, canActivate: [authGuard] },
  { path: 'users', component: UserComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
