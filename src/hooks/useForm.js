import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState])
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null ) return false; 
        }
        return true;
    }, [formValidation]);
    // el seteador es quien carga los datos, de cualquier formulario
    // de target, del evento recibido, se toma y computa segun el name del campo con el valor en value.
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }
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
        // console.log(formCheckedValues);
    }
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}