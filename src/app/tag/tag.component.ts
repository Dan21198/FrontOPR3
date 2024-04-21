import {Component, OnInit} from '@angular/core';
import {TagService} from "../service/tag.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NotificationService} from "../service/notification.service";
import {NotificationStatus} from "../notification-status";
import {Tag} from "../model/Tag";

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})

export class TagComponent implements OnInit {
  tags: any[] = [];
  newTagName: string = '';
  selectedTagId: number | null = null;
  availableTags: any[] = [];

  constructor(private tagService: TagService,
              private notificationService: NotificationService ) {}

  ngOnInit(): void {
    this.getTags();
    this.fetchAvailableTags();
  }

  fetchAvailableTags() {
    this.tagService.getTags().subscribe(
      (tags) => {
        this.availableTags = tags;
      },
      (error) => {
        console.error('Error fetching tags:', error);
      }
    );
  }

  getTags(): void {
    this.tagService.getTags().subscribe(
      (data) => {
        this.tags = data;
      },
      (error) => {
        console.error('Error fetching tags:', error);
      }
    );
  }

  createTag(): void {
    if (this.newTagName.trim() !== '') {
      const newTag: Tag = { name: this.newTagName };
      this.tagService.createTag(newTag).subscribe(
        (response) => {
          console.log('Tag created:', response);
          this.getTags(); // Refresh the list
          this.newTagName = '';
          this.notificationService.show('Tag created successfully', NotificationStatus.Success);
        },
        (error) => {
          console.error('Error creating tag:', error);
          this.notificationService.show('Error creating tag. Please try again.', NotificationStatus.Fail);
        }
      );
    }
  }


  updateTag(tag: any): void {
    this.tagService.updateTag(tag.id, { name: 'New Tag Name' }).subscribe(
      (response) => {
        console.log('Tag updated:', response);
        this.getTags();

        this.notificationService.show('Tag updated successfully', NotificationStatus.Success);
      },
      (error) => {
        console.error('Error updating tag:', error);

        this.notificationService.show('Error updating tag', NotificationStatus.Fail);
      }
    );
  }

  deleteTag(tagId: number | null): void {
    if (tagId !== null) {
      this.tagService.deleteTag(tagId).subscribe(
        () => {
          console.log('Tag deleted');
          this.fetchAvailableTags();

          this.notificationService.show('Tag deleted successfully', NotificationStatus.Success);
        },
        (error) => {
          console.error('Error deleting tag:', error);

          this.notificationService.show('Error deleting tag', NotificationStatus.Fail);
        }
      );
    } else {
      console.error('Invalid tagId provided.');

      this.notificationService.show('Invalid tag ID', NotificationStatus.Fail);
    }
  }

  private getCurrentUser() {

  }
}
