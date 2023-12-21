import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { OldAuthService } from '../service/old.auth.service';
import { Router } from '@angular/router';
import {NoteService} from "../service/note.service";
import {TagService} from "../service/tag.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  constructor(private authService: OldAuthService,
              private noteService: NoteService,
              private tagService: TagService,
              private userService: UserService,
              private router: Router) { }

  login() {
    this.authService.authenticate({
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe(response => {
      console.log('User logged in successfully:', response);
      console.log('Received JWT:', response.access_token);
      this.noteService.setToken(response.access_token);
      this.tagService.setToken(response.access_token)
      this.userService.setToken(response.access_token)
      this.router.navigate(['/notes']);
    }, error => {
      console.error('Login failed:', error);
    });
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
