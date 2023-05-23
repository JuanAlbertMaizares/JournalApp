// SE ENCARGA DE CHECKEAR QUE EXISTE UN USUARIO LOGEADO Y CARGA SU INFO
// tambien carga las notas de este usuario.

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {

    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        // onAuthStateChanged es una funcion 
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            // carga notas
            dispatch(startLoadingNotes())

        })
    }, []);
    return {
        status
    }
}
