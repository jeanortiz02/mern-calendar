

import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState] = useState(initialForm);

    const onInputChange = ( {target} ) => {
        const {name, value} = target;
        setFormState( {
            ...formState,
            [ name]: value
        })
    };

    const onClickReset = ()=> {
        setFormState( initialForm )
    }



    return {
        ...formState,
        formState,
        onInputChange,
        onClickReset
    }
}