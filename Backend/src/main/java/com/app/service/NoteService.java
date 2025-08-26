package com.app.service;

import com.app.model.Note;
import com.app.model.User;
import com.app.repository.NoteRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // 1. READ ALL NOTES
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // 2. CREATE NOTE
    public Note createNote(Note note, User user) {
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        note.setUser(user);
        Note savedNote = noteRepository.save(note);
        System.out.println("Note saved: " + savedNote);
        return savedNote;
    }

    // 3. UPDATE NOTE
    public Note updateNote(UUID noteId, Note updatedNote) {
        Note existingNote = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        existingNote.setTitle(updatedNote.getTitle());
        existingNote.setContent(updatedNote.getContent());
        existingNote.setUpdatedAt(LocalDateTime.now());

        return noteRepository.save(existingNote);
    }

    // 4. DELETE NOTE
    public void deleteNote(UUID noteId) {
        Note noteToDelete = noteRepository.findById(noteId)
            .orElseThrow(() -> new ResourceNotFoundException("Note not found"));

        noteRepository.delete(noteToDelete);
    }

	public List<Note> getNotesById(UUID userId) {
		// TODO Auto-generated method stub
		return noteRepository.findByUser_Id(userId);
	}
}
