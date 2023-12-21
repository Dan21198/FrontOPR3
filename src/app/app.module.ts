import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {NotificationComponent } from './notification/notification.component';
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from "./service/auth.service";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {AppRoutingModule} from './app-routing-module/app-routing-module.module';
import {NoteComponent} from "./note/note.component";
import {CommonModule} from "@angular/common";
import {MatMenuModule} from "@angular/material/menu";




@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    NotificationComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    LoginComponent,
    AppRoutingModule,
    CommonModule,
    NoteComponent,
    MatMenuModule,
    LoginComponent,
    NoteComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
