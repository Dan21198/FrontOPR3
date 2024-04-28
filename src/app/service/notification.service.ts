import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {NotificationStatus} from "../notification-status";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, status: NotificationStatus): void {
    const panelClass = status === NotificationStatus.Success ? 'success-snackbar' : 'fail-snackbar';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }
}
