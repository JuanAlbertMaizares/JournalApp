/*
los thunks son funciones de ejecución tardia, acciones asincronas, que estan listos 
para ser ejecutados cuando se necesiten.
Cada thunk recibe como parametro el dispatch, que es una funcion que permite despachar 
acciones al store de redux.
*/


import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = (email, password) => {
    // dispatch es proporcionada por redux-thunk, que esta dentro de redux-toolkit
    return async (dispatch)=>{
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {

    return async (dispatch)=>{
        dispatch(checkingCredentials());
        // f personalizada de fb providers
        const result = await singInWithGoogle(); 
        if (!result.ok) return dispatch(logout( result ));
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials() );
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        if (!ok) return dispatch( logout({errorMessage}) )

        dispatch( login({uid, displayName, email, photoURL}));
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials() );
        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmailPassword({email, password});
        if (!ok) return dispatch( logout(errorMessage) );
        dispatch( login({uid, displayName, email, photoURL}));
    }
}

export const startLogout = () => {
    return async(dispatch)=>{
        // llama al provider.
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}