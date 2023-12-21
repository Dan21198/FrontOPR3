import {Component, OnInit} from '@angular/core';
import {TagService} from "../service/tag.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

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

  constructor(private tagService: TagService) {}

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
      const newTagData = { name: this.newTagName };
      this.tagService.createTag(newTagData).subscribe(
        (response) => {
          console.log('Tag created:', response);
          this.getTags();
          this.newTagName = '';
        },
        (error) => {
          console.error('Error creating tag:', error);
        }
      );
    }
  }

  updateTag(tag: any): void {
    this.tagService.updateTag(tag.id, { name: 'New Tag Name' }).subscribe(
      (response) => {
        console.log('Tag updated:', response);
        this.getTags();
      },
      (error) => {
        console.error('Error updating tag:', error);
      }
    );
  }

  deleteTag(tagId: number | null): void {
    if (tagId !== null) {
      this.tagService.deleteTag(tagId).subscribe(
        () => {
          console.log('Tag deleted');
          this.getTags();
        },
        (error) => {
          console.error('Error deleting tag:', error);
        }
      );
    } else {
      console.error('Invalid tagId provided.');
    }
  }


}
