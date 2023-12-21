import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {NotificationStatus} from "../notification-status";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<{ message: string, type: NotificationStatus }>({ message: '', type: NotificationStatus.Info });
  notification$ = this.notificationSubject.asObservable();


  show(message: string, type: NotificationStatus): void {
    this.notificationSubject.next({ message, type });
  }

  hide(): void {
    this.notificationSubject.next({ message: '', type: NotificationStatus.Info });
  }
}
