import {Component, OnInit} from '@angular/core';
import {NoteService} from "../service/note.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TagComponent} from "../tag/tag.component";
import {TagService} from "../service/tag.service";
import {forkJoin} from "rxjs";


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
  newNote: any = {};
  updatedNote: any = {};
  editingNoteId: number | null = null;
  selectedNoteId: number | null = null;
  availableTags: any[] = [];
  selectedTagId: number | null = null;

  constructor(private noteService: NoteService,
              private tagService: TagService) {}

  ngOnInit(): void {
    this.fetchAllNotes();
    this.fetchAvailableTags();
    this.fetchAllNotesById()
  }

  onNoteSelected(noteId: number): void {
    this.selectedNoteId = noteId;
  }

  fetchAllNotes() {
    this.noteService.getAllNotes().subscribe(
      (notes) => {
        notes.forEach(note => {
          this.tagService.getTagsByNoteId(note.id).subscribe(
            (tags) => {
              note.tags = tags;
            },
            (error) => {
              console.error(`Error fetching tags for note ${note.id}:`, error);
            }
          );
        });
        this.notes = notes;
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }



  fetchAllNotesById() {
    if (this.selectedNoteId !== null) {
      this.noteService.getNoteById(this.selectedNoteId).subscribe(
        (notes) => {
          this.notes = notes;
        },
        (error) => {
          console.error('Error fetching notes:', error);
        }
      );
    } else {
      console.error('No note selected.');
    }
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

  createNote() {
    this.noteService.createNote(this.newNote).subscribe(
      (createdNote) => {
        console.log('Note created successfully:', createdNote);
        this.newNote = {};
        this.fetchAllNotes();
      },
      (error) => {
        console.error('Note creation failed:', error);
      }
    );
  }

  updateNote(noteId: number, updatedNote: any) {
    this.noteService.updateNote(noteId, updatedNote).subscribe(
      (updatedNote) => {
        console.log('Note updated successfully:', updatedNote);
        this.editingNoteId = null;
        this.fetchAllNotes();
        window.location.reload();
      },
      (error) => {
        console.error('Note update failed:', error);
      }
    );
  }

  deleteNote(noteId: number) {
    this.noteService.deleteNote(noteId).subscribe(
      () => {
        console.log('Note deleted successfully');
        this.fetchAllNotes();
      },
      (error) => {
        console.error('Note deletion failed:', error);
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
      this.tagService.assignTagToNote(tagId, noteId).subscribe(
        (response) => {
          console.log('Tag assigned to note:', response);
        },
        (error) => {
          console.error('Error assigning tag to note:', error);
        }
      );
    } else {
      console.error('No note selected.');
    }
  }

  unassignTag(tagId: number | null): void {
    if (tagId !== null && this.editingNoteId !== null) {
      const noteId = this.editingNoteId; // Use the dynamic note ID
      this.tagService.removeTagFromNote(tagId, noteId).subscribe(
        (response) => {
          console.log('Tag removed from note:', response);
        },
        (error) => {
          console.error('Error removing tag from note:', error);
        }
      );
    } else {
      console.error('No note selected.');
    }
  }

}
