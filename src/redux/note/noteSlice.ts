import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type NoteId = string;

export type Category = {
    id: string,
    value: string
    label: string
}

export type Client = {
  id: string,
  value: string
  label: string
}

export type Note = {
    id: string,
    title: string,
    body: string,
    category: Category,
    client: Client,
}

interface NoteState {
    notes: Note[];
}

const initialState: NoteState = {
    notes: []
};

export const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
      addNote(
        state: NoteState, 
        action: PayloadAction<Note>
      ) {
        state.notes.push(action.payload);
      },
      editNote(
        state, 
        action: PayloadAction<Note>
      ) {
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id);
          state.notes[index] = action.payload;
        
      },
      removeNote(
        state, 
        action: PayloadAction<NoteId>
      ) {
        const index = state.notes.findIndex(
          ({ id }) => id === action.payload);
        state.notes.splice(index,1)
        
      },
    },
  });

export const { addNote, editNote, removeNote } = noteSlice.actions;

export default noteSlice.reducer;

export const selectNotes = (state: RootState) => state.notes.notes;