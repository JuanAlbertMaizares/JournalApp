import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

// loadNotes: Carga las notas de un usuario en específico.
// Se usan los metodos de firebase como getDocs y collection
// collection: Obtiene una referencia a una colección, la de notas de un usuario.
// getDocs: Obtiene todos los documentos  de una colección referenciada.
// .data de un documento de firebase, obtiene los datos de un documento, es
export const loadNotes = async( uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe.');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);
    const notes = [];
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()});

    });
    return notes;
}