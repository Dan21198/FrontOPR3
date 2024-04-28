import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar ) { }

  register() {
    this.userService.register({
      userName: this.username,
      email: this.email,
      password: this.password
    }).subscribe(response => {
      this.router.navigate(['/login']);
    }, error => {
      this.snackBar.open('Registration failed! Please try again.', 'Close', { duration: 3000 });
    });
  }
}
