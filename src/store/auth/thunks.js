import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./"

export const checkingAuthentication = (email, password) => {

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

        dispatch(logout());
    }
}