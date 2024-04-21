import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: AuthService, private router: Router) { }

  register() {
    this.userService.register({
      userName: this.username,
      email: this.email,
      password: this.password
    }).subscribe(response => {
      console.log('User registered successfully:', response);
      this.router.navigate(['/login']);
    }, error => {
      console.error('Registration failed:', error);
    });
  }
}
