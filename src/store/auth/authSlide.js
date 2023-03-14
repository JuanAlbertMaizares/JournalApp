// usamos el createSlice de redux-toolkit para crear el slice de auth
// contiene el estado inicial y las funciones que modifican el estado
// en este caso las acciones son: checkingCredentials, login y logout
// las acciones son funciones que reciben el estado y un payload
/*
    slice = {
        name: '',
        initialState: {}
        reducers: {}
    }
*/


import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated' 'authenticated'
        uid: null,
        email: null, 
        displayName: null,
        photoURL: null,
        errorMessage: null,

    },
    // los reducers reciben un state y modifican la propiedad que necesitemos modificar usando el payload
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            // state.errorMessage = payload.errorMessage;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';  

        }
    }
});


// Action creators are generated for each case reducer function
// Los creadores de acciones se generan para cada función de reducción de casos
export const { checkingCredentials, login, logout } = authSlice.actions;