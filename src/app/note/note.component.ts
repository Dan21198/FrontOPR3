import {Component, OnInit} from '@angular/core';
import {NoteService} from "../service/note.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TagComponent} from "../tag/tag.component";
import {TagService} from "../service/tag.service";
import {NotificationService} from "../service/notification.service";
import {NotificationStatus} from "../notification-status";


@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TagComponent
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  notes: any[] = [];
  availableTags: any[] = [];
  newNote: any = {};
  updatedNote: any = {};
  searchFinished: string = '';
  searchTagId: string = '';
  editingNoteId: number | null = null;
  selectedTagId: number | null = null;
  selectedNoteId: number | null = null;

  constructor(private noteService: NoteService,
              private tagService: TagService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.fetchAllNotes();
    this.fetchAvailableTags();
  }

  searchNotes() {
    if (this.searchFinished !== '' && this.searchTagId !== '') {
      // Handle case for both conditions
    } else if (this.searchFinished !== '') {
      this.noteService.getNotesByFinishedStatus(this.searchFinished === 'true').subscribe(
        data => {
          this.notes = data;
          this.notes.forEach(note => this.fetchTagsForNote(note));
        },
        error => console.error('Error fetching notes', error)
      );
    } else if (this.searchTagId !== '') {
      this.noteService.getNotesByTag(+this.searchTagId).subscribe(
        data => {
          this.notes = data;
          this.notes.forEach(note => this.fetchTagsForNote(note));
        },
        error => console.error('Error fetching notes', error)
      );
    } else {
      this.fetchAllNotes();
    }
  }

  fetchAllNotes() {
    this.noteService.getAllNotes().subscribe(
      notes => {
        this.notes = notes;
        this.notes.forEach(note => this.fetchTagsForNote(note));
      },
      error => console.error('Error fetching notes:', error)
    );
  }

  fetchTagsForNote(note: any) {
    this.tagService.getTagsByNoteId(note.id).subscribe(
      tags => note.tags = tags,
      error => console.error(`Error fetching tags for note ${note.id}:`, error)
    );
  }

  fetchAvailableTags() {
    this.tagService.getTags().subscribe(
      tags => this.availableTags = tags,
      error => console.error('Error fetching tags:', error)
    );
  }

  createNote() {
    if (!this.newNote.content || this.newNote.content.trim() === '') {
      this.newNote.content = 'Text Here';
    }

    this.noteService.createNote(this.newNote).subscribe(
      (createdNote) => {
        console.log('Note created successfully:', createdNote);
        this.newNote = {};
        this.fetchAllNotes();

        this.notificationService.show('Note created successfully',NotificationStatus.Success);
      },
      (error) => {
        console.error('Note creation failed:', error);
        this.notificationService.show('Note creation failed',NotificationStatus.Fail);
      }
    );
  }

  updateNote(noteId: number, updatedNote: any) {
    this.noteService.updateNote(noteId, updatedNote).subscribe(
      (updatedNote) => {
        console.log('Note updated successfully:', updatedNote);
        this.editingNoteId = null;
        this.fetchAllNotes();

        this.notificationService.show('Note updated successfully',NotificationStatus.Success);
      },
      (error) => {
        console.error('Note update failed:', error);
        this.notificationService.show('Note update failed',NotificationStatus.Fail);
      }
    );
  }

  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe(
      () => {
        console.log('Note deleted successfully');
        this.fetchAllNotes();

        this.notificationService.show('Note deleted successfully',NotificationStatus.Success);
      },
      (error) => {
        console.error('Note deletion failed:', error);
        this.notificationService.show('Note deletion failed',NotificationStatus.Fail);
      }
    );
  }

  startEditing(noteId: number) {
    this.editingNoteId = noteId;

    const noteToEdit = this.notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      this.updatedNote.title = noteToEdit.title;
      this.updatedNote.content = noteToEdit.content;
    }
  }

  cancelEditing() {
    this.editingNoteId = null;
  }

  assignTag(tagId: number | null): void {
    if (tagId !== null && this.editingNoteId !== null) {
      const noteId = this.editingNoteId;
      console.log('Assigning tag:', tagId, 'to note:', noteId);
      this.tagService.assignTagToNote(tagId, noteId).subscribe(
        (response) => {
          console.log('Tag assigned to note:', response);
          const editedNote = this.notes.find((note) => note.id === noteId);
          if (editedNote) {
            editedNote.tags.push(response);
          }
          this.fetchAllNotes();

          this.notificationService.show('Tag assigned to note successfully', NotificationStatus.Success);
        },
        (error) => {
          console.error('Error assigning tag to note:', error);

          this.notificationService.show('Error assigning tag to note', NotificationStatus.Fail);
        }
      );
    } else {
      console.error('No note selected.');

      this.notificationService.show('No note selected', NotificationStatus.Fail);
    }
  }

  unassignTag(tagId: number | null): void {
    if (tagId !== null && this.editingNoteId !== null) {
      const noteId = this.editingNoteId;
      this.tagService.removeTagFromNote(tagId, noteId).subscribe(
        (response) => {
          console.log('Tag removed from note:', response);
          const editedNote = this.notes.find((note) => note.id === noteId);
          if (editedNote) {
            editedNote.tags = editedNote.tags.filter((tag: any) => tag.id !== tagId);
          }
          this.fetchAllNotes();

          this.notificationService.show('Tag removed from note successfully', NotificationStatus.Success);
        },
        (error) => {
          console.error('Error removing tag from note:', error);

          this.notificationService.show('Error removing tag from note', NotificationStatus.Fail);
        }
      );
    } else {
      console.error('No note selected.');

      this.notificationService.show('No note selected', NotificationStatus.Fail);
    }
  }

}
