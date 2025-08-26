package com.app.repository;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.model.Note;

public interface NoteRepository extends JpaRepository<Note,UUID> {
	List<Note> findByUser_Id(UUID userId); 
}
