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
        },
        setNotes: ( state, action ) =>  {
            state.notes = action.payload;
        },
        setSaving: ( state, action ) =>  {

        },
        updateNote: ( state, action ) =>  {

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
    updateNote,
 } = journalSlice.actions;