package com.app.Controller;

import com.app.model.Note;
import com.app.model.User;
import com.app.repository.UserRepository;
import com.app.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*") 
public class NoteController {
	private final UserRepository ur;
    private final NoteService noteService;

    public NoteController(NoteService noteService,UserRepository ur) {
        this.ur = ur;;
		this.noteService = noteService;
    }

    // GET all notes
    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes(@RequestParam UUID userId) {
        List<Note> notes = noteService.getNotesById(userId); // no userId
        return ResponseEntity.ok(notes);
    }

    // CREATE note
    @PostMapping("/create")
    public ResponseEntity<Note> createNote(@RequestBody Note note, @RequestParam UUID userId) {
        System.out.println(userId);
    	User user = ur.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        Note savedNote = noteService.createNote(note, user);
        return ResponseEntity.ok(savedNote);
    }


    // UPDATE note
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable UUID id, @RequestBody Note note) {
        Note updatedNote = noteService.updateNote(id, note); // no userId
        return ResponseEntity.ok(updatedNote);
    }

    // DELETE note
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID id) {
        noteService.deleteNote(id); // no userId
        return ResponseEntity.noContent().build();
    }
}
