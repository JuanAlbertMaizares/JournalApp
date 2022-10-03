// tood esto es para conectar con FB nada mas.


import { initializeApp } from "firebase/app"; 
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';

// objeto de configuracion del proyecto nuestro
const firebaseConfig = {
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