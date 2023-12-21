import { Component } from '@angular/core';
import {NotificationService} from "../service/notification.service";
import {NotificationStatus} from "../notification-status";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string = '';
  type: NotificationStatus = NotificationStatus.Info; // default to Info

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(
      notification => {
        this.message = notification.message;
        this.type = notification.type;
      }
    );
  }

  hide(): void {
    this.notificationService.hide();
  }
}
