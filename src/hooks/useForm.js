// UseForm, es un hook que se encarga de manejar los formularios, y sus validaciones.
// recibe como parametro, el estado inicial del formulario, y las validaciones.
// retorna el estado del formulario, el seteador de los campos, el reseteador del formulario,
// y los estados de validacion de cada campo, y si el formulario es valido o no.
// se usa el hook useMemo, para que no se ejecute la validacion de cada campo, cada vez que se renderiza el componente.
// se usa el hook useEffect, para que se ejecute la validacion de cada campo, cada vez que se altera el estado del formulario.
// se usa el hook useState, para manejar el estado del formulario, y el estado de validacion de cada campo.

/**
 * @param {Object} initialForm - Estado inicial del formulario, vacio.
 * @param {Object} formValidations - Validaciones del formulario, vacio.
 * @returns {Object} - Retorna variables: el estado del formulario, el seteador de los campos, el reseteador del formulario, y los estados de validacion de cada campo, y si el formulario es valido o no.
 * @example
 * const { name, email, password, password2, onInputChange, onResetForm, nameValid, emailValid, passwordValid, password2Valid, isFormValid } = useForm( initialForm, formValidations );
 * 
 * useform, una funcion
 *     *
 */
import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {
    // mtd - 
    const [ formState, setFormState ] = useState( initialForm );
    // formValidation, contiene
    const [formValidation, setFormValidation] = useState({});
    
    // mtd - 
    useEffect(() => {
        // createValidators, es una funcion que se encarga de validar cada campo del formulario, 
        // y setear el estado de validacion de cada campo.
        createValidators();
    }, [formState])
    // mtd - 
    // usamos setFormState, para que cada vez que se altere el estado inicial del formulario,
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    // mtd - Validador total
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) {
            /**
             * formValidation = {
             * nameValid: null,
             * emailValid: null,
             * passwordValid: null,
             * password2Valid: null
             * }
            */
           // si algun campo no es null, retorna false, y el formulario no es valido.
           if (formValidation[formValue] !== null ) return false; 
        }
        return true;
    }, [formValidation]);
    
    // mtd - Seteador
    // el seteador es quien carga los datos, de cualquier formulario
    // de target, del evento recibido, se toma y computa segun el name del campo con el valor en value.
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }
    
    // mtd - 
    const onResetForm = () => {
        setFormState( initialForm );
    }
    // mtd - fn para validar c/ campo
    // esta funcion usa la funcion fn que se le pasa como parametro, para validar el campo.
    const createValidators = ()=>{
        const formCheckedValues = {};
        // en el for obtiene los kays: los nombres de campos
        for (const formField of Object.keys(formValidations)) {
            // desestructura y obtiene la f y el msg error, 
            // mandando como param, el kay, el campo
            const [ fn, errorMessage ] = formValidations[formField];
            // arma el objeto con los campos validados
            // y ejecuta la funcon que testea si cumple o no.
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;       
        }
        // setea el state validation con los datos obtenido cada ves que el 
        // stateForm se altere.
        setFormValidation(formCheckedValues);
    }
    // mtd -
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}