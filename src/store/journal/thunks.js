import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './journalSlice';

export const startNewNote = () => {

    return async(dispatch, getState) => {
        dispatch(savingNewNote());
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
        // params :: FirebaseDB config para conectar a la CLOUD FB
        // params :: `` url del lugar a donde persistir 
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