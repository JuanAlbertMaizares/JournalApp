// proveedores de autenticacion, metodos de Firebase para autenticacion. 
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    updateProfile,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
} from 'firebase/auth';
// importamos la configuracion de firebase para la autenticacion.
import { FirebaseAuth } from "./config";

// declaramos la clase de cada uno de los proveedores que tengamos, en ese caso solo tenemos google.
const googleProvider = new GoogleAuthProvider();

// funcion que nos permite autenticarnos con google
export const singInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;
        
        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}
// #########################################################################################
//nuevo proveedor
export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        // usamos el metodo de fb para crear un usuario con campos del formulario
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
        // TODO: actualizar el displayName en Firebase
        // usamos el mtdo de fb para actualizar el perfil del usuario
        await updateProfile(FirebaseAuth.currentUser, {displayName})
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {
        console.log(error);
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        return {ok: false, errorMessage: error.message}
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut();
}
