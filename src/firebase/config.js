/*
Todo esto es para conectar con FB nada mas.
  importaciones de firebase: initializeApp, getAuth, getFirestore.
  Objeto de configuracion de la app dado por firebase.
  Exportacion y uso de las funcionalidades de firebase: 
    - initializeApp: para inicializar la app de firebase
    - getAuth: para la autenticacion
    - getFirestore: para la db
*/

// usamos initializeApp para inicializar la app de firebase
import { initializeApp } from "firebase/app"; 
// usamos getAuth para la autenticacion
import {getAuth} from 'firebase/auth';
// usamos getFirestore para la db
import {getFirestore} from 'firebase/firestore/lite';

// objeto de configuracion del proyecto nuestro
const firebaseConfig = {
  // apiKey es la clave de la app, Clave de API web.
  apiKey: "AIzaSyBtBoTVbmdtCNmL8oOv7ykjCWwpdGUwXKw",
  authDomain: "react-seoul.firebaseapp.com",
  projectId: "react-seoul",
  storageBucket: "react-seoul.appspot.com",
  messagingSenderId: "10396946651",
  appId: "1:10396946651:web:cfbca67c47747e23283cfe"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
// la funcionalidad implementada para la autenticacion
export const FirebaseAuth  = getAuth(FirebaseApp);
// configuracion de la db
export const FirebaseDB  = getFirestore(FirebaseApp);