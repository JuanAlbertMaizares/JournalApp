/*
los thunks son funciones de ejecución tardia, acciones asincronas, que estan listos 
para ser ejecutados cuando se necesiten.
Cada thunk recibe como parametro el dispatch, que es una funcion que permite despachar 
acciones al store de redux.
*/

import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, noteUpdate, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from './journalSlice';

export const startNewNote = () => {

    return async(dispatch, getState) => {
        dispatch(savingNewNote());
        // getState, es una funcion que permite obtener el estado completo actual del store de redux.
        // obtenemos del getState, del reducer Auth, el UID del usuario logeado.
        const { uid } = getState().auth;
        // creamos un elemento a guardar
        const newNote = {
            title: '', 
            body: '', 
            date: new Date().getTime(),
        }
        // con los metodos doc y collection
        // creamos un nuevo documento, perteneciente a la collection
        // params: FirebaseDB, config para conectar a la CLOUD FB
        // params: `url`, del lugar a donde persistir 
        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`) );
        // setDoc, setea el docu nuevo en la bd.
        await setDoc(newDoc, newNote);
        // console.log({newDoc, setDocResp});
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID, no existe.');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => { 
    
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().auth;
        const { active:note } = getState().journal;
        console.log('NOTE A GUARDAR:  ', note)
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        // referenciamos y guardamos
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge:true});

        dispatch( noteUpdate(note));
    }
}
export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )

        }

        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState)=>{
        const { uid } = getState().auth;
        const { active: note } = getState().journal;
        // lo direccionamos en firebase al punto donde hacer la eliminacion
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        // eliminado en firebase, en bd.
        console.log(docRef);    
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

    }
}