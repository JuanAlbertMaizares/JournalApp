import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
    },
    reducers: {
        // esta f se llama para poner en true cuadno si se este operando en la creacion de una nota
        // sirve para bloquear boton.
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) =>  {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) =>  {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) =>  {
            state.notes = action.payload;
        },
        setSaving: ( state, action ) =>  {
            state.isSaving = true;
            state.messageSaved = '';
        },
        noteUpdate: ( state, action ) =>  { // payload: note
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if (note.id === action.payload.id ) {
                    return action.payload;
                }
                return note;
            } );
            state.messageSaved = `La nota: ${action.payload.title}, fue actualizada correctamente.`;
        },
        deleteNoteById: ( state, action ) =>  {

        },
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdate,
 } = journalSlice.actions;