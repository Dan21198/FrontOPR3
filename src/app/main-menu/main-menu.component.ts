import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateY(0)',
          visibility: 'visible'
        })
      ),
      state(
        'out',
        style({
          transform: 'translateY(-100%)',
          visibility: 'hidden'
        })
      ),
      transition('in <=> out', animate('300ms ease-in-out'))
    ])
  ]
})
export class MainMenuComponent {
  menuState: 'in' | 'out' = 'out';
  loggedOut: boolean = false;

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    if (this.loggedOut) {
      this.loggedOut = false;
      window.location.reload();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToUserSettings(): void {
    this.router.navigate(['/users']);
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }


  navigateToTags() {
    this.router.navigate(['/tags']);
  }

  navigateToNotes() {
    this.router.navigate(['/notes']);
  }

}
